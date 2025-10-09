<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-primary text-white position-relative">
      <div class="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
      <div class="container position-relative z-index-1 py-5">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <h1 class="display-3 fw-bold mb-4">Chào Mừng Đến Với Wedding Events</h1>
            <p class="lead mb-4">Chúng tôi chuyên tổ chức sự kiện đám cưới chuyên nghiệp với dịch vụ chất lượng cao và sáng tạo. Hãy để chúng tôi biến ước mơ của bạn thành hiện thực.</p>
            <div class="d-flex gap-3">
              <router-link to="/services" class="btn btn-light btn-lg">
                <i class="fas fa-eye me-2"></i>Xem Dịch Vụ
              </router-link>
              <router-link to="/contact" class="btn btn-outline-light btn-lg">
                <i class="fas fa-phone me-2"></i>Liên Hệ Ngay
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image-placeholder bg-light rounded shadow d-flex align-items-center justify-content-center" style="min-height: 400px;">
              <i class="fas fa-heart fa-5x text-primary"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-image-placeholder bg-light rounded shadow d-flex align-items-center justify-content-center" style="min-height: 300px;">
              <i class="fas fa-users fa-4x text-primary"></i>
            </div>
          </div>
          <div class="col-lg-6">
            <h2 class="mb-4">Về Chúng Tôi</h2>
            <p class="lead mb-4">
              Với hơn 10 năm kinh nghiệm trong lĩnh vực tổ chức sự kiện đám cưới,
              chúng tôi tự hào mang đến những trải nghiệm tuyệt vời và đáng nhớ cho các cặp đôi.
            </p>
            <div class="row g-4 mb-4">
              <div class="col-md-6">
                <div class="text-center">
                  <i class="fas fa-heart fa-3x text-primary mb-3"></i>
                  <h4>Sự Đam Mê</h4>
                  <p>Chúng tôi đam mê tạo nên những khoảnh khắc hạnh phúc cho các cặp đôi.</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="text-center">
                  <i class="fas fa-star fa-3x text-primary mb-3"></i>
                  <h4>Chất Lượng</h4>
                  <p>Cam kết mang đến dịch vụ chất lượng cao nhất với sự chuyên nghiệp tối đa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-light py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-3 text-center">
            <div class="stat-item">
              <h2 class="text-primary mb-2">500+</h2>
              <p class="mb-0">Đám Cưới Đã Tổ Chức</p>
            </div>
          </div>
          <div class="col-md-3 text-center">
            <div class="stat-item">
              <h2 class="text-primary mb-2">98%</h2>
              <p class="mb-0">Khách Hàng Hài Lòng</p>
            </div>
          </div>
          <div class="col-md-3 text-center">
            <div class="stat-item">
              <h2 class="text-primary mb-2">50+</h2>
              <p class="mb-0">Đối Tác Uy Tín</p>
            </div>
          </div>
          <div class="col-md-3 text-center">
            <div class="stat-item">
              <h2 class="text-primary mb-2">10+</h2>
              <p class="mb-0">Năm Kinh Nghiệm</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Services Section -->
    <section class="py-5">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <h2 class="mb-3">Dịch Vụ Nổi Bật</h2>
            <p class="lead">Chúng tôi cung cấp đa dạng các dịch vụ tổ chức đám cưới chuyên nghiệp</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="service-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-glass-cheers fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Tiệc Cưới</h5>
                <p class="card-text">Tổ chức tiệc cưới sang trọng với thực đơn đa dạng và không gian đẳng cấp.</p>
                <router-link to="/services" class="btn btn-primary">Xem Chi Tiết</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="service-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-camera fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Chụp Ảnh</h5>
                <p class="card-text">Dịch vụ chụp ảnh chuyên nghiệp ghi lại những khoảnh khắc đẹp nhất của bạn.</p>
                <router-link to="/services" class="btn btn-primary">Xem Chi Tiết</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="service-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-music fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Âm Thanh Ánh Sáng</h5>
                <p class="card-text">Hệ thống âm thanh ánh sáng hiện đại tạo nên không gian lung linh cho sự kiện.</p>
                <router-link to="/services" class="btn btn-primary">Xem Chi Tiết</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="service-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-flower fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Trang Trí Hoa</h5>
                <p class="card-text">Trang trí hoa tươi và các phụ kiện trang trí tạo nên không gian lãng mạn.</p>
                <router-link to="/services" class="btn btn-primary">Xem Chi Tiết</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-light py-5">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12 text-center">
            <h2 class="mb-3">Khách Hàng Nói Về Chúng Tôi</h2>
            <p class="lead">Những đánh giá chân thành từ khách hàng đã tin tưởng sử dụng dịch vụ của chúng tôi</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="testimonial-card card h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex mb-3">
                  <div class="avatar-placeholder rounded-circle me-3 bg-primary d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                    <i class="fas fa-user fa-2x text-white"></i>
                  </div>
                  <div>
                    <h6 class="mb-0">Nguyễn Thị Lan</h6>
                    <small class="text-muted">Cô Dâu Tháng 3/2024</small>
                  </div>
                </div>
                <p class="card-text">"Đám cưới của chúng tôi thật hoàn hảo nhờ Wedding Events. Từ khâu chuẩn bị đến thực hiện đều rất chuyên nghiệp. Cảm ơn đội ngũ đã tạo nên ngày trọng đại tuyệt vời!"</p>
                <div class="text-warning">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="testimonial-card card h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex mb-3">
                  <div class="avatar-placeholder rounded-circle me-3 bg-success d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                    <i class="fas fa-user fa-2x text-white"></i>
                  </div>
                  <div>
                    <h6 class="mb-0">Trần Văn Minh</h6>
                    <small class="text-muted">Chú Rể Tháng 5/2024</small>
                  </div>
                </div>
                <p class="card-text">"Không thể tin được sự kiện lại hoàn hảo đến thế! Wedding Events đã vượt quá mong đợi của chúng tôi. Sẽ giới thiệu cho bạn bè và người thân!"</p>
                <div class="text-warning">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-5 bg-primary text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h2 class="mb-3">Sẵn Sàng Bắt Đầu Kế Hoạch Đám Cưới Của Bạn?</h2>
            <p class="lead mb-0">Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và biến ước mơ đám cưới của bạn thành hiện thực.</p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <router-link to="/contact" class="btn btn-light btn-lg">
              <i class="fas fa-phone me-2"></i>Liên Hệ Ngay
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Homepage không cần script đặc biệt ở thời điểm này
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.testimonial-card {
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-2px);
}

.stat-item h2 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .hero-section {
    text-align: center;
    padding: 100px 0;
  }

  .hero-section .display-3 {
    font-size: 2.5rem;
  }

  .stat-item h2 {
    font-size: 2rem;
  }
}
</style>
