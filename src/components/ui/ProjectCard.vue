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
    :aria-labelledby="`project-${project.id}-title`"
    class="group relative scroll-mt-28 rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_45px_-24px] hover:shadow-accent/45 sm:p-8 lg:p-10"
  >
    <div class="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <!-- Screenshot -->
      <MediaFrame
        :src="project.image.src"
        :alt="project.image.alt"
        :placeholder-hint="`/public/projects/${project.id}.png`"
        class="lg:sticky lg:top-28"
        :class="isReversed() ? 'lg:order-2' : 'lg:order-1'"
      />

      <!-- Narrative -->
      <div :class="isReversed() ? 'lg:order-1' : 'lg:order-2'">
        <p class="font-mono text-xs text-faint">
          {{ String(position + 1).padStart(2, '0') }}
        </p>

        <h3 :id="`project-${project.id}-title`" class="mt-2 text-title font-semibold text-ink">
          {{ project.title }}
        </h3>
        <p class="mt-2 text-base leading-relaxed text-muted">{{ project.tagline }}</p>

        <!-- Tech stack -->
        <ul class="mt-5 flex flex-wrap gap-2" :aria-label="`${project.title} tech stack`">
          <TagChip v-for="tech in project.tech" :key="tech" :label="tech" />
        </ul>

        <!-- Problem → Solution → Result -->
        <div class="mt-7 space-y-5 border-l-2 border-line pl-5">
          <div v-for="step in caseStudySteps" :key="step.key">
            <h4 class="font-mono text-[0.6875rem] tracking-widest text-accent-strong uppercase">
              {{ step.label }}
            </h4>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">
              {{ project.caseStudy[step.key] }}
            </p>
          </div>
        </div>

        <!-- Measurable outcomes -->
        <dl
          v-if="project.outcomes.length"
          class="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3"
        >
          <div v-for="outcome in project.outcomes" :key="outcome.label" class="bg-raised p-4">
            <dt class="sr-only">{{ outcome.label }}</dt>
            <dd>
              <span class="block font-mono text-lg font-medium text-accent-strong">
                {{ outcome.value }}
              </span>
              <span class="mt-1 block text-xs leading-snug text-faint">{{ outcome.label }}</span>
            </dd>
          </div>
        </dl>

        <!-- Links -->
        <div class="mt-7 flex flex-wrap gap-3">
          <BaseButton v-if="project.demoUrl" :href="project.demoUrl" size="sm" external>
            Live Demo
            <IconGlyph name="external" :size="15" />
          </BaseButton>

          <BaseButton
            v-if="project.repoUrl"
            :href="project.repoUrl"
            variant="secondary"
            size="sm"
            external
          >
            <IconGlyph name="github" :size="15" />
            GitHub Repo
          </BaseButton>
        </div>
      </div>
    </div>
  </article>
</template>
