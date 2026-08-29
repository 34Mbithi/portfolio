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
    index="01"
    title="Selected Work"
    description="Four engineering case studies, from authenticated APIs to the interfaces that consume them. Each one shows the constraint, the approach, and the evidence."
  >
    <template #heading>Built around real constraints.</template>

    <!-- Generous gap: these are the pieces the page exists to show. -->
    <div class="space-y-8 lg:space-y-14">
      <div v-for="(project, index) in projects" :key="project.id" v-reveal>
        <ProjectCard :project="project" :position="index" />
      </div>
    </div>
  </SectionShell>
</template>
