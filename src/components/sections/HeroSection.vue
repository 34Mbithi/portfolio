<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import { vReveal, vRevealText } from '@/directives/reveal'
import { content } from '@/data/content'
import { scrollToSection } from '@/utils/scroll'

const { hero } = content
const github = content.social.find((link) => link.icon === 'github' && link.href)
</script>

<template>
  <section
    id="top"
    aria-labelledby="hero-heading"
    class="relative overflow-hidden border-b border-line pt-16"
  >
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="dot-grid absolute inset-0 opacity-70" />
      <div class="hero-glow absolute inset-0" />
    </div>

    <div class="container-page flex min-h-[min(54rem,calc(100svh-4rem))] items-center py-16 sm:py-20 lg:py-24">
      <div class="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.32fr)_minmax(18rem,0.68fr)] lg:gap-16 xl:gap-24">
        <div class="max-w-4xl">
          <div v-reveal class="flex flex-wrap items-center gap-x-4 gap-y-3">
            <p class="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] text-accent-strong uppercase">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
                <span class="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {{ hero.eyebrow }}
            </p>
            <span class="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />
            <p class="font-mono text-xs text-faint">Nairobi, Kenya · Remote</p>
          </div>

          <p v-reveal="50" class="mt-8 text-sm font-semibold tracking-[0.16em] text-muted uppercase">
            {{ hero.name }}
          </p>

          <h1 id="hero-heading" v-reveal-text="90" class="mt-4 text-display font-semibold text-balance text-ink">
            {{ hero.tagline }}
          </h1>

          <p v-reveal="250" class="mt-7 measure-tight text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {{ hero.intro }}
          </p>

          <div v-reveal="330" class="mt-9 flex flex-wrap items-center gap-3">
            <BaseButton label="View my work" size="lg" @click="scrollToSection('projects')">
              <template #suffix><span class="arrow-nudge" aria-hidden="true">↓</span></template>
            </BaseButton>
            <BaseButton label="Contact me" variant="secondary" size="lg" @click="scrollToSection('contact')" />
            <BaseButton
              v-if="github?.href"
              label="GitHub"
              :href="github.href"
              variant="ghost"
              size="lg"
              external
            >
              <template #prefix><IconGlyph name="github" :size="17" /></template>
            </BaseButton>
          </div>
        </div>

        <aside v-reveal="390" aria-label="Engineering profile" class="lg:justify-self-end lg:max-w-[24rem]">
          <div class="overflow-hidden rounded-2xl border border-line bg-surface/88 shadow-[0_24px_80px_-52px_var(--accent)] backdrop-blur-sm">
            <div class="flex items-center justify-between border-b border-line px-5 py-4">
              <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">Engineering profile</p>
              <span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            </div>

            <div class="px-5 py-6 sm:px-6">
              <div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2" aria-label="Frontend connected to APIs and databases">
                <div class="tech-node"><span>Client</span><strong>Vue / React</strong></div>
                <span class="text-faint" aria-hidden="true">→</span>
                <div class="tech-node"><span>API</span><strong>Laravel / Flask</strong></div>
                <span class="text-faint" aria-hidden="true">→</span>
                <div class="tech-node"><span>Data</span><strong>SQL</strong></div>
              </div>

              <dl class="mt-6 divide-y divide-line border-y border-line">
                <div v-for="item in hero.highlights" :key="item.label" class="grid gap-1 py-3 sm:grid-cols-[6.5rem_1fr] sm:gap-3">
                  <dt class="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{{ item.label }}</dt>
                  <dd class="text-sm leading-snug font-medium text-ink">{{ item.value }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
