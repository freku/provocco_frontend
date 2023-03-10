import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useToast } from 'vue-toastification'

export function useAxios() {
  const toast = useToast()

  const $axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

  $axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === StatusCodes.TOO_MANY_REQUESTS) {
      toast.warning('You sent too many requests. Please try again later.')
    }

    throw error
  })

  return {
    $axios,
  }
}
