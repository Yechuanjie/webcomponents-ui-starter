import { defineCustomElement } from 'vue'
import UserInfo from './src/index.ce.vue'

export * from './src/type'

export const VastUserInfo = defineCustomElement(UserInfo)

export default VastUserInfo
