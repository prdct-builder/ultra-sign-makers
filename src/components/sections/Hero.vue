<script setup>
import { PhoneCall, HardHat, Clock } from '@lucide/vue'
import BaseButton from '../ui/BaseButton.vue'
import { hero } from '../../data'
</script>

<template>
  <section
    id="home"
    class="relative overflow-hidden pt-24 pb-12"
  >
    <div class="container-site grid items-center gap-16 lg:grid-cols-2">
      <div>
        <div class="animate-fade-in-down eyebrow">
          <HardHat class="h-4 w-4" />
          {{ hero.eyebrow }}
        </div>

        <h1 class="heading-xl mt-6">
          <span
            v-for="(word, i) in hero.headlineWords"
            :key="i"
            class="mr-3 inline-block animate-fade-in-up opacity-0"
            :class="i >= hero.headlineAccentFrom && 'gradient-text'"
            :style="{ animationDelay: `${150 + i * 90}ms` }"
          >
            {{ word }}
          </span>
        </h1>

        <p
          class="mt-6 max-w-xl animate-fade-in-up text-lg text-muted opacity-0"
          style="animation-delay: 550ms"
        >
          {{ hero.description }}
        </p>

        <div
          class="mt-10 flex animate-fade-in-up flex-col gap-4 opacity-0 sm:flex-row sm:items-center"
          style="animation-delay: 650ms"
        >
          <BaseButton :href="hero.primaryCta.href" size="lg">
            <PhoneCall class="h-5 w-5" />
            {{ hero.primaryCta.label }}
          </BaseButton>
          <BaseButton :href="hero.secondaryCta.href" variant="secondary" size="lg">
            {{ hero.secondaryCta.label }}
          </BaseButton>
        </div>

        <dl
          class="mt-14 grid animate-fade-in-up grid-cols-3 gap-6 border-t border-ink/10 pt-8 opacity-0 dark:border-white/10"
          style="animation-delay: 750ms"
        >
          <div v-for="stat in hero.quickStats" :key="stat.label">
            <dt class="text-xs uppercase tracking-wide text-steel-400">{{ stat.label }}</dt>
            <dd class="mt-1 font-display text-2xl font-bold">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="relative animate-scale-in opacity-0" style="animation-delay: 500ms">
        <div class="mx-auto overflow-hidden rounded-3xl border border-ink/10 shadow-soft-lg dark:border-white/10">
          <img
            :src="hero.image.src"
            :alt="hero.image.alt"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-2 shadow-soft-lg animate-float dark:border-white/10 dark:bg-navy-deep">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
            <PhoneCall class="h-5 w-5" />
          </span>
          <div>
            <p class="text-sm font-semibold">{{ hero.callBadgePrimary.title }}</p>
            <p class="text-xs text-muted">{{ hero.callBadgePrimary.subtitle }}</p>
          </div>
        </div>

        <div class="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-2 shadow-soft-lg animate-float dark:border-white/10 dark:bg-navy-deep">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
            <PhoneCall class="h-5 w-5" />
          </span>
          <div>
            <p class="text-sm font-semibold">{{ hero.callBadgeSecondary.title }}</p>
            <p class="text-xs text-muted">{{ hero.callBadgeSecondary.subtitle }}</p>
          </div>
        </div>

        <div class="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs font-semibold text-accent-700 shadow-soft-lg dark:border-white/10 dark:bg-navy-deep dark:text-accent-500">
          <Clock class="h-3.5 w-3.5" /> {{ hero.availabilityBadge }}
        </div>
      </div>
    </div>
  </section>
</template>