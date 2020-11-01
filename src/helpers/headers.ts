/**
 * 处理请求头
 */
import { isObject } from "./util";


 function normalizeHaderName(headers:any, normalizedName: string):void {
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

 export function processHeaders(headers:any, data: any): any {
   normalizeHaderName(headers, 'Content-Type')

   if (isObject(data)) {
     if (headers && !headers['Content-Type']) {
       headers['Content-Type'] = 'application/json;charset=utf-8'
     }
   }

   return headers
 }