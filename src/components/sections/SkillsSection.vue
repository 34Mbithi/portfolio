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
    description="Grouped by what they are for. A flat alphabetical list tells you nothing
      about how someone actually works."
  >
    <template #heading>Tools of the trade</template>

    <div class="grid gap-5 sm:grid-cols-2">
      <div
        v-for="(group, index) in skills"
        :key="group.id"
        v-reveal="index * 70"
        class="rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/35"
      >
        <h3 class="text-base font-semibold text-ink">{{ group.title }}</h3>
        <p class="mt-1 text-sm text-faint">{{ group.description }}</p>

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
  </SectionShell>
</template>
