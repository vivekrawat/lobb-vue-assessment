<script lang="ts" setup>
  import { X } from "lucide-vue-next"
  import { storeToRefs } from "pinia"
  import { useStylesStore } from '../stores/styles'
  const { setToastDetails, resetToastDetails } = useStylesStore()
  const { toastDetails } = storeToRefs(useStylesStore())
</script>
<template>
  <div v-if="toastDetails" :class="`${toastDetails?.type === 'error' ? 'bg-destructive' : 'bg-primary text-background'}`" class="absolute bottom-3 right-3 w-[350px] flex flex-col  rounded-lg px-4 py-3">
    <button @click="resetToastDetails()" class="absolute top-2 right-2"><X :stroke-width="3"/></button>
    <div class="text-lg font-bold upppercase">{{toastDetails?.title}}</div>
    <div class="capitalize text-sm">
      {{toastDetails?.description}}
    </div>
  </div>
</template>
