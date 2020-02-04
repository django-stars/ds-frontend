
# api
Promise based HTTP client for browsers and React-Native based on fetch API

## Features

- Make HTTP request using [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Cancel requests
- Automatic transforms for JSON data


## Example
Performing a `GET` request

```js
import api from 'api'
// Make a request for a user with a given ID
api.request({
  endpoint: 'users/?offset=0&limit=20',
  method: 'GET'
})
  .then(function (response) {
    // handle success
  })
  .catch(function (error) {
    // handle error
  })
  .finally(function () {
    // always executed
  })

// Optionally the request above could also be done as
api.get('users', {
    params: {
      offset: 0,
      limit: 20
    }
  })
  .then(function (response) {
    // handle success
  })
  .catch(function (error) {
    // handle error
  })
  .finally(function () {
    // always executed
  })
```

Performing a `POST` request

```js
api.post('users', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
  .then(function (response) {
    // handle success
  })
  .catch(function (error) {
    // handle error
  });
```

## API

Requests can be made by passing the relevant config to `api`.

##### using dynamic urls
```js

api({
  method: 'get',
  url: '/users/:uuid?',
  params: {
      uuid: 'ted'
  }
})
  .then(function (response) {
    // handle success
  });
```

### Request method aliases

For convenience aliases have been provided for all supported request methods.

##### api.request(config)
##### api.get(endpoint [, config])
##### api.delete(endpoint [, config])
##### api.options(endpoint [, config])
##### api.post(url[, data[, config]])
##### api.put(url[, data[, config]])
##### api.patch(url[, data[, config]])

### Creating an instance

You can create a new instance of api with a custom config.

##### api.create([config])

```js
import { createInstance } from 'api'
const instance = createInstance({
  baseURL: 'https://domain.com/api/'
});
```

## Request Config

These are the available config options for making requests.

```js
{
  // `endpoint` is the server URL that will be used for the request
  endpoint: '/users',
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    offset: 0,
    limit: 20,
    uuid: 'test'
  },
  // `paramsSerializer` is an optional function in charge of serializing `params`
  paramsSerializer: function (params) {
    return buildQueryParams(params)
  },
  // `method` is the request method to be used when making the request
  method: 'get',
  // `baseURL` will be prepended to `url`.
  baseURL: 'https://domain.com/api/',
  // `headers` are custom headers to be sent
  headers: {'Content-Type': 'application/json'},
  // `body` is the data to be sent as the request body
  body: {
    firstName: 'Fred'
  },
  // `signal` [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  //`isMultipartFormData` function that returns Boolean to detect if body should be converted to MultipartFormData
  isMultipartFormData: function(body){
      return true
  },
  //`prepareBody` function to customize body before sending request
  prepareBody: function(body, isMultipartFormData){
      if(isMultipartFormData){
          return new FormData()
      }
      return JSON.stringify(body)
  }
  //`cache` https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
  cache: 'default',
  //`credentials` https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
  credentials: 'same-origin',
  //`mode` https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
  mode: 'same-origin'
}
```

## Response Schema

The response for a request contains the following information.

```js
{
  // `data` is the response that was provided by the server
  data: {},
  // `request` is the request that generated this response
  request: {}
}
```

## Config Defaults

You can specify config defaults that will be applied to every request.

### Global api defaults

```js
api.defaults.baseURL = 'https://api.example.com'
api.defaults.headers['Authorization'] = AUTH_TOKEN
```

### Custom instance defaults

```js
// Set config defaults when creating the instance
const instance = api.create({
  baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers['Authorization'] = AUTH_TOKEN;
```

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```js
// Add a request interceptor
api.interceptors.request.use({
    onSuccess: function (response) {
        return response;
    },
    onError: function (error) {
        return Promise.reject(error);
   }
});

// Add a response interceptor
const remove = api.interceptors.response.use({
    onSuccess: function (response) {
        return response;
    },
    onError: function (error) {
        return Promise.reject(error);
   }
});
//remove interceptor
remove();
```

## Cancellation

You can cancel a request using a [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).


```js
const controller = new AbortController()
const signal = controller.signal
api.get({
    endpoint: 'users',
    signal: signal
})
controller.abort()
```
