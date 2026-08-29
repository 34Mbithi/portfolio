<script setup lang="ts">
import SectionShell from '@/components/ui/SectionShell.vue'
import TagChip from '@/components/ui/TagChip.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { skills } = content
</script>

<template>
  <SectionShell
    id="skills"
    index="04"
    title="Skills"
    description="Grouped by purpose, without proficiency scores. These are the technologies already represented in my work and current learning."
    tinted
  >
    <template #heading>A practical full-stack toolkit.</template>

    <div class="grid border-t border-line lg:grid-cols-2">
      <article
        v-for="(group, index) in skills"
        :key="group.id"
        v-reveal="index * 45"
        class="border-b border-line py-7 lg:px-8 lg:even:border-l"
      >
        <div class="flex items-start gap-4">
          <span class="pt-1 font-mono text-[0.6875rem] text-accent-strong">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="min-w-0">
            <h3 class="text-base font-semibold text-ink">{{ group.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-faint">{{ group.description }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <TagChip
                v-for="item in group.items"
                :key="item"
                :label="item"
                :tone="group.id === 'learning' ? 'accent' : 'neutral'"
              />
            </ul>
          </div>
        </div>
      </article>
    </div>
  </SectionShell>
</template>
