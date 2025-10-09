import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Slide {
  id: number
  title: string
  description: string
  imagePath: string
  isActive?: boolean
}

interface FeaturedService {
  id: number
  title: string
  description: string
  iconClass: string
  link: string
}

interface Testimonial {
  id: number
  content: string
  customerName: string
  customerImage: string
  rating: number
}

interface AboutData {
  title: string
  description: string
  features: string[]
  stats: {
    experience: string
    kohinos: string
    services: string
    satisfaction: string
  }
}

export const useHomeStore = defineStore('home', () => {
  // State
  const homeData = ref(null)
  const slides = ref<Slide[]>([])
  const featuredServices = ref<FeaturedService[]>([])
  const testimonials = ref<Testimonial[]>([])
  const aboutData = ref<AboutData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const loadSlides = async () => {
    try {
      loading.value = true
      // TODO: Replace with actual API call
      // const response = await api.get('/api/slides')
      // slides.value = response.data
      
      // For now, use default data
      slides.value = [
        {
          id: 1,
          title: 'Lưu giữ khoảnh khắc',
          description: 'Dịch vụ tổ chức sự kiện trọn gói chuyên nghiệp',
          imagePath: '/images/slides/slide_1.jpg'
        },
        {
          id: 2,
          title: 'Không gian đặc sắc',
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
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load slides'
    } finally {
      loading.value = false
    }
  }

  const loadFeaturedServices = async () => {
    try {
      loading.value = true
      // TODO: Replace with actual API call
      featuredServices.value = [
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
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load featured services'
    } finally {
      loading.value = false
    }
  }

  const loadTestimonials = async () => {
    try {
      loading.value = true
      // TODO: Replace with actual API call
      testimonials.value = [
        {
          id: 1,
          content: 'Event của chúng tôi thật sự hoàn hảo nhờ Kohino Events. Đội ngũ chuyên nghiệp và tận tâm.',
          customerName: 'Nguyễn Thu Hằng',
          customerImage: 'images/testimonials/testimonial_1.jpg',
          rating: 5
        },
        {
          id: 2,
          content: 'Chúng tôi rất hài lòng với dịch vụ trang trí và ẩm thực của Kohino Events. Mọi thứ đều tuyệt vời!',
          customerName: 'Trần Thanh Ngọc',
          customerImage: 'images/testimonials/testimonial_2.jpg',
          rating: 5
        },
        {
          id: 3,
          content: 'Dịch vụ âm thanh ánh sáng rất chuyên nghiệp. Cảm ơn Kohino Events đã giúp chúng tôi có một event đáng nhớ!',
          customerName: 'Lê Minh Đức',
          customerImage: 'images/testimonials/testimonial_3.jpg',
          rating: 5
        },
        {
          id: 4,
          content: 'Đội ngũ nhiếp ảnh gia rất tài năng, bắt trọn được những khoảnh khắc đẹp nhất của chúng tôi. Chất lượng hình ảnh vượt ngoài mong đợi!',
          customerName: 'Phạm Hương Giang',
          customerImage: 'images/testimonials/testimonial_4.jpg',
          rating: 5
        }
      ]
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load testimonials'
    } finally {
      loading.value = false
    }
  }

  const loadAboutData = async () => {
    try {
      loading.value = true
      // TODO: Replace with actual API call
      aboutData.value = {
        title: 'Về Chúng Tôi',
        description: 'Kohino Events là đơn vị chuyên tổ chức event hàng đầu tại TP.HCM. Với hơn 10 năm kinh nghiệm, chúng tôi đã giúp hàng nghìn cặp đôi có được ngày vui đẹp mơ ước.',
        features: [
          'Đội ngũ chuyên nghiệp',
          'Dịch vụ trọn gói',
          'Giá cả hợp lý',
          'Chất lượng đảm bảo'
        ],
        stats: {
          experience: '10+',
          kohinos: '1000+',
          services: '50+',
          satisfaction: '100%'
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load about data'
    } finally {
      loading.value = false
    }
  }

  const fetchHomeData = async () => {
    try {
      loading.value = true
      error.value = null
      
      // Load all home data in parallel
      await Promise.all([
        loadSlides(),
        loadFeaturedServices(),
        loadTestimonials(),
        loadAboutData()
      ])
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load home data'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    homeData,
    slides,
    featuredServices,
    testimonials,
    aboutData,
    loading,
    error,
    
    // Actions
    loadSlides,
    loadFeaturedServices,
    loadTestimonials,
    loadAboutData,
    fetchHomeData
  }
})
