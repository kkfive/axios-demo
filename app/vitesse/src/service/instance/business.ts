/**
 * @description 一般情况下结合业务使用实例
 */
import { Http, type RequestOptions } from '@axios-demo/request'
import type { MessageHandler, MessageParams } from 'element-plus'
import { ElMessage } from 'element-plus'
import { checkBusinessStatus, checkHttpStatus } from './business.error'

interface SuccessResponse<T> {
  success: boolean
  data?: T
  errorCode?: number
  errorMessage?: string
}

export type ApiResponse<T> = SuccessResponse<T>

let message: MessageHandler | undefined

function useMessage() {
  function show(options: MessageParams) {
    if (message)
      return
    message = ElMessage(options)
  }
  function hide() {
    if (message) {
      message.close()
      message = undefined
    }
  }
  return { show, hide }
}

const requestOptions: RequestOptions = {
  baseURL: 'https://mock.apifox.cn/m1/3188536-0-default',
  transform: {
    transformRequestHook(response, config) {
      // 如果设置了isRawResponse 则直接返回原始响应
      if (config.isRawResponse)
        return response

      if (!config.isTransformResponse)
        return response.data

      // 如果响应是正确的 则直接返回data中的数据
      if ((response.data as ApiResponse<any>).success)
        return (response.data as ApiResponse<any>).data

      // 接口请求不成功，业务响应错误，做出响应处理
      checkBusinessStatus(response.data)
    },

    // HTTP响应错误
    requestCatchHook(error: any, config) {
      // 取消请求的情况下，不做任何处理
      if (['CanceledError'].includes(error.name))
        return

      // 其他情况下，做出响应处理
      if (error?.response?.status)
        checkHttpStatus(error?.response?.status)
    },

  },

}

const http = new Http(requestOptions)
export default http
