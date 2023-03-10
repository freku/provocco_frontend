<script setup>
import { useAuthPassword } from '@/composables/auth/password'
import Button from '@/components/basic/Button.vue'
import Input from '@/components/basic/Input.vue'

const { submitForgotPassword, forgotPasswordForm } = useAuthPassword()
</script>

<template>
  <form
    @submit.prevent="submitForgotPassword"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
  >
    <Input
      class="mb-4"
      label="Email"
      type="email"
      v-model="forgotPasswordForm.email"
      placeholder="Email"
      :errors="forgotPasswordForm.errors?.email"
      @update:modelValue="forgotPasswordForm.errors.email = []"
    />

    <div class="flex justify-center">
      <Button type="submit" :loading="forgotPasswordForm.loading"> Send </Button>
    </div>
  </form>
</template>
