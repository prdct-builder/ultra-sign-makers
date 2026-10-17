/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { discoverSites, multiSite } from './build/multi-site'

/** Site used by `npm run dev` at localhost:3000/ and by builds when SITE isn't set. */
const DEFAULT_SITE = 'ultra-sign-makers'

export default defineConfig(async ({ command }) => {
  const sites = await discoverSites()
  const activeId = process.env.SITE || DEFAULT_SITE

  return {
    plugins: [vue(), multiSite({ sites, activeId, command })],
    publicDir: `src/sites/${activeId}/public`,
    // Camera and phone exports often use upper-case extensions.
    assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP'],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: `dist/${activeId}`,
      emptyOutDir: true
    },
    server: {
      port: 3000
    },
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.test.ts'],
      setupFiles: ['tests/setup.ts']
    }
  }
})
