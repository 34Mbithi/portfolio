<script setup lang="ts">
import SectionShell from '@/components/ui/SectionShell.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'
import type { Project } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const { experience, projects } = content

/** Resolves `relatedProjectId` to a title so the timeline can name the link. */
function findProject(id: Project['id'] | undefined): Project | undefined {
  return id ? projects.find((project) => project.id === id) : undefined
}

/** Jumps to the linked project card rather than the top of the section. */
function goToProject(id: Project['id']): void {
  const card = document.getElementById(`project-${id}`)
  if (!card) {
    scrollToSection('projects')
    return
  }

  card.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center',
  })
}
</script>

<template>
  <SectionShell id="experience" index="03" title="Experience" tinted>
    <template #heading>Where I have worked</template>

    <!-- The rail is drawn on the <ol> so it spans entries without each item
         needing to know whether it is last. -->
    <ol class="relative space-y-10 border-l border-line pl-8 sm:space-y-12 sm:pl-10">
      <li v-for="entry in experience" :key="entry.id" v-reveal class="relative">
        <!-- Timeline node -->
        <span
          class="absolute top-1.5 -left-[2.3125rem] flex h-3.5 w-3.5 items-center justify-center sm:-left-[2.9375rem]"
          aria-hidden="true"
        >
          <span
            v-if="entry.current"
            class="absolute h-3.5 w-3.5 animate-ping rounded-full bg-accent opacity-60"
          />
          <span
            class="relative h-3 w-3 rounded-full border-2"
            :class="entry.current ? 'border-accent bg-accent' : 'border-line bg-canvas'"
          />
        </span>

        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 class="text-title font-semibold text-ink">{{ entry.role }}</h3>
          <p class="text-sm font-medium text-accent-strong">{{ entry.company }}</p>
        </div>

        <p class="mt-1.5 font-mono text-xs text-faint">
          {{ entry.period }} <span aria-hidden="true">·</span> {{ entry.location }}
        </p>

        <ul class="mt-4 space-y-2.5">
          <li
            v-for="(highlight, i) in entry.highlights"
            :key="i"
            class="relative pl-5 text-sm leading-relaxed text-muted"
          >
            <span class="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-accent/55" aria-hidden="true" />
            {{ highlight }}
          </li>
        </ul>

        <button
          v-if="findProject(entry.relatedProjectId)"
          type="button"
          class="mt-4 inline-flex items-center gap-1.5 rounded-md font-mono text-xs text-muted transition-colors hover:text-accent-strong"
          @click="goToProject(entry.relatedProjectId!)"
        >
          <span aria-hidden="true">↳</span>
          Related project: {{ findProject(entry.relatedProjectId)?.title }}
        </button>
      </li>
    </ol>
  </SectionShell>
</template>
