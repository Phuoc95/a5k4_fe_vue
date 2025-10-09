<template>
  <section class="hero-section">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          type="button"
          :data-bs-target="`#carouselExampleCaptions`"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : undefined"
          :aria-label="`Slide ${index + 1}`"
        ></button>
      </div>

      <!-- Carousel Inner -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img
            :src="slide.imagePath"
            class="d-block w-100"
            :alt="slide.title"
            style="height: 70vh; object-fit: cover;"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5 class="display-4 fw-bold mb-3">{{ slide.title }}</h5>
            <p class="lead mb-4">{{ slide.description }}</p>
            <router-link
              to="/services"
              class="btn btn-primary btn-lg px-4 py-2"
            >
              Xem Chi Tiết
            </router-link>
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        style="top: 50% !important; transform: translateY(-50%);"
      >
        <i class="fas fa-arrow-left fa-2x"></i>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        style="top: 50% !important; transform: translateY(-50%);"
      >
        <i class="fas fa-arrow-right fa-2x"></i>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'

interface Slide {
  id: number
  title: string
  description: string
  imagePath: string
  isActive?: boolean
}

const homeStore = useHomeStore()

// Get slides from store or use default
const slides = ref<Slide[]>([])

onMounted(async () => {
  // Load slides from store
  await homeStore.loadSlides()
  slides.value = homeStore.slides.length > 0 ? homeStore.slides : getDefaultSlides()
})

const getDefaultSlides = (): Slide[] => [
  {
    id: 1,
    title: 'Tạo Nên Kỷ Niệm Đẹp Cho Ngày Cưới',
    description: 'Dịch vụ tổ chức sự kiện trọn gói chuyên nghiệp',
    imagePath: '/images/slides/slide_1.jpg'
  },
  {
    id: 2,
    title: 'Trang Trí Sân Khấu Độc Đáo',
    description: 'Thiết kế sân khấu ấn tượng cho ngày trọng đại',
    imagePath: '/images/slides/slide_2.jpg'
  },
  {
    id: 3,
    title: 'Thiết Kế Sân Khấu Độc Đáo',
    description: 'Thiết kế sân khấu ấn tượng cho ngày trọng đại',
    imagePath: '/images/slides/slide_3.jpg'
  }
]
</script>

<style scoped>
.hero-section {
  position: relative;
}

.carousel-item {
  position: relative;
}

.carousel-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.carousel-control-prev,
.carousel-control-next {
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 3;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.carousel-control-prev {
  left: 30px;
}

.carousel-control-next {
  right: 30px;
}

.carousel-indicators {
  bottom: 20px;
  z-index: 3;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background: white;
  transform: scale(1.2);
}

.carousel-indicators button:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-item img {
    height: 50vh !important;
  }
  
  .carousel-caption h5 {
    font-size: 2rem !important;
  }
  
  .carousel-caption p {
    font-size: 1rem !important;
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .carousel-control-prev {
    left: 15px;
  }
  
  .carousel-control-next {
    right: 15px;
  }
}

@media (max-width: 576px) {
  .carousel-caption {
    padding: 0 20px;
  }
  
  .carousel-caption h5 {
    font-size: 1.5rem !important;
    margin-bottom: 1rem !important;
  }
  
  .carousel-caption p {
    font-size: 0.9rem !important;
    margin-bottom: 1.5rem !important;
  }
  
  .carousel-caption .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}
</style>