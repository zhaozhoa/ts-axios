/**
 * 处理请求头
 */
import { isObject } from './util'

function normalizeHaderName(headers: Record<string, string>, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
// 处理请求头
export function processHeaders(headers: any, data: any): any {
  normalizeHaderName(headers, 'Content-Type')

  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 格式化响应头
export function parseHeaders(headers: string): Record<string, string> | void {
  if (!headers) return
  let parsed = Object.create(null)

  return headers.split('\r\n').reduce((parsed, line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return parsed
    if (val) val = val.trim()
    parsed[key] = val
    return parsed
  }, parsed)
}
