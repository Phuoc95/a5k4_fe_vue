<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<style>
/* Global app styles */
#app {
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  min-height: 100vh;
}

/* Reset body margins */
body {
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
  width: 100%;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color);
}
</style>
