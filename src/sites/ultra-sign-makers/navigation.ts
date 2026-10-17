import type { Navigation } from '@/platform/site/types'

export const navigation: Navigation = {
  header: [
    { label: 'About', section: 'about' },
    { label: 'Services', section: 'products' },
    { label: 'Gallery', section: 'gallery' },
    { label: 'Reviews', section: 'reviews' },
    { label: 'FAQ', section: 'faq' },
    { label: 'Contact', section: 'contact' }
  ],
  callLabel: 'Call Now',
  footerColumns: [
    {
      title: 'Company',
      links: [
        { label: 'About', section: 'about' },
        { label: 'Services', section: 'products' },
        { label: 'Gallery', section: 'gallery' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Reviews', section: 'reviews' },
        { label: 'FAQ', section: 'faq' },
        { label: 'Contact', section: 'contact' }
      ]
    }
  ]
}
