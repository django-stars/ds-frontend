import { useMemo, useCallback } from 'react'
import { createDispatchHook, useDispatch } from 'react-redux'
import { makeRequestAction, getMetaFromResource, makeRequest } from '../resources'


export function useRequest(config, type = 'GET', context) {
  if(Array.isArray(config)) {
    throw new Error('config can not be an array')
  }
  const meta = useMemo(() => ({ ...getMetaFromResource(config), queries: config.queries }), [])
  const dispatch = context ? createDispatchHook(context)() : useDispatch()
  return makeRequestAction(type, meta, dispatch)
}


export function useCustomRequest(asyncFunc, config, context) {
  if(Array.isArray(config)) {
    throw new Error('config can not be an array')
  }
  if(typeof asyncFunc !== 'function') {
    throw new Error('please define async function')
  }
  const meta = useMemo(() => ({ ...getMetaFromResource(config), queries: config.queries }), [])
  const dispatch = context ? createDispatchHook(context)() : useDispatch()
  return useCallback(function(payload, actionmeta) {
    return dispatch(makeRequest(asyncFunc)(payload, { ...meta, ...actionmeta }))
  }, [dispatch, meta])
}
