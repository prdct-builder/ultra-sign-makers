/** localStorage key for a site's light/dark choice, so each site remembers its own. */
export function storageKeyFor(siteId: string) {
  return `${siteId}-color-scheme`
}
