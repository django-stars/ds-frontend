import connectResource from './resources'
import { shallow, mount, render } from 'enzyme'
import { useEffect } from 'react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


const mockStore = configureStore()

describe('resource defaults', () => {
  function TestProps() {
    return null
  }

  const WithResource = connectResource('test-resource')(TestProps)
  const store = mockStore({})

  const wrapper = mount(
    <Provider store={store}>
      <WithResource testProp={'testValue'} />
    </Provider>
  )

  test('children rendering', () => {
    expect(wrapper.find(TestProps)).toHaveLength(1)
  })

  test('own props passed', () => {
    expect(wrapper.find(TestProps).prop('testProp')).toEqual('testValue')
  })

  test('resource prop passed', () => {
    // resource prop passed
    expect(wrapper.find(TestProps).prop('testResource')).toBeDefined()
  })

  test('no extra props', () => {
    // no extra props
    expect(Object.keys(wrapper.find(TestProps).props())).toHaveLength(2)
  })
})

xdescribe('resource actions and requests', () => {
  function TestAction({ testResource }) {
    //useEffect(() => testResource.fetch(), [])
    return null
  }

  const WithResource = connectResource('test-resource')(TestAction)
  const store = mockStore({})

  const wrapper = mount(
    <Provider store={store}>
      <WithResource />
    </Provider>
  )

  test('GET request', () => {
    expect(wrapper.find(TestAction)).toHaveLength(1)
  })

})

describe('to be done', () => {
  test.todo('store')
  test.todo('reducers')
  test.todo('filters')
  test.todo('options')
  test.todo('clear')
  test.todo('request cancelation')
})
