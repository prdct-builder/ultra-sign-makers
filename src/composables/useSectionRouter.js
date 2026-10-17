import { onMounted, onUnmounted } from 'vue'

const SECTION_IDS = ['home', 'about', 'products', 'why-us', 'gallery', 'reviews', 'faq', 'contact']

function idToPath(id) {
  return id === 'home' ? '/' : `/${id}`
}

function pathToId(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '')
  if (!clean) return 'home'
  return SECTION_IDS.includes(clean) ? clean : null
}

/**
 * Keeps the URL as a clean path (/contact) instead of a hash (#contact) while
 * this is really a single scrolling page — intercepts in-page anchor clicks,
 * smooth-scrolls to the target section, and syncs the address bar via the
 * History API. Also supports deep-linking (loading /contact directly) and
 * back/forward navigation, and keeps the URL in sync while scrolling.
 */
const SPY_OFFSET = 140

export function useSectionRouter() {
  let suppressSpy = false
  let suppressTimeout
  let ticking = false

  function scrollToId(id, { smooth = true, pushHistory = true } = {}) {
    const el = document.getElementById(id)
    if (!el) return

    suppressSpy = true
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })

    if (pushHistory) {
      const path = idToPath(id)
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path)
      }
    }

    clearTimeout(suppressTimeout)
    suppressTimeout = setTimeout(
      () => {
        suppressSpy = false
        updateActiveFromScroll()
      },
      smooth ? 700 : 50
    )
  }

  function updateActiveFromScroll() {
    if (suppressSpy) return

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

    let currentId = SECTION_IDS[0]
    if (atBottom) {
      currentId = SECTION_IDS[SECTION_IDS.length - 1]
    } else {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - SPY_OFFSET <= 0) {
          currentId = id
        } else {
          break
        }
      }
    }

    const path = idToPath(currentId)
    if (window.location.pathname !== path) {
      window.history.replaceState(null, '', path)
    }
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      updateActiveFromScroll()
      ticking = false
    })
  }

  function onDocumentClick(event) {
    const anchor = event.target.closest('a[href^="#"]')
    if (!anchor) return
    const id = anchor.getAttribute('href').slice(1)
    if (!SECTION_IDS.includes(id)) return
    event.preventDefault()
    scrollToId(id)
  }

  function onPopState() {
    const id = pathToId(window.location.pathname) || 'home'
    scrollToId(id, { pushHistory: false })
  }

  onMounted(() => {
    document.addEventListener('click', onDocumentClick)
    window.addEventListener('popstate', onPopState)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateActiveFromScroll)

    const initialId = pathToId(window.location.pathname)
    if (initialId && initialId !== 'home') {
      requestAnimationFrame(() => scrollToId(initialId, { smooth: false, pushHistory: false }))
    } else {
      updateActiveFromScroll()
    }
  })

  onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick)
    window.removeEventListener('popstate', onPopState)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', updateActiveFromScroll)
    clearTimeout(suppressTimeout)
  })
}
