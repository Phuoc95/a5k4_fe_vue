<template>
  <section class="featured-services py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h2 class="mb-3">Dịch Vụ Nổi Bật</h2>
          <p class="lead text-muted">Chúng tôi cung cấp đa dạng các dịch vụ tổ chức đám cưới chuyên nghiệp</p>
        </div>
      </div>
      
      <div class="row g-4">
        <div
          v-for="service in featuredServices"
          :key="service.id"
          class="col-lg-3 col-md-6"
        >
          <div class="service-card h-100">
            <div class="service-icon">
              <i :class="service.iconClass"></i>
            </div>
            <h4 class="service-title">{{ service.title }}</h4>
            <p class="service-description">{{ service.description }}</p>
            <router-link
              :to="service.link"
              class="service-link"
            >
              Xem chi tiết
              <i class="fas fa-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'

interface FeaturedService {
  id: number
  title: string
  description: string
  iconClass: string
  link: string
}

const homeStore = useHomeStore()

const featuredServices = ref<FeaturedService[]>([])

onMounted(async () => {
  // Load featured services from store
  await homeStore.loadFeaturedServices()
  featuredServices.value = homeStore.featuredServices.length > 0 
    ? homeStore.featuredServices 
    : getDefaultServices()
})

const getDefaultServices = (): FeaturedService[] => [
  {
    id: 1,
    title: 'Tổ Chức Trọn Gói',
    description: 'Từ A đến Z, chúng tôi lo tất cả',
    iconClass: 'fas fa-concierge-bell',
    link: '/services#organize'
  },
  {
    id: 2,
    title: 'Trang Trí Sân Khấu',
    description: 'Thiết kế độc đáo, sang trọng',
    iconClass: 'fas fa-paint-brush',
    link: '/services#decor'
  },
  {
    id: 3,
    title: 'Dịch Vụ Ẩm Thực',
    description: 'Thực đơn đa dạng, ngon miệng',
    iconClass: 'fas fa-utensils',
    link: '/services#catering'
  },
  {
    id: 4,
    title: 'Âm Thanh - Ánh Sáng',
    description: 'Trang thiết bị hiện đại',
    iconClass: 'fas fa-music',
    link: '/services#audio'
  }
]
</script>

<style scoped>
.featured-services {
  background: white;
}

.service-card {
  background: white;
  border-radius: 15px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(5deg);
}

.service-icon i {
  font-size: 2rem;
  color: white;
}

.service-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.service-card:hover .service-title {
  color: var(--primary-color);
}

.service-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.service-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.service-link:hover {
  color: var(--accent-color);
  transform: translateX(5px);
}

.service-link i {
  transition: transform 0.3s ease;
}

.service-link:hover i {
  transform: translateX(3px);
}

/* Animation for cards */
.service-card {
  animation: fadeInUp 0.6s ease-out;
}

.service-card:nth-child(1) { animation-delay: 0.1s; }
.service-card:nth-child(2) { animation-delay: 0.2s; }
.service-card:nth-child(3) { animation-delay: 0.3s; }
.service-card:nth-child(4) { animation-delay: 0.4s; }

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
  .service-card {
    padding: 2rem 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .service-icon {
    width: 70px;
    height: 70px;
  }
  
  .service-icon i {
    font-size: 1.8rem;
  }
  
  .service-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .service-card {
    padding: 1.5rem 1rem;
  }
  
  .service-icon {
    width: 60px;
    height: 60px;
  }
  
  .service-icon i {
    font-size: 1.5rem;
  }
  
  .service-title {
    font-size: 1.1rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
}
</style>