<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';

const GitHubRepoURL =
  'https://github.com/stevending1st/poster-friendly/blob/main/';
const GiteeRepoURL =
  'https://gitee.com/stevending1st/poster-friendly/blob/main/';

const { updateTime, fileSize, relativeRoute } = defineProps<{
  updateTime: string;
  fileSize: string;
  relativeRoute: string;
}>();

const configFileGitHubURL = relativeRoute
  ? GitHubRepoURL + relativeRoute
  : undefined;
const configFileGiteeURL = undefined; //relativeRoute ? GiteeRepoURL + relativeRoute : undefined;
const lastUpdated = useTimeAgo(new Date(updateTime));
</script>

<template>
  <Teleport to="body">
    <div class="grid grid-cols-[100px_auto] gap-2 text-sm my-4 items-start">
      <div opacity="50">Last Changed</div>
      <div flex="~ gap-1 wrap">{{ lastUpdated }}</div>
    </div>

    <div
      class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-4 items-start"
    >
      <div opacity="50">File Size</div>
      <div flex="~ gap-1 wrap">{{ fileSize }}</div>
    </div>

    <div
      class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-4 items-start"
    >
      <div opacity="50">GitHub URL</div>
      <div flex="~ gap-1 wrap">
        {{ configFileGitHubURL }}
      </div>
    </div>

    <div
      class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-4 items-start"
      v-if="configFileGiteeURL"
    >
      <div opacity="50">Gitee URL</div>
      <div flex="~ gap-1 wrap">
        {{ configFileGiteeURL }}
      </div>
    </div>
  </Teleport>
</template>
