import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import connectResources from '../resources'
import prefetchResource from './prefetchResources'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

const nonFieldErrorKeys = ['non_field_errors', 'nonFieldErrors', 'detail']

const defaultConfigs = {
  prefetch: true,
  cleanOnUnmount: false,
  defaultParams: {},
}

export default function(form, resource, configs = defaultConfigs) {
  console.warn('Redux-form will be deprecated in nearest feature. Please use final-form HOC')
  if(isEmpty(form)) {
    throw new Error('form configs are required')
  }
  if(Array.isArray(resource)) {
    throw new Error('withFormResource HOC could acceps only 1 resource')
  }
  if(typeof resource === 'function' && !resource.namespace) {
    throw new Error('resource should be a HOC that returns from customResource function')
  }
  const key = get(resource, 'namespace', resource)
  if(!key) {
    throw new Error('namespace is fequired')
  }
  return compose(
    configs.prefetch ? prefetchResource(resource, configs) : typeof resource === 'function' ? resource : connectResources(resource),
    connect((state, props) => ({
      initialValues: form.initialValues || get(state, `${key}.data`, {}),
    }), (dispatch, props) => {
      if(typeof resource === 'function') {
        return { onSubmit: get(props, `${key}.customRequest`) }
      }
      return {
        onSubmit: (data) => handleSubmit(data, get(props, key), { forceUpdates: true })
          .catch(error => {
            const errors = Object.entries(error || {}).reduce(function(res, [key, value]) {
              let eKey = key
              if(nonFieldErrorKeys.includes(key)) {
                eKey = '_error'
              }
              return {
                ...res,
                [eKey]: Array.isArray(value) ? value[0] : value,
              }
            }, {})
            throw new SubmissionError(errors)
          }),
      }
    }),
    reduxForm({ ...form }),
  )
}

function handleSubmit(data, resource, meta) {
  return get(data, 'uuid') ? resource.update(data, meta) : resource.create(data, meta)
}
