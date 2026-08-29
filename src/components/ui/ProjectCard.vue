<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconGlyph from '@/components/ui/IconGlyph.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import TagChip from '@/components/ui/TagChip.vue'
import type { Project } from '@/types/content'

const props = defineProps<{
  project: Project
  /** Index in the list, used for the counter and layout alternation. */
  position: number
}>()

/**
 * Alternate which side the screenshot sits on. Two-column rows that all lean
 * the same way read as a list; alternating them reads as a sequence of cases.
 */
const isReversed = () => props.position % 2 === 1

const caseStudySteps = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'result', label: 'Result' },
] as const
</script>

<template>
  <article
    :id="`project-${project.id}`"
    tabindex="-1"
    :aria-labelledby="`project-${project.id}-title`"
    class="group relative scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow,transform] duration-400 ease-[var(--ease-hover)] hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_24px_70px_-44px_var(--accent)]"
  >
    <!-- The narrative column is the wider of the two: the screenshot is
         supporting evidence, and an even split gives it more room than it
         earns while cramping the case study text. -->
    <div
      class="grid items-stretch xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
    >
      <!-- Screenshot -->
      <MediaFrame
        :src="project.image.src"
        :alt="project.image.alt"
        placeholder-title="Project visual coming soon"
        placeholder-hint="The case study is complete; a final project screenshot is still needed before launch."
        aspect="aspect-[16/11] xl:aspect-auto xl:min-h-full"
        class="rounded-none border-0 border-b xl:border-r xl:border-b-0"
        :class="isReversed() ? 'xl:order-2' : 'xl:order-1'"
      />

      <!-- Narrative -->
      <div class="p-5 sm:p-8 lg:p-10 xl:p-12" :class="isReversed() ? 'xl:order-1' : 'xl:order-2'">
        <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
          Case {{ String(position + 1).padStart(2, '0') }}
        </p>

        <h3 :id="`project-${project.id}-title`" class="mt-2 text-title font-semibold text-ink">
          {{ project.title }}
        </h3>
        <p class="mt-2 measure text-base leading-relaxed text-muted">{{ project.tagline }}</p>

        <!-- Tech stack -->
        <ul class="mt-5 flex flex-wrap gap-2" :aria-label="`${project.title} tech stack`">
          <TagChip v-for="tech in project.tech" :key="tech" :label="tech" />
        </ul>

        <!-- Problem → Solution → Result -->
        <div class="mt-8 grid gap-5 border-t border-line pt-6 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
          <div v-for="step in caseStudySteps" :key="step.key">
            <h4 class="font-mono text-[0.6875rem] tracking-widest text-accent-strong uppercase">
              {{ step.key === 'solution' ? 'Approach' : step.label }}
            </h4>
            <p class="mt-1.5 measure text-sm leading-relaxed text-muted">
              {{ project.caseStudy[step.key] }}
            </p>
          </div>
        </div>

        <!-- Measurable outcomes. Three across needs roughly 480px of card to
             avoid two-word-per-line labels, so it stays stacked until `sm`. -->
        <dl
          v-if="project.outcomes.length"
          class="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3"
        >
          <div v-for="outcome in project.outcomes" :key="outcome.label" class="bg-raised p-4">
            <dt class="sr-only">{{ outcome.label }}</dt>
            <dd>
              <span class="block font-mono text-lg font-medium break-words text-accent-strong">
                {{ outcome.value }}
              </span>
              <span class="mt-1 block text-xs leading-snug text-balance text-faint">
                {{ outcome.label }}
              </span>
            </dd>
          </div>
        </dl>

        <!-- Links -->
        <div class="mt-7 flex flex-wrap gap-3">
          <BaseButton v-if="project.demoUrl" label="Live demo" :href="project.demoUrl" size="sm" external>
            <template #suffix><IconGlyph name="external" :size="15" class="arrow-nudge" /></template>
          </BaseButton>

          <BaseButton
            v-if="project.repoUrl"
            label="Source code"
            :href="project.repoUrl"
            variant="secondary"
            size="sm"
            external
          >
            <template #prefix><IconGlyph name="github" :size="15" /></template>
            <template #suffix><IconGlyph name="external" :size="14" class="arrow-nudge" /></template>
          </BaseButton>
        </div>
      </div>
    </div>
  </article>
</template>
