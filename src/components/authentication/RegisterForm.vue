<script setup>
import { useAuthRegister } from '@/composables/auth/register'
import Button from '@/components/basic/Button.vue'
import Input from '@/components/basic/Input.vue'

const { submitRegister, registerForm } = useAuthRegister()
</script>

<template>
  <form
    @submit.prevent="submitRegister"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
  >
    <Input
      class="mb-4"
      label="Username"
      type="text"
      v-model="registerForm.name"
      placeholder="Username"
      :errors="registerForm.errors?.name"
      @update:modelValue="registerForm.errors.name = []"
    />
    <Input
      class="mb-4"
      label="Email"
      type="email"
      v-model="registerForm.email"
      placeholder="Email"
      :errors="registerForm.errors?.email"
      @update:modelValue="registerForm.errors.email = []"
    />
    <Input
      class="mb-4"
      label="Password"
      type="password"
      v-model="registerForm.password"
      placeholder="******************"
      :errors="registerForm.errors?.password"
      @update:modelValue="registerForm.errors.password = []"
    />
    <Input
      class="mb-4"
      label="Confirm Password"
      type="password"
      v-model="registerForm.password_confirmation"
      placeholder="******************"
      :errors="registerForm.errors?.password_confirmation"
      @update:modelValue="registerForm.errors.password_confirmation = []"
    />

    <div class="flex justify-center">
      <Button type="submit" :loading="registerForm.loading"> Register </Button>
    </div>
  </form>
</template>
