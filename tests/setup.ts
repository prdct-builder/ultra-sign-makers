// jsdom lacks a few browser APIs the site uses. (Skipped for tests that run in the node environment.)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false
    }) as MediaQueryList
}
if (typeof window !== 'undefined') {
  Element.prototype.scrollIntoView = () => {}
  window.scrollTo = (() => {}) as typeof window.scrollTo
}
