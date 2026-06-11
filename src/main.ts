import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.config.errorHandler = (err, _instance, info) => {
  console.error('[Vue error]', err, info)
}

window.addEventListener('unhandledrejection', (e) => {
  console.error('[Unhandled promise]', e.reason)
})

app.use(createPinia())
app.use(router)
app.mount('#app')
