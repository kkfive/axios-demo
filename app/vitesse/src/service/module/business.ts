/**
 * @description 一般情况下结合业务使用实例
 */
import http from '~/service/instance/business'

export default {
  success: () => http.get('/success', { isRawResponse: true }),
  error400: () => http.get('/error/http/400'),
  error401: () => http.get('/error/http/401'),
  error403: () => http.get('/error/http/403'),
  error404: () => http.get('/error/http/404'),
  error500: () => http.get('/error/http/500', { key: () => Math.random().toString() }),
  error502: () => http.get('/error/http/502'),
  errorBusiness401: () => http.get('/error/business/401'),
}
