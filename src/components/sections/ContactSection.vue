<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { contact } = content
const visibleSocial = content.social.filter((link) => link.href)
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

    <div class="contact-panel relative overflow-hidden rounded-2xl border border-line bg-ink px-5 py-8 text-canvas sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div class="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div class="max-w-3xl">
          <p v-reveal class="font-mono text-xs tracking-[0.14em] text-accent uppercase">Open to relevant opportunities</p>
          <h3 v-reveal="60" class="mt-5 text-headline font-semibold text-balance">Have something worth building?</h3>
          <p v-reveal="120" class="mt-5 max-w-2xl text-base leading-7 text-canvas/70">{{ contact.message }}</p>

          <div v-reveal="180" class="mt-8 flex flex-wrap gap-3">
            <BaseButton label="Send an email" :href="`mailto:${contact.email}`" variant="neutral" size="lg">
              <template #prefix><IconGlyph name="email" :size="17" /></template>
            </BaseButton>
            <BaseButton label="Copy email" variant="ghost" size="lg" class="contact-ghost" @click="copyEmail" />
          </div>

          <p class="sr-only" role="status" aria-live="polite">{{ copyStatus }}</p>
          <p v-if="copyStatus" class="mt-3 font-mono text-xs text-accent" aria-hidden="true">{{ copyStatus }}</p>
        </div>

        <div v-reveal="220">
          <p class="font-mono text-xs leading-relaxed text-canvas/55">{{ contact.availability }}</p>
          <div class="contact-socials mt-4">
            <SocialLinks :links="visibleSocial" />
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
</template>
