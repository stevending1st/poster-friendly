<script setup lang="ts">
import yaml from 'yaml';
import { reactive, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { withBase } from 'vitepress';

import { ConfigFormType } from '../../utils/configForm';
import {
  resetForm,
  verify,
  getFormItemAndData,
  FormInfoType,
  FormDataType,
} from '../../utils/form';
import { getConfigFileData } from '../../utils/configFileURL';
import { defaultTemplateList } from '../../utils/templateList';

const copySuccessMsg = () =>
  ElMessage.success({
    message: 'Copy link successful!',
  });

const { copy, isSupported: isSupportedClipboard } = useClipboard();

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

const formInfo = ref<FormInfoType>({ name: '', description: '' });
const formRules = ref<FormRules>({});
const formData = ref<FormDataType>({});
const dialogFormVisible = ref(false);

const onChoicetTemplate = (url: string, configForm: ConfigFormType) =>
  (configForm.templateURL = url);

const onPreview = async (
  configurationFormRef: FormInstance | undefined,
  { templateURL }: ConfigFormType,
) => {
  try {
    await configurationFormRef?.validateField('templateURL');
    const content = await getConfigFileData(templateURL);
    const yamlData = yaml.parse(content || '');
    const [thisFormInfo, thisRules, thisData] = getFormItemAndData(yamlData);
    formInfo.value = thisFormInfo;
    formRules.value = thisRules;
    formData.value = thisData;
    dialogFormVisible.value = true;
  } catch (error: any) {
    console.error(`[Error]: Field validation error.`, error);
  }
};

const splicingURL = ({
  repoOwner,
  repoName,
  templateURL,
  postDestination,
}: ConfigFormType) => {
  const { origin } = location;
  const params = new URLSearchParams({
    owner: repoOwner,
    name: repoName,
    templateURL,
    postDestination: postDestination.join(','),
  }).toString();
  return `${origin}${withBase(`/poster/?${params}`)}`;
};

const onVisit = async (
  configurationFormRef: FormInstance | undefined,
  configForm: ConfigFormType,
) => {
  if (!(await verify(configurationFormRef))) return;
  const url = splicingURL(configForm);
  window?.open(url);
};

const onCopyLink = async (
  configurationFormRef: FormInstance | undefined,
  configForm: ConfigFormType,
) => {
  if (!(await verify(configurationFormRef))) return;
  const url = splicingURL(configForm);
  copy(url);
  copySuccessMsg();
};
</script>

<template>
  <div
    class="w-full px-5 mb-6 text-gray-500 flex flex-col items-center justify-center"
  >
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
      <el-form-item label="Recommendation Template" prop="changeTemplateURL">
        <el-select
          placeholder="You can choose the default template."
          class="w-full"
        >
          <el-option
            v-for="items of defaultTemplateList"
            :label="items.name"
            :value="items.url"
            @click="onChoicetTemplate(items.url, configForm)"
          />
        </el-select>
      </el-form-item>
      <div class="flex justify-start mb-5">
        <el-button
          type="primary"
          size="large"
          round
          @click="onPreview(configurationFormRef, configForm)"
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
          @click="onVisit(configurationFormRef, configForm)"
        >
          <div class="i-carbon-launch mr-2" />
          Visit
        </el-button>
        <el-button
          v-if="isSupportedClipboard"
          size="large"
          round
          @click="onCopyLink(configurationFormRef, configForm)"
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
  <el-dialog
    v-model="dialogFormVisible"
    title="Template Preview"
    fullscreen
    align-center
    center
  >
    <div class="flex justify-center">
      <div class="w-full sm:w-85% md:w-50%">
        <el-form
          :model="formData"
          :rules="formRules"
          size="large"
          label-position="top"
        >
          <render-form :formInfo="formInfo" :rules="formRules" :data="formData">
            <template v-slot:title>
              <el-form-item
                class="mt-6 mb-10!"
                label="Title"
                required
                prop="title"
              >
                <el-input v-model="formData.title" />
              </el-form-item>
            </template>
          </render-form>
        </el-form>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="danger"
          size="large"
          @click="() => (dialogFormVisible = false)"
          round
          >Colse</el-button
        >
      </span>
    </template>
  </el-dialog>
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

.el-dialog__body {
  display: flex !important;
}
</style>
