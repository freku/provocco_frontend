<script setup>
import { useAuth } from '@/composables/auth'
import Button from '@/components/basic/Button.vue'
import Input from '@/components/basic/Input.vue'

const { submitLogin, loginForm } = useAuth()
</script>

<template>
  <form @submit.prevent="submitLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
    <Input
      class="mb-4"
      label="Email"
      type="text"
      v-model="loginForm.email"
      placeholder="Email"
      :errors="loginForm.errors?.email"
      @update:modelValue="loginForm.errors.email = []"
    />

    <Input
      class="mb-4"
      label="Password"
      type="password"
      v-model="loginForm.password"
      placeholder="********"
      :errors="loginForm.errors?.password"
      @update:modelValue="loginForm.errors.password = []"
    />

    <slot name="extra" />

    <div class="flex justify-center">
      <Button type="submit" :loading="loginForm.loading"> Login </Button>
    </div>
  </form>
</template>
