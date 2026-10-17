<script setup lang="ts">
// ZMR-only section: a call-to-action band for the round-the-clock phone line.
// Lives in this site's folder because no other site needs it.
import { PhoneCall } from '@lucide/vue'
import { useSite } from '@/platform/site/useSite'
import { vReveal } from '@/platform/composables/useScrollReveal'
import BaseButton from '@/platform/components/ui/BaseButton.vue'

defineProps<{ heading: string; text: string }>()
const { contact } = useSite().config
</script>

<template>
  <section class="py-12">
    <div class="container-site">
      <div
        v-reveal
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-steel-900 via-steel-800 to-primary-700 px-8 py-12 text-white shadow-soft-lg sm:px-12"
      >
        <div class="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" aria-hidden="true" />
        <div class="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div class="max-w-2xl">
            <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">{{ heading }}</h2>
            <p class="mt-3 text-primary-100">{{ text }}</p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row">
            <BaseButton v-for="phone in contact.phones" :key="phone.href" :href="phone.href" variant="secondary">
              <PhoneCall class="h-4 w-4" />
              {{ phone.display }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
