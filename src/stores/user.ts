import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import { type Login } from '@/models/loginSchema'

const authUrl = import.meta.env.VITE_AUTH_URL

type Response = {
  token: string
}
export const useUserStore = defineStore('user', () => {
  const user = ref()
  const logoutConfirmationDialog = ref(false)
  const getToken = async (data: Login) => {
    try {
      const res = await fetch(authUrl + 'generateToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
      // console.log(response)
      const response = await res.json()
      // console.log(response)
      if('token' in response && typeof response['token'] === 'string') {
        sessionStorage.setItem('token', response.token)
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
  const toggleLogoutConfirmationDialog = (val: boolean) => {
    logoutConfirmationDialog.value = val
  }
  const logout = () => {
    toggleLogoutConfirmationDialog(false)
    sessionStorage.removeItem('token')
  }
  return {
    getToken,
    toggleLogoutConfirmationDialog,
    logoutConfirmationDialog,
    logout
  }
})
