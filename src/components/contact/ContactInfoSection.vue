<template>
  <div class="contact-info-section">
    <div class="contact-info-card">
      <h2 class="section-title">Thông Tin Liên Hệ</h2>
      <p class="section-description">
        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi theo thông tin dưới đây:
      </p>
      
      <div class="contact-details">
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="contact-text">
            <h4>Địa Chỉ</h4>
            <p>{{ contactInfo.address }}</p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-phone"></i>
          </div>
          <div class="contact-text">
            <h4>Điện Thoại</h4>
            <p>
              <a :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`" class="contact-link">
                {{ contactInfo.phone }}
              </a>
            </p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="contact-text">
            <h4>Email</h4>
            <p>
              <a :href="`mailto:${contactInfo.email}`" class="contact-link">
                {{ contactInfo.email }}
              </a>
            </p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="contact-text">
            <h4>Giờ Làm Việc</h4>
            <p>{{ contactInfo.workingHours }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useContactStore } from '@/stores/contact'

const contactStore = useContactStore()

const contactInfo = computed(() => contactStore.contactInfo)
</script>

<style scoped>
.contact-info-section {
  height: 100%;
}

.contact-info-card {
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #0d6efd, #fd7e14);
  border-radius: 2px;
}

.section-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.contact-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #0d6efd, #fd7e14);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.contact-text {
  flex: 1;
}

.contact-text h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-text p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.contact-link {
  color: #0d6efd;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #fd7e14;
  text-decoration: underline;
}

/* Animation */
.contact-item {
  animation: slideInLeft 0.6s ease-out;
  animation-fill-mode: both;
}

.contact-item:nth-child(1) { animation-delay: 0.1s; }
.contact-item:nth-child(2) { animation-delay: 0.2s; }
.contact-item:nth-child(3) { animation-delay: 0.3s; }
.contact-item:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-info-card {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .contact-item {
    gap: 0.75rem;
  }
  
  .contact-icon {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
  
  .contact-text h4 {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .contact-info-card {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .contact-icon {
    align-self: center;
  }
}
</style>