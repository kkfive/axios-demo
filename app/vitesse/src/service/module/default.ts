/**
 * 使用默认实例发起请求
 */
import http from '~/service/instance/default'

export default {
  success: () => http.get('/', {
    baseURL: 'https://v1.hitokoto.cn',
    ignoreCancelToken: true,
    key: '666',
    params: { c: 'a' },
    transform: {
      // beforeRequestHook(options) {
      //   console.log('复写beforeRequestHook')
      //   return options
      // },
      // requestCatchHook(e, options) {
      //   console.log('复写requestCatchHook', options)
      //   // return Promise.reject(error)
      // },
      // transformRequestHook(res, options) {
      //   console.log('复写transformRequestHook', options)
      //   return res
      // },
    },
  }),
  error: () => {
    return http.get('/error')
  },

}
