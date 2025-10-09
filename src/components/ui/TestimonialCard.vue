<template>
  <div class="testimonial-card card h-100 shadow-sm">
    <div class="card-body">
      <div class="d-flex mb-3">
        <img :src="avatar" :alt="name" class="rounded-circle me-3" width="60" height="60" />
        <div>
          <h6 class="mb-0">{{ name }}</h6>
          <small class="text-muted">{{ position }}</small>
        </div>
      </div>
      <p class="card-text">{{ content }}</p>
      <div class="rating">
        <i v-for="star in 5" :key="star" class="fas fa-star text-warning"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  position: string
  content: string
  avatar: string
}

defineProps<Props>()
</script>

<style scoped>
.testimonial-card {
  transition: transform 0.3s ease;
  border: none;
}

.testimonial-card:hover {
  transform: translateY(-2px);
}

.rating {
  margin-top: 1rem;
}
</style>
