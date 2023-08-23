import type { AxiosRequestConfig } from 'axios'
import type { AxiosTransform } from './transform'

export type RequestOptions = CustomOptions & AxiosRequestConfig
export interface RequestSubOptions extends Omit<RequestOptions, 'method' | 'limit' | 'cache'> {

  transform?: Partial<Pick<AxiosTransform, 'beforeRequestHook' | 'requestCatchHook' | 'transformRequestHook'>>
  ignoreCache?: boolean
}

export abstract class Cache {
  get(key: string): any {}

  set(key: string, value: any): void {}

  delete?: (key: string) => void
  clear?: () => void
}

/**
 * 自定义请求配置
 */
export interface CustomOptions {
  [key: string]: any

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

  /**
   * @description 请求失败后，重试的次数
   * @default 3
   */
  retryCount?: number

  cache?: Cache | undefined | null

}
