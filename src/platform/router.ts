import { createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'
import type { SiteConfig } from './site/types'
import { homeAnchors } from './sections'
import PageView from './components/PageView.vue'
import NotFound from './components/NotFound.vue'

/** The hero's anchor maps to '/', every other home-page section to '/<anchor>'. */
export function anchorToPath(anchor: string, homeAnchor: string | undefined): string {
  return anchor === homeAnchor ? '/' : `/${anchor}`
}

let spyPausedUntil = 0

/** True while a click-triggered smooth scroll is running, so the scroll spy doesn't rewrite the URL mid-way. */
export function isSpyPaused() {
  return Date.now() < spyPausedUntil
}

/**
 * Update the URL without scrolling — used by the scroll spy as you scroll past sections.
 * The navigation itself is tagged (in history state) rather than using a shared flag, so
 * overlapping updates while scrolling fast can never trigger a jump to a section.
 */
export function replaceWithoutScroll(router: Router, path: string) {
  if (router.currentRoute.value.path === path) return
  router.replace({ path, state: { fromScrollSpy: true } }).catch(() => {})
}

function isScrollSpyNavigation(): boolean {
  return typeof window !== 'undefined' && window.history.state?.fromScrollSpy === true
}

/** Elements appear after the first render, so wait a few frames for the target. */
function whenElement(id: string, frames = 30): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const tick = (left: number) => {
      const el = document.getElementById(id)
      if (el || left === 0) return resolve(el)
      requestAnimationFrame(() => tick(left - 1))
    }
    tick(frames)
  })
}

export function scrollToAnchor(id: string, smooth = true) {
  spyPausedUntil = Date.now() + (smooth ? 800 : 100)
  return whenElement(id).then((el) => el?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }))
}

export function createSiteRouter(site: SiteConfig, base: string): Router {
  const anchors = homeAnchors(site)
  const homeAnchor = anchors[0]

  const routes: RouteRecordRaw[] = site.pages
    .filter((p) => p.path !== '/')
    .map((page) => ({ path: page.path, component: PageView, meta: { page } }))

  const home = site.pages.find((p) => p.path === '/')
  if (home) {
    // One record for '/' and '/<section>', so moving between sections never remounts the page.
    routes.push({
      path: '/:section?',
      component: PageView,
      meta: { page: home },
      beforeEnter: (to) => {
        const section = to.params.section as string | undefined
        if (!section || (anchors.includes(section) && section !== homeAnchor)) return true
        return { name: 'not-found', params: { pathMatch: to.path.split('/').filter(Boolean) } }
      }
    })
  }
  routes.push({ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound })

  return createRouter({
    history: createWebHistory(base),
    routes,
    scrollBehavior(to, from, saved) {
      // Back/forward restores where you were; scroll-spy URL updates never move the page.
      if (saved) return saved
      if (isScrollSpyNavigation()) return false
      const section = to.params.section as string | undefined
      const firstLoad = from.matched.length === 0
      if (section) {
        scrollToAnchor(section, !firstLoad)
        return false
      }
      if (to.meta.page === home && from.meta.page === home && !firstLoad && homeAnchor) {
        scrollToAnchor(homeAnchor)
        return false
      }
      return { top: 0 }
    }
  })
}
