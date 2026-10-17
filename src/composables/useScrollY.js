import { ref } from 'vue'

const scrollY = ref(typeof window !== 'undefined' ? window.scrollY : 0)
const docHeight = ref(0)
const winHeight = ref(0)

let initialized = false
let ticking = false

function measure() {
  docHeight.value = document.documentElement.scrollHeight
  winHeight.value = window.innerHeight
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    scrollY.value = window.scrollY
    ticking = false
  })
}

function init() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  measure()
  scrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure)
}

export function useScrollY() {
  init()
  return { scrollY, docHeight, winHeight }
}
