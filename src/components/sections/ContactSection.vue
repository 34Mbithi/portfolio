<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { contact } = content
// Email is already the primary button; repeating it as a social link is noise.
const visibleSocial = content.social.filter((link) => link.href && link.icon !== 'email')
const copyStatus = ref('')
let resetTimer = 0

async function copyEmail(): Promise<void> {
  let copied = false

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(contact.email)
      copied = true
    } else {
      const field = document.createElement('textarea')
      field.value = contact.email
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      copied = document.execCommand('copy')
      field.remove()
    }
  } catch {
    copied = false
  }

  copyStatus.value = copied ? 'Email copied' : 'Copy unavailable — use the email link'
  window.clearTimeout(resetTimer)
  resetTimer = window.setTimeout(() => (copyStatus.value = ''), 3000)
}

onBeforeUnmount(() => window.clearTimeout(resetTimer))
</script>

<template>
  <SectionShell id="contact" index="05" title="Contact">
    <template #heading>{{ contact.heading }}</template>

    <div class="contact-panel relative overflow-hidden rounded-2xl border border-line bg-footer px-5 py-8 text-footer-ink sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div class="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div class="max-w-3xl">
          <p v-reveal class="max-w-2xl text-lg leading-8 text-footer-ink/85 sm:text-xl sm:leading-9">{{ contact.message }}</p>

          <div v-reveal="120" class="mt-8 flex flex-wrap gap-3">
            <BaseButton label="Send an email" :href="`mailto:${contact.email}`" variant="neutral" size="lg">
              <template #prefix><IconGlyph name="email" :size="17" /></template>
            </BaseButton>
            <BaseButton label="Copy email" variant="inverse" size="lg" @click="copyEmail" />
          </div>

          <p class="sr-only" role="status" aria-live="polite">{{ copyStatus }}</p>
          <p v-if="copyStatus" class="mt-3 font-mono text-xs text-accent" aria-hidden="true">{{ copyStatus }}</p>
        </div>

        <div v-reveal="180">
          <p class="font-mono text-xs leading-relaxed text-footer-ink/65">{{ contact.availability }}</p>
          <div class="contact-socials mt-4">
            <SocialLinks :links="visibleSocial" tone="inverse" />
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
