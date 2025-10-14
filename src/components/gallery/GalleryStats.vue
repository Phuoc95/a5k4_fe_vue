<template>
  <div class="gallery-stats">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-images"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ totalItems }}</h3>
                <p class="stat-label">Hình Ảnh</p>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ featuredCount }}</h3>
                <p class="stat-label">Nổi Bật</p>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-tags"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ categoriesCount }}</h3>
                <p class="stat-label">Danh Mục</p>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-eye"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ currentFilteredCount }}</h3>
                <p class="stat-label">Đang Hiển Thị</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGalleryStore } from '@/stores/gallery'

const galleryStore = useGalleryStore()

const totalItems = computed(() => galleryStore.totalItems)
const featuredCount = computed(() => galleryStore.featuredGalleries.length)
const categoriesCount = computed(() => galleryStore.categories.length)
const currentFilteredCount = computed(() => galleryStore.filteredGalleries.length)
</script>

<style scoped>
.gallery-stats {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
}

.gallery-stats::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-align: left;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Animation */
.stat-item {
  animation: fadeInUp 0.6s ease-out;
}

.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.3s; }
.stat-item:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-stats {
    padding: 2rem 0;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .stat-item {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-item {
    padding: 1rem;
  }

  .stat-icon {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }

  .stat-number {
    font-size: 1.75rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }
}
</style>