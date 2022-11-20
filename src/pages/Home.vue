<script setup lang="ts">
import yaml from "yaml";
import { ref } from "vue";

import Header from "../components/Header.vue";
import RenderForm from "../components/RenderForm.vue";
import CondigurationForm from "../components/ConfigurationForm.vue";
import { FormDataType, FormInfoType, getFormItemAndData } from "../utils/form";
import { ConfigFormType } from "../utils/configForm";
import { ElContainer, ElDialog, ElButton, FormRules } from "element-plus";
import { getConfigFileData } from "../utils/configFileURL";

const featuresContent = [
  {
    icon: "i-carbon-flash",
    text: "Quickly create Issue and Discussion templates and render them on the web.",
  },
  {
    icon: "i-carbon-friendship",
    text: "Create Issues and Discussions by filling out forms, which is user-friendly.",
  },
  {
    icon: "i-carbon-copy-file",
    text: "More templates are available to make it easier to create Issue and Discussion templates.",
  }
]

const formInfo = ref<FormInfoType>({ name: "", description: "" });
const formRules = ref<FormRules>({});
const formData = ref<FormDataType>({});
const dialogFormVisible = ref(false);

const onPreview = async ({ templateURL }: ConfigFormType) => {
  console.log("templateURL:", templateURL)
  const content = await getConfigFileData(templateURL);
  const formData = yaml.parse(content || '');
  const [thisFormInfo, thisRules, thisData] = getFormItemAndData(formData);
  formInfo.value = thisFormInfo;
  formRules.value = thisRules;
  formData.value = thisData;
  dialogFormVisible.value = true;
}

</script>

<template>
  <el-container class="w-full" direction="vertical">
    <Header />
    <main class="p-0">
      <div class="bg-blue h-50 py-20">
        <h2 class="text-size-5xl text-center mb-5">
          Poster Friendly
        </h2>
        <p class="text-center text-size-20px pb-10 my-0">
          A complete solution for GitHub (Gitee) Issue and Discussion templates.
        </p>
      </div>

      <div class="bg-orange py-20 block px-10px xs:px-20px sm:px-30px md:flex md:flex-col md:items-center"
        id="features">
        <h2 class="text-size-3xl text-start">
          Poster Friendly will help you:
        </h2>

        <ul class="list-none pl-0">
          <li class="flex items-center mb-10" v-for="(featuresItems, index) in featuresContent" :key="index">
            <div :class="`${featuresItems.icon} text-size-8 mr-2`" />
            <div class="flex-1">
              <p class="text-size-2xl p-0 m-0">
                {{ featuresItems.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-yellow flex flex-col items-center px-30px sm:px-40px py-20" id="features">
        <h2 class="text-size-3xl text-start">Create your templates now:</h2>
        <p class="text-start">You just need to fill out a form!</p>

        <CondigurationForm @onPreview="onPreview" />
      </div>
    </main>
  </el-container>
  <el-dialog v-model="dialogFormVisible" title="Template Preview" fullscreen align-center="true" center>
    <div class="flex justify-center">
      <div class=" w-full sm:w-85% md:w-50%">
        <RenderForm :formInfo="formInfo" :rules="formRules" :data="formData" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" size="large" @click="() => dialogFormVisible = false" round>Colse</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-dialog__body {
  display: flex !important;
  /* items-center: center; */
}
</style>
