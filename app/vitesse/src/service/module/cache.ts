/**
 * @description 使用默认实例发起请求
 */
import http from '~/service/instance/cache'

export default {
  success: () => http.get('/', {
    params: { c: 'a' },
  }),
  noCache: () => http.get('/', {
    params: { c: 'b' },
    ignoreCache: true,
  }),

}
