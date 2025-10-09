<template>
  <header class="bg-white shadow-sm">
    <!-- Top Bar -->
    <div class="top-bar py-2 d-none d-lg-block">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-white">
            <i class="far fa-clock me-2"></i> {{ contactInfo.workingHours }}
          </div>
          <div class="d-flex">
            <div class="me-4">
              <a
                v-if="socialLinks.facebook"
                :href="socialLinks.facebook"
                target="_blank"
                class="text-white me-3"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                v-if="socialLinks.zalo"
                :href="socialLinks.zalo"
                target="_blank"
                class="text-white me-3"
                aria-label="Zalo"
              >
                <i class="fab fa-whatsapp"></i>
              </a>
              <a
                v-if="socialLinks.youtube"
                :href="socialLinks.youtube"
                target="_blank"
                class="text-white me-3"
                aria-label="YouTube"
              >
                <i class="fab fa-youtube"></i>
              </a>
            </div>
            <a
              v-if="contactInfo.phone"
              :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`"
              class="text-white me-4"
            >
              <i class="fas fa-phone-alt me-2"></i> {{ contactInfo.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <img
            v-if="siteInfo.logo"
            :src="siteInfo.logo"
            :alt="siteInfo.siteName"
            class="img-fluid"
            style="max-height: 60px;"
          />
          <span v-else class="h4 mb-0 fw-bold text-primary">{{ siteInfo.siteName }}</span>
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMobileMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
                :class="{ 'active fw-bold': $route.path === '/' }"
              >
                Trang Chủ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/services"
                class="nav-link"
                :class="{ 'active fw-bold': $route.path.startsWith('/services') }"
              >
                Dịch Vụ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/gallery"
                class="nav-link"
                :class="{ 'active fw-bold': $route.path === '/gallery' }"
              >
                Thư Viện
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/contact"
                class="nav-link"
                :class="{ 'active fw-bold': $route.path === '/contact' }"
              >
                Liên Hệ
              </router-link>
            </li>
          </ul>

          <!-- Call Button -->
          <div v-if="contactInfo.phone" class="d-flex ms-lg-4">
            <a
              :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`"
              class="btn btn-primary rounded-pill px-4"
            >
              <i class="fas fa-phone-alt me-2"></i> Gọi ngay
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import { useThemeStore } from '@/stores/theme'

const uiStore = useUIStore()
const themeStore = useThemeStore()

const isMobileMenuOpen = computed(() => uiStore.isMobileMenuOpen)
const theme = computed(() => themeStore.theme)
const siteInfo = computed(() => themeStore.siteInfo)
const contactInfo = computed(() => themeStore.contactInfo)
const socialLinks = computed(() => themeStore.socialLinks)

const toggleMobileMenu = () => {
  uiStore.toggleMobileMenu()
}

const closeMobileMenu = () => {
  uiStore.closeMobileMenu()
}
</script>

<style scoped>
.top-bar {
  background-color: var(--primary-color, #0d6efd);
}

.navbar-brand img {
  border-radius: 4px;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color, #0d6efd) !important;
}

.nav-link.active {
  color: var(--primary-color, #0d6efd) !important;
  font-weight: 600;
}
</style>
