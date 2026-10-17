<script setup>
import Counter from '../ui/Counter.vue'
import { stats } from '../../data'
import { vReveal } from '../../composables/useScrollReveal'
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-steel-900 via-primary-700 to-primary-600 py-20 sm:py-24">
    <div class="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" aria-hidden="true" />
    <div class="container-site relative grid grid-cols-2 gap-8 text-center text-white lg:grid-cols-4">
      <div v-for="(stat, i) in stats" :key="stat.label" v-reveal="i * 100">
        <p class="font-display text-4xl font-bold sm:text-5xl">
          <Counter :target="stat.target" :prefix="stat.prefix" :suffix="stat.suffix" />
        </p>
        <p class="mt-2 text-sm font-medium text-primary-100 sm:text-base">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>
