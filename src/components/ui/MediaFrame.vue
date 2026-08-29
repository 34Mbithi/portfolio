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
    placeholderTitle?: string
    aspect?: string
  }>(),
  { aspect: 'aspect-[16/10]', placeholderTitle: 'Visual in progress' },
)
</script>

<template>
  <div
    class="media-frame relative overflow-hidden rounded-xl border border-line bg-raised"
    :class="aspect"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-hover)] group-hover:scale-[1.025]"
    />

    <div v-else class="media-placeholder flex h-full w-full items-end p-5 sm:p-7">
      <div class="relative z-10 max-w-xs rounded-lg border border-line bg-surface/85 p-4 backdrop-blur-sm">
        <p class="font-mono text-[0.6875rem] tracking-[0.15em] text-accent-strong uppercase">
          {{ placeholderTitle }}
        </p>
        <p v-if="placeholderHint" class="mt-2 text-xs leading-relaxed text-faint">
          {{ placeholderHint }}
        </p>
      </div>
    </div>
  </div>
</template>
