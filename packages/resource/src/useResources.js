import { useMemo, useCallback } from 'react'
import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import get from 'lodash/get'
import { makeResourceActions } from './resources'


const resourceSelector = createSelector(
  state => state,
  (_, namespace) => namespace,
  (state, namespace) => get(state, namespace, {}),
)


function makeResourceSelector(config) {
  const namespace = get(config, 'namespace', config)
  return function(state) {
    return resourceSelector(state, namespace)
  }
}


export default function useResources(config) {
  const selectResource = useCallback(makeResourceSelector(config), [config])
  const resource = useSelector(selectResource)
  const dispatch = useDispatch()
  const actions = useMemo(() => makeResourceActions(config, dispatch), [config, dispatch])
  return { ...resource, ...actions }
}
