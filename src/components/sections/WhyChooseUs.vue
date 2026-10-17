<script setup>
import { reasons, whyChooseUsContent } from '../../data'
import { vReveal } from '../../composables/useScrollReveal'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'
</script>

<template>
  <section id="why-us" class="section-padding scroll-mt-24">
    <div class="container-site grid items-center gap-16 lg:grid-cols-2">
      <div v-reveal="{ type: 'scale' }" class="relative">
        <div class="aspect-[9/10] overflow-hidden rounded-3xl border border-slate-200/70 shadow-soft-lg dark:border-white/10">
          <img
            v-if="whyChooseUsContent.image.src"
            :src="whyChooseUsContent.image.src"
            :alt="whyChooseUsContent.image.alt"
            loading="lazy"
            class="h-full w-full object-cover"
          />
          <ImagePlaceholder v-else :label="whyChooseUsContent.image.alt" />
        </div>
      </div>

      <div>
        <div v-reveal class="eyebrow">{{ whyChooseUsContent.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ whyChooseUsContent.headingBefore }}<span class="gradient-text">{{ whyChooseUsContent.headingHighlight }}</span>{{ whyChooseUsContent.headingAfter }}
        </h2>
        <p v-reveal="140" class="mt-6 text-lg text-muted leading-relaxed">
          {{ whyChooseUsContent.description }}
        </p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <div
            v-for="(reason, i) in reasons"
            :key="reason.title"
            v-reveal="200 + i * 90"
            class="rounded-2xl border border-slate-200/70 p-5 transition-colors hover:border-primary-300 dark:border-white/10 dark:hover:border-primary-400/30"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-400/10 dark:text-primary-400">
              <component :is="reason.icon" class="h-5 w-5" />
            </span>
            <h3 class="mt-4 font-semibold">{{ reason.title }}</h3>
            <p class="mt-1.5 text-sm text-muted leading-relaxed">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
