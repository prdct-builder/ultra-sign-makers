import { watch } from 'vue'
import { useRoute } from 'vue-router'
import type { PageConfig } from '../site/types'
import { useSite } from '../site/useSite'

export function pageTitle(siteName: string, defaultTitle: string, page?: PageConfig): string {
  return page?.title ? `${page.title} — ${siteName}` : defaultTitle
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Keeps the title and description in step with the current page. */
export function useSeo() {
  const route = useRoute()
  const { config } = useSite()

  watch(
    () => route.meta.page as PageConfig | undefined,
    (page) => {
      const notFound = route.name === 'not-found'
      const title = notFound ? `Page not found — ${config.name}` : pageTitle(config.name, config.seo.title, page)
      const description = page?.description ?? config.seo.description
      document.title = title
      setMeta('meta[name="description"]', 'name', 'description', description)
      setMeta('meta[property="og:title"]', 'property', 'og:title', title)
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    },
    { immediate: true }
  )
}
