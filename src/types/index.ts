/**
 * 定义接口文件
 */

//  定义请求方式
export type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'put' | 'PUT' | 'options' | 'OPTIONS' | 'patch' | 'PATCH'

// 定义请求的接口类型

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

// 定义响应接口类型
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 定义 axios 请求返回数据类型
export interface AxiosPromise extends Promise<AxiosResponse> {

}