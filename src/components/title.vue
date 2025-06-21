<script lang="ts" setup>
import { contentStore } from '@/stores/content'
import { storeToRefs } from 'pinia'
const { getContent } = contentStore()
const { content } = storeToRefs(contentStore())
</script>

<template>
  <div class="flex w-full items-center justify-between py-4">
    <div>
      <img class="h-[60px] object-contain" :src="content?.logo" alt="" />
    </div>
    <div class="p-2 font-serif grow">
      <p class="text-sm text-primary-foreground font-bold">{{ content?.title }}</p>
      <p class="text-xs">{{ content?.subTitle }}</p>
    </div>
    <div>
      <button
        @click.stop="getContent"
        class="text-primary uppercase font-bold py-2 px-3 bg-input border-2 border-primary rounded-full hover:scale-105"
      >
        refresh
      </button>
      <p class="capitalize text-[9px] text-center">in app purchases</p>
    </div>
  </div>
</template>
