# TODO List: Xây Dựng Homepage với Vue.js + Pinia

## 📋 Phân Tích Source Code Hiện Tại

### Backend (Laravel)
- **Framework**: Laravel với Filament Admin
- **Controllers**: HomeController, ServiceController, GalleryController, ContactController
- **Models**: Service, ServiceCategory, Gallery, Testimonial, HomePage, Contact, Booking, Customer, Payment
- **Routes**: Frontend routes đã được định nghĩa trong `routes/web.php`
- **API Support**: Controllers hỗ trợ JSON response (`$request->wantsJson()`)

### Frontend (HTML/CSS/Bootstrap)
- **Design**: Kohino Events - Dịch vụ tổ chức event
- **Sections**:
  - Header với navigation
  - Hero carousel (Bootstrap 5)
  - About section với stats
  - Featured services (4 services)
  - Customer reviews/testimonials (4 reviews)
  - Contact info
  - Footer
- **Styling**: Bootstrap 5.3.6, Font Awesome 6.0, Custom CSS
- **Colors**: Primary #e74c3c (red), Secondary #c0392b
- **Responsive**: Mobile-first design

---

## 🎯 TODO List Chi Tiết

### Phase 1: Setup Dự Án Vue.js

#### 1.1 Khởi Tạo Project
- [ ] Tạo project Vue mới với Vite
  ```bash
  npm create vue@latest vue-frontend
  cd vue-frontend
  ```
- [ ] Cài đặt dependencies cơ bản
  ```bash
  npm install
  ```

#### 1.2 Cài Đặt UI Framework & Libraries
- [ ] Cài đặt **Bootstrap Vue** (recommended để giữ nguyên design hiện tại)
  ```bash
  npm install bootstrap-vue bootstrap
  ```
- [ ] Cài đặt **Vue Router** cho SPA routing
  ```bash
  npm install vue-router@4
  ```
- [ ] Cài đặt **Pinia** cho state management
  ```bash
  npm install pinia
  ```
- [ ] Cài đặt **VueUse** cho utilities
  ```bash
  npm install @vueuse/core
  ```
- [ ] Cài đặt **Swiper** cho carousel
  ```bash
  npm install swiper
  ```
- [ ] Cài đặt **Axios** cho API calls
  ```bash
  npm install axios
  ```

#### 1.3 Cấu Hình Vue
- [ ] Cấu hình `vite.config.js` với các plugins cần thiết
- [ ] Cấu hình Bootstrap Vue trong main.js
- [ ] Cấu hình Vue Router với các routes
- [ ] Cấu hình Pinia store
- [ ] Import Bootstrap CSS và JavaScript
- [ ] Tạo file `.env` với API URL
  ```
  VITE_API_BASE_URL=http://localhost:8000
  ```

---

### Phase 2: Cấu Trúc Thư Mục & Components

#### 2.1 Tạo Cấu Trúc Thư Mục
```
vue-frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Navigation.vue
│   │   ├── home/
│   │   │   ├── HeroCarousel.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── StatsSection.vue
│   │   │   ├── FeaturedServices.vue
│   │   │   ├── TestimonialsSection.vue
│   │   │   └── ContactSection.vue
│   │   └── ui/
│   │       ├── ServiceCard.vue
│   │       ├── TestimonialCard.vue
│   │       └── StatItem.vue
│   ├── composables/
│   │   ├── useApi.ts
│   │   ├── useHomePage.ts
│   │   └── useSEO.ts
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   ├── home.ts
│   │   ├── services.ts
│   │   └── ui.ts
│   ├── types/
│   │   ├── service.ts
│   │   ├── testimonial.ts
│   │   └── gallery.ts
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Services.vue
│   │   ├── Gallery.vue
│   │   ├── Contact.vue
│   │   └── About.vue
│   └── assets/
│       └── css/
│           └── main.css
├── public/
└── index.html
```

#### 2.2 Checklist Tạo Files
- [ ] Cấu hình main.js với Vue app setup
- [ ] Tạo router/index.ts với các routes
- [ ] Tạo stores với Pinia
- [ ] Tạo các components trong thư mục components/
- [ ] Tạo các views trong thư mục views/

---

### Phase 3: Thiết Lập API Integration

#### 3.1 Tạo Composables
- [ ] **useApi.ts** - Base API composable
  ```typescript
  import axios from 'axios'

  export const useApi = () => {
    const config = import.meta.env
    const baseURL = config.VITE_API_BASE_URL

    const instance = axios.create({
      baseURL,
      timeout: 10000
    })

    const get = async (endpoint: string) => {
      const response = await instance.get(endpoint)
      return response.data
    }

    const post = async (endpoint: string, data: any) => {
      const response = await instance.post(endpoint, data)
      return response.data
    }

    return { get, post, put: instance.put, delete: instance.delete }
  }
  ```

- [ ] **useHomePage.ts** - Homepage data fetching
  ```typescript
  import { useApi } from './useApi'

  export const useHomePage = () => {
    const { get } = useApi()

    const fetchHomeData = async () => {
      try {
        const data = await get('/')
        return data
      } catch (error) {
        console.error('Error fetching home data:', error)
        throw error
      }
    }

    return { fetchHomeData }
  }
  ```

#### 3.2 Tạo Pinia Stores
- [ ] **stores/home.ts**
  ```typescript
  import { defineStore } from 'pinia'
  import { useHomePage } from '@/composables/useHomePage'

  export const useHomeStore = defineStore('home', {
    state: () => ({
      homeData: null,
      loading: false,
      error: null
    }),

    actions: {
      async fetchHomeData() {
        this.loading = true
        this.error = null
        try {
          const { fetchHomeData } = useHomePage()
          this.homeData = await fetchHomeData()
        } catch (error) {
          this.error = error.message
        } finally {
          this.loading = false
        }
      }
    }
  })
  ```

#### 3.3 Tạo TypeScript Types
- [ ] **types/service.ts**
  ```typescript
  export interface Service {
    id: number
    name: string
    description: string
    icon: string
    category_id: number
  }

  export interface ServiceCategory {
    id: number
    name: string
    slug: string
    services: Service[]
  }
  ```

- [ ] **types/testimonial.ts**
  ```typescript
  export interface Testimonial {
    id: number
    name: string
    position: string
    content: string
    avatar: string
    rating?: number
  }
  ```

- [ ] **types/slide.ts**
  ```typescript
  export interface Slide {
    id: number
    title: string
    subtitle: string
    image: string
    cta_text?: string
    cta_link?: string
  }
  ```

---

### Phase 4: Xây Dựng Layout Components

#### 4.1 Header Component (Vue + Bootstrap Vue)
- [ ] Tạo sticky header với backdrop blur
- [ ] Logo section
- [ ] Navigation menu với Bootstrap Vue components
  - [ ] Desktop menu (horizontal)
  - [ ] Mobile menu (hamburger + collapse)
- [ ] Active link highlighting với Vue Router
- [ ] Smooth scroll behavior
- [ ] Responsive design

**Features với Bootstrap Vue:**
```vue
<template>
  <header class="fixed-top bg-white shadow-sm">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <img src="/images/logo.jpg" alt="Logo" height="48" />
        </router-link>
        
        <!-- Desktop Nav -->
        <div class="navbar-nav d-none d-lg-flex">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: $route.path === item.path }"
          >
            {{ item.label }}
          </router-link>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          class="navbar-toggler d-lg-none" 
          type="button"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      
      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="d-lg-none bg-white border-top">
        <div class="container py-3">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="d-block py-2 text-decoration-none"
            @click="showMobileMenu = false"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const showMobileMenu = ref(false)
const navItems = [
  { label: 'Trang Chủ', path: '/' },
  { label: 'Dịch Vụ', path: '/services' },
  { label: 'Thư Viện', path: '/gallery' },
  { label: 'Liên Hệ', path: '/contact' }
]
</script>
```

#### 4.2 Footer Component
- [ ] 3-column layout (responsive) với Bootstrap grid
- [ ] Logo & description
- [ ] Contact information với icons
- [ ] Social media links
- [ ] Copyright notice
- [ ] Styling với gradient background

#### 4.3 App Layout
- [ ] Tích hợp Header và Footer
- [ ] Router view cho các pages
- [ ] Global loading state với Bootstrap spinner
- [ ] Scroll-to-top functionality

---

### Phase 5: Xây Dựng Homepage Sections

#### 5.1 Hero Carousel Section
- [ ] Sử dụng **Swiper** với Vue
- [ ] Auto-play với pause on hover
- [ ] Navigation arrows và pagination
- [ ] Overlay gradient cho text
- [ ] CTA buttons với Bootstrap
- [ ] Responsive images

**Implementation với Swiper Vue:**
```vue
<template>
  <section class="hero-section position-relative">
    <swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :autoplay="{ delay: 5000 }"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="hero-swiper"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div class="hero-slide position-relative">
          <img 
            :src="slide.image" 
            :alt="slide.title"
            class="w-100 h-100 object-cover"
          />
          <div class="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <div class="container text-center text-white">
              <h1 class="display-3 fw-bold mb-4">{{ slide.title }}</h1>
              <p class="lead mb-4">{{ slide.subtitle }}</p>
              <router-link 
                :to="slide.cta_link" 
                class="btn btn-primary btn-lg"
              >
                {{ slide.cta_text }}
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>
```

#### 5.2 About Section
- [ ] Grid layout với Bootstrap (text + stats)
- [ ] Company description
- [ ] Features list với icons
- [ ] Stats grid với animated counters
- [ ] Fade-in animation on scroll

#### 5.3 Featured Services Section
- [ ] Grid layout với Bootstrap cards
- [ ] Service cards với:
  - [ ] Icon (Font Awesome hoặc Bootstrap icons)
  - [ ] Title và description
  - [ ] "Xem chi tiết" link với Vue Router
- [ ] Hover effects
- [ ] Responsive grid

#### 5.4 Testimonials Section
- [ ] Grid layout với Bootstrap cards
- [ ] Testimonial cards với avatars
- [ ] Quote text và customer info
- [ ] Star rating với Bootstrap hoặc custom component
- [ ] Carousel on mobile (optional)

#### 5.5 Contact Section
- [ ] Contact info cards với Bootstrap
- [ ] Phone, email, working hours
- [ ] CTA button với Vue Router
- [ ] Icons cho mỗi info item

---

### Phase 6: Styling & Theme

#### 6.1 Bootstrap Configuration
- [ ] Cấu hình Bootstrap trong main.js
  ```javascript
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.bundle.min.js'
  import { createApp } from 'vue'
  import App from './App.vue'
  
  const app = createApp(App)
  app.use(router)
  app.use(pinia)
  app.mount('#app')
  ```
- [ ] Custom Bootstrap theme với SCSS variables
- [ ] Import Font Awesome hoặc Bootstrap icons

#### 6.2 Global Styles
- [ ] Tạo `src/assets/css/main.css`
- [ ] Custom scrollbar
- [ ] Smooth scroll behavior
- [ ] Typography styles với Bootstrap typography
- [ ] Animation keyframes
- [ ] Custom CSS variables

#### 6.3 Component Customization
- [ ] Customize Bootstrap components
- [ ] Button variants với custom colors
- [ ] Card styles với shadows
- [ ] Container max-width
- [ ] Custom utility classes

---

### Phase 7: Animations & Interactions

#### 7.1 Scroll Animations
- [ ] Sử dụng **@vueuse/motion** cho animations
  ```bash
  npm install @vueuse/motion
  ```
- [ ] Fade-in on scroll cho sections
- [ ] Slide-in animations cho cards
- [ ] Number counter animation cho stats

#### 7.2 Hover Effects
- [ ] Service cards scale + shadow với Bootstrap
- [ ] Navigation links với active states
- [ ] Button hover states
- [ ] Image zoom on hover

#### 7.3 Loading States
- [ ] Global loading với Bootstrap spinner
- [ ] Skeleton loaders với custom CSS hoặc thư viện
- [ ] Image lazy loading với VueUse
- [ ] Suspense components

---

### Phase 8: SEO & Performance

#### 8.1 SEO Optimization
- [ ] Tạo composable `useSEO.ts`
  ```typescript
  import { useHead } from '@vueuse/head'

  export const useSEO = (data: SEOData) => {
    useHead({
      title: data.title,
      meta: [
        { name: 'description', content: data.description },
        { property: 'og:title', content: data.title },
        { property: 'og:description', content: data.description },
        { property: 'og:image', content: data.image },
      ]
    })
  }
  ```
- [ ] Meta tags cho homepage với Vue Meta
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Sitemap generation (manual hoặc plugin)

#### 8.2 Performance
- [ ] Image optimization với Vite
- [ ] Code splitting với Vue Router lazy loading
- [ ] Asset preloading
- [ ] Bundle analysis
- [ ] Compression với Vite

#### 8.3 Accessibility
- [ ] ARIA labels với Bootstrap
- [ ] Keyboard navigation với Vue Router
- [ ] Focus states với Bootstrap focus utilities
- [ ] Alt text cho images
- [ ] Semantic HTML với Bootstrap components

---

### Phase 9: Responsive Design

#### 9.1 Breakpoints
- [ ] Mobile: < 768px
- [ ] Tablet: 768px - 1024px
- [ ] Desktop: > 1024px

#### 9.2 Mobile Optimization
- [ ] Mobile navigation với Bootstrap navbar collapse
- [ ] Touch-friendly buttons với Bootstrap
- [ ] Optimized images
- [ ] Reduced animations on mobile
- [ ] Bootstrap responsive classes

#### 9.3 Testing
- [ ] Test trên iPhone (Safari)
- [ ] Test trên Android (Chrome)
- [ ] Test trên iPad
- [ ] Test landscape orientation

---

### Phase 10: Integration với Laravel Backend

#### 10.1 API Endpoints
- [ ] `GET /` - Homepage data (slides, testimonials)
- [ ] `GET /api/services` - Services list
- [ ] `GET /api/gallery` - Gallery items
- [ ] `POST /api/contact` - Contact form submission

#### 10.2 Laravel CORS Configuration
- [ ] Cài đặt `laravel-cors`
- [ ] Cấu hình allowed origins cho Vue dev server
- [ ] Cấu hình allowed methods

#### 10.3 Environment Variables
- [ ] Development API URL
- [ ] Production API URL
- [ ] API timeout settings trong Axios

---

### Phase 11: Testing & QA

#### 11.1 Unit Tests
- [ ] Test composables với Vitest
- [ ] Test Pinia stores
- [ ] Test utility functions

#### 11.2 Component Tests
- [ ] Test Header component với Vue Test Utils
- [ ] Test Service cards
- [ ] Test với Bootstrap Vue testing utilities

#### 11.3 E2E Tests
- [ ] Homepage loading với Playwright
- [ ] Navigation flow
- [ ] Form submission
- [ ] Responsive behavior

#### 11.4 Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

### Phase 12: Deployment

#### 12.1 Build Configuration
- [ ] Cấu hình production build với Vite
- [ ] Environment variables cho production
- [ ] API URL configuration

#### 12.2 Deployment Options
- [ ] **Vercel** (recommended cho Vue)
- [ ] **Netlify**
- [ ] **VPS/Server** với Nginx

#### 12.3 Post-Deployment
- [ ] Test production build
- [ ] Monitor performance với Vite
- [ ] Setup error tracking
- [ ] Setup analytics

---

## 🎨 Design System Reference

### Colors (Bootstrap Variables)
```css
Primary: #e74c3c (Red)
Primary Dark: #c0392b
Background: #f9f9f9
Surface: #ffffff
Text: #333333
```

### Typography (Bootstrap)
```
Headings: display-1 to display-6, h1-h6
Body: lead, text-muted
Small: small, text-sm
```

### Spacing (Bootstrap)
```
Section Padding: py-5 py-md-7
Container Max Width: 1200px
Grid Gap: g-4
```

### Components
- Border Radius: rounded, rounded-3
- Box Shadow: shadow, shadow-lg
- Transition: transition-all duration-300

---

## 📚 Recommended Libraries

### UI & Styling
- ✅ **Bootstrap Vue** - Bootstrap components cho Vue
- ✅ **Vue Router 4** - Official routing
- ✅ **Pinia** - State management
- ✅ **Bootstrap Icons** - Icon system

### Functionality
- ✅ **Swiper** - Carousel/Slider với Vue
- ✅ **@vueuse/core** - Vue utilities
- ✅ **@vueuse/motion** - Animations
- ✅ **VeeValidate** - Form validation (for contact form)
- ✅ **Axios** - HTTP client

### Development
- ✅ **TypeScript** - Type safety
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **Vitest** - Testing framework
- ✅ **Vue DevTools** - Development tools

---

## 🚀 Quick Start Commands

```bash
# 1. Tạo project với Vue CLI
npm create vue@latest vue-frontend
cd vue-frontend

# 2. Cài đặt dependencies
npm install bootstrap-vue bootstrap vue-router@4 pinia @vueuse/core swiper axios

# 3. Cài đặt dev tools
npm install -D @vitejs/plugin-vue vitest @vue/test-utils

# 4. Chạy dev server
npm run dev

# 5. Build production
npm run build

# 6. Preview production
npm run preview
```

---

## 📝 Notes (Vue 3 + Bootstrap Vue)

- Ưu tiên sử dụng **Bootstrap Vue** để giữ nguyên design hiện tại
- Sử dụng **Composition API** với **TypeScript** cho code quality
- **Vue Router 4** với lazy loading cho performance tốt
- **Pinia** thay thế Vuex cho state management đơn giản hơn
- **Vite** cho build speed nhanh hơn webpack
- Implement **lazy loading** cho images và components
- Sử dụng **VueUse** cho các composables hữu ích
- **SPA mode** mặc định, có thể thêm SSR với Nuxt nếu cần
- **Hot Module Replacement** với Vite cho development nhanh
- **Bootstrap grid system** cho responsive layout
- **Bootstrap utilities** cho spacing và typography

---

## 🎯 Priority Order

1. **High Priority** (Week 1)
   - Setup project với Vue + Vite + Bootstrap Vue
   - Layout components (Header, Footer)
   - Homepage structure với Vue Router
   - API integration với Axios và Pinia

2. **Medium Priority** (Week 2)
   - All homepage sections với Bootstrap Vue components
   - Styling với Bootstrap theme
   - Animations với VueUse Motion
   - Responsive design với Bootstrap breakpoints

3. **Low Priority** (Week 3)
   - Advanced animations và micro-interactions
   - Performance optimization với Vite
   - Testing với Vitest và Vue Test Utils
   - Deployment và monitoring

---

**Estimated Timeline**: 2-3 weeks
**Difficulty**: Intermediate
**Tech Stack**: Vue 3 + TypeScript + Vite + Bootstrap Vue + Pinia + Laravel API
