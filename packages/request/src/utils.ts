import type { RequestOptions } from './type'

export { cloneDeep } from 'lodash-es'

export function getPendingKey(config: RequestOptions) {
  const { method, url, baseURL } = config

  if (config.key) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return isFunction(config.key) ? config.key(config) : config.key
  }

  return [method, baseURL, url].join('&')
}
export function isFunction(value: any) {
  return Object.prototype.toString.call(value) === '[object Function]'
}
