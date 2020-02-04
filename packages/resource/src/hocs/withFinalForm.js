import finalForm from './finalForm'
import { compose } from 'redux'
import connectResources from '../resources'
import prefetchResources from './prefetchResources'
import get from 'lodash/get'
import { mergeConfigs, getNameSpace, Fragment } from '../utils'


const defaultConfigs = {
  prefetch: true,
  destroyOnUnmount: true,
  refresh: false,
  defaultParams: {},
  Loader: Fragment,
}
export default function(form = {}, resource, configs) {
  if(Array.isArray(resource)) {
    throw new Error('withFormResource HOC could acceps only 1 resource')
  }
  if(typeof resource === 'function' && !resource.namespace) {
    throw new Error('resource should be a HOC that returns from customResource function')
  }
  const key = getNameSpace(get(resource, 'namespace', resource))
  if(!key) {
    throw new Error('namespace is fequired')
  }
  const _configs = mergeConfigs(defaultConfigs, configs)
  return compose(
    configs.prefetch !== false ? prefetchResources(resource, _configs) : typeof resource === 'function' ? resource : connectResources(resource),
    finalForm(form, { key, resource, configs: _configs })
  )
}
