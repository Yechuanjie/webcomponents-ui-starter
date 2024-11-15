// import { DefineComponent, defineCustomElement } from 'vue'

// // 自动引入components下所有组件
// const components: DefineComponent[] = []
// const basicModules: Record<string, DefineComponent> = import.meta.glob('../components/**/index.ts', {
//   eager: true
// })
// const modules = { ...basicModules }
// for (const path in modules) {
//   const comp = modules[path].default
//   components.push(comp)
// }

// /**
//  * 全局注册所有组件方法
//  */
// export const register = () => {
//   // 注册所有组件
//   components.forEach(comp => {
//     if (comp && comp.name) {
//       const name = camelCaseToKebabCase(comp.name)
//       if (!customElements.get(name)) {
//         // 将 SFC 注册为自定义元素，避免重复注册
//         customElements.define(name, defineCustomElement(comp))
//         console.warn(`vast：自定义元素 vast-${name} 注册成功`)
//       }
//     }
//     if (comp && !comp.name) {
//       console.warn(
//         `vast: 组件注册失败，未设置组件名称！

//         请在script setup中设置defineOptions({ name: 'ComponentName' })

//         组件路径：${comp.__file}`
//       )
//     }
//   })
// }

// /**
//  * 大驼峰组件名转短横线命名
//  * @param {string} camelCaseStr
//  * @eg 'CustomElementName' 转为 'custom-element-name'
//  */
// export function camelCaseToKebabCase(camelCaseStr: string) {
//   return camelCaseStr
//     .replace(/([A-Z])/g, '-$1')
//     .toLowerCase()
//     .replace('-', '')
// }

import { defineCustomElement } from 'vue'
import UserInfo from '@vast-ui/components/user-info'
import GoodsDetail from '@vast-ui/components/goods-detail'

const VastUserInfo = defineCustomElement(UserInfo)
const VastGoodsDetail = defineCustomElement(GoodsDetail)

// 分别导出元素
export { VastUserInfo, VastGoodsDetail }

export function register() {
  customElements.define('vast-user-info', VastUserInfo)
  customElements.define('vast-goods-detail', VastGoodsDetail)
}
