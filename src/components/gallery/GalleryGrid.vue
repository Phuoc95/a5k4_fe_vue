<template>
  <div class="gallery-grid-container">
    <div class="container-fluid">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Đang tải thư viện ảnh...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>
        <button class="btn btn-primary" @click="retry">
          <i class="fas fa-redo me-2"></i>
          Thử lại
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="galleries.length === 0" class="empty-container">
        <div class="empty-icon">
          <i class="fas fa-images"></i>
        </div>
        <h3>Chưa có hình ảnh nào</h3>
        <p>Thư viện ảnh sẽ được cập nhật sớm nhất.</p>
      </div>

      <!-- Gallery Grid -->
      <div v-else class="gallery-grid">
        <div
          v-for="gallery in galleries"
          :key="gallery.image_id"
          class="gallery-item"
          :data-category="gallery.category"
          @click="openLightbox(gallery)"
        >
          <div class="gallery-image-container">
            <img
              :src="gallery.image_path"
              :alt="gallery.title"
              class="gallery-image"
              loading="lazy"
            />
            <div class="gallery-overlay">
              <div class="gallery-content">
                <h4 class="gallery-title">{{ gallery.title }}</h4>
                <p v-if="gallery.description" class="gallery-description">
                  {{ gallery.description }}
                </p>
                <div class="gallery-actions">
                  <i class="fas fa-search-plus gallery-icon"></i>
                  <span class="gallery-category">{{ getCategoryLabel(gallery.category) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="selectedGallery"
      class="lightbox-modal"
      @click="closeLightbox"
    >
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">
          <i class="fas fa-times"></i>
        </button>
        <img
          :src="selectedGallery.image_path"
          :alt="selectedGallery.title"
          class="lightbox-image"
        />
        <div class="lightbox-info">
          <h3>{{ selectedGallery.title }}</h3>
          <p v-if="selectedGallery.description">{{ selectedGallery.description }}</p>
          <span class="lightbox-category">{{ getCategoryLabel(selectedGallery.category) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GalleryCategory, GalleryCategoryLabels } from '@/types/gallery'
import type { GalleryItem } from '@/types/gallery'

// Props
defineProps<{
  galleries: GalleryItem[]
  loading: boolean
  error: string | null
}>()

// Emits
const emit = defineEmits<{
  retry: []
}>()

// State
const selectedGallery = ref<GalleryItem | null>(null)

// Methods
const getCategoryLabel = (category: GalleryCategory): string => {
  return GalleryCategoryLabels[category] || category
}

// Methods
const openLightbox = (gallery: GalleryItem) => {
  selectedGallery.value = gallery
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedGallery.value = null
  document.body.style.overflow = 'auto'
}

const retry = () => {
  emit('retry')
}

// Keyboard navigation for lightbox
const handleKeydown = (event: KeyboardEvent) => {
  if (selectedGallery.value) {
    if (event.key === 'Escape') {
      closeLightbox()
    }
  }
}

// Add event listener for keyboard navigation
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
.gallery-grid-container {
  padding: 2rem 0;
  min-height: 400px;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  background: white;
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.gallery-image-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-content {
  text-align: center;
  color: white;
  padding: 1rem;
}

.gallery-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.gallery-description {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  line-height: 1.4;
}

.gallery-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.gallery-icon {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

.gallery-category {
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Lightbox Styles */
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.lightbox-info {
  margin-top: 1rem;
  text-align: center;
  color: white;
  max-width: 600px;
}

.lightbox-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.lightbox-info p {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.lightbox-category {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  .gallery-image-container {
    height: 200px;
  }

  .gallery-title {
    font-size: 1.1rem;
  }

  .lightbox-modal {
    padding: 1rem;
  }

  .lightbox-image {
    max-height: 60vh;
  }

  .lightbox-info h3 {
    font-size: 1.25rem;
  }
}

@media (max-width: 576px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .gallery-image-container {
    height: 180px;
  }

  .lightbox-close {
    top: -40px;
    width: 35px;
    height: 35px;
    font-size: 1.25rem;
  }
}
</style>
