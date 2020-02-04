import ResourceType from './src/ResourceType'
import useResources from './src/useResources'

import connectResources, {
  resourcesReducer,
  customResource,
} from './src/resources'

export * from './src/hocs'


export {
  connectResources,
  useResources,
  resourcesReducer,
  ResourceType,
  customResource,
}
