<script setup lang="ts">
/**
 * Renders an image, or a labelled placeholder frame when `src` is null.
 *
 * The placeholder is deliberately obvious rather than a grey box — an empty
 * slot that looks intentional is easy to ship by accident. This one names the
 * file it is waiting for.
 */
withDefaults(
  defineProps<{
    src: string | null
    alt: string
    /** Shown inside the placeholder so you know what to drop in. */
    placeholderHint?: string
    aspect?: string
  }>(),
  { aspect: 'aspect-[16/10]' },
)
</script>

<template>
  <div
    class="relative overflow-hidden rounded-xl border border-line bg-raised"
    :class="aspect"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover"
    />

    <div v-else class="dot-grid flex h-full w-full flex-col items-center justify-center gap-2 p-6">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-7 w-7 text-faint"
        aria-hidden="true"
      >
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <circle cx="8.75" cy="10" r="1.5" />
        <path d="m3.5 17 4.75-4.5 4 3.5 3.5-3 4.75 4.5" />
      </svg>

      <p class="text-center font-mono text-[0.6875rem] leading-relaxed text-faint">
        {{ placeholderHint ?? 'Screenshot placeholder' }}
      </p>
    </div>
  </div>
</template>
