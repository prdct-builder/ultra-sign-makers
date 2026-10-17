import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'usm-color-scheme'

const isDark = ref(false)
let initialized = false

function applyClass(dark) {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}

function initDarkMode() {
  if (initialized) return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyClass(isDark.value)

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      isDark.value = e.matches
    }
  })

  watchEffect(() => {
    applyClass(isDark.value)
  })
}

function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

export function useDarkMode() {
  initDarkMode()
  return { isDark, toggleDarkMode }
}
