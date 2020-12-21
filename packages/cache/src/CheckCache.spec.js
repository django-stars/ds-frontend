import { shallow, mount } from 'enzyme'
import CheckCache from './CheckCache'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
let CheckCacheComponent

describe('One level deep rendering tests for CheckCache function', () => {
  const props = {
    isInitialized: true,
    children: 'cacheContent',
  }
  const store = mockStore({})
  const CheckCacheWrapper = () => (
    <Provider store={store}>
      <CheckCache {...props} />
    </Provider>
  )

  beforeEach(() => {
    CheckCacheComponent = shallow(<CheckCacheWrapper />).find(CheckCache)
  })

  test('renders correctly', () => {
    expect(CheckCacheComponent).toHaveLength(1)
  })

  test('check `isInitialized` prop', () => {
    expect(CheckCacheComponent.props().isInitialized).toBeTruthy()
  })

  test('check `children` prop', () => {
    expect(CheckCacheComponent.props().children).toEqual('cacheContent')
  })
})

describe('Deep level rendering tests for CheckCache function', () => {
  const props = {
    children: 'cacheContent',
  }

  test('should return cache content', () => {
    const store = mockStore({
      isInitialized: true,
    })
    const CheckCacheWrapper = () => (
      <Provider store={store}>
        <CheckCache {...props} />
      </Provider>
    )
    CheckCacheComponent = mount(<CheckCacheWrapper />)
    expect(CheckCacheComponent.html()).toEqual('cacheContent')
  })

  test("should't return cache content", () => {
    const store = mockStore({
      isInitialized: false,
    })
    const CheckCacheWrapper = () => (
      <Provider store={store}>
        <CheckCache {...props} />
      </Provider>
    )
    CheckCacheComponent = mount(<CheckCacheWrapper />)
    expect(CheckCacheComponent.html()).toBe('')
  })
})
