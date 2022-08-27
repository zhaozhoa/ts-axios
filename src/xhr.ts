/**
 * 实现请求功能
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, method = 'get', url, headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        request.responseType && request.responseType !== 'text'
          ? request.response
          : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    //  设置请求头
    Object.keys(headers).forEach(name => {
      //  如果 post 没有发送数据，则删除用户设置的 content-type 请求头
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        //  添加请求头
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
