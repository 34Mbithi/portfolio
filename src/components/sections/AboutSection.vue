<script setup lang="ts">
import MediaFrame from '@/components/ui/MediaFrame.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { about, social } = content
</script>

<template>
  <SectionShell id="about" index="01" title="About" tinted>
    <template #heading>Who you would be working with</template>

    <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
      <div v-reveal class="order-2 lg:order-1">
        <div class="space-y-5">
          <p
            v-for="(paragraph, i) in about.paragraphs"
            :key="i"
            class="text-base leading-relaxed text-muted"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="mt-8 border-t border-line pt-6">
          <h3 class="sr-only">Links and contact</h3>
          <SocialLinks :links="social" />
        </div>
      </div>

      <div v-reveal="120" class="order-1 lg:order-2">
        <MediaFrame
          :src="about.photo.src"
          :alt="about.photo.alt"
          placeholder-hint="/public/portrait.jpg"
          aspect="aspect-[4/5]"
          class="mx-auto max-w-xs lg:max-w-none"
        />
      </div>
    </div>
  </SectionShell>
</template>
