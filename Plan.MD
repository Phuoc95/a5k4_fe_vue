# Kế Hoạch Migration từ Blade Views sang Vue.js

## Tổng Quan
Dự án migration từ Laravel Blade views (a5k4) sang Vue.js frontend (a5k4_fe/vue-frontend) cho website dịch vụ event hỏi.

## Phân Tích Hiện Trạng

### 1. Cấu Trúc Blade Views (a5k4)
```
resources/views/frontend/
├── layouts/
│   ├── app.blade.php          # Layout chính
│   ├── header.blade.php       # Header cũ
│   ├── headerv2.blade.php     # Header mới (đang dùng)
│   ├── footer.blade.php       # Footer cũ
│   └── footerv2.blade.php     # Footer mới
├── pages/
│   ├── home.blade.php         # Trang chủ
│   ├── services.blade.php     # Trang dịch vụ
│   ├── service-detail.blade.php # Chi tiết dịch vụ
│   ├── gallery.blade.php      # Thư viện ảnh
│   ├── gallery_with_LIB.blade.php # Thư viện với Lightbox
│   ├── contact.blade.php      # Trang liên hệ
│   └── about.blade.php        # Trang giới thiệu
├── components/
│   └── chat-widget.blade.php  # Widget chat
└── partials/
    ├── hero.blade.php         # Hero section
    ├── flash-message.blade.php # Thông báo
    └── maintenance.blade.php  # Trang bảo trì
```

### 2. Routes Laravel (web.php)
```php
// Frontend Routes
Route::name('frontend.')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    
    // Services
    Route::prefix('services')->name('services.')->group(function () {
        Route::get('/', [ServiceController::class, 'categoriesServices'])->name('index');
        Route::get('/{id}', [ServiceController::class, 'show'])->name('show');
    });
    
    // Gallery
    Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
    Route::get('/gallery/{slug}', [GalleryController::class, 'show'])->name('gallery.show');
    
    // Contact
    Route::match(['get', 'post'], '/contact', [ContactController::class, 'index'])->name('contact');
    Route::post('/contact/submit', [ContactController::class, 'store'])->name('contact.submit');
    
    // About
    Route::get('/about', [HomeController::class, 'about'])->name('about');
});
```

### 3. Cấu Trúc Vue.js Hiện Tại
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.vue         # Header component
│   │   └── Footer.vue         # Footer component
│   ├── ui/
│   │   ├── ServiceCard.vue    # Card dịch vụ
│   │   └── TestimonialCard.vue # Card đánh giá
│   └── home/                  # Components trang chủ
├── views/
│   ├── HomeView.vue           # Trang chủ
│   ├── ServicesView.vue       # Trang dịch vụ
│   ├── GalleryView.vue        # Thư viện ảnh
│   ├── ContactView.vue        # Trang liên hệ
│   └── AboutView.vue          # Trang giới thiệu
├── stores/
│   ├── home.ts               # Store trang chủ
│   ├── services.ts           # Store dịch vụ
│   └── ui.ts                 # Store UI
├── composables/
│   ├── useApi.ts             # API composable
│   └── useHomePage.ts        # Homepage composable
└── types/
    ├── service.ts            # Types dịch vụ
    ├── slide.ts              # Types slide
    └── testimonial.ts        # Types đánh giá
```

## Kế Hoạch Migration Chi Tiết

### Phase 1: Cải Thiện Layout và Components Cơ Bản

#### 1.1 Cập Nhật Layout Chính
- [ ] **App.vue**: Tạo layout chính tương ứng với `app.blade.php`
  - Meta tags động
  - Schema.org markup
  - Open Graph tags
  - CSS variables cho theme
  - Back to top button
  - Chat widget integration

#### 1.2 Cải Thiện Header Component
- [ ] **Header.vue**: Cập nhật theo `headerv2.blade.php`
  - Top bar với thông tin liên hệ
  - Social media links
  - Responsive navigation
  - Active state management
  - Logo dynamic loading

#### 1.3 Tạo Footer Component
- [ ] **Footer.vue**: Tạo mới theo `footer.blade.php`
  - Company information
  - Contact details
  - Social media links
  - Quick links
  - Copyright information

### Phase 2: Migration Các Trang Chính

#### 2.1 Trang Chủ (HomeView.vue)
- [ ] **Hero Section**: Carousel slides với data động
  - Slide management
  - Navigation controls
  - Responsive images
- [ ] **About Section**: Thông tin công ty
  - Statistics display
  - Feature list
- [ ] **Featured Services**: Grid dịch vụ nổi bật
  - Service cards
  - Hover effects
- [ ] **Testimonials**: Đánh giá khách hàng
  - Dynamic testimonials
  - Customer images
  - Star ratings
- [ ] **Contact CTA**: Call-to-action section

#### 2.2 Trang Dịch Vụ (ServicesView.vue)
- [ ] **Service Categories**: Hiển thị theo danh mục
  - Category grouping
  - Service grid layout
  - Icon integration
- [ ] **Service Detail Modal/Page**: Chi tiết dịch vụ
  - Service information
  - Pricing display
  - Contact form integration
- [ ] **Contact Form**: Form đăng ký dịch vụ
  - Form validation
  - API integration
  - Success/error handling

#### 2.3 Thư Viện Ảnh (GalleryView.vue)
- [ ] **Gallery Grid**: Hiển thị ảnh theo grid
  - Responsive grid layout
  - Image lazy loading
  - Hover effects
- [ ] **Lightbox Integration**: Xem ảnh chi tiết
  - Lightbox2 hoặc Vue lightbox
  - Image navigation
  - Fullscreen mode
- [ ] **Filter System**: Lọc ảnh theo danh mục
  - Category filters
  - Search functionality
  - Load more button

#### 2.4 Trang Liên Hệ (ContactView.vue)
- [ ] **Contact Information**: Thông tin liên hệ
  - Address, phone, email
  - Working hours
  - Social media links
- [ ] **Contact Form**: Form liên hệ
  - Form validation
  - CSRF token handling
  - Success/error messages
- [ ] **Map Integration**: Bản đồ
  - Google Maps embed
  - Location marker
  - Responsive design

#### 2.5 Trang Giới Thiệu (AboutView.vue)
- [ ] **Company Story**: Câu chuyện công ty
- [ ] **Team Section**: Đội ngũ
- [ ] **Mission & Vision**: Sứ mệnh và tầm nhìn
- [ ] **Timeline**: Lịch sử phát triển

### Phase 3: Components và Features Nâng Cao

#### 3.1 UI Components
- [ ] **ServiceCard.vue**: Card dịch vụ
  - Image display
  - Title and description
  - Action buttons
  - Hover animations
- [ ] **TestimonialCard.vue**: Card đánh giá
  - Customer photo
  - Rating stars
  - Testimonial text
  - Author information
- [ ] **SlideCard.vue**: Card slide
  - Image carousel
  - Caption overlay
  - Navigation controls
- [ ] **ContactForm.vue**: Form liên hệ
  - Form fields
  - Validation
  - Submit handling
- [ ] **Breadcrumb.vue**: Breadcrumb navigation
- [ ] **LoadingSpinner.vue**: Loading indicator
- [ ] **AlertMessage.vue**: Flash messages

#### 3.2 Interactive Features
- [ ] **Chat Widget**: Tích hợp chat
  - Chat interface
  - Message handling
  - Online/offline status
- [ ] **Search Functionality**: Tìm kiếm
  - Global search
  - Service search
  - Gallery search
- [ ] **Theme Management**: Quản lý theme
  - Color customization
  - Dark/light mode
  - User preferences

### Phase 4: API Integration và State Management

#### 4.1 API Services
- [ ] **Home API**: 
  - Featured slides
  - Testimonials
  - Statistics
  - Featured services
- [ ] **Services API**:
  - Service categories
  - Service details
  - Service search
- [ ] **Gallery API**:
  - Gallery images
  - Image categories
  - Image details
- [ ] **Contact API**:
  - Contact form submission
  - Contact information
- [ ] **About API**:
  - Company information
  - Team members
  - Company timeline

#### 4.2 State Management
- [ ] **Home Store**: Quản lý state trang chủ
- [ ] **Services Store**: Quản lý state dịch vụ
- [ ] **Gallery Store**: Quản lý state thư viện
- [ ] **Contact Store**: Quản lý state liên hệ
- [ ] **UI Store**: Quản lý state UI
- [ ] **Theme Store**: Quản lý theme

#### 4.3 Composables
- [ ] **useApi.ts**: API composable chung
- [ ] **useHomePage.ts**: Homepage composable
- [ ] **useServices.ts**: Services composable
- [ ] **useGallery.ts**: Gallery composable
- [ ] **useContact.ts**: Contact composable
- [ ] **useTheme.ts**: Theme composable

### Phase 5: SEO và Performance

#### 5.1 SEO Optimization
- [ ] **Meta Tags**: Dynamic meta tags
- [ ] **Schema.org**: Structured data
- [ ] **Open Graph**: Social media sharing
- [ ] **Sitemap**: XML sitemap generation
- [ ] **Robots.txt**: Search engine directives

#### 5.2 Performance Optimization
- [ ] **Image Optimization**: Lazy loading, WebP format
- [ ] **Code Splitting**: Route-based splitting
- [ ] **Caching**: API response caching
- [ ] **Bundle Optimization**: Tree shaking, minification
- [ ] **CDN Integration**: Static asset delivery

### Phase 6: Testing và Deployment

#### 6.1 Testing
- [ ] **Unit Tests**: Component testing
- [ ] **Integration Tests**: API integration
- [ ] **E2E Tests**: User journey testing
- [ ] **Performance Tests**: Load testing
- [ ] **Accessibility Tests**: WCAG compliance

#### 6.2 Deployment
- [ ] **Build Configuration**: Production build
- [ ] **Environment Variables**: Config management
- [ ] **CI/CD Pipeline**: Automated deployment
- [ ] **Monitoring**: Error tracking, analytics
- [ ] **Backup Strategy**: Data backup

## Cấu Trúc Thư Mục Đề Xuất

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.vue
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Breadcrumb.vue
│   ├── ui/
│   │   ├── ServiceCard.vue
│   │   ├── TestimonialCard.vue
│   │   ├── SlideCard.vue
│   │   ├── ContactForm.vue
│   │   ├── LoadingSpinner.vue
│   │   └── AlertMessage.vue
│   ├── home/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── FeaturedServices.vue
│   │   ├── TestimonialsSection.vue
│   │   └── ContactCTA.vue
│   ├── services/
│   │   ├── ServiceCategory.vue
│   │   ├── ServiceGrid.vue
│   │   └── ServiceDetail.vue
│   ├── gallery/
│   │   ├── GalleryGrid.vue
│   │   ├── GalleryFilter.vue
│   │   └── LightboxModal.vue
│   └── common/
│       ├── ChatWidget.vue
│       └── BackToTop.vue
├── views/
│   ├── HomeView.vue
│   ├── ServicesView.vue
│   ├── ServiceDetailView.vue
│   ├── GalleryView.vue
│   ├── ContactView.vue
│   └── AboutView.vue
├── stores/
│   ├── home.ts
│   ├── services.ts
│   ├── gallery.ts
│   ├── contact.ts
│   ├── ui.ts
│   └── theme.ts
├── composables/
│   ├── useApi.ts
│   ├── useHomePage.ts
│   ├── useServices.ts
│   ├── useGallery.ts
│   ├── useContact.ts
│   └── useTheme.ts
├── types/
│   ├── service.ts
│   ├── slide.ts
│   ├── testimonial.ts
│   ├── gallery.ts
│   └── contact.ts
├── utils/
│   ├── api.ts
│   ├── validation.ts
│   ├── helpers.ts
│   └── constants.ts
└── assets/
    ├── styles/
    │   ├── main.css
    │   ├── components.css
    │   └── themes.css
    └── images/
```

## Timeline Ước Tính

- **Phase 1**: 1-2 tuần (Layout và components cơ bản)
- **Phase 2**: 3-4 tuần (Migration các trang chính)
- **Phase 3**: 2-3 tuần (Components và features nâng cao)
- **Phase 4**: 2-3 tuần (API integration và state management)
- **Phase 5**: 1-2 tuần (SEO và performance)
- **Phase 6**: 1-2 tuần (Testing và deployment)

**Tổng thời gian**: 10-16 tuần

## Lưu Ý Quan Trọng

1. **Tương thích ngược**: Đảm bảo API endpoints tương thích với Laravel backend
2. **Responsive Design**: Tất cả components phải responsive
3. **Accessibility**: Tuân thủ WCAG guidelines
4. **Performance**: Tối ưu hóa loading time và bundle size
5. **SEO**: Đảm bảo SEO không bị ảnh hưởng
6. **Testing**: Viết tests cho tất cả components quan trọng
7. **Documentation**: Cập nhật documentation cho developers

## Công Cụ và Thư Viện Đề Xuất

- **UI Framework**: Bootstrap 5 (đã có)
- **Icons**: Font Awesome (đã có)
- **Lightbox**: Lightbox2 hoặc Vue Lightbox
- **Form Validation**: VeeValidate
- **State Management**: Pinia (đã có)
- **HTTP Client**: Axios (đã có)
- **Testing**: Vitest + Vue Test Utils
- **E2E Testing**: Playwright
- **Build Tool**: Vite (đã có)
- **TypeScript**: Đã có sẵn