<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'
import { scrollToSection } from '@/utils/scroll'

const { hero } = content
</script>

<template>
  <section
    id="top"
    aria-labelledby="hero-heading"
    class="relative flex min-h-[92svh] items-center overflow-hidden pt-16"
  >
    <!-- Decorative backdrop: dot grid plus a single soft accent bloom. Kept
         behind a pointer-events-none layer so it never intercepts clicks. -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="dot-grid absolute inset-0" />
      <div
        class="absolute top-[-18%] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.13] blur-3xl"
        style="background: radial-gradient(circle, var(--accent) 0%, transparent 68%)"
      />
    </div>

    <div class="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8">
      <div class="max-w-3xl">
        <p
          v-reveal
          class="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted"
        >
          <span class="relative flex h-2 w-2" aria-hidden="true">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {{ hero.eyebrow }}
        </p>

        <h1 id="hero-heading" v-reveal="80" class="mt-7 text-display font-bold text-ink">
          {{ hero.name }}
        </h1>

        <p v-reveal="160" class="mt-5 text-title font-medium text-balance text-muted">
          {{ hero.tagline }}
        </p>

        <p v-reveal="220" class="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          {{ hero.intro }}
        </p>

        <div v-reveal="280" class="mt-10 flex flex-wrap items-center gap-3">
          <BaseButton @click="scrollToSection('projects')">View Projects</BaseButton>
          <BaseButton variant="secondary" @click="scrollToSection('contact')">
            Contact Me
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Scroll affordance -->
    <button
      type="button"
      aria-label="Scroll to About section"
      class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce rounded-full p-2 text-faint transition-colors hover:text-accent-strong md:block"
      @click="scrollToSection('about')"
    >
      <IconGlyph name="arrow-down" :size="22" />
    </button>
  </section>
</template>
