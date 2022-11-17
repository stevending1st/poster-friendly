<script setup lang="ts">
import yaml from "yaml";

import Header from "../components/Header.vue";
import RenderForm from "../components/RenderForm.vue";
import { ymldata } from "../test/fromdata";
import { getFormItemAndData } from "../utils/form";

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


const formData = yaml.parse(ymldata);
const [formInfo, rules, data] = getFormItemAndData(formData);

</script>

<template>
  <el-container class="w-full" direction="vertical">
    <Header></Header>
    <main class="p-0">
      <div class="bg-blue h-50 py-5">
        <h2 class="text-size-5xl text-center mb-5">
          Poster Friendly
        </h2>
        <p class="text-center text-size-20px pb-10 my-0">
          A complete solution for GitHub (Gitee) Issue and Discussion templates.
        </p>
      </div>

      <div class="bg-orange py-5 block px-10px xs:px-20px sm:px-30px md:flex md:flex-col md:items-center" id="features">
        <h2 class="text-size-3xl text-start">
          Poster Friendly will help you:
        </h2>

        <ul class="list-none pl-0">
          <li class="flex items-center mb-10" v-for="(featuresItems, index) in featuresContent" :key="index">
            <div :class="`${featuresItems.icon} text-size-8 mr-2`" />
            <div class="flex-1">
              <p class="text-size-2xl p-0 m-0">
                {{featuresItems.text}}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-yellow h-240 flex px-30px xs:px-30px sm:px-40px md:flex md:flex-col md:items-center" id="features">
        <RenderForm :formInfo="formInfo" :rules="rules" :data="data" />
      </div>
    </main>
  </el-container>
</template>

<style scoped>
</style>
