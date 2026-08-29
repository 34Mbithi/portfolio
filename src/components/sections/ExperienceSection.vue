<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'
import type { Project } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const { experience, projects } = content

function findProject(id: Project['id'] | undefined): Project | undefined {
  return id ? projects.find((project) => project.id === id) : undefined
}

function goToProject(id: Project['id']): void {
  const card = document.getElementById(`project-${id}`)
  if (!card) return scrollToSection('projects')
  card.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center',
  })
  card.focus({ preventScroll: true })
}
</script>

<template>
  <SectionShell id="experience" index="02" title="Experience" tinted>
    <template #heading>Experience shaped by the edge cases.</template>

    <ol class="relative">
      <li
        v-for="(entry, index) in experience"
        :key="entry.id"
        v-reveal
        class="experience-entry grid gap-5 border-t border-line py-8 sm:py-10 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]"
      >
        <div>
          <p class="font-mono text-xs leading-relaxed text-accent-strong">{{ entry.period }}</p>
          <p class="mt-2 text-sm text-faint">{{ entry.location }}</p>
          <p class="mt-4 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-wider text-faint uppercase">
            <span
              class="h-2 w-2 rounded-full"
              :class="entry.current ? 'bg-accent current-node' : 'bg-line'"
              aria-hidden="true"
            />
            {{ entry.current ? 'Current role' : `Entry ${String(index + 1).padStart(2, '0')}` }}
          </p>
        </div>

        <div class="max-w-4xl">
          <p class="font-mono text-xs font-medium tracking-[0.12em] text-muted uppercase">{{ entry.company }}</p>
          <h3 class="mt-2 text-title font-semibold text-ink">{{ entry.role }}</h3>

          <ul class="mt-5 grid gap-3 lg:grid-cols-2">
            <li
              v-for="(highlight, highlightIndex) in entry.highlights"
              :key="highlightIndex"
              class="relative border-l border-line pl-4 text-sm leading-6 text-muted"
            >
              {{ highlight }}
            </li>
          </ul>

          <BaseButton
            v-if="findProject(entry.relatedProjectId)"
            class="mt-6"
            :label="`View ${findProject(entry.relatedProjectId)?.title}`"
            variant="ghost"
            size="sm"
            @click="goToProject(entry.relatedProjectId!)"
          >
            <template #prefix><span aria-hidden="true">↳</span></template>
          </BaseButton>
        </div>
      </li>
    </ol>
  </SectionShell>
</template>
