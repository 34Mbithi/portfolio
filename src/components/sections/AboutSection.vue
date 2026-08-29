<script setup lang="ts">
import MediaFrame from '@/components/ui/MediaFrame.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { vReveal } from '@/directives/reveal'
import { content } from '@/data/content'

const { about, social } = content
</script>

<template>
  <SectionShell id="about" index="03" title="About">
    <template #heading>The person behind the endpoints.</template>

    <div class="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[24rem_minmax(0,1fr)] xl:gap-24">
      <div v-reveal="80" class="lg:sticky lg:top-28 lg:self-start">
        <MediaFrame
          :src="about.photo.src"
          :alt="about.photo.alt"
          placeholder-title="Portrait to come"
          placeholder-hint="A professional portrait will complete this section before launch."
          aspect="aspect-[4/5]"
          class="mx-auto max-w-[17rem] sm:max-w-xs lg:max-w-none"
        />
      </div>

      <div>
        <!-- `measure` caps the line length. The column is wide enough on a
             large display to run to 150 characters otherwise, which is past
             the point where the eye reliably finds the next line. -->
        <div class="measure space-y-5">
          <p
            v-for="(paragraph, i) in about.paragraphs"
            :key="i"
            v-reveal="i * 60"
            class="leading-relaxed text-muted"
            :class="i === 0 ? 'text-lg text-ink sm:text-xl sm:leading-8' : 'text-base'"
          >
            {{ paragraph }}
          </p>
        </div>

        <div v-reveal="240" class="measure mt-8 border-t border-line pt-6">
          <h3 class="sr-only">Links and contact</h3>
          <SocialLinks :links="social" />
        </div>
      </div>

    </div>
  </SectionShell>
</template>
