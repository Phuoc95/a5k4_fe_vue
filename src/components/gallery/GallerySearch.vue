<template>
  <div class="gallery-search">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="search-container">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Tìm kiếm hình ảnh..."
                @input="handleSearch"
                @keyup.enter="performSearch"
              />
              <button
                v-if="searchQuery"
                class="btn btn-outline-secondary"
                type="button"
                @click="clearSearch"
              >
                <i class="fas fa-times"></i>
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="performSearch"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGalleryStore } from '@/stores/gallery'

const galleryStore = useGalleryStore()

// State
const searchQuery = ref('')
let searchTimeout: number | null = null

// Methods
const handleSearch = () => {
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  // Set new timeout for debounced search
  searchTimeout = window.setTimeout(() => {
    performSearch()
  }, 500) // 500ms delay
}

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await galleryStore.searchGalleries(searchQuery.value.trim())
  } else {
    await galleryStore.fetchGalleries({ search: '' })
  }
}

const clearSearch = async () => {
  searchQuery.value = ''
  await galleryStore.fetchGalleries({ search: '' })
}

// Watch for changes in store's search filter
watch(
  () => galleryStore.currentFilter.search,
  (newSearch) => {
    if (newSearch !== searchQuery.value) {
      searchQuery.value = newSearch || ''
    }
  }
)
</script>

<style scoped>
.gallery-search {
  padding: 1.5rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-bottom: 1px solid #e9ecef;
}

.search-container {
  position: relative;
}

.input-group {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  overflow: hidden;
  background: white;
}

.input-group-text {
  background: transparent;
  border: none;
  color: #6c757d;
  font-size: 1.1rem;
  padding: 0.75rem 1.25rem;
}

.form-control {
  border: none;
  padding: 0.75rem 0;
  font-size: 1rem;
  background: transparent;
  box-shadow: none;
}

.form-control:focus {
  border: none;
  box-shadow: none;
  background: transparent;
}

.form-control::placeholder {
  color: #adb5bd;
  font-style: italic;
}

.btn {
  border-radius: 0;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border: none;
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn-outline-secondary {
  border: none;
  color: #6c757d;
  background: transparent;
}

.btn-outline-secondary:hover {
  background: #f8f9fa;
  color: #495057;
  transform: translateY(-1px);
}

/* Focus states */
.input-group:focus-within {
  box-shadow: 0 6px 25px rgba(0, 123, 255, 0.15);
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-search {
    padding: 1rem 0;
  }

  .input-group {
    border-radius: 25px;
  }

  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .input-group-text {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }

  .form-control {
    padding: 0.6rem 0;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .input-group {
    flex-direction: column;
    border-radius: 15px;
  }

  .input-group-text {
    border-radius: 15px 15px 0 0;
  }

  .form-control {
    border-radius: 0;
  }

  .btn {
    border-radius: 0 0 15px 15px;
  }

  .btn:first-of-type {
    border-radius: 0;
  }
}
</style>