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
