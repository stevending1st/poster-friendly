<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';

const { updateTime, fileSize } = defineProps<{
  updateTime: string;
  fileSize: string;
}>();

const lastUpdated = useTimeAgo(new Date(updateTime));
</script>

<template>
  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-4 items-start">
    <div opacity="50">Last Changed</div>
    <div flex="~ gap-1 wrap">{{ lastUpdated }}</div>
  </div>

  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-4 items-start">
    <div opacity="50">File Size</div>
    <div flex="~ gap-1 wrap">{{ fileSize }}</div>
  </div>
</template>
