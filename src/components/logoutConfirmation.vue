<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter()
const { logout, toggleLogoutConfirmationDialog } = useUserStore()
const logoutConfirmed = () => {
  logout()
  router.push('/login')
}
</script>
<template>
  <teleport to="body">
    <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 sm:p-0">
      <div class="p-6 rounded-lg shadow-xl text-center bg-secondary w-full sm:w-[450px] flex flex-col gap-5">
        <div class="text-2xl font-extrabold uppercase text-primary">logout confirmation</div>
        <div class="text-white">Are you sure you you want to log out?</div>
        <button @click = "logoutConfirmed" class="w-full py-3 border-2 border-primary rounded-lg text-primary uppercase font-bold">logout</button>
        <button @click="toggleLogoutConfirmationDialog(false)" class="w-full uppercase py-3 bg-primary text-backgound font-bold rounded-lg">cancel</button>
      </div>
    </div>
  </teleport>
</template>
