<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import yaml from "yaml";

import RenderForm from "../components/RenderForm.vue";
import Form from "../components/Form.vue";
import { ymldata } from '../test/fromdata';
import { getConfigFileData } from '../utils/configFileURL';
import { PostDestinationEnum } from "../utils/platform";
import { generatePostData } from '../utils/postData';
import { FormDataType, FormInfoType, verify, getFormItemAndData } from '../utils/form';
import CreateButton from '../components/CreateButton.vue';

const loading = ref<boolean>(false);
const info = ref<FormInfoType>({ name: "", description: "" });
const rules = ref<FormRules>({});
const data = ref<FormDataType>({});

const { query } = useRoute();
const { postDestination, owner, name, templateURL } = query;

const getyaml = async () => {
  loading.value = true;
  if (templateURL) {
    console.log("templateURL as string:", templateURL as string)
    // const content = await getConfigFileData(templateURL as string);
    // const formData = yaml.parse(content || '');
    const formData = yaml.parse(ymldata);
    const [thisFormInfo, thisRules, thisData] = getFormItemAndData(formData);
    console.log("getyaml:", thisFormInfo, thisRules, thisData)
    info.value = thisFormInfo;
    rules.value = thisRules;
    data.value = thisData;
  }
  loading.value = false;
}

const postDestinationArr = (postDestination as string).split(",");
const btnArr = postDestinationArr.map(items => items == PostDestinationEnum.GITEE_ISSUE ? PostDestinationEnum.GITEE_ISSUE : items == PostDestinationEnum.GITHUB_DISCUSSION ? PostDestinationEnum.GITHUB_DISCUSSION : PostDestinationEnum.GITHUB_ISSUE);

watchEffect(getyaml);

const formRef = ref<FormInstance>();

const post = async ( postDestination: PostDestinationEnum, info: FormInfoType, data: any, ref: FormInstance | undefined)  => {
  if (!await verify(ref)) return;
  const title = data.title;
  const bodyText = generatePostData(info, data);
}

console.log(query, postDestination, owner, name, templateURL);
console.log("****>", info, rules, data);
</script>

<template>
  <div class="w-full flex justify-center">
    <div v-if="!loading" class="w-95% sm:w-85% md:w-50%">
      <h1 class="break-all">
        <a :href="`https://github.com/${owner}/${name}`" target="_blank">
          {{ owner }}/{{ name }}
        </a>
      </h1>
      <el-form ref="formRef" :model="data" :rules="rules" size="large" label-position="top">
        <RenderForm :formInfo="info" :rules="rules" :data="data">
          <template v-slot:title>
            <el-form-item class="mt-6 mb-10!" label="Title" required prop="title">
              <el-input v-model="data.title"/>
            </el-form-item>
          </template>
        </RenderForm>

        <el-row>
          <el-col class="mb-3" v-for="items of btnArr">
            <CreateButton :postDestination="items" @create="post(items, info, data, formRef)" />
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
