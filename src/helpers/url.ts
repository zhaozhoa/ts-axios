import { isDate, isObject } from './util'

/**
 * 保留特殊符号并编码传入的querystring 的 key 和 val
 * @param val 传入的key/val
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 处理url 拼接 params 拼接的方法
 * @param url 传入的 url
 * @param params 传入的参数
 * @returns 拼接好参数的 url
 */

export function buildUrl(url: string, params: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === 'undefined') {
      return
    }

    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 处理url， 参数序列化后拼接
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#') // 丢弃hash
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
