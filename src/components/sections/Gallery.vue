<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { galleryItems, galleryContent } from '../../data'
import { vReveal } from '../../composables/useScrollReveal'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'

const PLACEHOLDER_COUNT = 6
const items = galleryItems.length
  ? galleryItems
  : Array.from({ length: PLACEHOLDER_COUNT }, () => ({ src: '', alt: 'Photo coming soon' }))

const trackRef = ref(null)
const active = ref(0)
let ticking = false

function updateActive() {
  const track = trackRef.value
  if (!track) return
  const trackCenter = track.scrollLeft + track.clientWidth / 2

  let closestIndex = 0
  let closestDistance = Infinity
  Array.from(track.children).forEach((child, i) => {
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

function scrollByStep(dir) {
  const track = trackRef.value
  if (!track) return
  const item = track.children[0]
  const gap = 16
  const amount = item ? item.getBoundingClientRect().width + gap : track.clientWidth * 0.8
  track.scrollBy({ left: dir * amount, behavior: 'smooth' })
}

function goTo(i) {
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
  <section id="gallery" class="section-padding scroll-mt-24 bg-slate-50/60 dark:bg-white/[0.02]">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ galleryContent.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ galleryContent.headingBefore }}<span class="gradient-text">{{ galleryContent.headingHighlight }}</span>{{ galleryContent.headingAfter }}
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
            aria-label="Previous"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary-400/40"
            @click="scrollByStep(-1)"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
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
