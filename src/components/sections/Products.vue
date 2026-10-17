<script setup>
import { PhoneCall } from '@lucide/vue'
import BaseCard from '../ui/BaseCard.vue'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'
import { products, productsContent, primaryPhone } from '../../data'
import { vReveal } from '../../composables/useScrollReveal'
</script>

<template>
  <section id="products" class="section-padding scroll-mt-24 bg-slate-50/60 dark:bg-white/[0.02]">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ productsContent.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ productsContent.headingBefore }}<span class="gradient-text">{{ productsContent.headingHighlight }}</span>{{ productsContent.headingAfter }}
        </h2>
      </div>

      <div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="(product, i) in products"
          :key="product.title"
          v-reveal="i * 90"
          :padded="false"
        >
          <div class="aspect-[4/3] overflow-hidden bg-white dark:bg-slate-900">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.title"
              loading="lazy"
              width="600"
              height="450"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <ImagePlaceholder v-else :label="product.title" />
          </div>
          <div class="p-8">
            <h3 class="text-lg font-semibold">{{ product.title }}</h3>
            <p class="mt-2 text-muted leading-relaxed">{{ product.description }}</p>
            <a :href="primaryPhone.href" class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all hover:gap-2.5 dark:text-primary-400">
              <PhoneCall class="h-4 w-4" /> Call for a quote
            </a>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
