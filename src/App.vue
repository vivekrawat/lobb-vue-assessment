<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-background h-screen w-screen flex flex-col text-white">
      <router-view v-slot="{ Component }"></router-view>
  </div>
</template>

<style scoped>
</style>
