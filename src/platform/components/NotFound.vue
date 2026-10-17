<script setup lang="ts">
import BaseButton from './ui/BaseButton.vue'
</script>

<template>
  <section class="section-padding flex min-h-[70vh] items-center pt-32">
    <div class="container-site text-center">
      <p class="eyebrow mx-auto">404</p>
      <h1 class="heading-lg mt-6">Page not found</h1>
      <p class="mx-auto mt-4 max-w-md text-lg text-muted">The page you're looking for doesn't exist or has moved.</p>
      <BaseButton :link="{ to: '/' }" class="mt-8">Back to home</BaseButton>
    </div>
  </section>
</template>
