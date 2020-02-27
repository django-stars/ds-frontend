import ResourceType from './src/ResourceType'
import useResource from './src/useResource'

import connectResources, {
  resourcesReducer,
  customResource,
} from './src/resources'

export * from './src/hocs'


export {
  connectResources,
  useResource,
  resourcesReducer,
  ResourceType,
  customResource,
}
