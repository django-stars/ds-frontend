import { useMemo } from 'react'
import { createDispatchHook, useDispatch } from 'react-redux'
import { makeSimpleAction, setData, setFilters, setErrors, setLoading } from '../resources'


export function useSetData(namespace, context) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setData, context ? createDispatchHook(context)() : useDispatch())
}


export function useSetFilters(namespace, context) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setFilters, context ? createDispatchHook(context)() : useDispatch())
}

export function useSetErrors(namespace, context) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setErrors, context ? createDispatchHook(context)() : useDispatch())
}

export function useSetLoading(namespace, context) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeSimpleAction({ namespace }, setLoading, context ? createDispatchHook(context)() : useDispatch())
}
