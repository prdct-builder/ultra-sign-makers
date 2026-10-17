<script setup lang="ts">
withDefaults(defineProps<{ hover?: boolean; padded?: boolean }>(), { hover: true, padded: true })
</script>

<template>
  <div
    class="card-surface group relative overflow-hidden transition-all duration-400"
    :class="[padded && 'p-8', hover && 'hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-primary-200 dark:hover:border-primary-400/30']"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:var(--card-hover)]"
      :class="hover && 'group-hover:opacity-100'"
    />
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
