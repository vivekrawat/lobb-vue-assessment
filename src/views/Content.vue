<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { contentStore } from '../stores/content';
import { dates } from '@/Composables/dates'
import Title from '@/components/title.vue';
import router from '@/router';

const {dayName, dayNumber, monthName} = dates()
const { getContent } = contentStore()
const { content } = storeToRefs(contentStore())
onMounted(async () => {
  await getContent()
})
const getNameLetters = computed(() => {
  return content.value?.userName.split(' ').map(item => item[0]).join('')
})
const toDetails = () => {
  router.push('/details')
}
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
        <img @click="toDetails" class="cursor-pointer h-[450px] sm:h-[600px]" :src="content?.mainImage" alt="">
        <Title/>
      </div>
  </div>

</template>