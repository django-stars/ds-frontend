
### CheckAccessProvider
A simple provider based on the Redux library, used to store access to components and application pages

Props: 

|  Property       |      type             |      Description      |
| --------------- | --------------------- | --------------------- |
|   userLevelSelector         | Integer               | Selector that returns integer value for comparison with the access flag            |

Usage:

```javascript
import { Provider } from 'react-redux'
import CheckAccessProvider from '@ds-frontend/access'

import userLevelSelector from '...path'

function App(){
  return (
    <Provider store={store}>
      <CheckAccessProvider userLevelSelector={userLevelSelector}>
        // ...childrens
      </CheckAccessProvider>
    </Provider>
  )
}
```
Than you need to create **userLevelSelector** file. This file should describe the logic of all permissions for each role. For this we prefer to use the **reselect** library

```javascript
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { createSelector } from 'reselect'

export const F_PUBLIC = 2 ** 0
export const F_PROTECTED = 2 ** 1
export const F_UNAUTHORISED = 2 ** 2
export const F_CHIEF  = 2 ** 52 - 1

export const userLevelSelector = createSelector(
  // base permissions
  (state) => isEmpty(get(state, 'session.data')) ? F_UNAUTHORISED : F_PROTECTED,

  // collect all user permissions
  (...args) => args.reduce((level, flag) => level | flag, F_PUBLIC),
)

```
*NOTE: F_CHIEF have full access to application. It should contains all flags. the value should be next exponent minus one. The maximum exponent can be 52, because the MAX_SAFE_INTEGER is (2 ** 53)*

### CheckAccess
React component (Consumer) for condition rendering

Props: 

|  Property       |      type             |      Description      |
| --------------- | --------------------- | --------------------- |
|   access        | Integer               | Acess Level           |
|   fallback      | React Element         | React Componet to render if condition is `false`           |
|   children      | Node         | Will render children component if condition is `true`           |

Usage:

```javascript
import { CheckAccess } from '@ds-frontend/access'

import { F_PROTECTED } from 'path/userLevelSelector'
	
	
export default function SessionText() {
  return (
    <CheckAccess
      access={F_PROTECTED}
      fallback={_ => <span>Unauthorised</span>}
    >
      <span>Authorised</span>
    </CheckAccess>
  )
}
```
Since our flag depends on whether our session is active or not, a text `Authorised` will be displayed during an active session. Otherwise, the text `Unauthorised` will be displayed
