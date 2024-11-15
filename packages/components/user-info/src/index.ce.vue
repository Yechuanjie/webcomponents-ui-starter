<template>
  <div>
    <p>GlobalComponents vast-user-info 组件渲染</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

defineOptions({ name: 'UserInfo' })

onMounted(() => {
  console.info('vast-user-info onmounted')
})
</script>
<style lang="scss" scoped></style>
