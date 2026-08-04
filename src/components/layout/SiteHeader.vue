<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { content } from '@/data/content'
import type { SectionId } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const navItems = content.nav
const { activeId } = useScrollSpy(navItems.map((item) => item.id))

const isMenuOpen = ref(false)
const hasScrolled = ref(false)

function handleScroll(): void {
  hasScrolled.value = window.scrollY > 12
}

function handleNavClick(id: SectionId): void {
  isMenuOpen.value = false
  scrollToSection(id)
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') isMenuOpen.value = false
}

// Stop the page behind the mobile panel from scrolling while it is open.
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="hasScrolled ? 'border-b border-line bg-canvas/85 backdrop-blur-md' : 'border-b border-transparent'"
  >
    <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
      <!-- Wordmark -->
      <a
        href="#top"
        class="font-mono text-sm font-medium text-ink transition-colors hover:text-accent-strong"
        @click.prevent="scrollToSection('top')"
      >
        {{ content.footer.name }}<span class="text-accent">.</span>
      </a>

      <div class="flex items-center gap-2">
        <!-- Desktop navigation -->
        <nav aria-label="Section navigation" class="hidden md:block">
          <ul class="flex items-center gap-1">
            <li v-for="item in navItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                :aria-current="activeId === item.id ? 'true' : undefined"
                class="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200"
                :class="
                  activeId === item.id
                    ? 'text-accent-strong'
                    : 'text-muted hover:bg-raised hover:text-ink'
                "
                @click.prevent="handleNavClick(item.id)"
              >
                {{ item.label }}
                <span
                  v-if="activeId === item.id"
                  class="absolute inset-x-3 -bottom-px h-px bg-accent"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </nav>

        <ThemeToggle />

        <!-- Mobile menu trigger -->
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-ink md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            class="h-5 w-5"
            aria-hidden="true"
          >
            <template v-if="isMenuOpen">
              <path d="m6 6 12 12M18 6 6 18" />
            </template>
            <template v-else>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </template>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile navigation panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="isMenuOpen"
        id="mobile-nav"
        aria-label="Section navigation"
        class="border-b border-line bg-canvas md:hidden"
      >
        <ul class="mx-auto max-w-6xl px-6 py-3 sm:px-8">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              :aria-current="activeId === item.id ? 'true' : undefined"
              class="block rounded-lg px-3 py-3 text-sm font-medium transition-colors"
              :class="
                activeId === item.id ? 'bg-accent-soft text-accent-strong' : 'text-muted hover:text-ink'
              "
              @click.prevent="handleNavClick(item.id)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
