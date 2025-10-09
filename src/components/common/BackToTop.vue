<template>
  <button
    v-show="isVisible"
    type="button"
    class="btn btn-primary btn-floating btn-lg rounded-circle"
    id="btn-back-to-top"
    @click="scrollToTop"
    aria-label="Back to top"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 300

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isVisible.value = scrollTop > scrollThreshold
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Initial check
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
#btn-back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: none;
}

#btn-back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

#btn-back-to-top i {
  font-size: 1.2rem;
}

/* Animation for show/hide */
#btn-back-to-top {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

#btn-back-to-top.show {
  opacity: 1;
  visibility: visible;
}

/* Ensure it shows when isVisible is true */
#btn-back-to-top[v-show] {
  opacity: 1;
  visibility: visible;
}
</style>