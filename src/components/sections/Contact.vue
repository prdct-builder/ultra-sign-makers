<script setup>
import { Mail, Phone, MapPin, Clock, PhoneCall, Pin } from '@lucide/vue'
import BaseButton from '../ui/BaseButton.vue'
import { vReveal } from '../../composables/useScrollReveal'
import { contactContent, site, primaryPhone } from '../../data'
</script>

<template>
  <section id="contact" class="section-padding scroll-mt-24">
    <div class="container-site">
      <div class="mx-auto max-w-2xl text-center">
        <div v-reveal class="eyebrow mx-auto">{{ contactContent.eyebrow }}</div>
        <h2 v-reveal="80" class="heading-lg mt-6">
          {{ contactContent.headingBefore }}<span class="gradient-text">{{ contactContent.headingHighlight }}</span>{{ contactContent.headingAfter }}
        </h2>
        <p v-reveal="140" class="mt-5 text-lg text-muted">
          {{ contactContent.description }}
        </p>
      </div>

      <div class="mt-16 grid gap-10 lg:grid-cols-5">
        <div v-reveal="180" class="card-surface overflow-hidden p-0 lg:col-span-3">
          <iframe
            :title="site.mapTitle"
            :src="site.mapEmbedUrl"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="h-80 w-full grayscale-[0.2] dark:invert dark:hue-rotate-180 lg:h-full lg:min-h-[420px]"
          />
        </div>

        <div v-reveal="240" class="flex flex-col gap-6 lg:col-span-2">
          <div class="card-surface p-6">
            <ul class="space-y-4">
              <li v-if="site.email?.display" class="flex items-start gap-3">
                <Mail class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold">Email</p>
                  <a
                    :href="site.email.href"
                    class="block text-sm text-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {{ site.email.display }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Phone class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold">Phone / WhatsApp</p>
                  <a
                    v-for="phone in site.phones"
                    :key="phone.href"
                    :href="phone.href"
                    class="block text-sm text-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {{ phone.display }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <MapPin class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold">Address</p>
                  <p class="text-sm text-muted">{{ site.address }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Pin class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold">Pincode</p>
                  <p class="text-sm text-muted">{{ site.pincode }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Clock class="mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p class="text-sm font-semibold">Hours</p>
                  <p class="text-sm text-muted">{{ site.hours }}</p>
                </div>
              </li>
            </ul>

            <BaseButton :href="primaryPhone.href" class="mt-6 w-full">
              <PhoneCall class="h-4 w-4" />
              Call for a Free Quote
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
