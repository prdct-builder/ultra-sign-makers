<script setup>
import { ref } from 'vue'
import Accordion from '../ui/Accordion.vue'
import { faqs, faqContent } from '../../data'
import { vReveal } from '../../composables/useScrollReveal'

const openIndex = ref(0)

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="section-padding scroll-mt-24 bg-slate-50/60 dark:bg-white/[0.02]">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ faqContent.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">{{ faqContent.heading }}</h2>
        <p v-reveal="140" class="mt-5 text-lg text-muted">
          {{ faqContent.description }}
        </p>
      </div>

      <div class="mx-auto mt-14 grid max-w-4xl gap-4 lg:grid-cols-2 lg:items-start">
        <Accordion
          v-for="(faq, i) in faqs"
          :key="faq.question"
          v-reveal="i * 70"
          :question="faq.question"
          :model-value="openIndex === i"
          @update:model-value="toggle(i)"
        >
          {{ faq.answer }}
        </Accordion>
      </div>
    </div>
  </section>
</template>
