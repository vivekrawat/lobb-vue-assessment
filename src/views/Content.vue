<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useContentStore } from '../stores/content';
import { dates } from '@/Composables/useDates'
import Title from '@/components/title.vue';
import router from '@/router';
import { useStylesStore } from '@/stores/styles'
import LogoutConfirmation from '@/components/LogoutConfirmation.vue';
import { useUserStore } from '@/stores/user';

const { logoutConfirmationDialog } = storeToRefs(useUserStore())
const { toggleLogoutConfirmationDialog } = useUserStore()
const { setLoadingMessage }  = useStylesStore()

const {dayName, dayNumber, monthName} = dates()
const { getContent } = useContentStore()
const { content } = storeToRefs(useContentStore())

onMounted(async () => {
  setLoadingMessage('Fetching Content')
  if(!content.value)
  await getContent()
  setLoadingMessage('')
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
            <button @click="toggleLogoutConfirmationDialog(true)" class="inline-block text-xl font-bold uppercase rounded-full px-3 py-2 bg-primary text-background">
              {{ getNameLetters }}
            </button>
            <div v-if="logoutConfirmationDialog">
              <LogoutConfirmation/>
            </div>
          </div>
        </div>
        <img @click.stop="toDetails" class="cursor-pointer h-[450px] sm:h-[600px]" :src="content?.mainImage" alt="">
        <Title/>
      </div>
  </div>

</template>