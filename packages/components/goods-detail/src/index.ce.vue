<template>
  <div>
    <p>GlobalComponents vast-goods-detail 组件渲染</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

defineOptions({ name: 'GoodsDetail' })

onMounted(() => {
  console.info('vast-goods-detail onmounted')
})
</script>
<style lang="scss" scoped></style>
