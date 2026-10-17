/**
 * Builds a lookup for a site's bundled images. Pass the result of
 * `import.meta.glob('./assets/**', { eager: true, import: 'default' })` from the site folder.
 *
 * Missing files return `undefined`, which components render as a placeholder,
 * so a site still builds and runs before its photos are added.
 */
export function createAssetResolver(files: Record<string, unknown>, root = './assets/') {
  return function asset(name: string): string | undefined {
    const url = files[root + name]
    if (typeof url === 'string') return url
    if (import.meta.env?.DEV && import.meta.env.MODE !== 'test') console.warn(`[site assets] "${name}" not found in ${root} — showing a placeholder.`)
    return undefined
  }
}
