import { AxiosRequestConfig } from "./types";
import xhr from "./xhr";
import { buildUrl } from "./helpers/url";
import { transformRequest } from "./helpers/data";
import { processHeaders } from "./helpers/headers";

/**
 * axios 的 主题函数
 * @param config axios 传入的配置参数
 */
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

/**
 * 处理 传入的配置参数
 * @param config axios 传入的配置参数
 */
function processConfig(config:AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeders(config)
  config.data = transformRequestData(config)
}

/**
 * 拼接 url 和 get方法传入的参数
 * @param config axios 传入的配置参数
 */
function transformUrl(config: AxiosRequestConfig):any {
  const {url, params} = config
  return buildUrl(url, params)
}

/**
 * 设置 post 方法的参数
 * @param config axios 参数
 */
function transformRequestData(config:AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeders(config:AxiosRequestConfig) {
  const {headers = {}, data} = config
  return processHeaders(headers, data)
}
export default axios