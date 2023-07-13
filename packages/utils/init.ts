import { defineCustomElement, type DefineComponent } from 'vue'
import { camelCaseToKebabCase, loadCss, loadScript } from '@v-ui/utils/common'
import { axiosInstance } from '@v-ui/api/http'
import { stores } from '@v-ui/config'

import ElementPlusStyles from '../style/element-plus@2.2.29.min.css'

// import style1 from 'element-plus/theme-chalk/el-overlay.css'
// import style2 from 'element-plus/theme-chalk/el-message.css'
// import style3 from 'element-plus/theme-chalk/el-message-box.css'
// import style4 from 'element-plus/theme-chalk/el-notification.css'

// console.info(style1, style2, style3, style4)

// 自动引入components下所有组件
const components: DefineComponent[] = []
const basicModules = import.meta.globEager('../components/**/index.ts')
const modules = { ...basicModules }

for (const path in modules) {
  const comp = modules[path].default
  components.push(comp)
}
/**
 * 注册组件
 */
export const register = async (option: JxUIOptions) => {
  // 初始化全局配置
  await initCssRoot(option)
  // 远程获取element-plus样式
  await initElementPlusCss()
  components.forEach(comp => {
    if (comp && comp.name) {
      const name = camelCaseToKebabCase(comp.name)
      // 注入element-plus样式
      comp.styles = [ElementPlusStyles, comp.styles ? [...comp.styles] : []]
      if (!customElements.get(name)) {
        customElements.define(name, defineCustomElement(comp))
        console.info(`自定义元素 ${name} 注册成功`)
      }
    }
  })
}

/**
 * 使用cdn全局引入elementplus message、messagebox、notification等全局样式
 */
async function initElementPlusCss() {
  const elementPlusCssCdn = `https://img.juexiaotime.com/app/CDN/v3/element-message.css?time=${new Date().getTime()}`
  await loadCss(elementPlusCssCdn)
  // const res = await fetch(elementPlusCssCdn)
  // return res.text()
}

async function initCssRoot(option: JxUIOptions) {
  option.axios && axiosInstance.setAxios(option.axios)
  stores.sysId = option.sysId || 5 // 兜底使用法考主题，可能会存在没有主题色的system

  if (!window['JXLOGOINFO']) {
    // 通过sysId自动注入sysConfig
    await loadScript('https://img.juexiaotime.com/userAdmin/login/login-logo.js')
  }
  const sysConfig = window['JXLOGOINFO'][option.sysId]
  if (document.querySelector('#cssroot-jx-ui')) {
    return
  }
  const style = document.createElement('style')
  style.id = 'cssroot-jx-ui'
  style.type = 'text/css'
  style.innerHTML = `:root{
    --jxui-theme-color: ${sysConfig.themeColor || ''};
    --jxui-font-color: ${sysConfig.fontColor || ''};}`
  document.querySelector('head')?.appendChild(style)
}

interface JxUIOptions {
  /**
   *  axios实例
   * 可以是axios实例，也可以是封装好的http方法
   */
  axios: any
  /** 系统id */
  sysId: number
}
