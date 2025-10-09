<template>
  <div class="app-layout d-flex flex-column min-vh-100" :data-bs-theme="theme.themeMode">
    <!-- Skip to main content -->
    <a class="visually-hidden-focusable bg-primary text-white p-2" href="#main-content">
      Skip to main content
    </a>

    <!-- Header -->
    <Header />

    <!-- Breadcrumbs -->
    <Breadcrumb />

    <!-- Main Content -->
    <main id="main-content" class="flex-grow-1" role="main" itemscope itemtype="https://schema.org/WebPage">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Back to top button -->
    <BackToTop />

    <!-- Chat Widget -->
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useThemeStore } from '@/stores/theme'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Breadcrumb from './Breadcrumb.vue'
import BackToTop from '../common/BackToTop.vue'
import ChatWidget from '../common/ChatWidget.vue'

const themeStore = useThemeStore()

// Computed properties for dynamic content
const theme = computed(() => themeStore.theme)
const siteInfo = computed(() => themeStore.siteInfo)
const seoInfo = computed(() => themeStore.seoInfo)

// Set up dynamic head management
useHead({
  title: computed(() => `${seoInfo.value.title || siteInfo.value.siteName} - ${siteInfo.value.siteSlogan}`),
  meta: [
    {
      name: 'description',
      content: computed(() => seoInfo.value.metaDescription || '')
    },
    {
      name: 'keywords',
      content: computed(() => seoInfo.value.metaKeywords || '')
    },
    {
      name: 'author',
      content: computed(() => siteInfo.value.siteName || '')
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: computed(() => window.location.href)
    },
    {
      property: 'og:title',
      content: computed(() => `${seoInfo.value.title || siteInfo.value.siteName} - ${siteInfo.value.siteSlogan}`)
    },
    {
      property: 'og:description',
      content: computed(() => seoInfo.value.metaDescription || '')
    },
    {
      property: 'og:image',
      content: computed(() => seoInfo.value.ogImage || siteInfo.value.logo || '/images/logo.jpg')
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: computed(() => window.location.href)
    },
    {
      rel: 'icon',
      href: computed(() => siteInfo.value.favicon || '/favicon.ico'),
      type: 'image/x-icon'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://cdnjs.cloudflare.com',
      crossorigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
      integrity: 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteInfo.value.siteName || '',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }))
    },
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteInfo.value.siteName || '',
        url: window.location.origin,
        logo: siteInfo.value.logo || '/images/logo.jpg',
        sameAs: Object.values(themeStore.socialLinks).filter(link => link)
      }))
    }
  ]
})

onMounted(() => {
  // Initialize theme
  themeStore.initializeTheme()
  
  // Setup CSRF token for AJAX requests
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  if (csrfToken) {
    // Set up axios defaults
    import('axios').then(axios => {
      axios.default.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    })
  }
})
</script>

<style scoped>
.app-layout {
  font-family: 'Montserrat', sans-serif;
  color: v-bind('theme.textColor');
  background-color: v-bind('theme.backgroundColor');
}

:root {
  --primary-color: v-bind('theme.primaryColor');
  --secondary-color: v-bind('theme.secondaryColor');
  --accent-color: v-bind('theme.accentColor');
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

/* Back to top button */
#btn-back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  z-index: 99;
}
</style>