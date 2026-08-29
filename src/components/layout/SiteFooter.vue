<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import { content } from '@/data/content'
import type { SectionId } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const year = new Date().getFullYear()
const contactLinks = content.social.filter(
  (link) => link.href && ['github', 'linkedin', 'email'].includes(link.icon),
)

function goTo(id: SectionId): void {
  scrollToSection(id)
}
</script>

<template>
  <footer class="relative overflow-hidden border-t border-white/10 bg-footer text-footer-ink">
    <div class="container-page relative z-10 pb-[clamp(8rem,16vw,15rem)] pt-14 sm:pt-16 lg:pt-20">
      <div class="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.9fr] lg:gap-16 lg:pb-16">
        <div>
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-white/45 uppercase">/ Closing note</p>
          <p class="mt-5 max-w-lg text-2xl leading-tight font-semibold text-balance sm:text-3xl lg:text-4xl">
            {{ content.footer.statement }}
          </p>
          <p class="mt-5 max-w-md text-sm leading-6 text-white/55">{{ content.footer.note }}</p>
        </div>

        <nav aria-label="Footer navigation">
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-white/45 uppercase">/ Quick links</p>
          <ul class="mt-5 flex flex-wrap gap-2">
            <li v-for="item in content.nav" :key="item.id">
              <BaseButton
                :label="item.label"
                :href="`#${item.id}`"
                variant="neutral"
                size="sm"
                @click.prevent="goTo(item.id)"
              />
            </li>
          </ul>
        </nav>

        <div>
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-white/45 uppercase">/ Contact</p>
          <a
            :href="`mailto:${content.contact.email}`"
            class="mt-5 block break-all text-sm font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent"
          >
            {{ content.contact.email }}
          </a>
          <div class="mt-5 flex flex-wrap gap-2">
            <BaseButton
              v-for="link in contactLinks"
              :key="link.label"
              :label="link.label"
              :href="link.href ?? undefined"
              variant="neutral"
              size="sm"
              :external="link.external"
            >
              <template #prefix><IconGlyph :name="link.icon" :size="15" /></template>
            </BaseButton>
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-2 font-mono text-[0.6875rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ year }} {{ content.footer.name }}</p>
        <button type="button" class="w-fit transition-colors hover:text-white" @click="scrollToSection('top')">Back to top ↑</button>
      </div>
    </div>

    <p class="footer-wordmark pointer-events-none absolute inset-x-0 -bottom-[0.18em] whitespace-nowrap text-center font-sans font-bold tracking-[-0.075em] text-white/[0.055] uppercase select-none" aria-hidden="true">
      MBITHI EVANS
    </p>
  </footer>
</template>
