<script setup>
import { RouterLink } from 'vue-router'
import LoginForm from '@/components/authentication/LoginForm.vue'
</script>

<template>
  <div>
    <LoginForm class="border p-4">
      <template #extra>
        <div class="flex justify-center mb-4 text-xs">
          <RouterLink :to="{ name: 'forgot-password' }" class="text-blue-500 hover:text-blue-700"
            >Forgot Password?</RouterLink
          >
        </div>
      </template>
    </LoginForm>
  </div>
</template>
