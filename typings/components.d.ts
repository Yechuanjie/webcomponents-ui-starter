import '@vue/runtime-core'
declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    JxUserInfo: typeof import('../packages/v-ui')['JxUserInfo']
  }
}

export {}
