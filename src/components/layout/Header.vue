<template>
  <header class="fixed-top bg-white shadow-sm">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <img src="/images/logo.jpg" alt="Logo" height="48" />
        </router-link>

        <!-- Desktop Nav -->
        <div class="navbar-nav d-none d-lg-flex">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: $route.path === item.path }"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          @click="toggleMobileMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="d-lg-none bg-white border-top">
        <div class="container py-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="d-block py-2 text-decoration-none"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

const isMobileMenuOpen = computed(() => uiStore.isMobileMenuOpen)
const navItems = [
  { label: 'Trang Chủ', path: '/' },
  { label: 'Dịch Vụ', path: '/services' },
  { label: 'Thư Viện', path: '/gallery' },
  { label: 'Liên Hệ', path: '/contact' }
]

const toggleMobileMenu = () => {
  uiStore.toggleMobileMenu()
}

const closeMobileMenu = () => {
  uiStore.closeMobileMenu()
}
</script>

<style scoped>
.navbar-brand img {
  border-radius: 4px;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e74c3c !important;
}

.nav-link.active {
  color: #e74c3c !important;
  font-weight: 600;
}
</style>
