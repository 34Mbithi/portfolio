import { createApp } from 'vue'

import App from '@/App.vue'
import '@/assets/main.css'

// `v-reveal` is imported directly by the components that use it rather than
// registered globally — keeps the dependency visible at the call site.
createApp(App).mount('#app')
