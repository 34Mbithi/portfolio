<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

const props = withDefaults(
  defineProps<{
    /** Renders an <a> when set, a <button> otherwise. */
    href?: string
    variant?: Variant
    size?: Size
    /** Adds target/rel for links that leave the site. */
    external?: boolean
  }>(),
  { variant: 'primary', size: 'md' },
)

const tag = computed(() => (props.href ? 'a' : 'button'))

const variantClass: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-md',
  secondary: 'border border-line bg-surface text-ink hover:border-accent hover:text-accent-strong',
  ghost: 'text-muted hover:text-ink hover:bg-raised',
}

const sizeClass: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  sm: 'px-3.5 py-2 text-[0.8125rem]',
}
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :type="tag === 'button' ? 'button' : undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-out"
    :class="[variantClass[variant], sizeClass[size]]"
  >
    <slot />
  </component>
</template>
