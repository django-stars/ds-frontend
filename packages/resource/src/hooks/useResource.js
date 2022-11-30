import { useMemo, useCallback } from 'react'
import { createSelector } from 'reselect'
import {
  createDispatchHook,
  createSelectorHook,
  useSelector,
  useDispatch,
} from 'react-redux'
import get from 'lodash/get'
import { makeResourceActions } from '../resources'
import { getNameSpace } from '../utils'


function makeResourceSelector(config) {
  const namespace = getNameSpace(get(config, 'namespace', config))
  return function(state) {
    return get(state, namespace, {})
  }
}


export default function useResource(config, context) {
  if(Array.isArray(config)) {
    throw new Error('useResource hook can accept only one resource config')
  }
  const _useSelector = context ? createSelectorHook(context) : useSelector
  const _useDispatch = context ? createDispatchHook(context) : useDispatch
  const dispatch = _useDispatch()
  const resource = _useSelector(makeResourceSelector(config))
  const actions = useMemo(() => makeResourceActions(config, dispatch), [config, dispatch])
  return useMemo(() => ({ ...resource, ...actions }), [resource, config])
}
