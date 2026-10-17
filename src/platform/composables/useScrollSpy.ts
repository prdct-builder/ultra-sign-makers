import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { anchorToPath, isSpyPaused, replaceWithoutScroll } from '../router'

const SPY_OFFSET = 140

/**
 * Keeps the URL in sync with the section in view (/about, /contact …) while
 * scrolling the home page, without adding history entries.
 */
export function useScrollSpy(anchors: string[]) {
  const router = useRouter()
  let ticking = false

  function update() {
    if (!anchors.length || isSpyPaused()) return
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

    let current = anchors[0]
    if (atBottom) {
      current = anchors[anchors.length - 1]
    } else {
      for (const id of anchors) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - SPY_OFFSET <= 0) current = id
        else break
      }
    }
    replaceWithoutScroll(router, anchorToPath(current, anchors[0]))
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      update()
      ticking = false
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
}
