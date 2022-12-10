<script setup lang="ts">
import { FormRules } from "element-plus";

import { FormInfoType, FormDataType } from '../utils/form';

const { formInfo, data } = defineProps<{
  formInfo: Partial<FormInfoType>,
  rules: FormRules,
  data: FormDataType,
}>()
const { name, description, body } = formInfo;
</script>

<template>
  <div class="content text-gray-500 flex flex-col items-center justify-center">
    <div class="flex flex-col items-start w-full">
      <h2 class="w-full">{{ name }}</h2>
      <p class="w-full">{{ description }}</p>
    </div>
    <div class="py-5 w-full">
      <slot name="title"></slot>

      <template v-if="body">
        <div fill v-for="(formItem, index) in body" :key="index">
          <form-items :formItem="formItem" :data="data" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-form-item__content) {
  flex-direction: column;
  align-items: flex-start;
}

:deep(.el-form-item__label) {
  margin-bottom: 6px !important;
}
</style>
