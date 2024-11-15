import { DefineComponent, defineCustomElement } from 'vue'

// 自动引入components下所有组件
const components: DefineComponent[] = []
const basicModules: Record<string, DefineComponent> = import.meta.glob('../components/**/index.ts', {
  eager: true
})
const modules = { ...basicModules }
for (const path in modules) {
  const comp = modules[path].default
  components.push(comp)
}

export const register = () => {
  components.forEach(comp => {
    if (comp && comp.name) {
      const name = comp.name
      // 注册自定义元素，避免重复注册
      if (!customElements.get(name)) {
        customElements.define(name, defineCustomElement(comp))
        console.warn(`vast：组件 ${name} 注册成功`)
      }
    }
    if (comp && !comp.name) {
      console.warn(
        `vast: 组件注册失败，未设置组件名称！

        请在script setup中设置defineOptions({ name: 'ComponentName' })

        组件路径：${comp.__file}`
      )
    }
  })
}
