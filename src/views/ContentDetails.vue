<script setup lang="ts">
import Title from '@/components/title.vue'
import { onMounted } from 'vue';
import { contentStore } from '@/stores/content';
import { storeToRefs } from 'pinia';
import {ArrowUp, X} from "lucide-vue-next";
import { useRouter } from 'vue-router';
import { useStylesStore } from '@/stores/styles'
const { setLoadingMessage }  = useStylesStore()

const router = useRouter()
const { content } = storeToRefs(contentStore())
const { getContent } = contentStore()
onMounted(async () => {
  if(!content.value)
  await getContent()
})

const refetchContent = async () => {
  setLoadingMessage('Refetching Content')
  await getContent()
  setLoadingMessage('')
}
</script>
<template>
  <div class="flex justify-center">
    <div class="relative w-full flex flex-col max-w-[700px] justify-center bg-secondary">
      <div class="absolute flex rounded-full   z-10 right-0 w-full justify-between top-4 ">
        <div class="ml-4">
          <div class="uppercase font-bold text-lg text-accent">
            major update
          </div>
          <div class="capitalize font-bold text-2xl mt-2">
            Only I can call my dream stupid!
          </div>
        </div>
        <div>
          <button @click="router.push('/')" class="bg-primary rounded-full p-2 text-background"><X :stroke-width="3"/></button>
        </div>
      </div>  
      <img class=" h-[450px] sm:h-[600px] object-contain" :src="content?.mainImage" alt="">
      <div class="px-2">
        <Title />
      </div>
      <hr>
      <div class="text-sm p-2" v-html="content?.text"></div>
      <img class="object-contain h-[450px] sm:h-[600px]" :src="content?.thumbNailImage" alt="">
      <div class="my-2 p-3 flex flex-col items-center gap-2 bg-background">
        <div>
          <img class="h-[60px] object-contain" :src="content?.logo" alt="" />
        </div>
        <div class="p-2 grow">
          <p class="text-sm text-primary-foreground font-bold text-center">{{ content?.title }}</p>
          <p class="text-xs">{{ content?.subTitle }}</p>
        </div>
        <div>
          <button @click.stop="refetchContent"
            class="uppercase font-bold py-2 px-3 bg-primary rounded-full hover:scale-105 text-background">
            refresh
          </button>
          <p class="capitalize text-[9px] text-center">in app purchases</p>
        </div>
      </div>
      <div class="py-10 w-full flex justify-center">
        <button class="bg-input text-primary rounded-lg px-10 py-3 font-bold uppercase">
          <ArrowUp :size="20" class="inline"/> Share Story
        </button>
      </div>
    </div>
  </div>
</template>