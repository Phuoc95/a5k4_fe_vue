import { defineStore } from 'pinia'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export const useUIStore = defineStore('ui', {
  state: () => ({
    isMobileMenuOpen: false,
    loading: false,
    notifications: [] as Notification[]
  }),

  actions: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },

    addNotification(notification: Omit<Notification, 'id'>) {
      const id = Date.now().toString()
      this.notifications.push({
        id,
        duration: 5000,
        ...notification
      })

      // Auto remove after duration
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => {
          this.removeNotification(id)
        }, notification.duration)
      }
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    }
  }
})
