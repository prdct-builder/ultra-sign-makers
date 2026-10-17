<script setup>
import { Phone, MapPin, Clock, Pin, Mail } from '@lucide/vue'
import { site, footerColumns, isLinkVisible } from '../../data'
import { useDarkMode } from '../../composables/useDarkMode'

const year = new Date().getFullYear()
const columns = footerColumns.map((col) => ({
  ...col,
  links: col.links.filter(isLinkVisible)
}))
const { isDark } = useDarkMode()
</script>

<template>
  <footer class="relative overflow-hidden border-t border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-950">
    <div class="container-site section-padding !py-16 grid gap-12 lg:grid-cols-[1.4fr_2fr]">
      <div>
        <a href="#home" class="inline-flex items-center rounded-xl">
          <img v-if="site.light_logo" :src="isDark ? site.dark_logo || site.light_logo : site.light_logo" :alt="site.name" class="h-24 w-auto" />
          <span v-else class="font-display text-2xl font-bold">{{ site.name }}</span>
        </a>
        <p class="mt-4 max-w-sm text-muted leading-relaxed">
          {{ site.tagline }}
        </p>
        <ul class="mt-6 space-y-3 text-sm text-muted">
          <li v-if="site.email?.display" class="flex items-center gap-2">
            <Mail class="h-4 w-4 text-primary-600 dark:text-primary-400" />
            {{ site.email.display }}
          </li>
          <li class="flex items-center gap-2">
            <Phone class="h-4 w-4 text-primary-600 dark:text-primary-400" />
            {{ site.phones.map((p) => p.display).join(', ') }}
          </li>
          <li class="flex items-start gap-2">
            <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
            {{ site.address }}
          </li>
          <li class="flex items-start gap-2">
            <Pin class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
            {{ site.pincode }}
          </li>
          <li class="flex items-center gap-2">
            <Clock class="h-4 w-4 text-primary-600 dark:text-primary-400" /> {{ site.hours }}
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div v-for="col in columns" :key="col.title">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {{ col.title }}
          </h3>
          <ul class="mt-4 space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <a
                :href="link.href"
                class="text-sm text-muted transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-200/70 dark:border-white/10">
      <div class="container-site flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
        <p>&copy; {{ year }} {{ site.name }}. All rights reserved.</p>
        <p>{{ site.addressShort }}</p>
      </div>
    </div>
  </footer>
</template>
