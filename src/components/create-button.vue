<script setup lang="ts">
import { PostDestinationEnum } from '../utils/platform';

const { postDestination, btnText } = defineProps<{
  postDestination: PostDestinationEnum;
  btnText?: string;
}>();

const defultBtnText =
  postDestination === PostDestinationEnum.GITEE_ISSUE
    ? 'Create a Gitee issue'
    : postDestination === PostDestinationEnum.GITHUB_DISCUSSION
    ? 'Create a GitHub discussion'
    : 'Create a GitHub issue';

const icon =
  postDestination === PostDestinationEnum.GITEE_ISSUE ? 'gitee' : 'github';
</script>

<template>
  <el-button
    type="primary"
    size="large"
    class="w-full"
    round
    @Click="$emit('create')"
  >
    <div :class="`i-simple-icons-${icon} mr-2`" />
    {{ btnText || defultBtnText }}
  </el-button>
</template>

<style scoped></style>
