import { useAxios } from '@/composables/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

export function useAuth() {
  const { $axios } = useAxios()
  const toast = useToast()

  const userStore = useUserStore()
  const { setUser } = userStore
  const router = useRouter()

  const isSendingVerifyEmail = ref(false)

  const loginForm = reactive({
    email: '',
    password: '',
    errors: {},
    loading: false,
  })

  const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: {},
    loading: false,
  })

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

  const logout = async () => {
    await $axios.post('api/logout').then(() => {
      setUser(null)

      toast.success('Logged out successfully!')

      router.push({ name: 'home' })
    })
  }

  const sendEmailVerificationNotification = async () => {
    isSendingVerifyEmail.value = true

    await $axios
      .post('api/email/verification-notification')
      .then(() => {
        toast.success('Email verification link sent to email!')
      })
      .finally(() => {
        isSendingVerifyEmail.value = false
      })
  }

  const verifyEmail = async (url) => {
    console.log('inside: ' + url)

    await $axios
      .get(url)
      .then(() => {
        toast.success('Email verified successfully!')

        if (userStore.isLoggedIn) {
          router.push({ name: 'home' })
        } else {
          router.push({ name: 'login' })
        }
      })
      .catch(() => {
        toast.error('Email verification failed!')
      })
  }

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

  return {
    forgotPasswordForm,
    resetPasswordForm,
    registerForm,
    loginForm,
    isSendingVerifyEmail,
    submitLogin,
    submitRegister,
    getUser,
    logout,
    verifyEmail,
    sendEmailVerificationNotification,
    submitForgotPassword,
    submitResetPassword,
  }
}
