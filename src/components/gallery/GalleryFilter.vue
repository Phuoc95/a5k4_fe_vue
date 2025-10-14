<template>
  <div class="gallery-filter">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="filter-buttons text-center">
            <button
              v-for="category in categoryOptions"
              :key="category.value"
              :class="[
                'btn',
                'btn-outline-primary',
                'filter-btn',
                { active: currentFilter === category.value }
              ]"
              @click="handleFilterChange(category.value)"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import { GalleryCategory, GalleryCategoryLabels } from '@/types/gallery'

interface CategoryOption {
  value: GalleryCategory | 'all'
  label: string
}

const galleryStore = useGalleryStore()

const currentFilter = computed(() => galleryStore.currentFilter.category)

const categoryOptions = computed<CategoryOption[]>(() => [
  { value: 'all', label: 'Tất Cả' },
  { value: GalleryCategory.DECORATION, label: GalleryCategoryLabels[GalleryCategory.DECORATION] },
  { value: GalleryCategory.SOUND_LIGHTING, label: GalleryCategoryLabels[GalleryCategory.SOUND_LIGHTING] },
  { value: GalleryCategory.OTHER, label: GalleryCategoryLabels[GalleryCategory.OTHER] }
])

const handleFilterChange = async (category: GalleryCategory | 'all') => {
  await galleryStore.filterByCategory(category)
}
</script>

<style scoped>
.gallery-filter {
  padding: 2rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: 2px solid #007bff;
  background: transparent;
  color: #007bff;
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.filter-btn:hover::before {
  left: 100%;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  border-color: #0056b3;
  color: #0056b3;
}

.filter-btn.active {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border-color: #007bff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
}

.filter-btn.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-filter {
    padding: 1.5rem 0;
  }

  .filter-buttons {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .filter-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }

  .filter-btn {
    width: 100%;
    max-width: 200px;
    padding: 0.75rem 1rem;
  }
}
</style>