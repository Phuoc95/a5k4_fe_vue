<template>
  <footer class="bg-dark text-white mt-5">
    <div class="container py-5">
      <div class="row">
        <!-- Logo & Description -->
        <div class="col-lg-4 mb-4">
          <div class="d-flex align-items-center mb-3">
            <img src="/images/logo.jpg" alt="Logo" height="40" class="me-3" />
            <h5 class="mb-0">Wedding Events</h5>
          </div>
          <p class="text-muted">
            Chuyên tổ chức sự kiện đám cưới chuyên nghiệp với dịch vụ chất lượng cao và sáng tạo.
          </p>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-4 mb-4">
          <h6 class="mb-3">Liên Hệ</h6>
          <div class="d-flex align-items-center mb-2">
            <i class="fas fa-map-marker-alt me-3"></i>
            <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="fas fa-phone me-3"></i>
            <span>(028) 1234 5678</span>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="fas fa-envelope me-3"></i>
            <span>info@weddingevents.vn</span>
          </div>
          <div class="d-flex align-items-center">
            <i class="fas fa-clock me-3"></i>
            <span>8:00 - 18:00 (T2 - T7)</span>
          </div>
        </div>

        <!-- Social Media -->
        <div class="col-lg-4 mb-4">
          <h6 class="mb-3">Theo Dõi Chúng Tôi</h6>
          <div class="d-flex">
            <a href="#" class="text-white me-3 fs-5">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="text-white me-3 fs-5">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-white me-3 fs-5">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="#" class="text-white fs-5">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="row mt-4 pt-4 border-top border-secondary">
        <div class="col-md-6">
          <p class="mb-0 text-muted">
            © 2024 Wedding Events. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <router-link to="/privacy" class="text-muted text-decoration-none me-3">
            Chính sách bảo mật
          </router-link>
          <router-link to="/terms" class="text-muted text-decoration-none">
            Điều khoản sử dụng
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component - không cần script đặc biệt
</script>

<style scoped>
footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

footer a:hover {
  color: #e74c3c !important;
  transition: color 0.3s ease;
}

footer .fas {
  width: 20px;
}
</style>
