<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { ConfigFormType } from "../utils/configForm";

const configForm = reactive<ConfigFormType>({
  repoOwner: '',
  repoName: '',
  templateURL: 'https://github.com/stevending1st/episode/blob/master/.github/ISSUE_TEMPLATE/recommend_guest.yaml',
  postDestination: [],
});

onMounted(async () => { })

</script>

<template>
  <div class="content w-full px-5 mb-6 text-gray-500 flex flex-col items-center justify-center">
    <div class="flex py-5 w-full sm:w-85% md:w-50%">
      <el-form ref="ruleFormRef" model="configForm" label-width="120px" label-position="left" class="w-full"
        size="large">
        <h4>Step 1: Enter or select the URL of the template.</h4>
        <el-form-item label="Template URL" prop="templateURL">
          <el-input placeholder="Please type the URL of the template file." v-model="configForm.templateURL" />
        </el-form-item>
        <!-- <el-form-item label="Template" prop="region">
          <el-select placeholder="Activity zone" class="w-full">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item> -->
        <div class="flex justify-start mb-5">
          <el-button type="primary" size="large" round @click="$emit('onPreview', configForm)">
            <div class="i-carbon-view mr-2" />Preview
          </el-button>
        </div>

        <h4>Step 2: Enter the owner and name of the repo.</h4>
        <el-form-item label="Repo owner" prop="repoOwner">
          <el-input placeholder="Type the owner of the code repository." v-model="configForm.repoOwner" />
        </el-form-item>
        <el-form-item label="Repo name" prop="repoName">
          <el-input placeholder="Type the name of the code repository." v-model="configForm.repoName" />
        </el-form-item>

        <h4>Step 3: Select the destination of the template.</h4>
        <el-form-item label="Post destination" prop="type">
          <el-checkbox-group size="large" placeholder="5555" v-model="configForm.postDestination">
            <el-checkbox label="GitHub_issue" name="type" size="large">
              <p class="flex">
                <div class="i-simple-icons-github mr-2" />GitHub Issue
              </p>
            </el-checkbox>
            <el-checkbox label="GitHub_discussion" name="type" size="large">
              <p class="flex">
                <div class="i-simple-icons-github mr-2" />GitHub Discussion
              </p>
            </el-checkbox>
            <el-checkbox label="Gitee_issue" name="type" size="large">
              <p class="flex">
                <div class="i-simple-icons-gitee mr-2" />Gitee Issue
              </p>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="flex justify-center">
          <el-button type="primary" size="large" round>
            <div class="i-carbon-launch mr-2" />Visit
          </el-button>
          <el-button size="large" round>
            <div class="i-carbon-copy mr-2" />Copy Link
          </el-button>
          <el-button type="danger" size="large" round>
            <div class="i-carbon-reset mr-2" />Rest
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
