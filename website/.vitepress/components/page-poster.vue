<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { ref, watchEffect } from 'vue';
import yaml from 'yaml';

import { ymldata } from '../test/fromdata';
import { PostDestinationEnum } from '../utils/platform';
import {
  generateBodyData,
  generateGiteeIssueURL,
  generateGitHubDiscussionURL,
  generateGitHubIssueURL,
} from '../utils/postData';
import {
  FormDataType,
  FormInfoType,
  verify,
  getFormItemAndData,
} from '../utils/form';
import { PosterPageProp } from '../utils/posterPage';

const loading = ref<boolean>(false);
const info = ref<FormInfoType>({ name: '', description: '' });
const rules = ref<FormRules>({});
const data = ref<FormDataType>({});

// const { query } = useRoute();
const { href, search } = location;
const searchParams = new URLSearchParams(search);
let query: PosterPageProp = {};
searchParams.forEach((value, key) => (query = { ...query, [key]: value }));
const {
  postDestination,
  owner,
  name,
  templateURL,
  category,
  labels,
  assignees,
} = query;

const getyaml = async () => {
  loading.value = true;
  if (templateURL) {
    console.log('templateURL as string:', templateURL as string);
    // const content = await getConfigFileData(templateURL as string);
    // const formData = yaml.parse(content || '');
    const formData = yaml.parse(ymldata);
    const [thisFormInfo, thisRules, thisData] = getFormItemAndData(formData);
    console.log('getyaml:', thisFormInfo, thisRules, thisData);
    info.value = thisFormInfo;
    rules.value = thisRules;
    data.value = thisData;
  }
  loading.value = false;
};

const postDestinationArr = (postDestination as string).split(',');
const btnArr = postDestinationArr.map(items =>
  items == PostDestinationEnum.GITEE_ISSUE
    ? PostDestinationEnum.GITEE_ISSUE
    : items == PostDestinationEnum.GITHUB_DISCUSSION
    ? PostDestinationEnum.GITHUB_DISCUSSION
    : PostDestinationEnum.GITHUB_ISSUE,
);

watchEffect(getyaml);

const formRef = ref<FormInstance>();

const isPreview = ref(false);
const body = ref<string>('');

const post = async (
  postDestination: PostDestinationEnum,
  info: FormInfoType,
  data: FormDataType,
  ref: FormInstance | undefined,
) => {
  if (!(await verify(ref))) return;
  const title = data.title as string;
  const postMeta = {
    owner: owner as string,
    name: name as string,
    title,
    body: body.value,
    labels: labels as string,
    assignees: assignees as string,
    category: category as string,
  };
  console.log(
    'postMeta:',
    postMeta,
    postDestination == PostDestinationEnum.GITEE_ISSUE,
    postDestination == PostDestinationEnum.GITHUB_ISSUE,
  );
  const url = (
    postDestination === PostDestinationEnum.GITHUB_ISSUE
      ? generateGitHubIssueURL
      : postDestination === PostDestinationEnum.GITHUB_DISCUSSION
      ? generateGitHubDiscussionURL
      : generateGiteeIssueURL
  )(postMeta);
  window.open(url);
};

const preview = async (ref: FormInstance | undefined) => {
  if (!(await verify(ref))) return;
  body.value = generateBodyData(info.value, data.value);
  isPreview.value = true;
};
</script>

<template>
  <div class="w-full flex justify-center">
    <div v-if="!loading" class="w-95% sm:w-85% md:w-50%">
      <h1 class="break-all mt-10">
        <a :href="`https://github.com/${owner}/${name}`" target="_blank">
          {{ owner }}/{{ name }}
        </a>
      </h1>
      <el-form
        class="mb-10"
        ref="formRef"
        :model="data"
        :rules="rules"
        size="large"
        label-position="top"
      >
        <RenderForm :formInfo="info" :rules="rules" :data="data">
          <template v-slot:title>
            <el-form-item
              class="mt-6 mb-10!"
              label="Title"
              required
              prop="title"
            >
              <el-input v-model="data.title" />
            </el-form-item>
          </template>
        </RenderForm>
        <el-row>
          <el-col class="mb-3">
            <el-button
              type="primary"
              size="large"
              class="w-full"
              round
              @Click="preview(formRef)"
            >
              <div :class="`i-carbon-view mr-2`" />
              Preview
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <el-dialog title="Preview" v-model="isPreview">
    <preview-com :body="body" :title="data.title" />
    <el-row>
      <el-col class="mb-3" v-for="items of btnArr" :key="items">
        <create-button
          :postDestination="items"
          @create="post(items, info, data, formRef)"
        />
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style scoped></style>
