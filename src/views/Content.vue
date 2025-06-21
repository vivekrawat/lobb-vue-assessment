<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { contentStore } from '../stores/content';
import { dates } from '@/Composables/dates'

const {dayName, dayNumber, monthName} = dates()
const { getContent } = contentStore()
const { content } = storeToRefs(contentStore())
onMounted(async () => {
  await getContent()
})
const getNameLetters = computed(() => {
  return content.value?.userName.split(' ').map(item => item[0]).join('')
})
</script>
<template>
  <div class="w-screen h-screen flex justify-center">
    <div class="w-full h-screen sm:h-[90vh] my-auto max-w-[700px] p-3 flex flex-col justify-between items-center bg-secondary rounded-lg">
        <div class="w-full uppercase font-extrabold">{{ dayName + ' ' + dayNumber + ' ' + monthName }}</div>
        <div class="my-2 w-full flex flex-row justify-between items-center">
          <div class="text-3xl font-extrabold font-serif">
            Today
          </div>
          <div>
            <button class="inline-block text-xl font-bold uppercase rounded-full px-3 py-2 bg-primary text-background">
              {{ getNameLetters }}
            </button>
          </div>
        </div>
        <img class="h-[450px] sm:h-[600px]" :src="content?.mainImage" alt="">
        <div class="flex w-full items-center justify-between py-4">
          <div>
            <img class="h-[60px] object-contain" :src="content?.logo" alt="">
          </div>
          <div class="p-2 font-serif grow">
            <p class="text-sm text-primary-foreground font-bold">{{content?.title}}</p>
            <p class="text-xs">{{content?.subTitle}}</p>
          </div>
          <div>
            <button @click.stop="getContent" class="text-primary uppercase font-bold py-2 px-3 bg-input border-2 border-primary rounded-full hover:scale-105">
              refresh
            </button>
            <p class="capitalize text-[9px] text-center">in app purchases</p>
          </div>
        </div>
      </div>
  </div>

</template>