import { useMemo } from 'react'
import { createDispatchHook, useDispatch } from 'react-redux'
import { makeClearAction } from '../resources'


export default function useClear(namespace, context) {
  if(typeof namespace !== 'string') {
    throw new Error('namespace should be a String')
  }
  return makeClearAction({ namespace }, context ? createDispatchHook(context)() : useDispatch())
}
