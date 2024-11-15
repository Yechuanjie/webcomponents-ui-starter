import { defineCustomElement } from 'vue'
import GoodsDetail from './src/index.ce.vue'

export * from './src/type'

export const VastGoodsDetail = defineCustomElement(GoodsDetail)

export default VastGoodsDetail
