<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useAuthVerify } from '@/composables/auth/verify'

const route = useRoute()

const { verifyEmail } = useAuthVerify()

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
