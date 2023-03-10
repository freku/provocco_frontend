import LoginForm from './LoginForm.vue'
import { setActivePinia, createPinia } from 'pinia'
// import { beforeEach } from 'vitest'

describe('<LoginForm />', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoginForm)
  })
})
