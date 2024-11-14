import { DefineComponent } from "vue"

// 自动引入components下所有组件
const components: DefineComponent[] = []
const basicModules = import.meta.glob('../components/**/index.ts')
const modules = { ...basicModules }

for (const path in modules) {
  basicModules[path]().then((mod) => {
    console.log(path, mod)
    // components.push(mod)
  })
}
