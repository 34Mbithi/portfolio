import { readonly, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * Module-level state, deliberately. Theme is a single global fact about the
 * page — every consumer of `useTheme()` shares this ref rather than each
 * component owning a copy that could drift out of sync.
 */
const theme = ref<Theme>(readInitialTheme())

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  // The inline script in index.html has already resolved stored preference vs.
  // OS preference and applied the class. Trust it rather than re-deriving.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function apply(next: Theme): void {
  document.documentElement.classList.toggle('dark', next === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Private browsing or storage disabled — the theme still applies for this
    // session, it just will not be remembered. Not worth surfacing to the user.
  }
}

export function useTheme() {
  function setTheme(next: Theme): void {
    theme.value = next
    apply(next)
  }

  function toggleTheme(): void {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
  }
}
