import type { Directive } from 'vue'

/**
 * `v-reveal` — fades and lifts an element into place the first time it enters
 * the viewport. Pass a number to stagger it: `v-reveal="120"` delays by 120ms.
 *
 * Elements that cross the threshold together are treated as one group and
 * cascade in document order, so a row of cards arrives one after another
 * without every call site hand-numbering its children. An explicit delay always
 * wins over the automatic one.
 *
 * One shared IntersectionObserver serves every element on the page, and each
 * element is unobserved after firing. Reveal is a one-shot effect; re-animating
 * on every scroll-past is the thing that makes these feel cheap.
 */

/** Gap between elements revealing as a group. */
const STAGGER_MS = 70
/** Caps the cascade so the tail of a long list is not left waiting on it. */
const MAX_STAGGER_STEPS = 5

let observer: IntersectionObserver | null = null

/** Elements given a delay at the call site. Excluded from the auto-cascade. */
const hasOwnDelay = new WeakSet<HTMLElement>()

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Sorts into document order — observer entries arrive in no useful order. */
function inDocumentOrder(a: Element, b: Element): number {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
}

function reveal(entries: IntersectionObserverEntry[]): void {
  const arriving = entries
    .filter((entry) => entry.isIntersecting)
    .map((entry) => entry.target as HTMLElement)
    .sort(inDocumentOrder)

  let step = 0

  for (const el of arriving) {
    if (!hasOwnDelay.has(el)) {
      const delay = Math.min(step, MAX_STAGGER_STEPS) * STAGGER_MS
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      step += 1
    }

    // Same tick as the property above, so the delay is in the computed style by
    // the time the transition starts.
    el.classList.add('is-visible')
    observer?.unobserve(el)
  }
}

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(reveal, {
    // Fire slightly before the element is fully on screen so the motion has
    // finished by the time it reaches comfortable reading position.
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08,
  })

  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    // No observer support, or the user asked for less motion: show immediately.
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      el.classList.add('reveal', 'is-visible')
      return
    }

    el.classList.add('reveal')

    if (typeof binding.value === 'number' && binding.value > 0) {
      hasOwnDelay.add(el)
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}

/* -------------------------------------------------------------------------
   v-reveal-text — the same entrance, one word at a time.
------------------------------------------------------------------------- */

/** Gap between consecutive words. Short: the line should resolve, not crawl. */
const WORD_STAGGER_MS = 38
/**
 * Ceiling on the cascade. A ten-word heading whose last word waits 380ms is
 * fine; a thirty-word one whose last word waits 1.1s is a reader staring at a
 * half-drawn sentence. Past this many words the tail arrives together.
 */
const MAX_WORD_STEPS = 12

/**
 * Rewrites `el`'s text as one `<span class="word">` per word, preserving the
 * whitespace between them as real text nodes so the heading still wraps
 * naturally at any width.
 *
 * Element children (a `<span>` inside the heading, say) are wrapped whole
 * rather than descended into — they are there to style a phrase, and splitting
 * them would throw that styling away.
 */
function splitIntoWords(el: HTMLElement): void {
  const out: Node[] = []

  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE) {
      const wrapper = document.createElement('span')
      wrapper.className = 'word'
      wrapper.appendChild(node)
      out.push(wrapper)
      continue
    }

    // Split on whitespace but keep it: the separators become text nodes, which
    // is what lets the browser break the line where it wants to.
    for (const part of (node.textContent ?? '').split(/(\s+)/)) {
      if (part === '') continue

      if (/^\s+$/.test(part)) {
        out.push(document.createTextNode(part))
      } else {
        const word = document.createElement('span')
        word.className = 'word'
        word.textContent = part
        out.push(word)
      }
    }
  }

  el.replaceChildren(...out)
}

export const vRevealText: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      el.classList.add('reveal-text', 'is-visible')
      return
    }

    splitIntoWords(el)
    el.classList.add('reveal-text')

    // Screen readers get the heading as one string. Without this, splitting
    // into spans makes some of them announce it word by word.
    const label = el.textContent?.trim()
    if (label) el.setAttribute('aria-label', label)

    const base = typeof binding.value === 'number' ? binding.value : 0
    const words = el.querySelectorAll<HTMLElement>('.word')

    words.forEach((word, i) => {
      const step = Math.min(i, MAX_WORD_STEPS)
      word.style.setProperty('--word-delay', `${base + step * WORD_STAGGER_MS}ms`)
    })

    // This element animates its own children, so the group cascade in `reveal`
    // must not also delay it — the two would compound.
    hasOwnDelay.add(el)

    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}
