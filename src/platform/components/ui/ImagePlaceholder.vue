<script setup lang="ts">
import { Image as ImageIcon } from '@lucide/vue'

withDefaults(defineProps<{ label?: string }>(), { label: 'Image coming soon' })
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200/70 p-6 text-center text-slate-400 dark:from-slate-800/80 dark:to-slate-900 dark:text-slate-500"
    role="img"
    :aria-label="label"
  >
    <ImageIcon class="h-10 w-10" stroke-width="1.5" />
    <span class="text-sm font-medium">{{ label }}</span>
  </div>
</template>
