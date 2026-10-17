<script setup>
defineProps({
  hover: { type: Boolean, default: true },
  padded: { type: Boolean, default: true }
})
</script>

<template>
  <div
    class="card-surface group relative overflow-hidden transition-all duration-400"
    :class="[padded && 'p-8', hover && 'hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-primary-200 dark:hover:border-primary-400/30']"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 from-primary-500/[0.06] to-transparent transition-opacity duration-500"
      :class="hover && 'group-hover:opacity-100'"
    />
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
