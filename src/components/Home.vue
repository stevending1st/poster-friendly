<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>Home</h1>

  <h2>{{ msg }}</h2>

  <div class="card">
    <el-button @click="count++">count is {{ count }}</el-button>
  </div>
</template>

<style scoped>
</style>
