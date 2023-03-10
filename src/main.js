import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast, { POSITION } from 'vue-toastification'

import 'vue-toastification/dist/index.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,
})

// toast("Default toast");
// toast.info("Info toast");
// toast.success("Success toast");
// toast.error("Error toast");
// toast.warning("Warning toast");

app.mount('#app')
