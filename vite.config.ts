import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'

/**
 * The site's public origin, used for canonical and Open Graph URLs in
 * index.html. Social crawlers (LinkedIn, X, Slack) ignore relative og:image
 * paths, so these have to be absolute.
 *
 * Set SITE_URL to pin it (e.g. a custom domain). On Vercel it falls back to
 * VERCEL_PROJECT_PRODUCTION_URL, which Vercel sets during every build to the
 * production domain, so previews still point their cards at production.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const url = explicit || (vercel ? `https://${vercel}` : '')
  return url.replace(/\/+$/, '')
}

function siteUrl(): Plugin {
  const url = resolveSiteUrl()
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!url && !ctx.server) {
          this.warn('SITE_URL is not set: social preview tags will use relative URLs.')
        }
        return html.replaceAll('%SITE_URL%', url)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), siteUrl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
