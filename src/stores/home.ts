import { defineStore } from 'pinia'
import { useHomePage } from '@/composables/useHomePage'

export const useHomeStore = defineStore('home', {
  state: () => ({
    homeData: null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchHomeData() {
      this.loading = true
      this.error = null
      try {
        const { fetchHomeData } = useHomePage()
        this.homeData = await fetchHomeData()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unknown error occurred'
      } finally {
        this.loading = false
      }
    }
  }
})
