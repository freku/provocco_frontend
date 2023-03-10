import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const isLoggedIn = computed(() => user.value !== null)

  function setUser(userObject) {
    user.value = userObject
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isLoggedIn,
    logout,
    setUser,
  }
})
