<template>
  <div id="app">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="min-vh-100">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Back to top button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="btn btn-primary position-fixed"
      style="bottom: 20px; right: 20px; z-index: 1050; border-radius: 50%; width: 50px; height: 50px;"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Global app styles */
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

main {
  margin-top: 76px; /* Header height */
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #e74c3c;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c0392b;
}
</style>
