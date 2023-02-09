<script setup lang="ts">
import showdown from 'showdown';
import 'github-markdown-css';

const { title, body } = defineProps<{
  title?: string;
  body: string;
}>();

showdown.setOption('tasklists', true);
const converter = new showdown.Converter();
</script>

<template>
  <h1 v-if="!!title">{{ title }}</h1>
  <div class="markdown-body mb-5" v-html="converter.makeHtml(body)" />
</template>

<style scoped>
.markdown-body {
  word-break: break-word !important;
  background-color: inherit !important;
  color: inherit !important;
}
</style>
