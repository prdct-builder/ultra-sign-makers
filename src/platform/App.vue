<script setup lang="ts">
import { useSite } from './site/useSite'
import { useSeo } from './composables/useSeo'
import type { PageConfig } from './site/types'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import ScrollProgress from './components/layout/ScrollProgress.vue'
import BackToTop from './components/layout/BackToTop.vue'

const { features } = useSite().config
useSeo()

// Keyed by page so moving between sections of one page never remounts it.
const pageKey = (meta: Record<string, unknown>, fullPath: string) => (meta.page as PageConfig | undefined)?.path ?? fullPath
</script>

<template>
  <a href="#main" class="sr-only z-[70] rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
    Skip to content
  </a>
  <ScrollProgress v-if="features.scrollProgress" />
  <Navbar />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="pageKey(route.meta, route.fullPath)" />
    </RouterView>
  </main>
  <Footer />
  <BackToTop v-if="features.backToTop" />
</template>
