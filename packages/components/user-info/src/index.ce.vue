<template>
  <!-- front-ce请查看style/front-ce.scss  -->
  <div class="front-ce user-info">
    <div class="user-info__avatar">
      <img :src="userInfo.avatar" alt="头像" />
    </div>
    <div class="user-info__name">{{ userInfo.name }}</div>
    <div class="user-info__desc">{{ userInfo.desc }}</div>
    <div class="user-info__btn">
      <el-button type="primary" @click="handleClick">获取用户信息</el-button>
    </div>
  </div>
</template>
<script setup lang="ts" name="JxUserInfo">
import UserApi from '@v-ui/api/userApi'
import { ElMessage, ElButton } from 'element-plus'
import { ref } from 'vue'

const userInfo = ref({
  avatar: '',
  name: '',
  desc: ''
})

const handleClick = async () => {
  try {
    const res = await UserApi.getUserInfo({ token: 'xxxx' })
    ElMessage.success('请求成功')
  } catch (error) {
    ElMessage.error(error.msg || '请求失败')
  }
}
</script>
<style lang="scss">
@import '../../../style/variable.scss';

.user-info {
  &__avatar {
  }
  &__name {
  }
  &__desc {
  }
}
</style>
