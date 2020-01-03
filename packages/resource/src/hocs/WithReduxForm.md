HOC that will connect Redux-form and resource with prefetch functionality, adding prefetched data as initialValues and sending POST/PUT request based on if it is new object or updating existing one
`withReduxForm(form, resources, options)`
#### `form : Object` [required] 
redux-form configs
#### `resources : String|Object|function` [required]
same as with prefetchResources but resources could not be an array it should be only a single resource
#### `options : Object` 
prefetchResource options
### usage
```
withReduxForm(
    form: {
      form: 'userForm',
    },
    resource: {
      namespace: 'user',
      endpoint: 'users/:uuid?', //uuid will be retrived from navigation params
    },
    {
      prefetch: true,
      destroyOnUnmount: true
    }
)
```