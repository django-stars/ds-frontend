import persistReducer, { init, reset, INIT_STORE, RESET_STORE } from './persist'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
const reducer = persistReducer()

describe('persist function test coverage', () => {
  const store = mockStore({})

  beforeEach(() => {
    store.clearActions()
  })

  test('returns correct init action', () => {
    store.dispatch(init('content'))
    expect(store.getActions()).toEqual([{
      type: 'INIT_STORE',
      payload: 'content',
    }])
  })

  test('returns correct reset action', () => {
    store.dispatch(reset())
    expect(store.getActions()).toEqual([{
      type: 'RESET_STORE',
    }])
  })

  test('should return default state', () => {
    expect(reducer({ payload: 'default state' }, { type: 'TEST_ACTION' })).toEqual({ payload: 'default state' })
  })

  test('should handle case with INIT_STORE action', () => {
    expect(reducer({}, {
      type: INIT_STORE,
      payload: { payload: 'init' },
    })).toEqual({
      payload: 'init',
      isInitialized: true,
    })
  })

  test('should handle case with RESET_STORE action', () => {
    expect(reducer({}, { type: RESET_STORE })).toEqual({})
  })

  test('should handle RESET_STORE for whiteList of array type', () => {
    const reducer = persistReducer(['keyToLeaveInState'])
    expect(
      reducer({ isInitialized: true, keyToRemove: 0, keyToLeaveInState: true }, { type: RESET_STORE })
    ).toEqual({ isInitialized: true, keyToLeaveInState: true })
  })

  test('should handle RESET_STORE for whiteList of object type', () => {
    const reducer = persistReducer({ keyToRemove: 0, someKey: true })
    expect(reducer({ isInitialized: true, keyToRemove: 0, someKey: true }, { type: RESET_STORE })).toEqual({ isInitialized: true })
  })
})
