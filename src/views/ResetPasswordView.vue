<script setup>
import { useAuthPassword } from '@/composables/auth/password'
import Button from '@/components/basic/Button.vue'
import Input from '@/components/basic/Input.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { resetPasswordForm, submitResetPassword } = useAuthPassword()

watch(
  () => route.query.token,
  () => {
    resetPasswordForm.token = route.query.token
  },
  { immediate: true },
)
</script>

<template>
  <form
    @submit.prevent="submitResetPassword"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
  >
    <Input
      class="mb-4"
      label="Email"
      type="email"
      v-model="resetPasswordForm.email"
      placeholder="Email"
      :errors="resetPasswordForm.errors?.email"
      @update:modelValue="resetPasswordForm.errors.email = []"
    />
    <Input
      class="mb-4"
      label="Password"
      type="password"
      v-model="resetPasswordForm.password"
      placeholder="Password"
      :errors="resetPasswordForm.errors?.password"
      @update:modelValue="resetPasswordForm.errors.password = []"
    />
    <Input
      class="mb-4"
      label="Confirm Password"
      type="password"
      v-model="resetPasswordForm.password_confirmation"
      placeholder="Confirm Password"
      :errors="resetPasswordForm.errors?.password_confirmation"
      @update:modelValue="resetPasswordForm.errors.password_confirmation = []"
    />

    <div class="flex justify-center">
      <Button type="submit" :loading="resetPasswordForm.loading"> Submit </Button>
    </div>
  </form>
</template>
