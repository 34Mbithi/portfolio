<script setup lang="ts">
import { vReveal, vRevealText } from '@/directives/reveal'
import type { SectionId } from '@/types/content'

/**
 * Shared frame for every top-level section: consistent id/anchor target,
 * width, rhythm, and heading treatment. Sections supply only their content,
 * which keeps vertical spacing identical down the page without each section
 * re-deciding its own padding.
 */
withDefaults(
  defineProps<{
    id: SectionId
    /** Zero-padded counter shown beside the heading, e.g. "02". */
    index: string
    title: string
    description?: string
    /** Tints the section background to break up the scroll. */
    tinted?: boolean
  }>(),
  { tinted: false },
)
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="`${id}-heading`"
    class="scroll-mt-24 py-16 outline-none sm:py-24 lg:py-32"
    :class="tinted ? 'bg-surface' : 'bg-canvas'"
  >
    <div class="container-page">
      <header class="mb-10 sm:mb-14 lg:mb-16">
        <div v-reveal class="flex items-center gap-3">
          <span class="font-mono text-xs text-accent-strong">{{ index }}</span>
          <span class="h-px w-8 bg-accent/40" aria-hidden="true" />
          <span class="font-mono text-xs tracking-widest text-faint uppercase">
            {{ title }}
          </span>
        </div>

        <h2
          :id="`${id}-heading`"
          v-reveal-text="60"
          class="mt-4 text-headline font-semibold text-balance text-ink"
        >
          <slot name="heading">{{ title }}</slot>
        </h2>

        <p v-if="description" v-reveal="180" class="mt-4 measure text-base leading-relaxed text-muted">
          {{ description }}
        </p>
      </header>

      <slot />
    </div>
  </section>
</template>
