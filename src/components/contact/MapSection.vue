<template>
  <div class="map-section">
    <div class="container-fluid p-0">
      <div class="map-container">
        <div v-if="contactInfo.mapEmbed" class="map-embed" v-html="contactInfo.mapEmbed"></div>
        <div v-else class="map-placeholder">
          <div class="placeholder-content">
            <i class="fas fa-map-marker-alt"></i>
            <h3>Bản Đồ</h3>
            <p>Bản đồ sẽ được cập nhật sớm</p>
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
.map-section {
  margin: 3rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #f8f9fa;
}

.map-embed {
  width: 100%;
  height: 100%;
  border: 0;
}

.map-embed :deep(iframe) {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.map-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23dee2e6" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.placeholder-content {
  text-align: center;
  color: #6c757d;
  z-index: 1;
  position: relative;
}

.placeholder-content i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #0d6efd;
  opacity: 0.7;
}

.placeholder-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #495057;
}

.placeholder-content p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.8;
}

/* Animation */
.map-section {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .map-section {
    margin: 2rem 0;
    border-radius: 8px;
  }
  
  .map-container {
    height: 300px;
  }
  
  .placeholder-content i {
    font-size: 2.5rem;
  }
  
  .placeholder-content h3 {
    font-size: 1.25rem;
  }
  
  .placeholder-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .map-section {
    margin: 1.5rem 0;
    border-radius: 6px;
  }
  
  .map-container {
    height: 250px;
  }
  
  .placeholder-content i {
    font-size: 2rem;
  }
  
  .placeholder-content h3 {
    font-size: 1.1rem;
  }
  
  .placeholder-content p {
    font-size: 0.85rem;
  }
}
</style>