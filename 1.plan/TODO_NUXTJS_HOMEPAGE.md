# TODO List: Xây Dựng Homepage với Nuxt.js

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

### Phase 1: Setup Dự Án Nuxt.js

#### 1.1 Khởi Tạo Project
- [ ] Tạo project Nuxt mới
  ```bash
  npx nuxi@latest init nuxt-frontend
  cd nuxt-frontend
  ```
- [ ] Cài đặt dependencies cơ bản
  ```bash
  npm install
  ```

#### 1.2 Cài Đặt UI Framework & Libraries
- [ ] Cài đặt **Nuxt UI v3** (recommended)
  ```bash
  npm install @nuxt/ui
  ```
- [ ] Cài đặt **TailwindCSS v4** (tích hợp với Nuxt UI)
- [ ] Cài đặt **Nuxt Icon** cho icons
  ```bash
  npm install @nuxt/icon
  ```
- [ ] Cài đặt **VueUse** cho utilities
  ```bash
  npm install @vueuse/core @vueuse/nuxt
  ```
- [ ] Cài đặt **Swiper** cho carousel (thay Bootstrap carousel)
  ```bash
  npm install swiper
  npm install nuxt-swiper
  ```
- [ ] Cài đặt **Axios/Nuxt HTTP** cho API calls
  ```bash
  npm install @nuxtjs/axios
  ```

#### 1.3 Cấu Hình Nuxt
- [ ] Cấu hình `nuxt.config.ts`
  - [ ] Thêm modules: `@nuxt/ui`, `@nuxt/icon`, `@vueuse/nuxt`, `nuxt-swiper`
  - [ ] Cấu hình runtime config cho API endpoint
  - [ ] Cấu hình SEO meta tags
  - [ ] Cấu hình CSS global
- [ ] Tạo file `.env` với API URL
  ```
  NUXT_PUBLIC_API_BASE_URL=http://localhost:8000
  ```

---

### Phase 2: Cấu Trúc Thư Mục & Components

#### 2.1 Tạo Cấu Trúc Thư Mục
```
nuxt-frontend/
├── components/
│   ├── layout/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Navigation.vue
│   ├── home/
│   │   ├── HeroCarousel.vue
│   │   ├── AboutSection.vue
│   │   ├── StatsSection.vue
│   │   ├── FeaturedServices.vue
│   │   ├── TestimonialsSection.vue
│   │   └── ContactSection.vue
│   └── ui/
│       ├── ServiceCard.vue
│       ├── TestimonialCard.vue
│       └── StatItem.vue
├── composables/
│   ├── useApi.ts
│   ├── useHomePage.ts
│   └── useSEO.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── services/
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── gallery/
│   │   └── index.vue
│   ├── contact.vue
│   └── about.vue
├── types/
│   ├── service.ts
│   ├── testimonial.ts
│   └── gallery.ts
└── assets/
    └── css/
        └── main.css
```

#### 2.2 Checklist Tạo Files
- [ ] Tạo `layouts/default.vue`
- [ ] Tạo `components/layout/Header.vue`
- [ ] Tạo `components/layout/Footer.vue`
- [ ] Tạo `components/layout/Navigation.vue`
- [ ] Tạo các components trong `components/home/`
- [ ] Tạo các components trong `components/ui/`
- [ ] Tạo `pages/index.vue`

---

### Phase 3: Thiết Lập API Integration

#### 3.1 Tạo Composables
- [ ] **useApi.ts** - Base API composable
  ```typescript
  export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl
    
    const get = async (endpoint: string) => {
      // Implementation
    }
    
    return { get, post, put, delete }
  }
  ```

- [ ] **useHomePage.ts** - Homepage data fetching
  ```typescript
  export const useHomePage = () => {
    const { get } = useApi()
    
    const fetchHomeData = async () => {
      return await get('/')
    }
    
    return { fetchHomeData }
  }
  ```

#### 3.2 Tạo TypeScript Types
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

#### 4.1 Header Component
- [ ] Tạo sticky header với backdrop blur
- [ ] Logo section (sử dụng NuxtImg)
- [ ] Navigation menu
  - [ ] Desktop menu (horizontal)
  - [ ] Mobile menu (hamburger + slide-in)
- [ ] Active link highlighting
- [ ] Smooth scroll behavior
- [ ] Responsive design

**Features:**
```vue
<template>
  <header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
    <UContainer>
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.jpg" alt="Logo" class="h-12" />
        </NuxtLink>
        
        <!-- Desktop Nav -->
        <nav class="hidden md:flex gap-6">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        
        <!-- Mobile Menu Button -->
        <UButton 
          icon="i-heroicons-bars-3" 
          class="md:hidden"
          @click="toggleMobileMenu"
        />
      </div>
    </UContainer>
  </header>
</template>
```

#### 4.2 Footer Component
- [ ] 3-column layout (responsive)
- [ ] Logo & description
- [ ] Contact information
- [ ] Social media links (Facebook, Instagram, YouTube)
- [ ] Copyright notice
- [ ] Styling với gradient background

#### 4.3 Default Layout
- [ ] Integrate Header
- [ ] Main content slot
- [ ] Integrate Footer
- [ ] Add scroll-to-top button
- [ ] Loading state

---

### Phase 5: Xây Dựng Homepage Sections

#### 5.1 Hero Carousel Section
- [ ] Sử dụng **Swiper** thay vì Bootstrap carousel
- [ ] Auto-play với pause on hover
- [ ] Navigation arrows (custom styled)
- [ ] Pagination dots
- [ ] Parallax effect (optional)
- [ ] Overlay gradient cho text
- [ ] CTA buttons
- [ ] Responsive images (srcset)

**Implementation:**
```vue
<template>
  <section class="hero-section h-screen relative">
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :slides-per-view="1"
      :autoplay="{ delay: 5000 }"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="h-full"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id">
        <div class="relative h-full">
          <NuxtImg 
            :src="slide.image" 
            :alt="slide.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
            <div class="container h-full flex items-center justify-center text-center">
              <div class="text-white">
                <h1 class="text-5xl font-bold mb-4">{{ slide.title }}</h1>
                <p class="text-xl mb-8">{{ slide.subtitle }}</p>
                <UButton 
                  :to="slide.cta_link" 
                  size="xl" 
                  color="primary"
                >
                  {{ slide.cta_text }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
```

#### 5.2 About Section
- [ ] Grid layout (text + stats)
- [ ] Company description
- [ ] Features list với icons
- [ ] Stats grid (4 items)
  - [ ] Animated counters (useIntersectionObserver)
  - [ ] Icon cho mỗi stat
- [ ] Fade-in animation on scroll

**Stats Data:**
- 10+ Năm kinh nghiệm
- 1000+ Event tổ chức
- 50+ Dịch vụ chuyên nghiệp
- 100% Khách hàng hài lòng

#### 5.3 Featured Services Section
- [ ] Grid layout (4 columns, responsive)
- [ ] Service cards với:
  - [ ] Icon (Font Awesome hoặc Heroicons)
  - [ ] Title
  - [ ] Description
  - [ ] "Xem chi tiết" link
- [ ] Hover effects (scale, shadow)
- [ ] Link to services page

**Services:**
1. Tổ Chức Trọn Gói
2. Trang Trí Sân Khấu
3. Dịch Vụ Ẩm Thực
4. Âm Thanh - Ánh Sáng

#### 5.4 Testimonials Section
- [ ] Grid layout (4 columns, responsive)
- [ ] Testimonial cards với:
  - [ ] Customer avatar (rounded)
  - [ ] Quote text
  - [ ] Customer name
  - [ ] Customer position/role
  - [ ] Star rating (optional)
- [ ] Fetch data từ API
- [ ] Skeleton loading state
- [ ] Carousel on mobile (optional)

#### 5.5 Contact Section
- [ ] Contact info cards (3 columns)
  - [ ] Phone
  - [ ] Email
  - [ ] Working hours
- [ ] CTA button "Đặt Dịch Vụ Ngay"
- [ ] Background gradient
- [ ] Icons cho mỗi info item

---

### Phase 6: Styling & Theme

#### 6.1 Tailwind Configuration
- [ ] Cấu hình `tailwind.config.ts`
  ```typescript
  export default {
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#fef2f2',
            500: '#e74c3c',
            600: '#c0392b',
            700: '#a93226',
          }
        },
        fontFamily: {
          sans: ['Inter', 'Arial', 'sans-serif'],
        }
      }
    }
  }
  ```

#### 6.2 Global Styles
- [ ] Tạo `assets/css/main.css`
- [ ] Custom scrollbar
- [ ] Smooth scroll behavior
- [ ] Typography styles
- [ ] Animation keyframes
- [ ] Transition utilities

#### 6.3 Nuxt UI Theme
- [ ] Customize Nuxt UI theme colors
- [ ] Button variants
- [ ] Card styles
- [ ] Container max-width

---

### Phase 7: Animations & Interactions

#### 7.1 Scroll Animations
- [ ] Install **@vueuse/motion** hoặc **AOS**
  ```bash
  npm install @vueuse/motion
  ```
- [ ] Fade-in on scroll cho sections
- [ ] Slide-in animations cho cards
- [ ] Number counter animation cho stats

#### 7.2 Hover Effects
- [ ] Service cards scale + shadow
- [ ] Navigation links underline
- [ ] Button hover states
- [ ] Image zoom on hover

#### 7.3 Loading States
- [ ] Page transition
- [ ] Skeleton loaders
- [ ] Image lazy loading
- [ ] Suspense components

---

### Phase 8: SEO & Performance

#### 8.1 SEO Optimization
- [ ] Tạo `composables/useSEO.ts`
  ```typescript
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
- [ ] Meta tags cho homepage
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation

#### 8.2 Performance
- [ ] Image optimization (NuxtImg)
- [ ] Code splitting
- [ ] Lazy loading components
- [ ] Preload critical assets
- [ ] Minify CSS/JS
- [ ] Enable compression

#### 8.3 Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Alt text cho images
- [ ] Semantic HTML

---

### Phase 9: Responsive Design

#### 9.1 Breakpoints
- [ ] Mobile: < 640px
- [ ] Tablet: 640px - 1024px
- [ ] Desktop: > 1024px

#### 9.2 Mobile Optimization
- [ ] Mobile navigation menu
- [ ] Touch-friendly buttons
- [ ] Optimized images
- [ ] Reduced animations
- [ ] Stack layouts vertically

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
- [ ] Cấu hình allowed origins
- [ ] Cấu hình allowed methods

#### 10.3 Environment Variables
- [ ] Development API URL
- [ ] Production API URL
- [ ] API timeout settings

---

### Phase 11: Testing & QA

#### 11.1 Unit Tests
- [ ] Test composables
- [ ] Test utility functions

#### 11.2 Component Tests
- [ ] Test Header component
- [ ] Test Service cards
- [ ] Test Testimonial cards

#### 11.3 E2E Tests
- [ ] Homepage loading
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
- [ ] Cấu hình production build
- [ ] Environment variables
- [ ] API URL configuration

#### 12.2 Deployment Options
- [ ] **Vercel** (recommended for Nuxt)
- [ ] **Netlify**
- [ ] **VPS/Server** (PM2 + Nginx)

#### 12.3 Post-Deployment
- [ ] Test production build
- [ ] Monitor performance
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)

---

## 🎨 Design System Reference

### Colors
```css
Primary: #e74c3c (Red)
Primary Dark: #c0392b
Background: #f9f9f9
Text: #333
Text Light: #666
White: #fff
```

### Typography
```
Headings: Bold, 2.5rem - 3rem
Body: Regular, 1rem
Small: 0.95rem
```

### Spacing
```
Section Padding: 5rem 0
Container Max Width: 1200px
Grid Gap: 2rem
```

### Components
- Border Radius: 10px - 15px
- Box Shadow: 0 4px 12px rgba(0,0,0,0.07)
- Transition: 0.3s ease

---

## 📚 Recommended Libraries

### UI & Styling
- ✅ **Nuxt UI v3** - Component library
- ✅ **TailwindCSS v3** - Utility-first CSS (ổn định hơn v4)
- ✅ **Nuxt Icon** - Icon system
- ✅ **@vueuse/core** - Vue utilities

### Functionality
- ✅ **Swiper** - Carousel/Slider
- ✅ **@vueuse/motion** - Animations
- ✅ **VeeValidate** - Form validation (for contact form)
- ✅ **Pinia** - State management (if needed)

### Development
- ✅ **TypeScript** - Type safety
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **Vitest** - Testing framework (built-in với Nuxt v4)

---

## 🚀 Quick Start Commands

```bash
# 1. Tạo project
npx nuxi@latest init nuxt-frontend
cd nuxt-frontend

# 2. Cài đặt dependencies
npm install @nuxt/ui @nuxtjs/tailwindcss @nuxt/icon @vueuse/nuxt nuxt-swiper

# 3. Chạy dev server
npm run dev

# 4. Build production
npm run build

# 5. Preview production
npm run preview
```

---

## 📝 Notes (Nuxt v4)

- Ưu tiên sử dụng **Nuxt UI v3** thay vì Bootstrap để có performance tốt hơn
- Sử dụng **Composition API** và **TypeScript** cho code quality
- **Không cần axios** - Nuxt v4 có tích hợp sẵn `$fetch` và `useFetch`
- Implement **lazy loading** cho images và components
- Sử dụng **useAsyncData** và **useFetch** cho data fetching
- Enable **SSR** (Server-Side Rendering) cho SEO tốt hơn
- Implement **error handling** và **loading states** đầy đủ
- **TailwindCSS v4** đang trong alpha, nên dùng **v3** cho production
- **Vitest** được tích hợp sẵn cho testing
- **Nuxt DevTools** có sẵn để debug và performance monitoring

---

## 🎯 Priority Order

1. **High Priority** (Week 1)
   - Setup project & dependencies
   - Layout components (Header, Footer)
   - Homepage structure
   - API integration với $fetch

2. **Medium Priority** (Week 2)
   - All homepage sections
   - Styling & animations
   - Responsive design
   - SEO optimization

3. **Low Priority** (Week 3)
   - Advanced animations
   - Performance optimization
   - Testing với Vitest
   - Deployment

---

**Estimated Timeline**: 2-3 weeks
**Difficulty**: Intermediate
**Tech Stack**: Nuxt v4 + TypeScript + Nuxt UI + TailwindCSS v3 + Laravel API
