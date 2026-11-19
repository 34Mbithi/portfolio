<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { tokenize, type Tone } from '@/utils/highlight'

/**
 * The hero's signature moment: one request travelling through the stack.
 *
 * A request to the Versioned Product API types out, the Client → API → Data
 * path lights up hop by hop, and the response settles in. The request is a
 * real one (`price` is in that API's sort allowlist) and the response is
 * shaped like its ProductResource; the field values are illustrative.
 *
 * Plays once when scrolled into view. Under reduced motion it renders the
 * finished state straight away. No animation library — a timer sequence and
 * CSS transitions.
 */

const METHOD = 'GET'
const PATH = '/api/v1/products?sort=-price'
const RESPONSE = `{
  "data": [{ "id": 12, "price": "499.99" }],
  "meta": { "current_page": 1, "per_page": 15 }
}`

const NODES = [
  { key: 'client', label: 'Client', value: 'Vue / React' },
  { key: 'api', label: 'API', value: 'Laravel / Flask' },
  { key: 'data', label: 'Data', value: 'SQL' },
] as const

/** 0 idle · 1 typing · 2 client · 3 api · 4 data · 5 response */
const step = ref(0)
const typed = ref(0)
const reducedMotion = ref(false)
const root = ref<HTMLElement | null>(null)

const responseLines = tokenize(RESPONSE)
const visiblePath = computed(() => PATH.slice(0, typed.value))
const done = computed(() => step.value >= 5)

let run = 0
let observer: IntersectionObserver | null = null

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function finish(): void {
  typed.value = PATH.length
  step.value = 5
}

async function play(): Promise<void> {
  if (reducedMotion.value) return finish()

  // Each play gets an id; a newer play (Replay) makes an older one bail out.
  const id = ++run
  step.value = 1
  typed.value = 0

  for (let i = 1; i <= PATH.length; i++) {
    await wait(i === 1 ? 250 : 28)
    if (id !== run) return
    typed.value = i
  }

  for (const next of [2, 3, 4, 5]) {
    await wait(next === 2 ? 260 : 340)
    if (id !== run) return
    step.value = next
  }
}

function replay(): void {
  void play()
}

function nodeState(index: number): 'idle' | 'current' | 'visited' {
  const reached = step.value - 2 // node 0 is reached at step 2
  if (step.value >= 5 || index < reached) return 'visited'
  return index === reached ? 'current' : 'idle'
}

const toneClass: Record<Tone, string> = {
  plain: 'text-ink',
  string: 'text-accent-strong',
  number: 'text-ink',
  method: 'font-semibold text-accent-strong',
  keyword: 'text-accent-strong',
  comment: 'text-faint',
  punct: 'text-faint',
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion.value || typeof IntersectionObserver === 'undefined' || !root.value) {
    finish()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer?.disconnect()
      observer = null
      // Let the panel's own reveal settle before the request starts.
      window.setTimeout(() => void play(), 650)
    },
    { threshold: 0.5 },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  run++ // cancels any sequence in flight
  observer?.disconnect()
})
</script>

<template>
  <div ref="root">
    <p class="sr-only">
      Example: a {{ METHOD }} request to {{ PATH }} goes from the client, through the API, to the
      database, and returns 200 OK with the products and pagination details.
    </p>

    <div aria-hidden="true">
      <!-- Request line -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-2 rounded-md border border-line bg-raised px-2.5 py-2 font-mono text-[0.6875rem]">
          <span class="font-semibold text-accent-strong">{{ METHOD }}</span>
          <span class="min-w-0 truncate text-ink">{{ visiblePath }}<span
            v-if="step === 1"
            class="api-caret ml-px inline-block h-[1em] w-[0.45em] translate-y-[0.15em] bg-accent"
          /></span>
        </div>
        <button
          v-if="!reducedMotion"
          type="button"
          tabindex="-1"
          class="shrink-0 rounded-md px-2 py-1.5 font-mono text-[0.625rem] tracking-wider text-faint uppercase transition-colors hover:bg-raised hover:text-ink disabled:opacity-0"
          :disabled="!done"
          @click="replay"
        >
          Replay ↻
        </button>
      </div>

      <!-- Client → API → Data -->
      <div class="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <template v-for="(node, i) in NODES" :key="node.key">
          <div class="tech-node api-node" :data-state="nodeState(i)">
            <span>{{ node.label }}</span><strong>{{ node.value }}</strong>
          </div>
          <span
            v-if="i < NODES.length - 1"
            class="api-arrow text-faint"
            :data-on="step >= i + 3 ? 'true' : 'false'"
          >→</span>
        </template>
      </div>

      <!-- Response -->
      <div class="api-response mt-4 rounded-md border border-line bg-raised" :data-on="done ? 'true' : 'false'">
        <div class="flex items-center justify-between border-b border-line px-3 py-2">
          <span class="font-mono text-[0.625rem] tracking-wider text-faint uppercase">Response</span>
          <span class="rounded border border-accent/40 bg-accent-soft px-1.5 py-px font-mono text-[0.625rem] font-medium text-accent-strong">
            200 OK
          </span>
        </div>
        <pre class="overflow-x-auto px-2.5 py-2.5 font-mono max-sm:whitespace-pre-wrap text-[0.625rem] leading-[1.65] sm:text-[0.6875rem]"><code><template v-for="(line, l) in responseLines" :key="l"><span
          v-for="(token, t) in line"
          :key="t"
          :class="toneClass[token.tone]"
        >{{ token.text }}</span>{{ l < responseLines.length - 1 ? '\n' : '' }}</template></code></pre>
      </div>
    </div>
  </div>
</template>
