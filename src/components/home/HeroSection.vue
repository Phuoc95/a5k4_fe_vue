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
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ slide.title }}</h5>
            <p>{{ slide.description }}</p>
            <router-link
              to="/services"
              class="btn btn-primary"
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
      >
        <i class="fas fa-arrow-left fa-2x"></i>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        @click="nextSlide"
      >
        <i class="fas fa-arrow-right fa-2x"></i>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

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
let autoSlideInterval: number | null = null

onMounted(async () => {
  // Load slides from store first
  await homeStore.loadSlides()

  // Use store slides if available, otherwise use default
  if (homeStore.slides && homeStore.slides.length > 0) {
    slides.value = homeStore.slides
  } else {
    slides.value = getDefaultSlides()
  }

  // Start auto slide
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})

const getDefaultSlides = (): Slide[] => [
  {
    id: 1,
    title: 'Tạo Nên Kỷ Niệm Đẹp Cho event',
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
    autoSlideInterval = window.setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }, 5000) // Change slide every 5 seconds
  }
}

const stopAutoSlide = () => {
  if (autoSlideInterval !== null) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
}

.hero-carousel {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  max-width: 98%;
  margin: 0 auto;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-item img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  /* Prevent image distortion */
  min-height: 100%;
  max-width: none;
}

.carousel-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
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
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  max-width: 90vw;
  padding: 0 30px;
  /* Prevent text wrapping */
  white-space: nowrap;
}

.carousel-caption h5 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  /* Ensure text doesn't break */
  word-break: keep-all;
  overflow-wrap: normal;
}

.carousel-caption p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  /* Allow wrapping for description */
  white-space: normal;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.carousel-caption .btn {
  font-size: 1.1rem;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.carousel-caption .btn:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  /* Ensure proper centering */
  width: auto;
  margin: 0 auto;
}

.carousel-indicators button {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
}

.carousel-indicators button.active {
  background: rgba(255, 255, 255, 0.9);
  border-color: white;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.carousel-indicators button:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.15);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .carousel-caption h5 {
    font-size: 3rem;
  }

  .carousel-caption p {
    font-size: 1.1rem;
    max-width: 500px;
  }

  .carousel-indicators {
    bottom: 35px;
    gap: 10px;
  }

  .hero-carousel {
    max-width: 95%;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 80vh;
  }

  .hero-carousel {
    height: 80vh;
    max-width: 95%;
  }

  .carousel-item img {
    height: 80vh;
  }

  .carousel-caption {
    max-width: 95vw;
    padding: 0 20px;
  }

  .carousel-caption h5 {
    font-size: 2.5rem;
    white-space: normal;
    word-break: break-word;
  }

  .carousel-caption p {
    font-size: 1rem;
    max-width: 400px;
    white-space: normal;
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

  .carousel-indicators {
    bottom: 25px;
    gap: 8px;
  }

  .carousel-indicators button {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    min-height: 70vh;
  }

  .hero-carousel {
    height: 70vh;
    max-width: 100%;
  }

  .carousel-item img {
    height: 70vh;
  }

  .carousel-caption {
    padding: 0 15px;
    max-width: 100vw;
  }

  .carousel-caption h5 {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    line-height: 1.2;
  }

  .carousel-caption p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    max-width: 300px;
  }

  .carousel-caption .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }

  .carousel-indicators {
    bottom: 20px;
    gap: 6px;
  }

  .carousel-indicators button {
    width: 10px;
    height: 10px;
    border-width: 1px;
  }
}
</style>