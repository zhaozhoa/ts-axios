/**
 * 工具方法库
 */

const protoToString = Object.prototype.toString

export function isDate (val:any): val is Date {
  return protoToString.call(val) === `[object Data]`
}

export function isObject(val:any): val is Object {
  return protoToString.call(val) === `[object Object]`
}