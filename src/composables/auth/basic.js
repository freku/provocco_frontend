import { useAxios } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

export function useAuthBasic() {
  const { $axios } = useAxios()
  const toast = useToast()

  const { setUser } = useUserStore()
  const router = useRouter()

  const getCsrf = async () => {
    return await $axios.get('sanctum/csrf-cookie')
  }

  const getUser = async () => {
    return await $axios
      .get('api/user')
      .then((response) => {
        setUser(response.data)
      })
      .catch(() => {})
  }

  const logout = async () => {
    await $axios.post('api/logout').then(() => {
      setUser(null)

      toast.success('Logged out successfully!')

      router.push({ name: 'home' })
    })
  }

  return {
    logout,
    getUser,
    getCsrf,
  }
}
