<script setup lang="ts">
import { computed } from 'vue'

import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const isDark = computed(() => theme.value === 'dark')
const label = computed(() => `Switch to ${isDark.value ? 'light' : 'dark'} theme`)
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    :aria-pressed="isDark"
    class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent-strong"
    @click="toggleTheme"
  >
    <!-- Sun and moon crossfade rather than swap, so the control never flickers. -->
    <span class="relative block h-5 w-5">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        class="absolute inset-0 h-5 w-5 transition-all duration-300 ease-out"
        :class="isDark ? 'scale-50 opacity-0' : 'scale-100 opacity-100'"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.25" />
        <path
          d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42M18.36 18.36l-1.42-1.42M7.06 7.06 5.64 5.64"
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute inset-0 h-5 w-5 transition-all duration-300 ease-out"
        :class="isDark ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
        aria-hidden="true"
      >
        <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z" />
      </svg>
    </span>
  </button>
</template>
