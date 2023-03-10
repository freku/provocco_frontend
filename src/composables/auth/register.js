import { useAxios } from '@/composables/axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthBasic } from '@/composables/auth/basic'

export function useAuthRegister() {
  const { getCsrf } = useAuthBasic()
  const { $axios } = useAxios()
  const toast = useToast()

  const router = useRouter()

  const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: {},
    loading: false,
  })

  const submitRegister = async () => {
    registerForm.loading = true

    await getCsrf().then(() => {
      $axios
        .post('api/register', {
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          password_confirmation: registerForm.password_confirmation,
        })
        .then(() => {
          router.push({ name: 'home' })

          toast.success('Registered successfully!')
        })
        .catch((error) => {
          registerForm.errors = error.response.data.errors
        })
        .finally(() => {
          registerForm.loading = false
        })
    })
  }

  return { registerForm, submitRegister }
}
