import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which section is currently in view so the nav can highlight it.
 *
 * Uses a narrow horizontal band near the top of the viewport as the observer
 * root rather than "is any part visible" — with tall sections, several are on
 * screen at once, and only the one the reader is actually looking at should
 * light up.
 */
export function useScrollSpy(sectionIds: readonly string[]) {
  const activeId = ref<string | null>(null)

  let observer: IntersectionObserver | null = null
  const intersecting = new Set<string>()

  /**
   * The last section is often shorter than the viewport, so it can never reach
   * the detection band. Once the page is scrolled to the bottom, force it.
   */
  function handleScrollEdge(): void {
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

    if (atBottom) {
      const last = sectionIds.at(-1)
      if (last) activeId.value = last
      return
    }

    // Above the first section (i.e. still in the hero) nothing should be active.
    if (window.scrollY < 8) activeId.value = null
  }

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id)
          else intersecting.delete(entry.target.id)
        }

        // Resolve in document order so overlaps settle predictably.
        const current = sectionIds.find((id) => intersecting.has(id))
        if (current) activeId.value = current
      },
      { rootMargin: '-24% 0px -68% 0px', threshold: 0 },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    window.addEventListener('scroll', handleScrollEdge, { passive: true })
    handleScrollEdge()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    intersecting.clear()
    window.removeEventListener('scroll', handleScrollEdge)
  })

  return { activeId }
}
