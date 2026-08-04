<script setup lang="ts">
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { content } from '@/data/content'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line bg-surface">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-6 px-6 py-10 sm:px-8 md:flex-row"
    >
      <div class="text-center md:text-left">
        <p class="text-sm text-muted">
          &copy; {{ year }} {{ content.footer.name }}. All rights reserved.
        </p>
        <p class="mt-1 font-mono text-xs text-faint">{{ content.footer.note }}</p>
      </div>

      <SocialLinks :links="content.social" variant="compact" />
    </div>
  </footer>
</template>
