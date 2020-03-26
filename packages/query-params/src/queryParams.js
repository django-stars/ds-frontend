import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import set from 'lodash/set'
import get from 'lodash/get'


export const STRATEGIES = {
  /*
   * Django defaults
   * primitive: name=value
   * array: name=1&name=2
   * object: name__key=value&&name__key2:value2
   */
  DEFAULT: 'DEFAULT',

  /*
   * Elastic defaults
   * primitive: name=value
   * array: name__in=1__2
   * object: name__key=value&&name__key2=value2
   */
  ELASTIC_DRF_DSL: 'ELASTIC_DRF_DSL',
}

export const SEPARATOR = '__'

export default class QueryParams {
  constructor({strategy = STRATEGIES.DEFAULT, separator = SEPARATOR} = {}) {
    this.strategy = strategy
    this.separator = separator

    this.buildQueryParams = this.buildQueryParams.bind(this)
    this.parseQueryParams = this.parseQueryParams.bind(this)
  }

  parseQueryParams(str) {
    if(str.length <= 2) {
      return {} // '' || '?'
    }

    let params = str
      .substr(1) // symbol '?'
      .split('&')
      .map(function(param) {
        var paramSplit = param.split('=').map(function(chunk) {
          return decodeURIComponent(chunk.replace('+', '%20'))
        })
        const name = paramSplit[0]
        const value = paramSplit[1] || ''
        return [name, value]
      })

    return params.reduce((ret, [key, value]) => {
      if(this.strategy === STRATEGIES.ELASTIC_DRF_DSL) {
        if(value.includes(this.separator)) {
          value = value.split(this.separator)
            .map(v => String(Number(v)) === v ? Number(v) : v)
        }
      }

      if(String(Number(value)) === value) {
        value = Number(value)
      }

      if(value === 'true') {
        value = true
      }

      if(value === 'false') {
        value = false
      }

      let keyChunks = key.split(this.separator)

      if(this.strategy === STRATEGIES.ELASTIC_DRF_DSL) {
        if(keyChunks[keyChunks.length - 1] === 'in') {
          if(!isArray(value)) {
            value = [ value ]
          }
          keyChunks = keyChunks.slice(0, -1)
        }
      }

      key = keyChunks.join('.')

      if(this.strategy === STRATEGIES.DEFAULT) {
        let currentValue = get(ret, key)
        if(currentValue !== undefined) {
          value = [value].concat(currentValue).reverse()
        }
      }

      set(ret, key, value)

      return ret
    }, {})
  }

  flattenParams(params, isSubLevel = false) {
    return Object.keys(params).reduce((ret, key) => {
      let value = params[key]

      if((!value && value !== false) || (isArray(value) || isPlainObject(value)) && isEmpty(value) || isEmpty(String(value))) {
        return ret
      }

      if(isArray(value)) {
        if(this.strategy === STRATEGIES.ELASTIC_DRF_DSL) {
          value = value.join(this.separator)
          if(!isSubLevel) {
            value = { in: value }
          }
        }
      }

      if(isPlainObject(value)) {
        let subParams = this.flattenParams(value, true)

        ret = ret.concat(
          subParams.map(([subKey, value]) => {
            return [[key, subKey].join(this.separator), value]
          })
        )
      } else {
        value = isArray(value) ? value : [ value ]
        ret = ret.concat(value.map( v => [key, String(v)]))
      }

      return ret
    }, [])
  }

  buildQueryParams(params) {
    if(isEmpty(params)) {
      return ''
    }

    params = this.flattenParams(params)

    return params.map(function([key, value]) {
      return (
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(value)
      )
    }).join('&')
  }
}
