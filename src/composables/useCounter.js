import { ref, onMounted, onUnmounted } from 'vue'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * Animates a number from 0 -> target once the given element scrolls into view.
 */
export function useCounter(target, { duration = 1800 } = {}) {
  const el = ref(null)
  const value = ref(0)
  let hasRun = false
  let observer

  function run() {
    if (hasRun) return
    hasRun = true

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      value.value = target
      return
    }

    const start = performance.now()
    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      value.value = Math.round(target * easeOutExpo(progress))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) run()
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer && observer.disconnect()
  })

  return { el, value }
}
