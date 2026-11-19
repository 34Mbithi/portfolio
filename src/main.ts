import { createApp } from 'vue'

// Self-hosted fonts: no third-party request, and the files ship with the
// bundle's long-lived cache headers. Latin subset only — the site is English,
// and importing every subset inlines several of them into the CSS as base64.
// Inter's variable package has no per-subset stylesheet, so its @font-face
// lives in main.css.
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'

import App from '@/App.vue'
import '@/assets/main.css'

// `v-reveal` is imported directly by the components that use it rather than
// registered globally — keeps the dependency visible at the call site.
createApp(App).mount('#app')
