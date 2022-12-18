<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

import { ConfigFormType } from '../utils/configForm';
import { resetForm } from '../utils/form';

const { isSupportedClipboard } = defineProps<{
  isSupportedClipboard: boolean;
}>();

const configForm = reactive<ConfigFormType>({
  repoOwner: '',
  repoName: '',
  templateURL: '',
  postDestination: [],
});

const configurationFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  repoOwner: [
    {
      required: true,
      message: 'Please input owner of repository.',
      trigger: 'blur',
    },
  ],
  repoName: [
    { required: true, message: 'Please input owner of name.', trigger: 'blur' },
  ],
  templateURL: [
    {
      required: true,
      message: 'Please input URL of template.',
      trigger: 'blur',
    },
  ],
  postDestination: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one post destination.',
      trigger: 'change',
    },
  ],
});
</script>

<template>
  <div
    class="content w-full px-5 mb-6 text-gray-500 flex flex-col items-center justify-center"
  >
    <div class="flex py-5 w-full sm:w-85% md:w-70% lg:w-50%">
      <el-form
        ref="configurationFormRef"
        :model="configForm"
        label-width="200px"
        label-position="left"
        :rules="rules"
        class="w-full"
        size="large"
      >
        <h4>Step 1: Enter or select the URL of the template.</h4>
        <el-form-item label="The template's URL" prop="templateURL">
          <el-input
            placeholder="Please type the URL of the template file."
            v-model="configForm.templateURL"
          />
        </el-form-item>
        <!-- <el-form-item label="Template" prop="region">
          <el-select placeholder="Activity zone" class="w-full">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item> -->
        <div class="flex justify-start mb-5">
          <el-button
            type="primary"
            size="large"
            round
            @click="$emit('preview', configForm)"
          >
            <div class="i-carbon-view mr-2" />
            Preview
          </el-button>
        </div>

        <h4>Step 2: Enter the owner and name of the repository.</h4>
        <el-form-item label="The repository's owner" prop="repoOwner">
          <el-input
            placeholder="Type the owner of the code repository."
            v-model="configForm.repoOwner"
          />
        </el-form-item>
        <el-form-item label="The repository's name" prop="repoName">
          <el-input
            placeholder="Type the name of the code repository."
            v-model="configForm.repoName"
          />
        </el-form-item>

        <h4>Step 3: Select the destination of the template.</h4>
        <el-form-item label="The posting's destination" prop="postDestination">
          <el-checkbox-group
            size="large"
            placeholder="5555"
            v-model="configForm.postDestination"
          >
            <el-checkbox label="GitHub_issue" name="type" size="large">
              <div class="flex">
                <div class="i-simple-icons-github mr-2" />
                GitHub Issue
              </div>
            </el-checkbox>
            <el-checkbox label="GitHub_discussion" name="type" size="large">
              <div class="flex">
                <div class="i-simple-icons-github mr-2" />
                GitHub Discussion
              </div>
            </el-checkbox>
            <el-checkbox label="Gitee_issue" name="type" size="large">
              <div class="flex">
                <div class="i-simple-icons-gitee mr-2" />
                Gitee Issue
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="flex justify-center">
          <el-button
            type="primary"
            size="large"
            round
            @click="$emit('visit', configurationFormRef, configForm)"
          >
            <div class="i-carbon-launch mr-2" />
            Visit
          </el-button>
          <el-button
            v-if="isSupportedClipboard"
            size="large"
            round
            @click="$emit('copyLink', configurationFormRef, configForm)"
          >
            <div class="i-carbon-copy mr-2" />
            Copy Link
          </el-button>
          <el-button
            type="danger"
            size="large"
            round
            @click="resetForm(configurationFormRef)"
          >
            <div class="i-carbon-reset mr-2" />
            Rest
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
:deep(label, .el-checkbox) {
  display: flex;
  align-items: stretch;
  margin-top: 0.25rem;
}

:deep(.el-checkbox.el-checkbox--large) {
  height: initial;
}
</style>
