<template>
  <div class="service-category">
    <div class="category-header">
      <div class="category-icon">
        <i :class="category.icon_class"></i>
      </div>
      <div class="category-info">
        <h2 class="category-title">{{ category.name }}</h2>
        <p v-if="category.description" class="category-description">
          {{ category.description }}
        </p>
      </div>
    </div>

    <div class="service-grid">
      <div
        v-for="service in category.services"
        :key="service.service_id"
        class="service-item"
        @click="selectService(service)"
      >
        <div class="service-content">
          <h3 class="service-name">{{ service.name }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <div class="service-price">
            <span v-if="service.base_price > 0" class="price">
              {{ formatPrice(service.base_price) }}
            </span>
            <span v-else class="price-free">Miễn phí</span>
          </div>
        </div>
        <div class="service-actions">
          <button class="btn btn-outline-primary btn-sm">
            <i class="fas fa-info-circle me-1"></i>
            Chi tiết
          </button>
          <button class="btn btn-primary btn-sm">
            <i class="fas fa-calendar me-1"></i>
            Đặt lịch
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceCategory, Service } from '@/types/service'

interface Props {
  category: ServiceCategory
}

defineProps<Props>()

const emit = defineEmits<{
  serviceSelect: [service: Service]
}>()

const selectService = (service: Service) => {
  emit('serviceSelect', service)
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>

<style scoped>
.service-category {
  margin-bottom: 4rem;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e9ecef;
}

.category-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.category-icon:hover {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.category-icon i {
  font-size: 2.5rem;
  color: white;
}

.category-info {
  flex: 1;
}

.category-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.category-description {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.service-item {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.service-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-item:hover::before {
  transform: scaleX(1);
}

.service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.service-content {
  margin-bottom: 1.5rem;
}

.service-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  transition: color 0.3s ease;
}

.service-item:hover .service-name {
  color: #667eea;
}

.service-description {
  color: #6c757d;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.service-price {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: 2px solid rgba(40, 167, 69, 0.2);
}

.price-free {
  font-size: 1.1rem;
  font-weight: 600;
  color: #17a2b8;
  background: rgba(23, 162, 184, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: 2px solid rgba(23, 162, 184, 0.2);
}

.service-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-outline-primary {
  color: #667eea;
  border-color: #667eea;
  background: transparent;
}

.btn-outline-primary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  color: white;
}

/* Animation */
.service-item {
  animation: fadeInUp 0.6s ease-out;
}

.service-item:nth-child(1) { animation-delay: 0.1s; }
.service-item:nth-child(2) { animation-delay: 0.2s; }
.service-item:nth-child(3) { animation-delay: 0.3s; }
.service-item:nth-child(4) { animation-delay: 0.4s; }

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
  .service-category {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }

  .category-header {
    flex-direction: column;
    text-align: center;
    margin-bottom: 2rem;
  }

  .category-icon {
    margin-right: 0;
    margin-bottom: 1rem;
    width: 70px;
    height: 70px;
  }

  .category-icon i {
    font-size: 2rem;
  }

  .category-title {
    font-size: 2rem;
  }

  .service-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .service-item {
    padding: 1.25rem;
  }

  .service-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .service-category {
    padding: 1rem;
  }

  .category-title {
    font-size: 1.75rem;
  }

  .category-description {
    font-size: 1rem;
  }

  .service-name {
    font-size: 1.2rem;
  }

  .service-description {
    font-size: 0.9rem;
  }
}
</style>