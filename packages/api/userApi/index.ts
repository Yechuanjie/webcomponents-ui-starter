import { http } from '../http'
import type { GetUserInfoParams, UserInfo } from './type'

class UserApi {
  /** 获取用户信息 */
  static getUserInfo = (params: GetUserInfoParams) => http<UserInfo>('/userapi/info', 'POST', params)
}
export default UserApi
export * from './type'
