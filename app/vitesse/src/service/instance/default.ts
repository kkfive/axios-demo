/**
 * 默认情况下的实例
 */
import type { CustomOptions } from '@axios-demo/request'
import { Http } from '@axios-demo/request'
import { logN } from '~/utils/log'

// 请求成功：beforeRequestHook -> requestInterceptors -> responseInterceptors -> transformRequestHook
const defaultOptions: CustomOptions = {
  transform: {
    requestInterceptors: (config) => {
      // 请求拦截器
      logN.info('请求拦截器', 'requestInterceptors', config)
      return config
    },
    requestInterceptorsCatch: (error) => {
      // 请求拦截器错误处理
      logN.error('请求拦截器错误处理', 'requestInterceptorsCatch', error)
      return error
    },
    responseInterceptors: (res) => {
      // 响应拦截器
      logN.success('响应拦截器', 'responseInterceptors', res)
      return res
    },
    responseInterceptorsCatch: (error) => {
      // 响应拦截器错误处理
      logN.error('响应拦截器错误处理', 'responseInterceptorsCatch', error)
      return Promise.reject(error)
    },

    // 请求之前处理配置
    beforeRequestHook: (config) => {
      // 请求之前hook处理配置
      logN.primary('请求之前hook处理配置', 'beforeRequestHook', config)
      return config
    },

    requestCatchHook: (error, config) => {
      // 请求失败hook处理
      logN.error('请求失败hook处理', 'requestCatchHook', error, config)
      return Promise.reject(error)
    },

    transformRequestHook: (res) => {
      // 自定义处理响应数据
      logN.primary('自定义处理响应数据', 'transformRequestHook', res)
      return res
    },

    responseFinishHook: (config, response) => {
      // 请求结束后的拦截器
      logN.primary('请求结束后的拦截器', 'responseFinishInterceptors', config, response)
      return response
    },

  },
}

const http = new Http(defaultOptions)
export default http
