<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Loader from './components/loader.vue';
</script>

<template>
  <div class="bg-background h-screen w-screen flex flex-col text-white overflow-y-auto">
    <Loader/>
    <router-view v-slot="{ Component }"></router-view>
  </div>
</template>

<style scoped>
</style>
