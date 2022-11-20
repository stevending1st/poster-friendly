<script setup lang="ts">
import { FormRules } from "element-plus";
import { ref } from "vue";

import { FormInfoType, FormDataType } from '../utils/form';

const { formInfo, rules, data } = defineProps<{
  formInfo: Partial<FormInfoType>,
  rules: FormRules,
  data: FormDataType,
}>()
const { name, labels, title, description, assignees, body } = formInfo;
const formData = ref(data)
</script>

<template>
  <div class="content text-gray-500 flex flex-col items-center justify-center">
    <div class="flex flex-col items-start w-full">
      <h2 class="w-full">{{ name }}</h2>
      <p class="w-full">{{ description }}</p>
    </div>
    <div class="flex py-5">
      <el-form class="w-full" :model="formData" :rules="rules" size="large" label-position="top">
        <el-form-item class="mt-6 mb-10!" label="Title" :required="true">
          <el-input :placeholder="title" />
          <p class="text-sm text-gray-500 mt-1.5" v-if="description">
            {{ description }}
          </p>
        </el-form-item>

        <template fill v-if="body" v-for="(formItem, index) in body" :key="index">
          <FormItems :formItem="formItem" :data="data" />
        </template>
      </el-form>
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
