<script setup>
import { useUserStore } from '@/stores/user'
import { useAuthVerify } from '@/composables/auth/verify'

const userStore = useUserStore()
const { sendEmailVerificationNotification, isSendingVerifyEmail } = useAuthVerify()

function sendEmailVerification() {
  return !isSendingVerifyEmail.value ? sendEmailVerificationNotification() : undefined
}
</script>

<template>
  <div v-if="!userStore.isLoggedIn">
    <p>Loading...</p>
  </div>
  <div v-else>
    <div class="flex justify-center">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <p class="text-gray-700 text-sm font-medium">{{ userStore.user.name }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
          <p class="text-gray-700 text-sm font-medium">{{ userStore.user.email }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Email verification status
          </label>
          <p class="text-gray-700 text-sm font-medium">
            {{ userStore.user.email_verified_at ? 'Verified' : 'Not verified' }}
          </p>
        </div>

        <div class="mb-4" v-if="!userStore.user.email_verified_at">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Email verification re-send
          </label>
          <a
            @click="sendEmailVerification"
            class="text-blue-400 text-sm font-medium underline"
            :class="{
              'opacity-50 cursor-not-allowed': isSendingVerifyEmail,
              'cursor-pointer': !isSendingVerifyEmail,
            }"
            >Send email with link</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
