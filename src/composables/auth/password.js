import { useAxios } from '@/composables/axios'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthBasic } from '@/composables/auth/basic'

export function useAuthPassword() {
  const { getCsrf } = useAuthBasic()
  const { $axios } = useAxios()
  const toast = useToast()

  const router = useRouter()

  const forgotPasswordForm = reactive({
    email: '',
    errors: {},
    loading: false,
  })

  const resetPasswordForm = reactive({
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
    errors: {},
    loading: false,
  })

  const submitForgotPassword = async () => {
    forgotPasswordForm.loading = true

    await getCsrf().then(() => {
      $axios
        .post('api/forgot-password', {
          email: forgotPasswordForm.email,
        })
        .then(() => {
          toast.success('Password reset link sent to email!')
        })
        .catch((error) => {
          forgotPasswordForm.errors = error.response.data.errors
        })
        .finally(() => {
          forgotPasswordForm.loading = false
        })
    })
  }

  const submitResetPassword = async () => {
    resetPasswordForm.loading = true

    await getCsrf().then(() => {
      $axios
        .post('api/reset-password', {
          token: resetPasswordForm.token,
          email: resetPasswordForm.email,
          password: resetPasswordForm.password,
          password_confirmation: resetPasswordForm.password_confirmation,
        })
        .then(() => {
          toast.success('Password reset successfull!')

          router.push({ name: 'login' })
        })
        .catch((error) => {
          resetPasswordForm.errors = error.response.data.errors
        })
        .finally(() => {
          resetPasswordForm.loading = false
        })
    })
  }

  return { submitForgotPassword, submitResetPassword, forgotPasswordForm, resetPasswordForm }
}
