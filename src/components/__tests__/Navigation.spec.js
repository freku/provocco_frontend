import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import Navigation from '@/components/Navigation.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'

describe('Navigation.vue', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = shallowMount(Navigation, {
      global: {
        plugins: [createTestingPinia()],
      },
    })
  })

  it('shows proper links when logged IN', async () => {
    const userStore = useUserStore()

    userStore.isLoggedIn = true

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="login"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="logout"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="profile"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="register"]').exists()).toBe(false)
  })

  it('shows proper links when logged OUT', async () => {
    expect(wrapper.find('[data-testid="login"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="logout"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="profile"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="register"]').exists()).toBe(true)
  })
})
