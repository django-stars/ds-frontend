# redux cache

#### persistReducer
this is hight order reducer that has only 2 possible actions
- `INIT_STORE`: action that will be dispached right after cached data will be retrived from whatever storage and reinitilize react app with cached data
- `RESET_STORE`: action that can be used on logout to clear whole redux store

`persistReducer(whiteList)`
`whiteList` is array of redux store keys should not be deleted on  `RESET_STORE` store action. For example, u can add site configs to `whitelist` or, in case, there is react-router connected to redux, it also should be whitelisted. It is better to store this config in .env file.
```js
    import { persistReducer } from 'ds-cache'
    
    composeReducers(
        {},
        combineReducers({
          form,
          nav,
        }),
        persistReducer(JSON.parse(process.env.CACHE_STATE_PERSIST_KEYS)),
    )
```
#### reset
`reset`  action with type `RESET_STORE` mostly will be used on logout

#### cacheMiddleware
`cacheMiddleware` is redux middleware that will cache your redux store to whatever storage
#### params 
###### `storeKey : String` [optional] [default: 'storage']
###### `cacheKeys : Array` [optional] [default: []]
by default nothing will be stored. You should add some keys that are needed to be cached. In case this param is empty, probably, you should not use this module.
###### `storage : function` [required]
Storage has same api as  [AsyncStorage](https://github.com/react-native-community/async-storage) or [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
#### create own storage
```
    class OwnStorage {
        constructor(){
            this.store = new Map()
        }
        getItem(key){
            return this.store.get[key]
        }
        setItem(key, value){
            this.store.set(key, value)
        }
    }
```
