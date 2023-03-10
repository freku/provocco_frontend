<script setup>
import { RouterView, useRoute } from 'vue-router'
import { useAuthBasic } from '@/composables/auth/basic'
import { watch } from 'vue'
import Navigation from '@/components/Navigation.vue'

const { getUser } = useAuthBasic()
const route = useRoute()

watch(
  () => route.params,
  async () => {
    await getUser()
  },
)
</script>

<template>
  <div class="h-screen mx-auto container flex items-center flex-col">
    <Navigation />

    <div class="rounded-lg shadow-sm mt-5 h-full mb-5 p-4 container flex items-center flex-col">
      <RouterView />
    </div>
  </div>
</template>
