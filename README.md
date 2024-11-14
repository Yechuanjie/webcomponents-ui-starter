# 基于 vue 构建 web-components 组件库

#### 背景

目前公司前端以 vue 技术栈为主，且 vue2 和 vue3 项目会长期共存。对于新项目，我们将会统一使用`vue3技术栈`，那么之前开发的 vue2 组件就无法在 vue3 项目中使用。

同时，如果需要开发一个 vue 组件，能够同时运行在新老系统之上，也会面临着比较多的兼容性问题和部分毁灭性的改动，除非同时开发和维护两个 vue 版本的组件，类似`ElementUI`和 `Element Plus`

**疑问**：如何开发一个跨 vue 版本的组件？那跨其他技术栈的组件呢？

答案就是[web-components]([Web Components | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components))

而使用原生`web-components`开发，会处理诸如`shadowdom`、生命周期、事件机制等琐碎的功能，同时类似于 vue 模板以及响应式系统的功能都只能原生去实现。所以，一个高效的模板、灵活的语法、可扩展的 api、独立可用的一套系统，是开发`web-components`组件库的关键。

目前最完善的、应用最广泛的就是`ionic`团队研发的 [Stencil](https://github.com/ionic-team/stencil)，目前也有一些基于`stencil`开发的组件库，比如[glue]([grasilife/glue: Glue 是一个基于 web component 构建的组件库,可以在 react,vue2,vue3,angular 和 html 等前端框架中运行 (github.com)](https://github.com/grasilife/glue))，大家如果感兴趣的话，可以下来自行研究一下~~。接下来讲一下为什么不使用`Stencil`作为开发框架

#### 为什么不用 Stencil

用`Stencil`写一个基础组件看起来长这样

```tsx
import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'my-component', // the name of the component's custom HTML tag
  styleUrl: 'my-component.css', // css styles to apply to the component
  shadow: true // this component uses the ShadowDOM
})
export class MyComponent {
  // The component accepts two arguments:
  @Prop() first: string
  @Prop() last: string

  //The following HTML is rendered when our component is used
  render() {
    return (
      <div>
        Hello, my name is {this.first} {this.last}
      </div>
    )
  }
}
```

`Stencil`有着自己研发的一套模板语法以及装饰器等，普通开发人员使用`Stencil`开发组件，会有额外的学习成本（但。。其实还好）。如果大家熟悉`react`或者`jsx`语法的话，这套流程开发起来是比较顺畅的，有机会可以尝试一下。

回到主题，如果我想用`vue`语法来开发`web-components`组件的话，有没有办法呢？接下来就是本文的重点内容：`vue3.2`带来的新功能，具体可以查看 [Vue 与 Web Components](https://cn.vuejs.org/guide/extras/web-components.html#web-components-vs-vue-components)

#### 框架原理

基于`web-components`的组件化开发框架，使用`pnpm`管理`monorepo`项目（多个项目放在一个仓库中，包含了 components、utils、example 等），使用`vue3 + ts`开发组件，利用`vue3`的`defineCustomElement`功能将 SFC（单文件组件）转化为 `custom element` 自定义元素。

结构目录：

![](C:\Users\花无缺\AppData\Roaming\marktext\images\2022-10-21-12-54-48-image.png)

使用`vue3`开发一个`web-components`基础组件，需要以`.ce.vue`结尾，`vue`会将次后缀的组件识别为自定义元素组件

下面以一个基础组件`button`的开发流程为例，命名为`button.ce.vue`，目录为`packages/components/button/src/button.ce.vue`

```html
// packages/components/button/src/button.ce.vue
<template>
  <button class="awake-btn" :class="{ 'is-leak': isLeak, 'text-btn': textBtn }" :disabled="disabled">
    <slot></slot>
  </button>
</template>
<script lang="ts" setup name="JxButton">
  interface Iprops {
    isLeak?: boolean
    textBtn?: boolean
    disabled?: boolean
  }
  defineProps<Iprops>()
</script>

<style lang="scss" scoped>
  .awake-btn {
    height: 40px;
    padding: 0 16px;
    background-color: var(--awake-theme-color);
    color: var(--awake-font-color);
    font-size: 16px;
    &.is-leak {
      background: transparent;
      border: 1px solid var(--awake-theme-color);
      color: var(--awake-theme-color);
    }
    &.text-btn {
      background: transparent;
      border: none;
      color: var(--awake-theme-color);
    }
  }
</style>
```

注意：组件`script setup`语法中，`name="JxButton"`，其中`name`属性并非是`vue2`组件中的`name`属性，这里需要使用 `vite-plugin-vue-setup-extend` 插件来扩展其属性，就可以使用`name`属性来当做组件`name`

导出`button`组件

```typescript
// packages/components/button/index.ts

import Button from './src/button.ce.vue'

// 导出emit事件类型
export type ButtonEmitsType = {
  test: { id: number; name: string }
}

// 导出组件实例
export type ButtonInstance = InstanceType<typeof Button>

export const JxButton = Button

export default JxButton
```

注册自定义组件

```typescript
// packages/utils/install.ts
import { defineCustomElement, type DefineComponent } from 'vue'

// 自动引入components下所有组件
const components: DefineComponent[] = []
const basicModules = import.meta.globEager('../components/**/index.ts')
const modules = { ...basicModules }
for (const path in modules) {
  const comp = modules[path].default
  components.push(comp)
}
/**
 * 提供注册组件方法
 */
export const register = (option: JxUIOptions) => {
  // todo 初始化组件全局配置，如api、全局样式等
  // 注册所有组件
  components.forEach((comp) => {
    if (comp && comp.name) {
      const name = camelCaseToKebabCase(comp.name)
      if (!customElements.get(name)) {
        // 将 SFC 编译为自定义元素
        customElements.define(name, defineCustomElement(comp))
        console.info(`自定义组件${name}注册成功`)
      }
    }
  })
}
```

在项目`package`中，一共导出了 3 个包，分别包含`@juexiao-ui/components`、`@juexiao-ui/utils`、`juexiao-ui`

![](C:\Users\花无缺\AppData\Roaming\marktext\images\2022-10-21-13-20-00-image.png)

我们暂且定义最终的组件库名为 `juexiao-ui`

如何在 vue 项目中使用？

```typescript
// example/v3/main.ts

import { register } from 'juexiao-ui'
// 注册自定义组件
register({
  axios: request,
  sysId: 5
})
```

```html
<!-- example/v3/views/Button.vue -->

<template>
  <demo-card title="组件演示">
    <jx-button>普通按钮</jx-button>
    <jx-button is-leak>镂空按钮</jx-button>
    <jx-button>
      <img src="https://www.juexiaotime.com/static/img/shop/personalcenter/btn-edit-icon.png" class="icon" />
      自定义图标按钮
    </jx-button>
  </demo-card>
</template>
<script setup lang="ts" name="按钮">
  import { onMounted } from 'vue'
  import DemoCard from '../components/DemoCard.vue'
</script>
<style lang="scss" scoped>
  jx-button {
    margin-right: 10px;
  }
  .icon {
    width: 12px;
  }
</style>
```

注意：这里的 demo 是因为使用了`pnpm`来管理包，因此`register`方法是从 `juexiao-ui`导出的，它并不代表最终发布到`npm`上的包名

###### 效果演示

![](C:\Users\花无缺\AppData\Roaming\marktext\images\2022-10-21-13-48-18-image.png)

基于以上步骤，我们就搭建好了一个 基于 `Vue 构建自定义元素库`的框架。

#### 目前存在哪些问题？

##### Props 传参

引用`vue3`官方的一句话：<u>所有使用 `props` 选项声明了的 props 都会作为属性定义在该自定义元素上。Vue 会自动地、恰当地处理其作为 attribute 还是属性的反射。</u>

但从目前最新版的`vue3.2.41`版本来看，目前只有`string`类型和`number`类型的`prop`才会被正确解析，而`boolean` 以及其他复杂类型，均会被转为字符串并发出警告，为了避免这个问题，在`vue`中可以使用`.prop`修饰符来设置属性

```html
<jx-button :user.prop="{ name: 'jack' }"></jx-button> <jx-button :is-leak.prop="false"></jx-button>
```

##### 插槽

在一个组件中，插槽将会照常使用 `<slot/>` 渲染。然而，当使用最终的元素时，它只接受[原生插槽的语法](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)：

- 不支持[作用域插槽](https://cn.vuejs.org/guide/components/slots.html#scoped-slots)

- 当传递具名插槽时，应使用 `slot` attribute 而不是 `v-slot` 指令：

  ```html
  <jx-button>
    <div slot="content">hello</div>
  </jx-button>
  ```

##### 事件机制

通过 `this.$emit` 或者 `setup` 中的 `emit` 触发的事件都会通过以 `CustomEvents` 的形式从自定义元素上派发。额外的事件参数 (payload) 将会被暴露为 `CustomEvent` 对象上的一个 `detail` 数组

**注意：** 目前 vue3 对自定义元素的事件机制事件名只支持小写，不支持驼峰命名，这是一个待解决的问题，详情可以关注[issue](https://github.com/vuejs/core/issues/5401)。issue 中提到，可以在 vue 项目内，使用自定义指令来响应事件，但这并不是我们希望的，这意味着我们需要在不同的技术栈项目内做不同的兼容处理，从而不能达到随处可用的愿景

例如已开发的组件名为`custom-button`，组件有一个`changeStatus`事件，开发时，组件中`emit`的事件只能用小写或`kebab-case`短横线命名

```typescript
// custom-button.vue
const emits = defineEmits<{
  (e: 'change-status', val: number) // is ok
  (e: 'changestatus', val: number) // is ok
  (e: 'changeStatus', val: number) // is fail
}>()
```

```html
// 在vue中使用自定义元素时
<custom-button @change-status="changeStatus"></custom-button>
<script setup lang="ts">
  import { ref } from 'vue'
  import type { ButtonEmitsType } from 'juexiao-ui'

  const changeStatus = (e) => {
    const eventData = e.detail[0] as ButtonEmitsType['test']
    console.info('change-status事件触发', eventData)
  }
</script>
```

##### 样式修改

自定义组件，内容会以`shadow-root`的形式注入到`dom`中，因此自定义组件不支持从外部直接修改组件内部样式，这点和普通 UI 组件库是违背的，因为我们希望能够对基础组件样式在各个项目中可以进行自定义。

目前来说，如果组件可扩展能力极强或者是业务组件，那么对于样式来说基本上是一致不会修改的，那么这个需求也不是特别刚需。

对于这个问题，`vue`官方也有提到解决方案，不过目前是在进行中的一个状态，详情可以看这个[issue]([feat(runtime-dom): defineCustomElement without shadowDom (#4314) by gnuletik · Pull Request #4404 · vuejs/core (github.com)](https://github.com/vuejs/core/issues/4314))，大致意思如下：

```typescript
// 将 SFC 编译为自定义元素
customElements.define(
  'jx-button',
  defineCustomElement(Button, {
    shadowRoot: false
  })
)
```

##### 兼容性

兼容性和`vue3`兼容性一致
