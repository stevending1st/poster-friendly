<template>
  <el-header class="w-full row-bg">
    <el-row class="row-bg h-full" justify="space-between">
      <el-col :span="6" class="h-full flex items-center justify-start">
        <a
          :href="`https://github.com/${owner}/${name}`"
          class="mr-2"
          v-if="hasGitHub"
        >
          <div
            class="i-simple-icons-github pl-.5 color-blanck dark:color-white text-size-8"
          />
        </a>
        <a :href="`https://gitee.com/${owner}/${name}`" v-if="hasGitee">
          <div
            class="i-simple-icons-gitee pl-.5 color-blanck dark:color-white text-size-8"
          />
        </a>
      </el-col>
      <el-col :span="3" class="h-full flex items-center justify-end">
        <button @click="toggleDark()">
          <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
import { useToggle, useDark } from '@vueuse/core';

const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
});
const toggleDark = useToggle(isDark);

const { hasGitHub, hasGitee, owner, name } = defineProps<{
  hasGitHub?: boolean;
  hasGitee?: boolean;
  owner: string;
  name: string;
}>();
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
