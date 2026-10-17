import { ref, watchEffect } from 'vue'
import { storageKeyFor } from '../theme/colorSchemeKey'

const isDark = ref(false)
const enabled = ref(true)
let storageKey = 'color-scheme'
let initialized = false

function applyClass(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}

function readStored(): string | null {
  try {
    return localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

/** Call once before mounting. */
export function configureDarkMode(siteId: string, isEnabled: boolean) {
  storageKey = storageKeyFor(siteId)
  enabled.value = isEnabled
}

function initDarkMode() {
  if (initialized) return
  initialized = true

  if (!enabled.value) {
    isDark.value = false
    applyClass(false)
    return
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const stored = readStored()
  isDark.value = stored ? stored === 'dark' : media.matches
  applyClass(isDark.value)

  media.addEventListener('change', (e) => {
    if (!readStored()) isDark.value = e.matches
  })

  watchEffect(() => applyClass(isDark.value))
}

function toggleDarkMode() {
  if (!enabled.value) return
  isDark.value = !isDark.value
  try {
    localStorage.setItem(storageKey, isDark.value ? 'dark' : 'light')
  } catch {
    // Storage blocked (private mode) — the choice just won't persist.
  }
}

export function useDarkMode() {
  initDarkMode()
  return { isDark, toggleDarkMode, enabled }
}
