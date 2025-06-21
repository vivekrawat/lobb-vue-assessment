<script setup lang="ts">
import Title from '@/components/title.vue'
import { contentStore } from '@/stores/content';
import { storeToRefs } from 'pinia';
const { content } = storeToRefs(contentStore())
const { getContent } = contentStore()
</script>
<template>
  <div class="flex justify-center">
    <div class="w-full flex flex-col max-w-[700px] justify-center">
      <img class="cursor-pointer h-[450px] sm:h-[600px]" :src="content?.mainImage" alt="">
      <div class="px-2">
        <Title />
      </div>
      <hr>
      <div class="text-sm p-2" v-html="content?.text"></div>
      <img class="cursor-pointer h-[450px] sm:h-[600px]" :src="content?.thumbNailImage" alt="">
      <div class="my-2 p-3 flex flex-col items-center gap-2">
        <div>
          <img class="h-[60px] object-contain" :src="content?.logo" alt="" />
        </div>
        <div class="p-2 font-serif grow">
          <p class="text-sm text-primary-foreground font-bold text-center">{{ content?.title }}</p>
          <p class="text-xs">{{ content?.subTitle }}</p>
        </div>
        <div>
          <button @click.stop="getContent"
            class="uppercase font-bold py-2 px-3 bg-primary rounded-full hover:scale-105 text-background">
            refresh
          </button>
          <p class="capitalize text-[9px] text-center">in app purchases</p>
        </div>
      </div>
    </div>
  </div>
</template>