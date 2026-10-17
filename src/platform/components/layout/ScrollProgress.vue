<script setup lang="ts">
import { computed } from 'vue'
import { useScrollY } from '../../composables/useScrollY'

const { scrollY, docHeight, winHeight } = useScrollY()

const progress = computed(() => {
  const max = docHeight.value - winHeight.value
  if (max <= 0) return 0
  return Math.min(100, Math.max(0, (scrollY.value / max) * 100))
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true">
    <div
      class="h-full transition-[width] duration-150 ease-out [background:var(--progress-bar)]"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>
