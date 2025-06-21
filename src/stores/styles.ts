import { ref, readonly} from 'vue'
import { defineStore } from 'pinia'

export const useStylesStore = defineStore('styles', () => {
  const loadingMessage = ref('')
  const setLoadingMessage = (message: string) => {
    loadingMessage.value = message
  }

  return {
    loadingMessage: readonly(loadingMessage), 
    setLoadingMessage 
  }
})
