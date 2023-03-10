import { useAxios } from '@/composables/axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthBasic } from '@/composables/auth/basic'

export function useAuthLogin() {
  const { getCsrf } = useAuthBasic()
  const { $axios } = useAxios()
  const toast = useToast()

  const router = useRouter()

  const loginForm = reactive({
    email: '',
    password: '',
    errors: {},
    loading: false,
  })

  const submitLogin = async () => {
    loginForm.loading = true

    await getCsrf().then(() => {
      $axios
        .post('api/login', {
          email: loginForm.email,
          password: loginForm.password,
        })
        .then(() => {
          router.push({ name: 'home' })

          toast.success('Logged in successfully!')
        })
        .catch((error) => {
          loginForm.errors = error.response.data.errors
        })
        .finally(() => {
          loginForm.loading = false
        })
    })
  }

  return { submitLogin, loginForm }
}
