import UserInfo from './src/index.ce.vue'

export * from './src/type'

// 导出组件实例
export type UserInfoInstance = InstanceType<typeof UserInfo>

export const JxUserInfo = UserInfo

export default JxUserInfo
