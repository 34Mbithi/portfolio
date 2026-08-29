<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'neutral' | 'ghost'
type Size = 'lg' | 'md' | 'sm'

const props = withDefaults(
  defineProps<{
    label: string
    href?: string
    variant?: Variant
    size?: Size
    external?: boolean
    download?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', external: false, download: false, disabled: false },
)

const tag = computed(() => (props.href ? 'a' : 'button'))
const characters = computed(() => Array.from(props.label))

const variantClass: Record<Variant, string> = {
  primary: 'border-accent bg-accent text-on-accent hover:border-accent-strong hover:bg-accent-strong',
  secondary: 'border-line bg-surface text-ink hover:border-accent/70 hover:bg-raised',
  neutral: 'border-white/80 bg-white text-slate-950 hover:border-white hover:bg-slate-100',
  ghost: 'border-transparent bg-transparent text-muted hover:border-line hover:bg-raised hover:text-ink',
}

const sizeClass: Record<Size, string> = {
  lg: 'min-h-12 px-5 py-3 text-sm sm:px-6',
  md: 'min-h-11 px-4 py-2.5 text-sm',
  sm: 'min-h-10 px-3.5 py-2 text-xs',
}
</script>

<template>
  <component
    :is="tag"
    :href="disabled ? undefined : href"
    :type="tag === 'button' ? 'button' : undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :download="download ? '' : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="tag === 'a' && disabled ? 'true' : undefined"
    :aria-label="external ? `${label} (opens in a new tab)` : label"
    class="glyph-button group inline-flex max-w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-md border font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-hover)] hover:-translate-y-px hover:shadow-[0_12px_28px_-18px_var(--accent)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
    :class="[variantClass[variant], sizeClass[size]]"
  >
    <slot name="prefix" />

    <span class="sr-only">{{ label }}</span>
    <span class="glyph-label" aria-hidden="true">
      <span
        v-for="(character, index) in characters"
        :key="`${character}-${index}`"
        class="glyph-cell"
        :style="{ '--glyph-index': index }"
      >
        <span class="glyph-stack">
          <span>{{ character === ' ' ? '\u00a0' : character }}</span>
          <span>{{ character === ' ' ? '\u00a0' : character }}</span>
        </span>
      </span>
    </span>

    <slot name="suffix" />
  </component>
</template>
