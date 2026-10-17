const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const observer =
  typeof window !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      )
    : null

/**
 * v-reveal directive: fades/slides an element in once it enters the viewport.
 * Usage: v-reveal  |  v-reveal="120" (delay ms)  |  v-reveal="{ delay: 80, type: 'up' | 'fade' | 'scale' }"
 */
export const vReveal = {
  mounted(el, binding) {
    const opts = typeof binding.value === 'number' ? { delay: binding.value } : binding.value || {}
    const type = opts.type || 'up'
    const delay = opts.delay || 0

    if (prefersReducedMotion) {
      el.classList.add('is-visible')
      return
    }

    el.classList.add(type === 'fade' ? 'reveal' : type === 'scale' ? 'reveal-scale' : 'reveal-up')
    if (delay) el.style.animationDelay = `${delay}ms`
    observer.observe(el)
  }
}
