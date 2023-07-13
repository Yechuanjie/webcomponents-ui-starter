import type { UserCenterInfo } from 'packages/v-ui'

/** 全局变量 */
interface GlobalStore {
  sysId: number
  userCenterInfo: UserCenterInfo
}

export const stores: GlobalStore = {
  sysId: 0,
  userCenterInfo: {
    age: '',
    avatar: '',
    id: 0,
    name: '',
    phone: ''
  }
}
