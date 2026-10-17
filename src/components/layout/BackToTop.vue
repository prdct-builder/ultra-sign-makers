<script setup>
import { computed } from 'vue'
import { ArrowUp } from '@lucide/vue'
import { useScrollY } from '../../composables/useScrollY'

const { scrollY } = useScrollY()
const visible = computed(() => scrollY.value > 480)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-90"
  >
    <button
      v-if="visible"
      type="button"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-primary-500 sm:bottom-8 sm:right-8"
      @click="scrollToTop"
    >
      <ArrowUp class="h-5 w-5" />
    </button>
  </Transition>
</template>
