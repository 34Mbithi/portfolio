<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { contact, social } = content
</script>

<template>
  <SectionShell id="contact" index="05" title="Contact" tinted>
    <template #heading>{{ contact.heading }}</template>

    <div v-reveal class="max-w-2xl">
      <p class="text-base leading-relaxed text-muted">{{ contact.message }}</p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <BaseButton :href="`mailto:${contact.email}`">
          <IconGlyph name="email" :size="17" />
          {{ contact.email }}
        </BaseButton>
      </div>

      <p class="mt-4 font-mono text-xs text-faint">{{ contact.availability }}</p>

      <div class="mt-8 border-t border-line pt-6">
        <h3 class="sr-only">Elsewhere</h3>
        <SocialLinks :links="social" />
      </div>
    </div>
  </SectionShell>
</template>
