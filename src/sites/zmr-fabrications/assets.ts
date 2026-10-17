import { createAssetResolver } from '@/platform/assets'

/** asset('cover.png') → bundled URL of ./assets/cover.png, or undefined (placeholder) if missing. */
export const asset = createAssetResolver(import.meta.glob('./assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP}', { eager: true, import: 'default' }))
