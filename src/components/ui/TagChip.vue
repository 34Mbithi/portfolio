<script setup lang="ts">
withDefaults(defineProps<{ label: string; tone?: 'neutral' | 'accent' }>(), { tone: 'neutral' })
</script>

<template>
  <li
    class="inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs tracking-tight transition-colors duration-200"
    :class="
      tone === 'accent'
        ? 'border-accent/35 bg-accent-soft text-accent-strong'
        : 'border-line bg-raised text-muted hover:border-accent/40 hover:text-ink'
    "
  >
    {{ label }}
  </li>
</template>
