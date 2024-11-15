import { DefineComponent, VueElement, VueElementConstructor, defineCustomElement, nextTick } from 'vue'

const importComponents = async () => {
  // 自动引入components下所有组件
  const components: { name: string; component: VueElementConstructor }[] = []
  const modules = await import.meta.glob('../components/**/index.ts')
  for (const path in modules) {
    await modules[path]().then((mod: any) => {
      const comp = mod.default
      const compName = mod.default?.def?.name
      if (comp && compName) {
        components.push({
          name: compName,
          component: comp
        })
      }
    })
  }
  return components
}

/**
 * 全局注册所有组件方法
 */
export const register = async () => {
  const components = await importComponents()

  // 注册所有组件
  components.forEach(comp => {
    const name = camelCaseToKebabCase(comp.name)
    // 将 SFC 注册为自定义元素，避免重复注册
    customElements.define(name, comp.component)
    console.log(`vast：自定义元素 vast-${name} 注册成功`)
  })
}

/**
 * 大驼峰组件名转短横线命名
 * @param {string} camelCaseStr
 * @eg 'CustomElementName' 转为 'custom-element-name'
 */
export function camelCaseToKebabCase(camelCaseStr: string) {
  return camelCaseStr
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace('-', '')
}

// import { defineCustomElement } from 'vue'
// import UserInfo from '@vast-ui/components/user-info'
// import GoodsDetail from '@vast-ui/components/goods-detail'

// console.info(UserInfo, 'user')
// const VastUserInfo = UserInfo
// const VastGoodsDetail = GoodsDetail

// // 分别导出元素
// export { VastUserInfo, VastGoodsDetail }

// export function register() {
//   customElements.define('vast-user-info', VastUserInfo)
//   customElements.define('vast-goods-detail', VastGoodsDetail)
// }
