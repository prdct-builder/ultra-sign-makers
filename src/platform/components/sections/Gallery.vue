<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import type { GalleryContent } from '../../site/types'
import { vReveal } from '../../composables/useScrollReveal'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'

const { content } = defineProps<{ content: GalleryContent }>()

const items = content.items.length
  ? content.items
  : Array.from({ length: content.placeholderCount ?? 6 }, () => ({ src: undefined, alt: 'Photo coming soon' }))

const trackRef = ref<HTMLElement | null>(null)
const active = ref(0)
let ticking = false

function updateActive() {
  const track = trackRef.value
  if (!track) return
  const trackCenter = track.scrollLeft + track.clientWidth / 2

  let closestIndex = 0
  let closestDistance = Infinity
  Array.from(track.children as HTMLCollectionOf<HTMLElement>).forEach((child, i) => {
    const childCenter = child.offsetLeft + child.offsetWidth / 2
    const distance = Math.abs(childCenter - trackCenter)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = i
    }
  })
  active.value = closestIndex
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateActive()
    ticking = false
  })
}

function scrollByStep(dir: number) {
  const track = trackRef.value
  if (!track) return
  const item = track.children[0]
  const gap = 16
  const amount = item ? item.getBoundingClientRect().width + gap : track.clientWidth * 0.8
  track.scrollBy({ left: dir * amount, behavior: 'smooth' })
}

function goTo(i: number) {
  trackRef.value?.children[i]?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  })
}

onMounted(() => {
  const track = trackRef.value
  if (!track) return
  updateActive()
  track.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => trackRef.value?.removeEventListener('scroll', onScroll))
</script>

<template>
  <section class="section-padding scroll-mt-24 bg-slate-50/60 dark:bg-white/[0.02]">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ content.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ content.heading.before }}<span class="gradient-text">{{ content.heading.highlight }}</span>{{ content.heading.after }}
        </h2>
      </div>

      <div v-reveal="140" class="relative mt-14">
        <div
          ref="trackRef"
          class="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          <div
            v-for="(item, i) in items"
            :key="item.src || i"
            :data-index="i"
            class="shrink-0 basis-[78%] snap-center sm:basis-[46%] lg:basis-[31%]"
          >
            <button
              type="button"
              class="block aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-soft transition-all duration-300"
              :class="i === active
                ? 'border-primary-400 shadow-glow scale-100 opacity-100'
                : 'border-slate-200/70 scale-[0.96] opacity-70 hover:opacity-90 dark:border-white/10'"
              @click="goTo(i)"
            >
              <img
                v-if="item.src"
                :src="item.src"
                :alt="item.alt"
                loading="lazy"
                class="h-full w-full object-cover"
              />
              <ImagePlaceholder v-else :label="item.alt" />
            </button>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous photo"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary-400/40"
            @click="scrollByStep(-1)"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary-400/40"
            @click="scrollByStep(1)"
          >
            <ChevronRight class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
