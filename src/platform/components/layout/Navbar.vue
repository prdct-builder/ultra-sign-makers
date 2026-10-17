<script setup lang="ts">
import { computed, ref } from 'vue'
import { Menu, X, Moon, Sun, PhoneCall } from '@lucide/vue'
import { useScrollY } from '../../composables/useScrollY'
import { useDarkMode } from '../../composables/useDarkMode'
import { useSite } from '../../site/useSite'
import { useVisibleLinks } from '../../composables/useVisibleLinks'
import BaseButton from '../ui/BaseButton.vue'
import SmartLink from '../ui/SmartLink.vue'
import BrandLogo from '../ui/BrandLogo.vue'

const { config } = useSite()
const { visible } = useVisibleLinks()
const links = visible(config.navigation.header)
const primaryPhone = config.contact.phones[0]

const { scrollY } = useScrollY()
const scrolled = computed(() => scrollY.value > 12)

const { isDark, toggleDarkMode, enabled: darkModeEnabled } = useDarkMode()

const mobileOpen = ref(false)
function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass shadow-soft' : 'bg-transparent'"
  >
    <nav class="container-site flex h-16 items-center justify-between sm:h-20" aria-label="Primary">
      <SmartLink :link="{ to: '/' }" class="flex items-center rounded-xl" :aria-label="`${config.name} home`">
        <BrandLogo size="nav" />
      </SmartLink>

      <ul class="hidden items-center gap-8 lg:flex">
        <li v-for="link in links" :key="link.label">
          <SmartLink
            :link="link"
            class="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
          >
            {{ link.label }}
          </SmartLink>
        </li>
      </ul>

      <div class="hidden items-center gap-3 lg:flex">
        <button
          v-if="darkModeEnabled"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary-400/40 dark:hover:text-primary-400"
          @click="toggleDarkMode"
        >
          <Transition name="fade" mode="out-in">
            <Sun v-if="isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </Transition>
        </button>
        <BaseButton :href="primaryPhone.href" size="sm">
          <PhoneCall class="h-4 w-4" />
          {{ config.navigation.callLabel }}
        </BaseButton>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <button
          v-if="darkModeEnabled"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300"
          @click="toggleDarkMode"
        >
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          :aria-expanded="mobileOpen"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-white/10 dark:text-slate-200"
          @click="mobileOpen = !mobileOpen"
        >
          <Menu v-if="!mobileOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" id="mobile-menu" class="glass border-b border-slate-200/70 px-6 pb-6 pt-2 dark:border-white/10 lg:hidden">
        <ul class="flex flex-col gap-1">
          <li v-for="link in links" :key="link.label">
            <SmartLink
              :link="link"
              class="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
              @navigate="closeMobile"
            >
              {{ link.label }}
            </SmartLink>
          </li>
        </ul>
        <BaseButton :href="primaryPhone.href" class="mt-4 w-full" @click="closeMobile">
          <PhoneCall class="h-4 w-4" />
          {{ config.navigation.callLabel }}
        </BaseButton>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
