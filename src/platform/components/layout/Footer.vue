<script setup lang="ts">
import { Phone, MapPin, Clock, Pin, Mail } from '@lucide/vue'
import { useSite } from '../../site/useSite'
import { useVisibleLinks } from '../../composables/useVisibleLinks'
import SmartLink from '../ui/SmartLink.vue'
import BrandLogo from '../ui/BrandLogo.vue'

const { config } = useSite()
const { visible } = useVisibleLinks()
const { contact } = config

const year = new Date().getFullYear()
const columns = config.navigation.footerColumns.map((col) => ({ ...col, links: visible(col.links) }))
</script>

<template>
  <footer class="relative overflow-hidden border-t border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-950">
    <div class="container-site section-padding !py-16 grid gap-12 lg:grid-cols-[1.4fr_2fr]">
      <div>
        <SmartLink :link="{ to: '/' }" class="inline-flex items-center rounded-xl" :aria-label="`${config.name} home`">
          <BrandLogo size="footer" />
        </SmartLink>
        <p class="mt-4 max-w-sm text-muted leading-relaxed">
          {{ config.brand.tagline }}
        </p>
        <ul class="mt-6 space-y-3 text-sm text-muted">
          <li v-if="contact.email?.display" class="flex items-center gap-2">
            <Mail class="h-4 w-4 text-primary-600 dark:text-primary-400" />
            {{ contact.email.display }}
          </li>
          <li class="flex items-center gap-2">
            <Phone class="h-4 w-4 text-primary-600 dark:text-primary-400" />
            {{ contact.phones.map((p) => p.display).join(', ') }}
          </li>
          <li v-if="contact.address" class="flex items-start gap-2">
            <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
            {{ contact.address }}
          </li>
          <li v-if="contact.pincode" class="flex items-start gap-2">
            <Pin class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
            {{ contact.pincode }}
          </li>
          <li v-if="contact.hours" class="flex items-center gap-2">
            <Clock class="h-4 w-4 text-primary-600 dark:text-primary-400" /> {{ contact.hours }}
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div v-for="col in columns" :key="col.title">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {{ col.title }}
          </h3>
          <ul class="mt-4 space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <SmartLink
                :link="link"
                class="text-sm text-muted transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              >
                {{ link.label }}
              </SmartLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-200/70 dark:border-white/10">
      <div class="container-site flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
        <p>&copy; {{ year }} {{ config.name }}. All rights reserved.</p>
        <p v-if="contact.addressShort">{{ contact.addressShort }}</p>
      </div>
    </div>
  </footer>
</template>
