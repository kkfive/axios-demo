import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { getPendingKey, isFunction } from './utils'
import type { RequestOptions } from './type'

let pendingMap = new Map<string, Canceler>()

export class AxiosCanceler {
  /**
   * @description 添加请求
   */
  addPending(config: RequestOptions) {
    this.removePending(config)
    const key = getPendingKey(config)
    config.cancelToken
      = config.cancelToken
      || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(key))
          pendingMap.set(key, cancel)
      })
  }

  /**
   * @description 清除全部pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * @description 移除请求
   */
  removePending(config: AxiosRequestConfig) {
    const key = getPendingKey(config)

    if (pendingMap.has(key)) {
      const cancel = pendingMap.get(key)
      cancel && cancel(key)
      pendingMap.delete(key)
    }
  }

  /**
   * @description 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
