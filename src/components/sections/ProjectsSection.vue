<script setup lang="ts">
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { projects } = content
</script>

<template>
  <SectionShell
    id="projects"
    index="02"
    title="Projects"
    description="Each one framed as a case study rather than a screenshot — the problem it
      started from, the approach taken, and what actually changed as a result."
  >
    <template #heading>Selected work</template>

    <!-- Generous gap: these are the pieces the page exists to show. -->
    <div class="space-y-8 lg:space-y-12">
      <div v-for="(project, index) in projects" :key="project.id" v-reveal>
        <ProjectCard :project="project" :position="index" />
      </div>
    </div>
  </SectionShell>
</template>
