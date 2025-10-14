<template>
  <div class="gallery-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="page-title">Thư Viện Ảnh</h1>
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/" class="breadcrumb-link">Trang Chủ</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Thư Viện Ảnh</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Search -->
    <GallerySearch />

    <!-- Gallery Filter -->
    <GalleryFilter />

    <!-- Gallery Grid -->
    <GalleryGrid
      :galleries="galleries"
      :loading="loading"
      :error="error"
      @retry="handleRetry"
    />

    <!-- Load More Button -->
    <div v-if="galleries.length > 0 && hasMorePages" class="load-more-section">
      <div class="container">
        <div class="text-center">
          <button
            class="btn btn-primary btn-lg load-more-btn"
            :disabled="loading"
            @click="loadMore"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
            <i v-else class="fas fa-plus me-2"></i>
            {{ loading ? 'Đang tải...' : 'Xem thêm ảnh' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Bạn Muốn Có Những Bức Ảnh Đẹp Như Thế Này?</h2>
          <p class="cta-description">
            Liên hệ ngay với chúng tôi để được tư vấn và đặt lịch chụp ảnh
          </p>
          <div class="cta-actions">
            <router-link to="/contact" class="btn btn-primary btn-lg">
              <i class="fas fa-calendar-alt me-2"></i>
              Đặt Lịch Ngay
            </router-link>
            <router-link to="/services" class="btn btn-outline-light btn-lg">
              <i class="fas fa-info-circle me-2"></i>
              Xem Dịch Vụ
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import GallerySearch from '@/components/gallery/GallerySearch.vue'
import GalleryFilter from '@/components/gallery/GalleryFilter.vue'
import GalleryGrid from '@/components/gallery/GalleryGrid.vue'

const galleryStore = useGalleryStore()

// Computed properties
const galleries = computed(() => galleryStore.galleries)
const loading = computed(() => galleryStore.loading)
const error = computed(() => galleryStore.error)
const hasMorePages = computed(() => galleryStore.currentPage < galleryStore.totalPages)

// Methods
const handleRetry = async () => {
  await galleryStore.fetchGalleries()
}

const loadMore = async () => {
  const nextPage = galleryStore.currentPage + 1
  await galleryStore.fetchGalleries({ 
    per_page: galleryStore.currentFilter.per_page,
    page: nextPage 
  })
}

// Initialize
onMounted(async () => {
  await galleryStore.fetchGalleries()
})
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-background-soft) 0%, var(--color-background-mute) 100%);
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  color: white;
  padding: 4rem 0 3rem;
  position: relative;
  overflow: hidden;
}"

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.breadcrumb-nav {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.load-more-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-soft) 100%);
}

.load-more-btn {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border: none;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
}

.load-more-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.4);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cta-section {
  background: linear-gradient(135deg, var(--vt-c-black-soft) 0%, var(--vt-c-black-mute) 100%);
  color: white;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}
.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.5;
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.cta-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  min-width: 200px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.4);
  color: white;
}

.btn-outline-light {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  backdrop-filter: blur(10px);
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
  color: white;
}

/* Animation */
.page-header {
  animation: slideInDown 0.8s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header {
    padding: 3rem 0 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-description {
    font-size: 1.1rem;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 576px) {
  .page-header {
    padding: 2.5rem 0 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .breadcrumb {
    flex-direction: column;
    text-align: center;
    gap: 0.25rem;
  }

  .breadcrumb-item + .breadcrumb-item::before {
    display: none;
  }

  .cta-title {
    font-size: 1.75rem;
  }

  .cta-description {
    font-size: 1rem;
  }

  .load-more-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
