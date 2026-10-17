<script setup>
import { useSectionRouter } from './composables/useSectionRouter'
import { showReviews } from './data'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import ScrollProgress from './components/layout/ScrollProgress.vue'
import BackToTop from './components/layout/BackToTop.vue'

import Hero from './components/sections/Hero.vue'
import About from './components/sections/About.vue'
import Products from './components/sections/Products.vue'
import WhyChooseUs from './components/sections/WhyChooseUs.vue'
import Stats from './components/sections/Stats.vue'
import Gallery from './components/sections/Gallery.vue'
import Reviews from './components/sections/Reviews.vue'
import FAQ from './components/sections/FAQ.vue'
import Contact from './components/sections/Contact.vue'

useSectionRouter()
</script>

<template>
  <ScrollProgress />
  <Navbar />
  <main>
    <Hero />
    <About />
    <Products />
    <WhyChooseUs />
    <Stats />
    <Gallery />
    <Reviews v-if="showReviews" />
    <FAQ />
    <Contact />
  </main>
  <Footer />
  <BackToTop />
</template>
