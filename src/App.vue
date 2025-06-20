<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="bg-background h-screen w-screen flex flex-col text-white">
      <!-- <div class="border-b-2 border-primary h-16">
        <h1 class="text-2xl">Lulla</h1>
      </div> -->
      <!-- <nav>
        <RouterLink to="/"><p class="bg-red-500"> lulla</p>Home</RouterLink>
        <RouterLink to="/about"><p class="bg-primary text-background"> lulla</p>About</RouterLink>
      </nav> -->
      <!-- <RouterView /> -->
      <router-view v-slot="{ Component }"></router-view>
  </div>
</template>

<style scoped>
</style>
