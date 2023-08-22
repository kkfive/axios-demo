/**
 * 默认情况下的实例
 */
import { Http } from '@axios-demo/request'
import type { RequestOptions } from '@axios-demo/request'
import { logN } from '~/utils/log'

// 请求成功：beforeRequestHook -> requestInterceptors -> responseInterceptors -> transformRequestHook
const defaultOptions: RequestOptions = {
  baseURL: 'https://v1.hitokoto.cn',
  ignoreCancelToken: true,
  transform: {
    // 请求拦截器
    requestInterceptors: (config) => {
      // 这里一般写一些所有接口都需要处理的逻辑 例如 添加验证信息等
      logN.info('请求拦截器', 'requestInterceptors', config)
      return config
    },

    // 请求拦截器错误处理
    requestInterceptorsCatch: (error) => {
      logN.error('请求拦截器错误处理', 'requestInterceptorsCatch', error)
      return error
    },

    // 响应拦截器
    responseInterceptors: (res) => {
      // 这里一般不做处理，因为使用无法被覆盖
      logN.success('响应拦截器', 'responseInterceptors', res)
      return res
    },

    // 响应拦截器错误处理
    responseInterceptorsCatch: (error) => {
      // 这里做一些请求遇到错误时做的事情
      logN.error('响应拦截器错误处理', 'responseInterceptorsCatch', error)
      return Promise.reject(error)
    },

    // 请求之前处理配置 可以被请求配置覆盖
    beforeRequestHook: (config) => {
      // 请求之前hook处理配置
      logN.primary('请求之前hook处理配置', 'beforeRequestHook', config)
      return config
    },

    // 请求失败hook处理 可以被请求配置覆盖
    requestCatchHook: (error, config) => {
      logN.error('请求失败hook处理', 'requestCatchHook', error, config)
      return Promise.reject(error)
    },

    // 自定义处理响应数据 可以被请求配置覆盖
    transformRequestHook: (res, config) => {
      // 处理请求数据。如果数据不是预期格式，可直接抛出错误
      logN.primary('自定义处理响应数据', 'transformRequestHook', res, config)
      return res
    },

    // 请求结束后的拦截器（无论成功与否都会触发） 可以被请求配置覆盖
    responseFinishHook: (config, response) => {
      logN.primary('请求结束后的拦截器', 'responseFinishInterceptors', config, response)
      return response
    },
  },
}

const http = new Http(defaultOptions)
export default http
