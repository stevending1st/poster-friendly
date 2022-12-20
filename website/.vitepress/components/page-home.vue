<script setup lang="ts">
const workInProgressContent = [
  {
    icon: 'i-carbon-tablet-landscape',
    text: 'Editor-friendly playground.',
  },
  {
    icon: 'i-carbon-template',
    text: 'More common public templates.',
  },
];
</script>

<template>
  <el-container class="w-full" direction="vertical">
    <main class="p-0">
      <div
        class="flex flex-col items-center px-30px sm:px-40px py-20"
        id="config-form"
      >
        <h2 class="text-size-3xl text-start">Create your templates now:</h2>
        <p class="text-start">You just need to fill out a form!</p>

        <div class="py-5 w-full sm:w-85% md:w-70% lg:w-50%">
          <configuration-form />
        </div>
      </div>

      <div
        class="py-3 block px-10px xs:px-20px sm:px-30px md:flex md:flex-col md:items-center"
        id="work-in-progress"
      >
        <h2 class="text-size-3xl text-start mb-3">🚧 Work in progress</h2>

        <ul class="list-none pl-0">
          <li
            class="flex items-center mb-10"
            v-for="(featuresItems, index) in workInProgressContent"
            :key="index"
          >
            <div :class="`${featuresItems.icon} text-size-8 mr-2`" />
            <div class="flex-1">
              <p class="text-size-2xl p-0 m-0">
                {{ featuresItems.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </el-container>
</template>
