/**
 * Scrolls to a section by id and moves keyboard focus there.
 *
 * The focus step is the part people skip. Without it, a keyboard user presses
 * "View Projects", the page scrolls, and their next Tab continues from the
 * button they just left — stranding them at the top of the document.
 */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })

  // Sections are not natively focusable, so borrow focus without adding the
  // element to the tab order permanently.
  const hadTabIndex = target.hasAttribute('tabindex')
  if (!hadTabIndex) target.setAttribute('tabindex', '-1')

  target.focus({ preventScroll: true })

  if (!hadTabIndex) {
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
}
