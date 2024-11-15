<template>
  <div>
    <p>你好</p>
    <vast-user-info></vast-user-info>
  </div>
</template>
<script setup lang="ts" name="">
import { onMounted } from 'vue'

onMounted(() => {
  console.info('onMounted hello')
})
</script>
<style lang="scss" scoped></style>
