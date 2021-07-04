import ResourceType from './src/ResourceType'

import connectResources, {
  resourcesReducer,
  customResource,
} from './src/resources'

export * from './src/hocs'
export * from './src/hooks'

export {
  connectResources,
  resourcesReducer,
  ResourceType,
  customResource,
}
