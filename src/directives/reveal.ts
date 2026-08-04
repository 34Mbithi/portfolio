import type { Directive } from 'vue'

/**
 * `v-reveal` — fades and lifts an element into place the first time it enters
 * the viewport. Pass a number to stagger it: `v-reveal="120"` delays by 120ms.
 *
 * One shared IntersectionObserver serves every element on the page, and each
 * element is unobserved after firing. Reveal is a one-shot effect; re-animating
 * on every scroll-past is the thing that makes these feel cheap.
 */

let observer: IntersectionObserver | null = null

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    // Fire slightly before the element is fully on screen so the motion has
    // finished by the time it reaches comfortable reading position.
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

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
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    getObserver().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}
