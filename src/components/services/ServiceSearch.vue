<template>
  <div class="service-search">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="search-container">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Tìm kiếm dịch vụ..."
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
import { useServicesStore } from '@/stores/services'

const servicesStore = useServicesStore()

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
    await servicesStore.searchServices(searchQuery.value.trim())
  } else {
    await servicesStore.fetchServices({ search: '' })
  }
}

const clearSearch = async () => {
  searchQuery.value = ''
  await servicesStore.fetchServices({ search: '' })
}

// Watch for changes in store's search filter
watch(
  () => servicesStore.currentFilter.search,
  (newSearch) => {
    if (newSearch !== searchQuery.value) {
      searchQuery.value = newSearch || ''
    }
  }
)
</script>

<style scoped>
.service-search {
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.service-search::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="searchDots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23searchDots)"/></svg>');
  opacity: 0.3;
}

.search-container {
  position: relative;
  z-index: 1;
}

.input-group {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  overflow: hidden;
  background: white;
  backdrop-filter: blur(10px);
}

.input-group-text {
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 1.2rem;
  padding: 0.875rem 1.5rem;
}

.form-control {
  border: none;
  padding: 0.875rem 0;
  font-size: 1.1rem;
  background: transparent;
  box-shadow: none;
  color: #2c3e50;
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
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-outline-secondary {
  color: #6c757d;
  background: transparent;
  border: 2px solid #e9ecef;
}

.btn-outline-secondary:hover {
  background: #f8f9fa;
  color: #495057;
  border-color: #dee2e6;
  transform: translateY(-1px);
}

/* Focus states */
.input-group:focus-within {
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .service-search {
    padding: 1.5rem 0;
  }

  .input-group {
    border-radius: 25px;
  }

  .btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }

  .input-group-text {
    padding: 0.75rem 1.25rem;
    font-size: 1.1rem;
  }

  .form-control {
    padding: 0.75rem 0;
    font-size: 1rem;
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