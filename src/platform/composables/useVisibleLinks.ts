import type { NavLink } from '../site/types'
import { useSite } from '../site/useSite'
import { homeAnchors } from '../sections'

/** Drops links to home-page sections that aren't rendered (e.g. Reviews with no reviews yet). */
export function useVisibleLinks() {
  const { config } = useSite()
  const anchors = new Set(homeAnchors(config))
  const visible = (links: NavLink[]) => links.filter((link) => !('section' in link) || anchors.has(link.section))
  return { visible }
}
