<template>
  <section class="testimonials-section py-5 bg-light">
    <div class="container">
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h2 class="mb-3">Khách Hàng Nói Gì</h2>
          <p class="lead text-muted">Những đánh giá chân thành từ khách hàng đã tin tưởng sử dụng dịch vụ của chúng tôi</p>
        </div>
      </div>
      
      <div class="row g-4">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="col-6 col-sm-6 col-md-6 col-lg-3"
        >
          <div class="testimonial-card h-100">
            <div class="testimonial-content">
              <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
              </div>
              <p class="testimonial-text">{{ testimonial.content }}</p>
              <div class="testimonial-author">
                <div class="author-avatar">
                  <img
                    :src="testimonial.customerImage"
                    :alt="testimonial.customerName"
                    class="img-fluid"
                  />
                </div>
                <div class="author-info">
                  <h6 class="author-name">{{ testimonial.customerName }}</h6>
                  <p class="author-title">Khách hàng</p>
                  <div class="rating">
                    <i
                      v-for="star in 5"
                      :key="star"
                      class="fas fa-star"
                      :class="{ 'text-warning': star <= testimonial.rating }"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'

interface Testimonial {
  id: number
  content: string
  customerName: string
  customerImage: string
  rating: number
}

const homeStore = useHomeStore()

const testimonials = ref<Testimonial[]>([])

onMounted(async () => {
  // Load testimonials from store
  await homeStore.loadTestimonials()
  testimonials.value = homeStore.testimonials.length > 0 
    ? homeStore.testimonials 
    : getDefaultTestimonials()
})

const getDefaultTestimonials = (): Testimonial[] => [
  {
    id: 1,
    content: 'Event của chúng tôi thật sự hoàn hảo nhờ Kohino Events. Đội ngũ chuyên nghiệp và tận tâm.',
    customerName: 'Nguyễn Thu Hằng',
    customerImage: '/images/customers/customer1.jpg',
    rating: 5
  },
  {
    id: 2,
    content: 'Chúng tôi rất hài lòng với dịch vụ trang trí và ẩm thực của Kohino Events. Mọi thứ đều tuyệt vời!',
    customerName: 'Trần Thanh Ngọc',
    customerImage: '/images/customers/customer2.jpg',
    rating: 5
  },
  {
    id: 3,
    content: 'Dịch vụ âm thanh ánh sáng rất chuyên nghiệp. Cảm ơn Kohino Events đã giúp chúng tôi có một event đáng nhớ!',
    customerName: 'Lê Minh Đức',
    customerImage: '/images/customers/customer3.jpg',
    rating: 5
  },
  {
    id: 4,
    content: 'Đội ngũ nhiếp ảnh gia rất tài năng, bắt trọn được những khoảnh khắc đẹp nhất của chúng tôi. Chất lượng hình ảnh vượt ngoài mong đợi!',
    customerName: 'Phạm Hương Giang',
    customerImage: '/images/customers/customer4.jpg',
    rating: 5
  }
]
</script>

<style scoped>
.testimonials-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.testimonial-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color, #0d6efd), var(--accent-color, #fd7e14));
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.testimonial-content {
  position: relative;
  z-index: 1;
}

.quote-icon {
  color: var(--primary-color, #0d6efd);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.testimonial-text {
  color: #555;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-clamp: 4;
  overflow: hidden;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid var(--primary-color, #0d6efd);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.author-title {
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.rating {
  display: flex;
  gap: 2px;
}

.rating i {
  font-size: 0.8rem;
  color: #ddd;
  transition: color 0.3s ease;
}

.rating i.text-warning {
  color: #ffc107;
}

/* Animation for cards */
.testimonial-card {
  animation: fadeInUp 0.6s ease-out;
}

.testimonial-card:nth-child(1) { animation-delay: 0.1s; }
.testimonial-card:nth-child(2) { animation-delay: 0.2s; }
.testimonial-card:nth-child(3) { animation-delay: 0.3s; }
.testimonial-card:nth-child(4) { animation-delay: 0.4s; }

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
  .testimonial-card {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .testimonial-author {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .author-avatar {
    width: 50px;
    height: 50px;
  }

  .testimonial-text {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
}

@media (max-width: 576px) {
  .testimonial-card {
    padding: 1rem;
  }

  .quote-icon {
    font-size: 1.25rem;
  }

  .testimonial-text {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .author-name {
    font-size: 0.9rem;
  }

  .author-title {
    font-size: 0.8rem;
  }

  .author-avatar {
    width: 45px;
    height: 45px;
  }
}
</style>