<template>
  <section class="about-section py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="about-content">
            <h2 class="mb-4">Về Chúng Tôi</h2>
            <p class="lead mb-4">
              Wedding Events là đơn vị chuyên tổ chức đám cưới hàng đầu tại TP.HCM. 
              Với hơn 10 năm kinh nghiệm, chúng tôi đã giúp hàng nghìn cặp đôi có được 
              ngày cưới đẹp mơ ước.
            </p>
            <ul class="features-list list-unstyled">
              <li class="mb-3">
                <i class="fas fa-check-circle text-primary me-3"></i>
                Đội ngũ chuyên nghiệp
              </li>
              <li class="mb-3">
                <i class="fas fa-check-circle text-primary me-3"></i>
                Dịch vụ trọn gói
              </li>
              <li class="mb-3">
                <i class="fas fa-check-circle text-primary me-3"></i>
                Giá cả hợp lý
              </li>
              <li class="mb-3">
                <i class="fas fa-check-circle text-primary me-3"></i>
                Chất lượng đảm bảo
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="about-stats">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="stat-item text-center">
                  <h3 class="display-4 text-primary mb-2">10+</h3>
                  <p class="mb-0">Năm kinh nghiệm</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="stat-item text-center">
                  <h3 class="display-4 text-primary mb-2">1000+</h3>
                  <p class="mb-0">Đám cưới tổ chức</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="stat-item text-center">
                  <h3 class="display-4 text-primary mb-2">50+</h3>
                  <p class="mb-0">Dịch vụ chuyên nghiệp</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="stat-item text-center">
                  <h3 class="display-4 text-primary mb-2">100%</h3>
                  <p class="mb-0">Khách hàng hài lòng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'

const homeStore = useHomeStore()

onMounted(async () => {
  // Load about data from store
  await homeStore.loadAboutData()
})
</script>

<style scoped>
.about-section {
  background: #f8f9fa;
}

.about-content h2 {
  color: #333;
  font-weight: 700;
  position: relative;
}

.about-content h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--primary-color, #0d6efd);
}

.about-content .lead {
  color: #666;
  line-height: 1.8;
}

.features-list li {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #555;
}

.features-list i {
  font-size: 1.2rem;
}

.stat-item {
  padding: 2rem 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.stat-item h3 {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-item p {
  color: #666;
  font-weight: 500;
  font-size: 1rem;
}

/* Animation for stats */
.stat-item h3 {
  animation: countUp 2s ease-out;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .about-section {
    padding: 3rem 0;
  }
  
  .about-content {
    margin-bottom: 3rem;
  }
  
  .stat-item {
    margin-bottom: 1.5rem;
  }
  
  .stat-item h3 {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .about-content h2 {
    font-size: 1.8rem;
  }
  
  .about-content .lead {
    font-size: 1rem;
  }
  
  .features-list li {
    font-size: 1rem;
  }
  
  .stat-item h3 {
    font-size: 2rem;
  }
}
</style>