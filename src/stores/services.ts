import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import type { Service, ServiceCategory } from '@/types/service'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [] as Service[],
    categories: [] as ServiceCategory[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchServices() {
      this.loading = true
      this.error = null
      try {
        const { get } = useApi()
        const data = await get('/api/services')
        this.services = data.services || []
        this.categories = data.categories || []
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error occurred'
      } finally {
        this.loading = false
      }
    }
  }
})
