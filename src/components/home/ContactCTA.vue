<template>
  <section class="contact-cta py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <div class="cta-content text-white">
            <h2 class="mb-3">Liên Hệ Ngay</h2>
            <div class="contact-info">
              <div class="info-item mb-3">
                <i class="fas fa-phone me-3"></i>
                <span>{{ contactInfo.phone }}</span>
              </div>
              <div class="info-item mb-3">
                <i class="fas fa-envelope me-3"></i>
                <span>{{ contactInfo.email }}</span>
              </div>
              <div class="info-item mb-3">
                <i class="fas fa-clock me-3"></i>
                <span>{{ contactInfo.workingHours }}</span>
              </div>
            </div>
            <p class="lead mb-0">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và biến ước mơ đám cưới của bạn thành hiện thực.
            </p>
          </div>
        </div>
        <div class="col-lg-4 text-lg-end">
          <div class="cta-buttons">
            <router-link
              to="/contact"
              class="btn btn-light btn-lg me-3 mb-3"
            >
              <i class="fas fa-phone me-2"></i>Đặt Dịch Vụ Ngay
            </router-link>
            <a
              :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`"
              class="btn btn-outline-light btn-lg mb-3"
            >
              <i class="fas fa-phone-alt me-2"></i>Gọi Ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const theme = computed(() => themeStore.theme)
const contactInfo = computed(() => themeStore.contactInfo)
</script>

<style scoped>
.contact-cta {
  background: linear-gradient(135deg, var(--primary-color, #0d6efd) 0%, var(--accent-color, #fd7e14) 100%);
  position: relative;
  overflow: hidden;
}

.contact-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.contact-info .info-item {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
}

.contact-info .info-item i {
  width: 20px;
  text-align: center;
  font-size: 1.2rem;
}

.cta-buttons {
  position: relative;
  z-index: 1;
}

.btn {
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-light {
  background: white;
  color: var(--primary-color, #0d6efd);
  border-color: white;
}

.btn-light:hover {
  background: transparent;
  color: white;
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-outline-light {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-outline-light:hover {
  background: white;
  color: var(--primary-color, #0d6efd);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Animation */
.cta-content {
  animation: slideInLeft 0.8s ease-out;
}

.cta-buttons {
  animation: slideInRight 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-cta {
    text-align: center;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .contact-info .info-item {
    justify-content: center;
    font-size: 1rem;
  }
  
  .cta-buttons {
    text-align: center;
  }
  
  .btn {
    display: inline-block;
    margin: 0.5rem;
  }
}

@media (max-width: 576px) {
  .cta-content h2 {
    font-size: 1.8rem;
  }
  
  .contact-info .info-item {
    font-size: 0.9rem;
  }
  
  .btn {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
}
</style>