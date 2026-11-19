<script setup lang="ts">
import IconGlyph from '@/components/ui/IconGlyph.vue'
import { content } from '@/data/content'
import type { SectionId } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const year = new Date().getFullYear()
// The email address is already shown as text above these, so the Email
// social link would only repeat it.
const profileLinks = content.social.filter(
  (link) => link.href && ['github', 'linkedin', 'resume'].includes(link.icon),
)

function goTo(id: SectionId): void {
  scrollToSection(id)
}

const linkClass =
  'inline-flex min-h-10 items-center gap-2 text-sm text-white/65 transition-colors hover:text-white'
</script>

<template>
  <footer class="relative overflow-hidden border-t border-white/10 bg-footer text-footer-ink">
    <div class="container-page relative z-10 pb-[clamp(8rem,16vw,15rem)] pt-14 sm:pt-16 lg:pt-20">
      <div class="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.9fr] lg:gap-16 lg:pb-16">
        <div>
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-white/55 uppercase">/ Closing note</p>
          <p class="mt-5 max-w-lg text-2xl leading-tight font-semibold text-balance sm:text-3xl lg:text-4xl">
            {{ content.footer.statement }}
          </p>
          <p class="mt-5 max-w-md text-sm leading-6 text-white/60">{{ content.footer.note }}</p>
        </div>

        <nav aria-label="Footer navigation">
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-white/55 uppercase">/ Navigate</p>
          <ul class="mt-3 grid grid-cols-2 gap-x-6 sm:max-w-xs">
            <li v-for="item in content.nav" :key="item.id">
              <a :href="`#${item.id}`" :class="linkClass" @click.prevent="goTo(item.id)">{{ item.label }}</a>
            </li>
          </ul>
        </nav>

        <div>
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-white/55 uppercase">/ Contact</p>
          <a
            :href="`mailto:${content.contact.email}`"
            class="mt-3 inline-flex min-h-10 items-center break-all text-sm font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent"
          >
            {{ content.contact.email }}
          </a>
          <ul class="mt-1 flex flex-wrap gap-x-6">
            <li v-for="link in profileLinks" :key="link.label">
              <a
                :href="link.href ?? undefined"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                :download="link.icon === 'resume' ? '' : undefined"
                :aria-label="link.external ? `${link.label} (opens in a new tab)` : undefined"
                :class="linkClass"
              >
                <IconGlyph :name="link.icon" :size="15" />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4 flex flex-col gap-1 font-mono text-[0.6875rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p class="py-2">&copy; {{ year }} {{ content.footer.name }}</p>
        <button type="button" class="inline-flex min-h-10 w-fit items-center transition-colors hover:text-white" @click="scrollToSection('top')">
          Back to top ↑
        </button>
      </div>
    </div>

    <p class="footer-wordmark pointer-events-none absolute inset-x-0 -bottom-[0.18em] whitespace-nowrap text-center font-sans font-bold tracking-[-0.075em] text-white/[0.055] uppercase select-none" aria-hidden="true">
      MBITHI EVANS
    </p>
  </footer>
</template>
