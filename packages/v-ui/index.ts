export * from '../utils'
export * from '@v-ui/methods'
export * from '../directives'

export * from '../components'

/** 自定义元素事件类型 */
export interface CustomElementEvent<T = any> extends CustomEvent {
  detail: [T]
}
