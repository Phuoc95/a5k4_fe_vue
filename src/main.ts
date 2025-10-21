import './assets/main.css'
import './assets/override.css'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

console.log('Starting Vue app...')

const app = createApp(App)
const head = createHead()

console.log('Vue app created, mounting plugins...')

app.use(createPinia())
app.use(router)
app.use(head)

console.log('All plugins mounted, mounting app...')
app.mount('#app')
console.log('Vue app mounted successfully!')
