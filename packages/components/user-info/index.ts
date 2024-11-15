import UserInfo from './src/index.ce.vue'

export * from './src/type'

export default UserInfo

// import { defineCustomElement } from 'vue'
// // 将组件转换为 web components
// export const VastUserInfo = defineCustomElement(UserInfo)
// declare module 'vue' {
//   export interface GlobalComponents {
//     UserInfo: typeof VastUserInfo
//   }
// }
