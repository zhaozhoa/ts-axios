/**
 * 实现请求功能
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
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
      handleResponse(response)
    }

    function handleResponse(response: AxiosResponse) {
      if ((response.status >= 200 && response.status < 300) || response.status === 304) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
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

    // 请求异常处理
    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }

    // 请求超时处理
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = () => {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    request.send(data)
  })
}
