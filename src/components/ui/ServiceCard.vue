<template>
  <div class="service-card card h-100 shadow-sm">
    <div class="card-body text-center">
      <div class="service-icon mb-3">
        <i :class="icon" class="fa-3x text-primary"></i>
      </div>
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <router-link :to="link" class="btn btn-primary">
        Xem Chi Tiết
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  link: '/services'
})
</script>

<style scoped>
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.service-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
