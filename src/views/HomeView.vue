<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- About Section -->
    <AboutSection />

    <!-- Featured Services Section -->
    <FeaturedServices />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- Contact CTA Section -->
    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import FeaturedServices from '@/components/home/FeaturedServices.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import ContactCTA from '@/components/home/ContactCTA.vue'

const homeStore = useHomeStore()

onMounted(async () => {
  // Load all home data
  await homeStore.fetchHomeData()
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.testimonial-card {
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-2px);
}

.stat-item h2 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .hero-section {
    text-align: center;
    padding: 100px 0;
  }

  .hero-section .display-3 {
    font-size: 2.5rem;
  }

  .stat-item h2 {
    font-size: 2rem;
  }
}
</style>
