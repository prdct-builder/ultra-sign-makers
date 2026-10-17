import type { ProductsContent } from '@/platform/site/types'
import { asset } from '../assets'

// Images resolve from assets/products/; a placeholder shows for any that are missing.
export const products: ProductsContent = {
  eyebrow: 'Our services',
  heading: { before: 'Signage Solutions That ', highlight: 'Elevate Your Brand' },
  ctaLabel: 'Call for a quote',
  items: [
    {
      image: asset('products/3d-acrylic-letters.webp'),
      title: '3D Acrylic Letter Signboards',
      description:
        'Dimensional acrylic lettering that gives your business name depth and a clean, modern look. A popular choice for retail stores, showrooms, clinics and offices that want a sharp first impression, available in sizes and styles to match your brand.'
    },
    {
      image: asset('products/acp-elevation.webp'),
      title: 'ACP Elevation Works',
      description:
        'Commercial facade cladding and elevation signage that transforms the front of your building. Well suited for shopping complexes, showrooms, hospitals, institutions and commercial properties looking for a polished, branded exterior.'
    },
    {
      image: asset('products/stainless-steel-letters.webp'),
      title: 'Stainless Steel Letter Signs',
      description:
        'Stainless steel letters with a refined metallic finish for a premium, lasting presence. Ideal for corporate offices, jewellery showrooms, hotels and brands that want a classy identity at the entrance.'
    },
    {
      image: asset('products/liquid-letters.webp'),
      title: 'Liquid Letter Signs',
      description:
        'Glossy, smooth-finish letters that give your signboard a distinctive, contemporary look. A stylish option for cafés, boutiques, salons and showrooms looking to stand out from the crowd.'
    },
    {
      image: asset('products/aluminium-channel-letters.webp'),
      title: 'Aluminium Channel Letter Signs',
      description:
        'Channel letters fabricated in aluminium for bold, well-defined signage that reads clearly from the street. Suited to storefronts, restaurants, franchises and commercial establishments that need strong visibility, day and night.'
    },
    {
      image: asset('products/led-signboards.webp'),
      title: 'LED Signboards',
      description:
        'Illuminated signboards that keep your brand visible after dark. From shop name boards to branded display signs, our LED signage helps restaurants, hospitals, hotels and retail outlets attract attention around the clock.'
    },
    {
      image: asset('products/in-shop-branding.webp'),
      title: 'In-Shop Branding',
      description:
        'Interior signage and branding that carries your identity inside the store. Wall graphics, display branding and directional signs help create a consistent brand experience for retail spaces, clinics and offices.'
    },
    {
      image: asset('products/custom-signage.webp'),
      title: 'Custom Signage Solutions',
      description:
        'Have a signage idea that does not fit a standard format? Share your requirement and we will discuss custom business signboards, promotional displays and branding solutions made specifically for your business.'
    }
  ]
}
