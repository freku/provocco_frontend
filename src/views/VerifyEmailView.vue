<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useAuth } from '@/composables/auth'

const route = useRoute()

const { verifyEmail } = useAuth()

watch(
  () => route.query.url,
  async (url) => {
    await verifyEmail(url)
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <p>Verifying email...</p>
  </div>
</template>
