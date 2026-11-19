<script setup lang="ts">
import { computed } from 'vue'

import WindowFrame from '@/components/ui/WindowFrame.vue'
import type { CodeView } from '@/types/content'
import { tokenize, type Tone } from '@/utils/highlight'

/** Renders a CodeView as an editor-style window. */
const props = defineProps<{ view: CodeView }>()

const blocks = computed(() =>
  props.view.blocks.map((block) => ({
    ...block,
    lines: tokenize(block.code),
  })),
)

// Tuned for the always-dark window; each clears 4.5:1 on --footer.
const toneClass: Record<Tone, string> = {
  plain: 'text-footer-ink/85',
  string: 'text-[oklch(0.82_0.11_187)]',
  number: 'text-[oklch(0.84_0.1_75)]',
  method: 'font-semibold text-[oklch(0.82_0.11_187)]',
  keyword: 'text-[oklch(0.8_0.09_290)]',
  comment: 'text-footer-ink/60',
  punct: 'text-footer-ink/60',
}

function statusClass(code: number): string {
  return code >= 400
    ? 'border-[oklch(0.68_0.17_25/0.5)] bg-[oklch(0.68_0.17_25/0.15)] text-[oklch(0.82_0.1_25)]'
    : 'border-[oklch(0.78_0.14_187/0.45)] bg-[oklch(0.78_0.14_187/0.12)] text-[oklch(0.84_0.11_187)]'
}
</script>

<template>
  <WindowFrame :title="view.title">
    <div v-for="(block, i) in blocks" :key="i" :class="i > 0 ? 'border-t border-white/10' : ''">
      <div v-if="block.label || block.status" class="flex items-center gap-2 px-4 pt-3">
        <span v-if="block.label" class="font-mono text-[0.6875rem] text-footer-ink/60">
          {{ block.label }}
        </span>
        <span
          v-if="block.status"
          class="rounded border px-1.5 py-px font-mono text-[0.625rem] font-medium"
          :class="statusClass(block.status.code)"
        >
          {{ block.status.code }} {{ block.status.text }}
        </span>
      </div>
      <!-- tabindex: a horizontally scrollable region must be keyboard-reachable. -->
      <pre
        class="overflow-x-auto px-4 py-3 font-mono text-[0.6875rem] leading-[1.7] sm:text-xs"
        tabindex="0"
        :aria-label="block.label ? `${view.title} — ${block.label}` : view.title"
      ><code><template v-for="(line, l) in block.lines" :key="l"><span
        v-for="(token, t) in line"
        :key="t"
        :class="toneClass[token.tone]"
      >{{ token.text }}</span>{{ l < block.lines.length - 1 ? '\n' : '' }}</template></code></pre>
    </div>
  </WindowFrame>
</template>
