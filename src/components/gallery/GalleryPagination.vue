<template>
  <div v-if="totalPages > 1" class="gallery-pagination">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav aria-label="Gallery pagination">
            <ul class="pagination justify-content-center">
              <!-- Previous Button -->
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button
                  class="page-link"
                  :disabled="currentPage === 1"
                  @click="goToPage(currentPage - 1)"
                  aria-label="Previous page"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
              </li>

              <!-- Page Numbers -->
              <li
                v-for="page in visiblePages"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <button
                  v-if="page !== '...'"
                  class="page-link"
                  @click="goToPage(page)"
                  :aria-label="`Go to page ${page}`"
                >
                  {{ page }}
                </button>
                <span v-else class="page-link disabled">...</span>
              </li>

              <!-- Next Button -->
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button
                  class="page-link"
                  :disabled="currentPage === totalPages"
                  @click="goToPage(currentPage + 1)"
                  aria-label="Next page"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>

          <!-- Page Info -->
          <div class="pagination-info text-center mt-3">
            <small class="text-muted">
              Trang {{ currentPage }} / {{ totalPages }} 
              ({{ totalItems }} hình ảnh)
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.currentPage
  const total = props.totalPages
  const delta = 2 // Number of pages to show on each side of current page

  // Always show first page
  pages.push(1)

  // Calculate start and end of the range around current page
  const start = Math.max(2, current - delta)
  const end = Math.min(total - 1, current + delta)

  // Add ellipsis if needed
  if (start > 2) {
    pages.push('...')
  }

  // Add pages in range
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i)
    }
  }

  // Add ellipsis if needed
  if (end < total - 1) {
    pages.push('...')
  }

  // Always show last page (if more than 1 page)
  if (total > 1) {
    pages.push(total)
  }

  return pages
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('pageChange', page)
  }
}
</script>

<style scoped>
.gallery-pagination {
  padding: 2rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-top: 1px solid #e9ecef;
}

.pagination {
  margin-bottom: 0;
}

.page-item {
  margin: 0 0.25rem;
}

.page-link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  height: 45px;
  padding: 0.5rem;
  border: 2px solid #dee2e6;
  background: white;
  color: #495057;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.page-link:hover:not(.disabled) {
  background: #007bff;
  border-color: #007bff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.page-item.active .page-link {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border-color: #007bff;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

.page-item.disabled .page-link {
  background: #f8f9fa;
  border-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.page-link.disabled {
  background: #f8f9fa;
  border-color: #e9ecef;
  color: #6c757d;
  cursor: default;
}

.pagination-info {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .gallery-pagination {
    padding: 1.5rem 0;
  }

  .page-link {
    min-width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }

  .page-item {
    margin: 0 0.125rem;
  }
}

@media (max-width: 576px) {
  .page-link {
    min-width: 35px;
    height: 35px;
    font-size: 0.8rem;
    padding: 0.25rem;
  }

  .pagination-info {
    font-size: 0.8rem;
  }
}
</style>