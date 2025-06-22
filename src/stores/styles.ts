import { ref, readonly} from 'vue'
import { defineStore } from 'pinia'


type ToastDetails = {
  title: string,
  description: string,
  type: 'success'|'error'
}
export const useStylesStore = defineStore('styles', () => {
  const loadingMessage = ref('')

  const toastDetails = ref()
  const setLoadingMessage = (message: string) => {
    loadingMessage.value = message
  }

  const resetToastDetails = () => {
    toastDetails.value = undefined
  }
  const setToastDetails = (details: ToastDetails) => {
    toastDetails.value = details
    setTimeout(() => {
      resetToastDetails()
    }, 3000)
  }
  
  return {
    loadingMessage: readonly(loadingMessage), 
    setLoadingMessage ,
    setToastDetails,
    resetToastDetails,
    toastDetails: readonly(toastDetails)
  }
})
