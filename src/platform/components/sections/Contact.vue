<script setup lang="ts">
import { Mail, Phone, MapPin, Clock, PhoneCall, Pin } from '@lucide/vue'
import type { ContactContent } from '../../site/types'
import { useSite } from '../../site/useSite'
import BaseButton from '../ui/BaseButton.vue'
import ImagePlaceholder from '../ui/ImagePlaceholder.vue'
import { vReveal } from '../../composables/useScrollReveal'

const { content } = defineProps<{ content: ContactContent }>()
const { contact } = useSite().config
const primaryPhone = contact.phones[0]
</script>

<template>
  <section class="section-padding scroll-mt-24">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ content.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ content.heading.before }}<span class="gradient-text">{{ content.heading.highlight }}</span>{{ content.heading.after }}
        </h2>
        <p v-reveal="140" class="mt-5 text-lg text-muted">
          {{ content.description }}
        </p>
      </div>

      <div class="mt-16 grid gap-10 lg:grid-cols-5">
        <div v-reveal="180" class="card-surface overflow-hidden p-0 lg:col-span-3">
          <iframe
            v-if="contact.map?.embedUrl"
            :title="contact.map.title"
            :src="contact.map.embedUrl"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="h-80 w-full grayscale-[0.2] dark:invert dark:hue-rotate-180 lg:h-full lg:min-h-[420px]"
          />
          <div v-else class="h-80 lg:h-full lg:min-h-[420px]">
            <ImagePlaceholder label="Map coming soon" />
          </div>
        </div>

        <div v-reveal="240" class="flex flex-col gap-6 lg:col-span-2">
          <div class="card-surface p-6">
            <ul class="space-y-4">
              <li v-if="contact.email?.display" class="flex items-start gap-3">
                <Mail class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold text-heading">Email</p>
                  <a
                    :href="contact.email.href"
                    class="block text-sm text-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {{ contact.email.display }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Phone class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold text-heading">Phone</p>
                  <a
                    v-for="phone in contact.phones"
                    :key="phone.href"
                    :href="phone.href"
                    class="block text-sm text-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {{ phone.display }}
                  </a>
                </div>
              </li>
              <li v-if="contact.address" class="flex items-start gap-3">
                <MapPin class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold text-heading">Address</p>
                  <p class="text-sm text-muted">{{ contact.address }}</p>
                </div>
              </li>
              <li v-if="contact.pincode" class="flex items-start gap-3">
                <Pin class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold text-heading">Pincode</p>
                  <p class="text-sm text-muted">{{ contact.pincode }}</p>
                </div>
              </li>
              <li v-if="contact.hours" class="flex items-start gap-3">
                <Clock class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold text-heading">Hours</p>
                  <p class="text-sm text-muted">{{ contact.hours }}</p>
                </div>
              </li>
            </ul>

            <BaseButton :href="primaryPhone.href" class="mt-6 w-full">
              <PhoneCall class="h-4 w-4" />
              {{ content.ctaLabel }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
