/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import type { RequestOptions, RequestSubOptions } from './type'

export abstract class AxiosTransform {
  /**
   * @description 请求之前处理config，可以被请求方法配置覆盖。建议写一些公共配置，但是个别请求又不需要这些配置
   */
  beforeRequestHook?: (
    options: RequestOptions,
  ) => AxiosRequestConfig

  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook?: <T>(
    response: AxiosResponse<T>,
    options: RequestOptions & RequestSubOptions,
  ) => any

  /**
   * @description 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => (Promise<Error>) | void

  /**
   * @description 请求拦截器处理，所有请求都会执行并且不会被请求方法覆盖
   */
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: RequestOptions,
  ) => InternalAxiosRequestConfig

  /**
   * @description 响应拦截器处理，所有请求都会执行并且不会被请求方法覆盖
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: any) => void

  /**
   * @description 响应错误处理
   */
  responseInterceptorsCatch?: (error: any) => Promise<Error>

  /**
   * @description 请求结束后触发的hook
   */
  responseFinishHook?: (options: RequestOptions, res: AxiosResponse<any>) => AxiosResponse<any>
}
