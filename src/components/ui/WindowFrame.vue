<script setup lang="ts">
/**
 * Editor/browser-style window chrome around a project visual. Dark in both
 * themes (footer palette), since that is what editors and terminals look
 * like, and so screenshots and code views read as one family.
 */
defineProps<{
  /** File path, endpoint, or URL shown in the title bar. */
  title: string
}>()
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-white/10 bg-footer shadow-[0_30px_70px_-40px_oklch(0.2_0.05_220)]">
    <div class="flex items-center gap-3 border-b border-white/10 px-4 py-3">
      <span class="flex shrink-0 gap-1.5" aria-hidden="true">
        <span class="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span class="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span class="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <p class="min-w-0 truncate font-mono text-[0.6875rem] tracking-wide text-footer-ink/65">{{ title }}</p>
    </div>
    <slot />
  </div>
</template>
