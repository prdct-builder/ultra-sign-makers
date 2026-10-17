<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Quote, Star } from '@lucide/vue'
import { testimonials, reviewsContent } from '../../data'
import { vReveal } from '../../composables/useScrollReveal'

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

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
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
  <section id="reviews" class="section-padding scroll-mt-24">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ reviewsContent.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ reviewsContent.headingBefore }}<span class="gradient-text">{{ reviewsContent.headingHighlight }}</span>{{ reviewsContent.headingAfter }}
        </h2>
      </div>

      <div v-reveal="140" class="relative mt-14">
        <div
          ref="trackRef"
          class="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          <div
            v-for="(t, i) in testimonials"
            :key="t.name"
            class="shrink-0 basis-[85%] snap-center sm:basis-[55%] lg:basis-[34%]"
          >
            <div
              class="h-full rounded-2xl border p-6 shadow-soft transition-all duration-300"
              :class="i === active
                ? 'border-primary-400 shadow-glow scale-100 opacity-100'
                : 'border-slate-200/70 scale-[0.97] opacity-70 dark:border-white/10'"
            >
              <Quote class="h-7 w-7 text-primary-200 dark:text-primary-400/20" />

              <div class="mt-4 flex items-center gap-1 text-amber-400">
                <Star
                  v-for="n in 5"
                  :key="n"
                  class="h-4 w-4"
                  :class="n <= t.rating ? 'fill-current' : 'fill-none text-slate-300 dark:text-slate-700'"
                />
              </div>

              <p class="mt-4 font-display font-semibold">{{ t.headline }}</p>
              <p class="mt-3 text-muted leading-relaxed">&ldquo;{{ t.quote }}&rdquo;</p>

              <div class="mt-6 flex items-center gap-3 border-t border-slate-200/70 pt-5 dark:border-white/10">
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-steel-800 to-primary-600 font-display text-sm font-bold text-white">
                  {{ initials(t.name) }}
                </span>
                <div class="text-left">
                  <p class="font-semibold">{{ t.name }}</p>
                  <p class="text-sm text-muted">{{ t.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous review"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-primary-400/40"
            @click="scrollByStep(-1)"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
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
