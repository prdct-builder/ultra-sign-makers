<script setup>
import { CheckCircle2 } from '@lucide/vue'
import { vReveal } from '../../composables/useScrollReveal'
import { about } from '../../data'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'
</script>

<template>
  <section id="about" class="section-padding scroll-mt-24">
    <div class="container-site grid items-center gap-16 lg:grid-cols-2">
      <div v-reveal class="relative order-2 lg:order-1">
        <div class="aspect-[9/7] overflow-hidden rounded-3xl border border-slate-200/70 shadow-soft-lg dark:border-white/10">
          <img
            v-if="about.image.src"
            :src="about.image.src"
            :alt="about.image.alt"
            loading="lazy"
            class="h-full w-full object-cover"
          />
          <ImagePlaceholder v-else :label="about.image.alt" />
        </div>
        <div class="absolute -bottom-8 -right-6 hidden max-w-[220px] rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft-lg dark:border-white/10 dark:bg-slate-900 sm:block">
          <p class="font-display text-3xl font-bold gradient-text">{{ about.badge.value }}</p>
          <p class="mt-1 text-sm text-muted">{{ about.badge.label }}</p>
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <div v-reveal class="eyebrow">{{ about.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ about.headingBefore }}<span class="gradient-text">{{ about.headingHighlight }}</span>{{ about.headingAfter }}
        </h2>
        <p
          v-for="(paragraph, i) in about.paragraphs"
          :key="paragraph"
          v-reveal="140 + i * 40"
          class="mt-6 text-lg text-muted leading-relaxed"
        >
          {{ paragraph }}
        </p>

        <ul class="mt-8 space-y-4">
          <li
            v-for="(point, i) in about.points"
            :key="point"
            v-reveal="220 + i * 80"
            class="flex items-start gap-3"
          >
            <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
            <span class="text-slate-700 dark:text-slate-300">{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
