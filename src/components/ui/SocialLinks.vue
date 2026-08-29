<script setup lang="ts">
import { computed } from 'vue'

import IconGlyph from '@/components/ui/IconGlyph.vue'
import type { SocialLink } from '@/types/content'

const props = withDefaults(
  defineProps<{
    links: readonly SocialLink[]
    /** `labelled` shows text beside each icon; `compact` is icon-only. */
    variant?: 'labelled' | 'compact'
  }>(),
  { variant: 'labelled' },
)

const visibleLinks = computed(() => props.links.filter((link) => Boolean(link.href)))
</script>

<template>
  <ul class="flex flex-wrap items-center gap-2">
    <li v-for="link in visibleLinks" :key="link.label">
      <a
        :href="link.href ?? undefined"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noopener noreferrer' : undefined"
        :download="link.icon === 'resume' ? '' : undefined"
        :aria-label="`${link.label}${link.external ? ' (opens in a new tab)' : ''}`"
        class="inline-flex items-center gap-2 rounded-lg border border-transparent text-muted transition-colors duration-200 hover:border-line hover:bg-raised hover:text-ink"
        :class="variant === 'compact' ? 'p-2.5' : 'px-3 py-2 text-sm font-medium'"
      >
        <IconGlyph :name="link.icon" :size="variant === 'compact' ? 20 : 17" />
        <span v-if="variant === 'labelled'">{{ link.label }}</span>
      </a>
    </li>
  </ul>
</template>
