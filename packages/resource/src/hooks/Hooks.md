# Hooks

## useResource
Hook  that will create resource. The difference from connectResources is that useResource will only accept single Resource and does not accepts custom async action
`useResource(resource)`
- `resource: String|Object`  [required] => resource config
*Returns all props for resource:*

```
{
  data: { /* ... resource data from API ... */ },
  isLoading: true|false, 
  options: { /* parsed OPTIONS from API */ },
  errors: null, // or object with errors { },
  
  // actions
  fetch: func, // GET request, useful when no prefetch
  fetchOptions: func, // OPTIONS request
  create: func, // POST request
  save: func, // PATCH request
  update: func, // PATCH request, alias for save
  remove: func, // DELETE request
  replace: func, // PUT request if you need it
  setData: func, // you can update data in store manually, but please be carefull with this action
  setLoading: func, // you can updates isLoading in store manually, but please be carefull with this action
  setErrors: func, // you can updates errors in store manually, but please be carefull with this action
  setFilters: func, // you can updates current filters in store manually, but please be carefull with this action
  filters: {}, // current applied filters
}
```

#### Example
``` 
import { useResource } from '@ds-frontend/resource'

function MyReactComponent () {
  const { data, isLoading,  errors, fetch } = useResource('users/me')
  useEffect(()=>{
    const request = fetch()
    return request.cancel
  }, [])
  if(isLoading) {
    return 'Loading...'
  }
  if(errors){
    return 'Oooops something went wrong please contact local police office'
  }
  return <UserElement user={data}/>
}
``` 

## useClear
Hook that will return resource clear action
`useClear(namespace)`

- `namespace: String`  [required] => resource namespace

#### Example
```
import { useClear } from '@ds-frontend/resource'

function MyReactComponent () {
  const clear = useClear('session') 
  return <button onClick={clear}>Log out</button>
}
```


## useSetData
Hook that will return resource setData action
`useSetData(namespace)`
 Same api as useClear
## useSetFilters
Hook that will return resource setFilters action
`useSetFilters(namespace)`
 Same api as useClear
## useSetErrors
Hook that will return resource setErrors action
`useSetErrors(namespace)`
 Same api as useClear
## useSetLoading
Hook that will return resource setLoading action
`useSetLoading(namespace)`
 Same api as useClear


## useRequest
Hook for async resource action
`useRequest(resource, type)`

- `resource: String|Object`  [required] => resource config
- `type: String`  [required]  [default: GET] => HTTP request type ("GET", "POST", "DELETE" ...)

#### Example
```
import { useRequest } from '@ds-frontend/resource'

function MyReactComponent () {
  const fetchUser = useRequest({ endpoint: 'users/me', namespace: 'session'}) 
  return <button onClick={()=>fetchUser()}>Refresh profile</button>
}
```


## useCustomRequest
Hook for async  action
`useCustomRequest(asyncFunction, resource)`

- `asyncFunction: Func`  [required] => function that should return Promise. Accepts 3 arguments: 
-- API: api instance from asyncMiddleware 
-- payload: action payload 
-- meta: action extra configuration
- `resource: String|Object`  [required] => resource config

#### Example
```
import { useCustomRequest } from '@ds-frontend/resource'

function tryAsync(API, payload, meta) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ love: 'Djangostars' })
    }, 1000)
  })
}


function MyReactComponent () {
  const findLove = useCustomRequest(tryAsync, 'myLove') 
  return <button onClick={()=>findLove()}>Find your love</button>
}
```
