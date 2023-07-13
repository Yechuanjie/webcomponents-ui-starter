import { defineCustomElement, type DefineComponent } from 'vue'
import { camelCaseToKebabCase, loadCss } from '@v-ui/utils/common'
import ElementPlusStyles from '../style/element-plus@2.2.19.min.css'
/**
 * 将vue组件转为自定义组件
 * @param {DefineComponent} comp
 */
export const defineComponentToCustomElements = (comp: any) => {
  const name = camelCaseToKebabCase(comp.name)
  // 注入element-plus样式
  comp.styles = [ElementPlusStyles, comp.styles ? [...comp.styles] : []]
  if (!customElements.get(name)) {
    customElements.define(name, defineCustomElement(comp))
  }
  console.info(`自定义组件${name}注册成功`)
  return defineCustomElement(comp) as unknown as DefineComponent
}

// /**
//  * 使用cdn全局引入elementplus样式，减小打包体积
//  */
// export async function initElementPlusCss() {
//   const elementPlusCssCdn = 'https://img.juexiaotime.com/app/CDN/v3/element-plus@2.2.19.min.css'
//   if (sessionStorage.getItem('ElementPlusStyles')) {
//     return sessionStorage.getItem('ElementPlusStyles')
//   } else {
//     // hack: 这里要动态引入css到上层应用，否则无法正常注入真实css文本
//     await loadCss(elementPlusCssCdn)
//     const res = await fetch(elementPlusCssCdn)
//     const css = await res.text()
//     sessionStorage.setItem('ElementPlusStyles', css)
//     return css
//   }
// }
