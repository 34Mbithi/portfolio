<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import IconGlyph from '@/components/ui/IconGlyph.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { content } from '@/data/content'
import type { SectionId } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const navItems = content.nav
const { activeId } = useScrollSpy(navItems.map((item) => item.id))
const github = content.social.find((link) => link.icon === 'github' && link.href)
const resume = content.social.find((link) => link.icon === 'resume' && link.href)

const isMenuOpen = ref(false)
const hasScrolled = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const mobilePanel = ref<HTMLElement | null>(null)

function handleScroll(): void {
  hasScrolled.value = window.scrollY > 12
}

function closeMenu(returnFocus = false): void {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  if (returnFocus) void nextTick(() => menuButton.value?.focus())
}

function handleNavClick(id: SectionId): void {
  closeMenu()
  void nextTick(() => scrollToSection(id))
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeMenu(true)
}

function trapFocus(event: KeyboardEvent): void {
  if (event.key !== 'Tab' || !mobilePanel.value) return
  const focusable = Array.from(
    mobilePanel.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
  )
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable.at(-1)
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

function handleResize(): void {
  if (window.innerWidth >= 768) closeMenu()
}

watch(isMenuOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    mobilePanel.value?.querySelector<HTMLElement>('a[href]')?.focus()
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)]"
    :class="hasScrolled || isMenuOpen ? 'border-line bg-canvas/88 shadow-[0_8px_30px_-26px_var(--ink)] backdrop-blur-xl' : 'border-transparent bg-canvas/55 backdrop-blur-sm'"
  >
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <a
        href="#top"
        class="flex min-h-11 items-center gap-2 font-mono text-sm font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-accent-strong"
        @click.prevent="scrollToSection('top')"
      >
        <span class="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-[0.625rem] tracking-wider" aria-hidden="true">ME</span>
        <span>{{ content.footer.name }}</span><span class="text-accent" aria-hidden="true">.</span>
      </a>

      <div class="flex items-center gap-1.5">
        <nav aria-label="Primary navigation" class="hidden md:block">
          <ul class="flex items-center gap-0.5">
            <li v-for="item in navItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                :aria-current="activeId === item.id ? 'location' : undefined"
                class="nav-link relative flex min-h-10 items-center rounded-md px-2.5 text-xs font-medium transition-colors lg:px-3 lg:text-sm"
                :class="activeId === item.id ? 'text-ink' : 'text-muted hover:bg-raised hover:text-ink'"
                @click.prevent="handleNavClick(item.id)"
              >
                <span v-if="activeId === item.id" class="mr-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <a
          v-if="github?.href"
          :href="github.href"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in a new tab)"
          class="hidden h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink sm:inline-flex"
        >
          <IconGlyph name="github" :size="18" />
        </a>
        <a
          v-if="resume?.href"
          :href="resume.href"
          download
          class="hidden min-h-10 items-center rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink transition-colors hover:border-accent/60 sm:flex"
        >
          Résumé
        </a>
        <ThemeToggle />

        <button
          ref="menuButton"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-accent/50 hover:text-ink md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="h-5 w-5" aria-hidden="true">
            <path v-if="isMenuOpen" d="m6 6 12 12M18 6 6 18" />
            <path v-else d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <Transition enter-active-class="transition duration-250 ease-out" enter-from-class="opacity-0" leave-active-class="transition duration-200 ease-in" leave-to-class="opacity-0">
      <div v-if="isMenuOpen" class="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] md:hidden">
        <button class="absolute inset-0 h-full w-full cursor-default bg-ink/20 backdrop-blur-sm" tabindex="-1" aria-hidden="true" @click="closeMenu()" />
        <nav
          id="mobile-nav"
          ref="mobilePanel"
          aria-label="Mobile navigation"
          class="relative ml-auto flex h-full w-[min(100%,28rem)] flex-col border-l border-line bg-canvas px-5 py-7 shadow-2xl"
          @keydown="trapFocus"
        >
          <p class="font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">Navigate</p>
          <ul class="mt-4 divide-y divide-line border-y border-line">
            <li v-for="(item, index) in navItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                :aria-current="activeId === item.id ? 'location' : undefined"
                class="flex min-h-14 items-center justify-between rounded-sm px-1 text-lg font-medium text-ink transition-colors hover:text-accent-strong"
                @click.prevent="handleNavClick(item.id)"
              >
                <span>{{ item.label }}</span>
                <span class="font-mono text-xs text-faint">{{ String(index + 1).padStart(2, '0') }}</span>
              </a>
            </li>
          </ul>

          <div class="mt-auto flex items-center gap-3 pt-8">
            <a v-if="github?.href" :href="github.href" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-sm font-medium text-ink">
              <IconGlyph name="github" :size="17" /> GitHub
            </a>
            <a v-if="resume?.href" :href="resume.href" download class="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm font-medium text-ink">Résumé</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
