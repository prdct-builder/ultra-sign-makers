export interface ResolvableSite {
  id: string
  domains: string[]
}

export type Resolution =
  | { status: 'found'; siteId: string; /** Router base: '/' or '/<id>/' in path mode. */ base: string; via: 'path' | 'domain' | 'default' }
  | { status: 'unknown'; requested: string | null }

export interface ResolveInput {
  hostname: string
  pathname: string
  sites: ResolvableSite[]
  /** The site this build was made for. In a production build there is exactly one site and this is it. */
  defaultSiteId: string | null
  /** Whether the first path segment may select a site (dev / multi-site preview). */
  allowPathPrefix: boolean
}

function normaliseHost(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, '')
}

/**
 * Picks the active site. Order: path prefix (localhost:3000/<id>) → domain → build default.
 * Pure function so it can be unit-tested and reused by SSR later without shared state.
 */
export function resolveSite({ hostname, pathname, sites, defaultSiteId, allowPathPrefix }: ResolveInput): Resolution {
  const firstSegment = pathname.split('/').filter(Boolean)[0] ?? null

  if (allowPathPrefix && firstSegment) {
    const byPath = sites.find((s) => s.id === firstSegment)
    if (byPath) return { status: 'found', siteId: byPath.id, base: `/${byPath.id}/`, via: 'path' }
  }

  const host = normaliseHost(hostname)
  const byDomain = sites.find((s) => s.domains.some((d) => normaliseHost(d) === host))
  if (byDomain) return { status: 'found', siteId: byDomain.id, base: '/', via: 'domain' }

  if (defaultSiteId && sites.some((s) => s.id === defaultSiteId)) {
    return { status: 'found', siteId: defaultSiteId, base: '/', via: 'default' }
  }

  return { status: 'unknown', requested: firstSegment ?? hostname }
}
