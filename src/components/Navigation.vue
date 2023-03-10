<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuthBasic } from '@/composables/auth/basic'

const userStore = useUserStore()
const { logout } = useAuthBasic()
</script>

<template>
  <nav class="p-4 bg-white rounded-lg w-full shadow-sm mt-5">
    <div class="flex justify-center">
      <RouterLink :to="{ name: 'home' }" class="mr-6">Home</RouterLink>
      <RouterLink to="/about" class="mr-6">About</RouterLink>

      <RouterLink
        data-testid="login"
        v-if="!userStore.isLoggedIn"
        :to="{ name: 'login' }"
        class="mr-6"
        >Login</RouterLink
      >
      <a data-testid="logout" v-else href="#" @click="logout" class="cursor-pointer mr-6">Logout</a>

      <RouterLink
        data-testid="profile"
        :to="{ name: 'profile' }"
        v-if="userStore.isLoggedIn"
        class="mr-6"
        >Profile ({{ userStore.user.name }})</RouterLink
      >

      <RouterLink
        data-testid="register"
        v-if="!userStore.isLoggedIn"
        :to="{ name: 'register' }"
        class="mr-6"
        >Register</RouterLink
      >
    </div>
  </nav>
</template>
