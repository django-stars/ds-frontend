import { parse } from 'path-to-regexp'

export function mergeConfigs(a, b) {
  return Object.assign({}, a || {}, b || {})
}

export function makePromiseSubscription(subscriptions) {
  if(!Array.isArray(subscriptions)) {
    return Promise.resolve()
  }
  let isCanceled = false
  const wrappedPromise = Promise.all(subscriptions)
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
  return namespace.split('/').shift()
}

export function Loader({ children, isLoading }) { return isLoading ? null : children }

export function parseIdKey(endpoint) {
  if(!endpoint || typeof endpoint !== 'string') {
    return false
  }
  if(!endpoint.includes(':')) { return }
  return (parse(endpoint) || [])
    .filter(item => typeof item !== 'string')
    .filter(({ modifier }) => modifier === '?')
    .pop()
    .name
}
