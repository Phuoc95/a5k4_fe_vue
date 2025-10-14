import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // State
  const isMobileMenuOpen = ref(false)
  const isLoading = ref(false)
  const notifications = ref<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }>>([])

  // Actions
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const openMobileMenu = () => {
    isMobileMenuOpen.value = true
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const addNotification = (notification: {
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }) => {
    const id = Date.now().toString()
    const newNotification = {
      id,
      duration: 5000,
      ...notification
    }

    notifications.value.push(newNotification)

    // Auto remove after duration
    if (newNotification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  return {
    // State
    isMobileMenuOpen,
    isLoading,
    notifications,

    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications
  }
})
