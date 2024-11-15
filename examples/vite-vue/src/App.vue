<template>
  <div>你好</div>
</template>
<script setup lang="ts" name="">
import { onMounted } from 'vue'

onMounted(() => {
  console.info('onMounted hello')
})
</script>
<style lang="scss" scoped></style>
