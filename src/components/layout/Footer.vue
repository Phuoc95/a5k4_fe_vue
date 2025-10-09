<template>
  <footer class="bg-dark text-light py-5">
    <div class="container">
      <div class="row g-4">
        <!-- Company Info -->
        <div class="col-lg-4 col-md-6">
          <div class="footer-section">
            <h5 class="text-primary mb-3">{{ siteInfo.siteName }}</h5>
            <p class="text-muted mb-3">{{ siteInfo.siteSlogan }}</p>
            <p class="text-muted mb-3">
              {{ contactInfo.address }}
            </p>
            <div class="social-links">
              <a
                v-if="socialLinks.facebook"
                :href="socialLinks.facebook"
                target="_blank"
                class="text-light me-3"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f fa-lg"></i>
              </a>
              <a
                v-if="socialLinks.instagram"
                :href="socialLinks.instagram"
                target="_blank"
                class="text-light me-3"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram fa-lg"></i>
              </a>
              <a
                v-if="socialLinks.youtube"
                :href="socialLinks.youtube"
                target="_blank"
                class="text-light me-3"
                aria-label="YouTube"
              >
                <i class="fab fa-youtube fa-lg"></i>
              </a>
              <a
                v-if="socialLinks.zalo"
                :href="socialLinks.zalo"
                target="_blank"
                class="text-light me-3"
                aria-label="Zalo"
              >
                <i class="fab fa-whatsapp fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <div class="footer-section">
            <h6 class="text-primary mb-3">Liên Kết Nhanh</h6>
            <ul class="list-unstyled">
              <li class="mb-2">
                <router-link to="/" class="text-muted text-decoration-none">
                  <i class="fas fa-chevron-right me-2"></i>Trang Chủ
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/services" class="text-muted text-decoration-none">
                  <i class="fas fa-chevron-right me-2"></i>Dịch Vụ
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/gallery" class="text-muted text-decoration-none">
                  <i class="fas fa-chevron-right me-2"></i>Thư Viện
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/about" class="text-muted text-decoration-none">
                  <i class="fas fa-chevron-right me-2"></i>Giới Thiệu
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/contact" class="text-muted text-decoration-none">
                  <i class="fas fa-chevron-right me-2"></i>Liên Hệ
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Services -->
        <div class="col-lg-3 col-md-6">
          <div class="footer-section">
            <h6 class="text-primary mb-3">Dịch Vụ</h6>
            <ul class="list-unstyled">
              <li class="mb-2">
                <span class="text-muted">
                  <i class="fas fa-chevron-right me-2"></i>Tổ Chức Trọn Gói
                </span>
              </li>
              <li class="mb-2">
                <span class="text-muted">
                  <i class="fas fa-chevron-right me-2"></i>Trang Trí Sân Khấu
                </span>
              </li>
              <li class="mb-2">
                <span class="text-muted">
                  <i class="fas fa-chevron-right me-2"></i>Âm Thanh Ánh Sáng
                </span>
              </li>
              <li class="mb-2">
                <span class="text-muted">
                  <i class="fas fa-chevron-right me-2"></i>Chụp Ảnh Quay Phim
                </span>
              </li>
              <li class="mb-2">
                <span class="text-muted">
                  <i class="fas fa-chevron-right me-2"></i>Dịch Vụ Ẩm Thực
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-3 col-md-6">
          <div class="footer-section">
            <h6 class="text-primary mb-3">Thông Tin Liên Hệ</h6>
            <div class="contact-info">
              <div class="contact-item mb-3">
                <i class="fas fa-phone text-primary me-2"></i>
                <a :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`" class="text-muted text-decoration-none">
                  {{ contactInfo.phone }}
                </a>
              </div>
              <div class="contact-item mb-3">
                <i class="fas fa-envelope text-primary me-2"></i>
                <a :href="`mailto:${contactInfo.email}`" class="text-muted text-decoration-none">
                  {{ contactInfo.email }}
                </a>
              </div>
              <div class="contact-item mb-3">
                <i class="fas fa-map-marker-alt text-primary me-2"></i>
                <span class="text-muted">{{ contactInfo.address }}</span>
              </div>
              <div class="contact-item mb-3">
                <i class="fas fa-clock text-primary me-2"></i>
                <span class="text-muted">{{ contactInfo.workingHours }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <hr class="my-4">
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="text-muted mb-0">
            &copy; {{ currentYear }} {{ siteInfo.siteName }}. Tất cả quyền được bảo lưu.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="text-muted mb-0">
            Được phát triển bởi 
            <a href="#" class="text-primary text-decoration-none">Wedding Events Team</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const siteInfo = computed(() => themeStore.siteInfo)
const contactInfo = computed(() => themeStore.contactInfo)
const socialLinks = computed(() => themeStore.socialLinks)

const currentYear = computed(() => {
  if (typeof window !== 'undefined') {
    return new Date().getFullYear()
  }
  return 2024
})
</script>

<style scoped>
.footer-section h5,
.footer-section h6 {
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-section ul li a:hover {
  color: var(--primary-color, #0d6efd) !important;
  transition: color 0.3s ease;
}

.social-links a {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.social-links a:hover {
  background: var(--primary-color, #0d6efd);
  transform: translateY(-2px);
}

.contact-item {
  display: flex;
  align-items: center;
}

.contact-item i {
  width: 20px;
  text-align: center;
}

.contact-item a:hover {
  color: var(--primary-color, #0d6efd) !important;
}

hr {
  border-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .footer-section {
    margin-bottom: 2rem;
  }
  
  .social-links {
    text-align: center;
  }
}
</style>