<template>
  <section class="hero-section">
    <div class="hero-carousel">
      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          type="button"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :aria-label="`Slide ${index + 1}`"
        ></button>
      </div>

      <!-- Carousel Inner -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="carousel-item"
          :class="{ active: currentSlide === index }"
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
        @click="previousSlide"
        style="top: 50% !important; transform: translateY(-50%);"
      >
        <i class="fas fa-arrow-left fa-2x"></i>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        @click="nextSlide"
        style="top: 50% !important; transform: translateY(-50%);"
      >
        <i class="fas fa-arrow-right fa-2x"></i>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
const currentSlide = ref(0)
let autoSlideInterval: NodeJS.Timeout | null = null

onMounted(async () => {
  // Load slides from store
  await homeStore.loadSlides()
  slides.value = homeStore.slides.length > 0 ? homeStore.slides : getDefaultSlides()
  
  // Start auto slide
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
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

const goToSlide = (index: number) => {
  currentSlide.value = index
  stopAutoSlide()
  startAutoSlide()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  stopAutoSlide()
  startAutoSlide()
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
  stopAutoSlide()
  startAutoSlide()
}

const startAutoSlide = () => {
  if (typeof window !== 'undefined') {
    autoSlideInterval = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }, 5000) // Change slide every 5 seconds
  }
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
}

.hero-carousel {
  position: relative;
}

.carousel-inner {
  position: relative;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  display: none;
  transition: opacity 0.6s ease-in-out;
}

.carousel-item.active {
  display: block;
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
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 3;
  cursor: pointer;
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
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 10px;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
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