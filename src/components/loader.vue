<script setup lang="ts">
import { useStylesStore } from '@/stores/styles';
import { storeToRefs } from 'pinia';
const { loadingMessage } = storeToRefs(useStylesStore())
</script>
<template>
  <teleport to="body">
    <div v-if="loadingMessage" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div class=" p-6 rounded-lg shadow-xl text-center">
        <div class="w-12 h-12 border-[7px] border-white border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-white">{{ loadingMessage }}</p>
      </div>
    </div>
  </teleport>
</template>