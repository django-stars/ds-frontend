import cacheMiddleware from './cache-middleware'
import configureStore from 'redux-mock-store'
import { INIT_STORE } from './persist'

const mockStore = configureStore()
const store = mockStore({})

const localStorage = new class {
  localStore = {};
  setItem = (key, val) => (this.localStore[key] = val);
  getItem = key => this.localStore[key];
  clear = () => (this.localStore = {});
}()

window.localStorage = localStorage

describe('cacheMiddleware test coverage', () => {
  beforeEach(() => {
    localStorage.clear()
    store.clearActions()
    localStorage.setItem('foo', true)
  })

  it('returns undefined data from localStorage if requested storeKey does not exist and' +
    'dispatches init action with empty object', async () => {
    const cacheWrapper = cacheMiddleware({ storeKey: 'bar', cacheKeys: [], storage: localStorage })
    await cacheWrapper(store)

    expect(localStorage.getItem('bar')).toBeUndefined()
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: INIT_STORE, payload: {} }),
      ])
    )
  })

  it('returns correct value from storage and dispatches init action with this value to store', async () => {
    const cacheWrapper = cacheMiddleware({ storeKey: 'foo', cacheKeys: [], storage: localStorage })
    await cacheWrapper(store)

    expect(localStorage.getItem('foo')).toBeTruthy()
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: INIT_STORE, payload: true }),
      ])
    )
  })

  it('catch error in promise', async () => {
    const spy = jest.spyOn(localStorage, 'getItem').mockImplementation(
      (val) => Promise.reject(val)
    )

    const cacheWrapper = cacheMiddleware({ storeKey: 'token', cacheKeys: [], storage: localStorage })
    await cacheWrapper(store)

    expect(spy).toHaveBeenCalledWith('token')
    spy.mockRestore()
  })

  it('next state returns correct result', () => {
    const cacheWrapper = cacheMiddleware({ storeKey: 'foo', cacheKeys: [], storage: localStorage })
    const result = () => jest.fn().mockImplementation((action) => action)

    function callback(nextFunc) {
      expect(nextFunc(result())({ type: 'NEXT_ACTION', payload: 'key' })).toEqual(
        expect.objectContaining({ type: 'NEXT_ACTION', payload: 'key' })
      )
    }

    Promise.resolve(cacheWrapper(store)).then(callback)
  })
})
