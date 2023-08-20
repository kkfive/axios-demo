import type { AxiosRequestConfig } from 'axios'
import type { AxiosTransform } from './transform'

export type RequestOptions = CustomOptions & AxiosRequestConfig
export interface RequestSubOptions extends Omit<RequestOptions, 'method' | 'limit' | 'cache'> {

  transform?: Partial<Pick<AxiosTransform, 'beforeRequestHook' | 'requestCatchHook' | 'transformRequestHook'>>
}

/**
 * 自定义请求配置
 */
export interface CustomOptions {

  /**
   * @description 自定义key的运算规则
   */
  key?: string | null | ((options: RequestOptions) => string)

  /**
   * @description 当前请求未完成时，相同的请求不会再次发出
   * @default true
   * @example
   * true => 当前请求未完成时，相同的请求不会再次发出
   * false => 当前请求未完成时，相同的请求会再次发出
   */
  ignoreCancelToken?: boolean

  /**
   * @description 请求期间的hook
   */
  transform?: AxiosTransform

}
