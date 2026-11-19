<script setup lang="ts">
import CodePanel from '@/components/ui/CodePanel.vue'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import WindowFrame from '@/components/ui/WindowFrame.vue'
import type { Project } from '@/types/content'

/**
 * The visual half of a project card, in priority order:
 *   1. screenshot (`image.src`), framed as a browser window
 *   2. code view (`codeView`), framed as an editor window
 *   3. the labelled placeholder, so a missing asset is never silent
 */
const props = defineProps<{ project: Project }>()

/** Title bar for a screenshot: the demo's address if there is one. */
function screenshotTitle(): string {
  if (!props.project.demoUrl) return props.project.title
  return props.project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
</script>

<template>
  <figure
    v-if="project.image.src || project.codeView"
    class="code-stage flex h-full w-full flex-col justify-center p-4 sm:p-7 xl:p-10"
  >
    <WindowFrame v-if="project.image.src" :title="screenshotTitle()">
      <img
        :src="project.image.src"
        :srcset="project.image.srcset"
        sizes="(min-width: 1280px) 36rem, calc(100vw - 5rem)"
        :alt="project.image.alt"
        width="1600"
        height="1000"
        loading="lazy"
        decoding="async"
        class="block h-auto w-full"
      />
    </WindowFrame>
    <CodePanel v-else-if="project.codeView" :view="project.codeView" />

    <figcaption v-if="!project.image.src && project.codeView" class="mt-3 font-mono text-[0.6875rem] text-faint">
      <span aria-hidden="true">↳ </span>{{ project.codeView.source }}
    </figcaption>
  </figure>

  <MediaFrame
    v-else
    :src="null"
    :alt="project.image.alt"
    placeholder-title="Project visual coming soon"
    placeholder-hint="The case study is complete; a final project screenshot is still needed before launch."
    aspect="aspect-[16/10] xl:aspect-auto xl:h-full"
    class="rounded-none border-0"
  />
</template>
