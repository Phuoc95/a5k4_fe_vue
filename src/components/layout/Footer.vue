<template>
  <footer class="footer-section">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-column">
          <div class="footer-brand">
            <h5>{{ siteInfo.siteName }}</h5>
            <p class="footer-slogan">{{ siteInfo.siteSlogan }}</p>
            <p class="footer-address">{{ contactInfo.address }}</p>
            <div class="footer-social">
              <a
                v-if="socialLinks.facebook"
                :href="socialLinks.facebook"
                target="_blank"
                class="social-link"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                v-if="socialLinks.instagram"
                :href="socialLinks.instagram"
                target="_blank"
                class="social-link"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                v-if="socialLinks.youtube"
                :href="socialLinks.youtube"
                target="_blank"
                class="social-link"
                aria-label="YouTube"
              >
                <i class="fab fa-youtube"></i>
              </a>
              <a
                v-if="socialLinks.zalo"
                :href="socialLinks.zalo"
                target="_blank"
                class="social-link"
                aria-label="Zalo"
              >
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-column">
          <h6>Liên Kết Nhanh</h6>
          <ul class="footer-links">
            <li><router-link to="/">Trang Chủ</router-link></li>
            <li><router-link to="/services">Dịch Vụ</router-link></li>
            <li><router-link to="/gallery">Thư Viện</router-link></li>
            <li><router-link to="/about">Giới Thiệu</router-link></li>
            <li><router-link to="/contact">Liên Hệ</router-link></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-column">
          <h6>Dịch Vụ</h6>
          <ul class="footer-links">
            <li>Tổ Chức Trọn Gói</li>
            <li>Trang Trí Sân Khấu</li>
            <li>Âm Thanh Ánh Sáng</li>
            <li>Chụp Ảnh Quay Phim</li>
            <li>Dịch Vụ Ẩm Thực</li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-column">
          <h6>Thông Tin Liên Hệ</h6>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`">{{ contactInfo.phone }}</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ contactInfo.address }}</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <span>{{ contactInfo.workingHours }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} {{ siteInfo.siteName }}. Tất cả quyền được bảo lưu.</p>
        </div>
        <div class="footer-credit">
          <p>Được phát triển bởi <a href="#" class="credit-link">Kohino Events Team</a></p>
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
.footer-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.footer-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0d6efd, #fd7e14);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-column h5,
.footer-column h6 {
  color: #0d6efd;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.footer-column h6 {
  font-size: 1.1rem;
  color: #fd7e14;
}

.footer-brand h5 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-slogan {
  color: #adb5bd;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.footer-address {
  color: #adb5bd;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-link:hover {
  background: #0d6efd;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a:hover {
  color: #0d6efd;
}

.footer-links li {
  color: #adb5bd;
  font-size: 0.95rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-item i {
  color: #0d6efd;
  width: 20px;
  text-align: center;
  font-size: 1rem;
}

.contact-item a,
.contact-item span {
  color: #adb5bd;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #0d6efd;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright p,
.footer-credit p {
  margin: 0;
  color: #adb5bd;
  font-size: 0.9rem;
}

.credit-link {
  color: #0d6efd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.credit-link:hover {
  color: #fd7e14;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 3rem 0 2rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .footer-container {
    padding: 0 0.75rem;
  }

  .footer-section {
    padding: 2.5rem 0 1.5rem;
  }

  .footer-social {
    gap: 0.75rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
</style>