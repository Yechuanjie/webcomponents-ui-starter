export * from './goods-detail'
export * from './user-info'

declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    VastUserInfo: typeof import('./user-info')['VastUserInfo']
    VastGoodsDetail: typeof import('./goods-detail')['VastGoodsDetail']
  }
}
