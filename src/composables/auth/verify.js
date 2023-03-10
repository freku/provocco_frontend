import { useAxios } from '@/composables/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

export function useAuthVerify() {
  const { $axios } = useAxios()
  const toast = useToast()

  const userStore = useUserStore()
  const router = useRouter()

  const isSendingVerifyEmail = ref(false)

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

  return {
    isSendingVerifyEmail,
    sendEmailVerificationNotification,
    verifyEmail,
  }
}
