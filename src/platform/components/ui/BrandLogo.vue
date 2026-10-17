<script setup lang="ts">
import { computed, ref } from 'vue'
import { publicUrl, useSite } from '../../site/useSite'
import { useDarkMode } from '../../composables/useDarkMode'

const props = withDefaults(defineProps<{ size?: 'nav' | 'footer' }>(), { size: 'nav' })

const { config, base } = useSite()
const { isDark } = useDarkMode()
const failed = ref(false)

const logo = computed(() => {
  const { light, dark } = config.brand.logo ?? {}
  return (isDark.value ? dark || light : light || dark) || null
})
const mark = computed(() => config.brand.mark ?? publicUrl(base, 'favicon.svg'))

const styles = {
  nav: { logo: 'h-16 w-auto sm:h-20', mark: 'h-9 w-9 sm:h-10 sm:w-10', name: 'text-lg sm:text-xl', gap: 'gap-2.5' },
  footer: { logo: 'h-24 w-auto', mark: 'h-12 w-12', name: 'text-2xl', gap: 'gap-3' }
}
const s = computed(() => styles[props.size])
</script>

<template>
  <img v-if="logo && !failed" :src="logo" :alt="config.name" :class="s.logo" @error="failed = true" />
  <span v-else class="flex items-center" :class="s.gap">
    <img :src="mark" alt="" :class="s.mark" />
    <span class="font-display font-bold text-heading" :class="s.name">{{ config.name }}</span>
  </span>
</template>
