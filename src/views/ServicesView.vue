<template>
  <div class="services-page">
    <!-- Search Section -->
    <ServiceSearch />

    <!-- Services Content -->
    <section class="services-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Đang tải danh sách dịch vụ...</p>
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

        <!-- Services Categories -->
        <div v-else-if="categoriesWithServices.length > 0" class="services-categories">
          <ServiceCategory
            v-for="category in categoriesWithServices"
            :key="category.category_id"
            :category="category"
            @service-select="handleServiceSelect"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="empty-container">
          <div class="empty-icon">
            <i class="fas fa-cogs"></i>
          </div>
          <h3>Chưa có dịch vụ nào</h3>
          <p>Danh sách dịch vụ sẽ được cập nhật sớm nhất.</p>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <ServiceContactForm />

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="cta-content">
              <h2 class="cta-title">Sẵn Sàng Tạo Nên Sự Kiện Đáng Nhớ?</h2>
              <p class="cta-description">
                Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết
              </p>
              <div class="cta-actions">
                <router-link to="/contact" class="btn btn-primary btn-lg">
                  <i class="fas fa-phone me-2"></i>
                  Liên Hệ Ngay
                </router-link>
                <router-link to="/gallery" class="btn btn-outline-light btn-lg">
                  <i class="fas fa-images me-2"></i>
                  Xem Thư Viện
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useServicesStore } from '@/stores/services'
import ServiceSearch from '@/components/services/ServiceSearch.vue'
import ServiceCategory from '@/components/services/ServiceCategory.vue'
import ServiceContactForm from '@/components/services/ServiceContactForm.vue'
import type { Service } from '@/types/service'
import TextInput from '@/components/ui/TextInput.vue'
import FormField from '@/components/ui/FormField.vue'

const servicesStore = useServicesStore()

// Computed properties
const categoriesWithServices = computed(() => servicesStore.categoriesWithServices)
const loading = computed(() => servicesStore.loading)
const error = computed(() => servicesStore.error)

// Set up dynamic head management
useHead({
  title: 'Dịch Vụ Tổ Chức Sự Kiện - Chuyên Nghiệp & Uy Tín',
  meta: [
    {
      name: 'description',
      content: 'Khám phá các dịch vụ tổ chức sự kiện chuyên nghiệp: tổ chức trọn gói, trang trí sân khấu, dịch vụ ẩm thực, âm thanh ánh sáng. Đội ngũ chuyên nghiệp, giá cả hợp lý.'
    },
    {
      name: 'keywords',
      content: 'dịch vụ tổ chức sự kiện, tổ chức đám cưới, trang trí sân khấu, dịch vụ ẩm thực, âm thanh ánh sáng, event planning'
    },
    {
      property: 'og:title',
      content: 'Dịch Vụ Tổ Chức Sự Kiện - Chuyên Nghiệp & Uy Tín'
    },
    {
      property: 'og:description',
      content: 'Khám phá các dịch vụ tổ chức sự kiện chuyên nghiệp: tổ chức trọn gói, trang trí sân khấu, dịch vụ ẩm thực, âm thanh ánh sáng. Đội ngũ chuyên nghiệp, giá cả hợp lý.'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
})

// Methods
const handleServiceSelect = (service: Service) => {
  console.log('Selected service:', service)
  // TODO: Implement service selection logic
  // Could open a modal, navigate to service detail, etc.
}

const retry = async () => {
  await servicesStore.fetchCategoriesWithServices()
}

// Lifecycle
onMounted(async () => {
  // Load services and categories on component mount
  await servicesStore.fetchCategoriesWithServices()
})
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.services-content {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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

.services-categories {
  max-width: 1200px;
  margin: 0 auto;
}

.cta-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d6efd, #fd7e14);
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.cta-description {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  color: #adb5bd;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  min-width: 200px;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #fd7e14 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(13, 110, 253, 0.4);
  color: white;
}

.btn-outline-light {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  backdrop-filter: blur(10px);
}

.btn-outline-light:hover {
  background: #0d6efd;
  border-color: #0d6efd;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
  color: #ffffff;
}

/* Animation removed - handled by AppLayout */

/* Responsive adjustments - matching footer styles */
@media (max-width: 1024px) {
  .cta-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 3rem 0 2rem;
  }

  .cta-title {
    font-size: 2.5rem;
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
  .cta-section {
    padding: 2rem 0;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-description {
    font-size: 1rem;
  }
}
</style>
