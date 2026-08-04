<script setup lang="ts">
import type { IconName } from '@/types/content'

/**
 * Inline SVG icon set. Inlined rather than pulled from an icon package so the
 * site ships zero icon dependencies and the marks inherit `currentColor`.
 *
 * Brand marks (GitHub, LinkedIn) are filled paths reproduced from their
 * official assets; the rest are stroked to match the UI weight.
 */
withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 20 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  >
    <!-- Filled brand marks -->
    <path
      v-if="name === 'github'"
      fill="currentColor"
      d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22 0 1.6-.02 2.9-.02 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"
    />
    <path
      v-else-if="name === 'linkedin'"
      fill="currentColor"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"
    />

    <!-- Stroked UI icons -->
    <g
      v-else
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <template v-if="name === 'email'">
        <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
        <path d="m3.5 7.5 8.5 6 8.5-6" />
      </template>

      <template v-else-if="name === 'resume'">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M19 9.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 6.5Z" />
        <path d="M12 11.5v5.5m0 0-2.25-2.25M12 17l2.25-2.25" />
      </template>

      <template v-else-if="name === 'external'">
        <path d="M15 3h6v6" />
        <path d="M10.5 13.5 21 3" />
        <path d="M18 13.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5.5" />
      </template>

      <template v-else-if="name === 'arrow-down'">
        <path d="M12 4.5v15" />
        <path d="m19 12.5-7 7-7-7" />
      </template>
    </g>
  </svg>
</template>
