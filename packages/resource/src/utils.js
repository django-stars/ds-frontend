import { parse } from 'path-to-regexp'
import get from 'lodash/get'
import camelCase from 'lodash/camelCase'
import isString from 'lodash/isString'

export function mergeConfigs(a, b) {
  return Object.assign({}, a || {}, b || {})
}

export function makePromiseSubscription(subscriptions) {
  if(!Array.isArray(subscriptions)) {
    return Promise.resolve()
  }
  let isCanceled = false
  const wrappedPromise = Promise.all(subscriptions)
    .catch(() => {
      if(isCanceled) {
        throw new Error('Promise cancelled')
      }
      return isCanceled
    })
    .then(() => {
      if(isCanceled) {
        throw new Error('Promise cancelled')
      }
      return isCanceled
    })
  wrappedPromise.cancel = function() { isCanceled = true }
  return wrappedPromise
}

export function getNameSpace(namespace) {
  if(typeof namespace !== 'string') {
    return ''
  }
  return camelCase(
    parse(namespace)
      .filter(isString)
      .map(item => item.split('/'))
  )
}

export function Loader({ children, isLoading }) { return isLoading ? null : children }

export function parseIdKey(endpoint) {
  if(!endpoint || typeof endpoint !== 'string') {
    return false
  }
  if(!endpoint.includes(':')) { return }
  const conditionQuery = (parse(endpoint) || [])
    .filter(isString)
    .filter(({ modifier }) => modifier === '?')
    .pop()
  return get(conditionQuery, 'name')
}
