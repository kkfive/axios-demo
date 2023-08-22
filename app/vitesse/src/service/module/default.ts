/* eslint-disable no-console */
/**
 * @description 使用默认实例发起请求
 */
import http from '~/service/instance/default'

export default {
  success: () => http.get('/', {
    params: { c: 'a' },
  }),
  success1: () => http.get('/', {
    params: { c: 'b' },
    transform: {
      beforeRequestHook(options) {
        console.log('复写beforeRequestHook')
        return options
      },
      requestCatchHook(e, options) {
        console.log('复写requestCatchHook', options)
      },
      transformRequestHook(res, options) {
        console.log('复写transformRequestHook', options)
        return res
      },
    },
  }),
  error: () => {
    return http.get('/error')
  },

}
