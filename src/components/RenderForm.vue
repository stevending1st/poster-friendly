<script setup lang="ts">
import { FormRules } from "element-plus";
import { reactive } from "vue";

import { FormInfoType, FormDataType } from '../utils/form';

const { formInfo, rules, data } = defineProps<{
  formInfo: Partial<FormInfoType>,
  rules: FormRules,
  data: FormDataType,
}>()
const { name, labels, title, description, assignees, body } = formInfo;
console.log("--->formInfo, rules, data", formInfo, rules, data)
const formData = reactive(data)
</script>

<template>
  <el-row class="content w-full mb-6 text-gray-500" justify="center">
    <el-col :xs="18" :sm="18" :md="12">
      <h2 class="text-center">{{ name }}</h2>
      <p class="mw-100">{{ description }}</p>
    </el-col>
  </el-row>
  <el-form class="form mw-100" :model="formData" :rules="rules" size="large" label-position="top">
    <el-row class="content" justify="center">
      <el-col :xs="18" :sm="18" :md="12">
        <el-form-item class="mt-6 mb-10!" label="Title" :required="true">
          <el-input :placeholder="title" />
          <p class="text-sm text-gray-500 mt-1.5" v-if="description">
            {{ description }}
          </p>
        </el-form-item>

        <template fill v-if="body" v-for="(formItem, index) in body" :key="index">
          <FormItems :formItem="formItem" :data="data" />
        </template>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
:deep(.el-form-item__content) {
  flex-direction: column;
  align-items: flex-start;
}

:deep(.el-form-item__label) {
  margin-bottom: 6px !important;
}

:deep(.el-form-item__error) {
  position: relative;
  display: block;
}

:deep(.el-checkbox__label) {
  display: none;
}

:deep(label, .el-checkbox) {
  display: flex;
  align-items: stretch;
  margin-top: 0.25rem;
}

:deep(.el-checkbox.el-checkbox--large) {
  height: initial;
}
</style>