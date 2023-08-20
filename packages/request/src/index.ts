import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import defu from 'defu'
import type { CustomOptions, RequestOptions, RequestSubOptions } from './type'
import { isFunction } from './utils'
import { AxiosCanceler } from './cancel'

export { CustomOptions }
export class Http {
  /** 当前axios对象实例 */
  private instance: AxiosInstance
  /** 实例化对象时传入的配置 */
  private readonly options: RequestOptions

  constructor(options: RequestOptions) {
    this.options = options
    const newOptions = Object.assign(this.defaultConfig, options)

    this.instance = axios.create(newOptions)

    this.setupInterceptors()
  }

  /** 默认配置 */
  get defaultConfig(): Required<CustomOptions> & AxiosRequestConfig {
    return {
      key: null,
      ignoreCancelToken: true,
      transform: {},
    }
  }

  public getTransform() {
    const { transform } = this.options
    return transform
  }

  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform)
      return

    const axiosCanceler = new AxiosCanceler()

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    // set requestInterceptors
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig & RequestOptions) => {
        const { ignoreCancelToken } = config || this.options
        const ignoreCancel = !!ignoreCancelToken
        ignoreCancel && axiosCanceler.addPending(config)
        if (requestInterceptors && isFunction(requestInterceptors))
          config = requestInterceptors(config, this.options)

        return config
      },
      undefined,
    )
    // set requestInterceptorsCatch
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch))
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch)

    this.instance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors))
        res = responseInterceptors(res)
      return res
    }, undefined)

    // set responseInterceptorsCatch
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch))
      this.instance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  public request<T extends Record<string, any> = any>(url: string | RequestOptions, options?: RequestOptions & RequestSubOptions): Promise<T> {
    if (typeof url === 'string') {
      options = options || {}
      options.url = url
    }
    else {
      options = url || {}
    }
    let conf = defu(options, this.options)

    const { transform } = conf
    if (transform?.beforeRequestHook && isFunction(transform.beforeRequestHook))
      conf = transform.beforeRequestHook(conf)

    // conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      let response: AxiosResponse<any>
      this.instance.request(conf)
        .then((res) => {
          response = res
          const transformRequestHook = transform?.transformRequestHook
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              response = transformRequestHook(res, conf)
            }
            catch (err) {
              reject(err || new Error('request error!'))
              return
            }
          }

          resolve(response as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          const requestCatchHook = transform?.requestCatchHook
          // if (axios.isAxiosError(e) && e.code !== 'ERR_CANCELED') {

          // }
          if (requestCatchHook && isFunction(requestCatchHook)) {
            const result = requestCatchHook(e, conf)
            if (result)
              return reject(result)
          }

          reject(e)
        })
        .finally(() => {
          if (transform?.responseFinishHook && isFunction(transform.responseFinishHook))
            transform.responseFinishHook(conf, response)
        })
    })
  }

  private retryRequest<T>(config: AxiosRequestConfig, retryCount: number = 0): Promise<T> {
    return new Promise((resolve, reject) => {
      const retry = (count: number) => {
        this.instance.request(config)
          .then(res => resolve(res as unknown as Promise<T>))
          .catch((error: AxiosError) => count <= 0 ? reject(error) : retry(count - 1))
      }
      retry(retryCount)
    })
  }

  public get<T extends Record<string, any> = any>(url: string, options?: RequestSubOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' })
  }

  public post<T extends Record<string, any> = any>(url: string, options?: RequestSubOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'POST' })
  }

  public patch<T extends Record<string, any> = any>(url: string, options?: RequestSubOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'PATCH' })
  }

  public put<T extends Record<string, any> = any>(url: string, options?: RequestSubOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'PUT' })
  }

  public delete<T extends Record<string, any> = any>(url: string, options?: RequestSubOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }
}

export default Http
