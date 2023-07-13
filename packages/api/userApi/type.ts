/**获取商品列表接口参数 */
export interface GetUserInfoParams {
  token: string
}

export interface UserInfo {
  name: string
  id: number
  age: number
  sex: number
  isVip: boolean
}
