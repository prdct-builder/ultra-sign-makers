<script setup lang="ts">
import { PhoneCall, Sparkles, Clock } from '@lucide/vue'
import type { HeroContent } from '../../site/types'
import BaseButton from '../ui/BaseButton.vue'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'

const props = withDefaults(
  defineProps<{
    content: HeroContent
    /** split: text beside the image. centered: text centred above a wide image. */
    variant?: 'split' | 'centered'
    /** Soft animated colour blobs behind the hero. */
    decor?: 'none' | 'blobs'
  }>(),
  { variant: 'split', decor: 'none' }
)

const centered = props.variant === 'centered'
const badgePositions = ['-bottom-6 -left-6', '-bottom-6 -right-6']
</script>

<template>
  <section class="relative overflow-hidden pt-24 pb-12" :class="centered && 'pt-32'">
    <div class="absolute inset-0 -z-10 [background:var(--hero-glow)]" aria-hidden="true" />
    <template v-if="decor === 'blobs'">
      <div class="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl animate-blob" aria-hidden="true" />
      <div
        class="absolute -right-16 top-56 -z-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl animate-blob"
        style="animation-delay: 2s"
        aria-hidden="true"
      />
    </template>

    <div class="container-site grid items-center gap-16" :class="centered ? 'text-center' : 'lg:grid-cols-2'">
      <div :class="centered && 'mx-auto max-w-3xl'">
        <div class="animate-fade-in-down eyebrow" :class="centered && 'mx-auto'">
          <component :is="content.eyebrowIcon ?? Sparkles" class="h-4 w-4" />
          {{ content.eyebrow }}
        </div>

        <h1 class="heading-xl mt-6">
          <span
            v-for="(word, i) in content.headlineWords"
            :key="i"
            class="mr-3 inline-block animate-fade-in-up opacity-0"
            :class="i >= content.headlineAccentFrom && 'gradient-text'"
            :style="{ animationDelay: `${150 + i * 90}ms` }"
          >
            {{ word }}
          </span>
        </h1>

        <p
          class="mt-6 max-w-xl animate-fade-in-up text-lg text-muted opacity-0"
          :class="centered && 'mx-auto'"
          style="animation-delay: 550ms"
        >
          {{ content.description }}
        </p>

        <div
          class="mt-10 flex animate-fade-in-up flex-col gap-4 opacity-0 sm:flex-row sm:items-center"
          :class="centered && 'sm:justify-center'"
          style="animation-delay: 650ms"
        >
          <BaseButton :link="content.primaryCta.link" size="lg">
            <PhoneCall class="h-5 w-5" />
            {{ content.primaryCta.label }}
          </BaseButton>
          <BaseButton :link="content.secondaryCta.link" variant="secondary" size="lg">
            {{ content.secondaryCta.label }}
          </BaseButton>
        </div>

        <dl
          class="mt-14 grid animate-fade-in-up grid-cols-3 gap-6 border-t border-line pt-8 opacity-0"
          :class="centered && 'mx-auto max-w-xl'"
          style="animation-delay: 750ms"
        >
          <div v-for="stat in content.quickStats" :key="stat.label">
            <dt class="text-xs uppercase tracking-wide text-steel-500 dark:text-steel-400">{{ stat.label }}</dt>
            <dd class="mt-1 font-display text-2xl font-bold text-heading">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="relative animate-scale-in opacity-0" :class="centered && 'mx-auto w-full max-w-5xl'" style="animation-delay: 500ms">
        <div
          class="mx-auto overflow-hidden rounded-3xl border border-line shadow-soft-lg"
          :class="centered ? 'aspect-[21/9]' : !content.image.src && 'aspect-[4/3]'"
        >
          <img
            v-if="content.image.src"
            :src="content.image.src"
            :alt="content.image.alt"
            fetchpriority="high"
            class="h-full w-full object-cover"
          />
          <ImagePlaceholder v-else :label="content.image.alt" />
        </div>

        <div
          v-for="(badge, i) in content.callBadges.slice(0, 2)"
          :key="badge.subtitle"
          class="absolute flex items-center gap-3 rounded-2xl border border-line bg-raised p-2 text-left shadow-soft-lg animate-float"
          :class="badgePositions[i]"
        >
          <span class="flex h-10 w-10 items-center justify-center rounded-xl text-white [background:var(--badge-icon)]">
            <PhoneCall class="h-5 w-5" />
          </span>
          <div>
            <p class="text-sm font-semibold text-heading">{{ badge.title }}</p>
            <p class="text-xs text-muted">{{ badge.subtitle }}</p>
          </div>
        </div>

        <div class="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full border border-line bg-raised px-3.5 py-2 text-xs font-semibold text-status shadow-soft-lg">
          <Clock class="h-3.5 w-3.5" /> {{ content.availabilityBadge }}
        </div>
      </div>
    </div>
  </section>
</template>
