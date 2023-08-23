import { ElNotification } from 'element-plus'

export function checkHttpStatus(status: number, msg: string = '') {
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = '400'
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = '403'
      break
    case 403:
      errMessage = '403'
      break
    // 404请求不存在
    case 404:
      errMessage = '404'
      break
    case 405:
      errMessage = '405'
      break
    case 408:
      errMessage = '408'
      break
    case 500:
      errMessage = '500'
      break
    case 501:
      errMessage = '501'
      break
    case 502:
      errMessage = '502'
      break
    case 503:
      errMessage = '503'
      break
    case 504:
      errMessage = '504'
      break
    case 505:
      errMessage = '505'
      break
    default:
      errMessage = `${msg}`
  }

  if (errMessage)
    ElNotification.error({ message: errMessage, type: 'error' })
}

export function checkBusinessStatus<T = any>(res: T) {
  // 根据实际业务取出数据,并作响应处理
  const { errorCode, errorMessage } = res as any

  switch (errorCode) {
    case 401:
      // TODO: 用户未登录 跳转登录页面
      break
  }
}
