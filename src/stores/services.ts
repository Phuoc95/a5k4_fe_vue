import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useApi } from '@/composables/useApi' // TODO: Uncomment when implementing real API calls
import type { Service, ServiceCategory, ServiceFilter, ServiceContactForm } from '@/types/service'

export const useServicesStore = defineStore('services', () => {
  // State
  const services = ref<Service[]>([])
  const categories = ref<ServiceCategory[]>([])
  const categoriesWithServices = ref<ServiceCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentFilter = ref<ServiceFilter>({
    search: '',
    is_active: true
  })

  // Getters
  const filteredServices = computed(() => {
    let filtered = services.value

    if (currentFilter.value.search) {
      const searchTerm = currentFilter.value.search.toLowerCase()
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
      )
    }

    if (currentFilter.value.category_id) {
      filtered = filtered.filter(service => service.category_id === currentFilter.value.category_id)
    }

    if (currentFilter.value.is_active !== undefined) {
      filtered = filtered.filter(service => service.is_active === currentFilter.value.is_active)
    }

    if (currentFilter.value.min_price !== undefined) {
      filtered = filtered.filter(service => service.base_price >= currentFilter.value.min_price!)
    }

    if (currentFilter.value.max_price !== undefined) {
      filtered = filtered.filter(service => service.base_price <= currentFilter.value.max_price!)
    }

    return filtered
  })

  const activeServices = computed(() => {
    return services.value.filter(service => service.is_active)
  })

  const featuredServices = computed(() => {
    return activeServices.value.slice(0, 4) // First 4 active services as featured
  })

  const servicesByCategory = computed(() => {
    const grouped: { [key: number]: Service[] } = {}
    activeServices.value.forEach(service => {
      if (!grouped[service.category_id]) {
        grouped[service.category_id] = []
      }
      grouped[service.category_id].push(service)
    })
    return grouped
  })

  // Actions
  // const { get, post } = useApi() // TODO: Uncomment when implementing real API calls

  const fetchServices = async (filter?: Partial<ServiceFilter>) => {
    loading.value = true
    error.value = null

    try {
      // Update current filter
      if (filter) {
        currentFilter.value = { ...currentFilter.value, ...filter }
      }

      // TODO: Replace with actual API call
      // const params = new URLSearchParams()
      // if (currentFilter.value.search) {
      //   params.append('search', currentFilter.value.search)
      // }
      // if (currentFilter.value.category_id) {
      //   params.append('category_id', currentFilter.value.category_id.toString())
      // }
      // if (currentFilter.value.is_active !== undefined) {
      //   params.append('is_active', currentFilter.value.is_active.toString())
      // }

      // const response = await get<ServiceResponse>(`/api/services?${params.toString()}`)
      // services.value = response.data || []

      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
      
      const mockServices: Service[] = [
        {
          service_id: 1,
          category_id: 1,
          name: 'Tư vấn và lên kế hoạch',
          description: 'Tư vấn chi tiết về quy mô, ngân sách và phong cách đám cưới',
          base_price: 500000,
          is_active: true,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        {
          service_id: 2,
          category_id: 1,
          name: 'Tìm kiếm địa điểm',
          description: 'Giới thiệu và đặt lịch các địa điểm phù hợp',
          base_price: 300000,
          is_active: true,
          created_at: '2024-01-14T10:00:00Z',
          updated_at: '2024-01-14T10:00:00Z'
        },
        {
          service_id: 3,
          category_id: 1,
          name: 'Lên kế hoạch chi tiết',
          description: 'Lập lịch trình và quản lý thời gian chi tiết',
          base_price: 800000,
          is_active: true,
          created_at: '2024-01-13T10:00:00Z',
          updated_at: '2024-01-13T10:00:00Z'
        },
        {
          service_id: 4,
          category_id: 1,
          name: 'Quản lý ngân sách',
          description: 'Tư vấn và tối ưu hóa chi phí',
          base_price: 400000,
          is_active: true,
          created_at: '2024-01-12T10:00:00Z',
          updated_at: '2024-01-12T10:00:00Z'
        },
        {
          service_id: 5,
          category_id: 2,
          name: 'Sân khấu',
          description: 'Thiết kế sân khấu độc đáo và ấn tượng',
          base_price: 2000000,
          is_active: true,
          created_at: '2024-01-11T10:00:00Z',
          updated_at: '2024-01-11T10:00:00Z'
        },
        {
          service_id: 6,
          category_id: 2,
          name: 'Bàn tiệc',
          description: 'Bố trí bàn ghế và trang trí bàn tiệc',
          base_price: 1500000,
          is_active: true,
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-10T10:00:00Z'
        },
        {
          service_id: 7,
          category_id: 2,
          name: 'Hoa tươi',
          description: 'Trang trí hoa tươi theo phong cách',
          base_price: 1200000,
          is_active: true,
          created_at: '2024-01-09T10:00:00Z',
          updated_at: '2024-01-09T10:00:00Z'
        },
        {
          service_id: 8,
          category_id: 2,
          name: 'Đèn trang trí',
          description: 'Hệ thống đèn LED và ánh sáng nghệ thuật',
          base_price: 1800000,
          is_active: true,
          created_at: '2024-01-08T10:00:00Z',
          updated_at: '2024-01-08T10:00:00Z'
        },
        {
          service_id: 9,
          category_id: 3,
          name: 'Thực đơn đa dạng',
          description: 'Thực đơn phong phú từ truyền thống đến hiện đại',
          base_price: 2500000,
          is_active: true,
          created_at: '2024-01-07T10:00:00Z',
          updated_at: '2024-01-07T10:00:00Z'
        },
        {
          service_id: 10,
          category_id: 3,
          name: 'Thử món',
          description: 'Đặt lịch thử món miễn phí',
          base_price: 0,
          is_active: true,
          created_at: '2024-01-06T10:00:00Z',
          updated_at: '2024-01-06T10:00:00Z'
        },
        {
          service_id: 11,
          category_id: 3,
          name: 'Đồ uống',
          description: 'Giải khát đa dạng từ nước ngọt đến rượu',
          base_price: 800000,
          is_active: true,
          created_at: '2024-01-05T10:00:00Z',
          updated_at: '2024-01-05T10:00:00Z'
        },
        {
          service_id: 12,
          category_id: 3,
          name: 'Dịch vụ phục vụ',
          description: 'Đội ngũ phục vụ chuyên nghiệp',
          base_price: 1000000,
          is_active: true,
          created_at: '2024-01-04T10:00:00Z',
          updated_at: '2024-01-04T10:00:00Z'
        },
        {
          service_id: 13,
          category_id: 4,
          name: 'Hệ thống âm thanh',
          description: 'Âm thanh chất lượng cao',
          base_price: 1200000,
          is_active: true,
          created_at: '2024-01-03T10:00:00Z',
          updated_at: '2024-01-03T10:00:00Z'
        },
        {
          service_id: 14,
          category_id: 4,
          name: 'Ánh sáng sân khấu',
          description: 'Hệ thống đèn chuyên nghiệp',
          base_price: 1500000,
          is_active: true,
          created_at: '2024-01-02T10:00:00Z',
          updated_at: '2024-01-02T10:00:00Z'
        },
        {
          service_id: 15,
          category_id: 4,
          name: 'Hiệu ứng ánh sáng',
          description: 'Hiệu ứng ánh sáng nghệ thuật',
          base_price: 2000000,
          is_active: true,
          created_at: '2024-01-01T10:00:00Z',
          updated_at: '2024-01-01T10:00:00Z'
        },
        {
          service_id: 16,
          category_id: 4,
          name: 'DJ/MC',
          description: 'Đội ngũ DJ và MC chuyên nghiệp',
          base_price: 3000000,
          is_active: true,
          created_at: '2023-12-31T10:00:00Z',
          updated_at: '2023-12-31T10:00:00Z'
        }
      ]

      services.value = mockServices

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch services'
      console.error('Error fetching services:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with actual API call
      // const response = await get<CategoryServiceResponse>('/api/service-categories')
      // categories.value = response.data || []

      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockCategories: ServiceCategory[] = [
        {
          category_id: 1,
          name: 'Tổ Chức Trọn Gói',
          description: 'Dịch vụ tổ chức sự kiện từ A đến Z',
          icon_class: 'fas fa-concierge-bell',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        {
          category_id: 2,
          name: 'Dịch Vụ Trang Trí',
          description: 'Thiết kế và trang trí sân khấu, bàn tiệc',
          icon_class: 'fas fa-paint-brush',
          created_at: '2024-01-14T10:00:00Z',
          updated_at: '2024-01-14T10:00:00Z'
        },
        {
          category_id: 3,
          name: 'Dịch Vụ Ẩm Thực',
          description: 'Thực đơn đa dạng và dịch vụ phục vụ',
          icon_class: 'fas fa-utensils',
          created_at: '2024-01-13T10:00:00Z',
          updated_at: '2024-01-13T10:00:00Z'
        },
        {
          category_id: 4,
          name: 'Âm Thanh Ánh Sáng',
          description: 'Hệ thống âm thanh và ánh sáng chuyên nghiệp',
          icon_class: 'fas fa-music',
          created_at: '2024-01-12T10:00:00Z',
          updated_at: '2024-01-12T10:00:00Z'
        }
      ]

      categories.value = mockCategories

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCategoriesWithServices = async () => {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with actual API call
      // const response = await get<CategoryServiceResponse>('/api/service-categories/with-services')
      // categoriesWithServices.value = response.data || []

      // Mock implementation - combine categories and services
      await Promise.all([fetchCategories(), fetchServices()])
      
      categoriesWithServices.value = categories.value.map(category => ({
        ...category,
        services: services.value.filter(service => service.category_id === category.category_id)
      }))

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch categories with services'
      console.error('Error fetching categories with services:', err)
    } finally {
      loading.value = false
    }
  }

  const submitContactForm = async (formData: ServiceContactForm) => {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with actual API call
      // const response = await post('/api/service-contact', formData)
      // return response

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Service contact form submitted:', formData)
      return { success: true, message: 'Yêu cầu đã được gửi thành công!' }

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit contact form'
      console.error('Error submitting contact form:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilter = (filter: Partial<ServiceFilter>) => {
    currentFilter.value = { ...currentFilter.value, ...filter }
  }

  const clearFilter = () => {
    currentFilter.value = {
      search: '',
      is_active: true
    }
  }

  const searchServices = async (searchTerm: string) => {
    await fetchServices({ search: searchTerm })
  }

  const filterByCategory = async (categoryId: number) => {
    await fetchServices({ category_id: categoryId })
  }

  return {
    // State
    services,
    categories,
    categoriesWithServices,
    loading,
    error,
    currentFilter,

    // Getters
    filteredServices,
    activeServices,
    featuredServices,
    servicesByCategory,

    // Actions
    fetchServices,
    fetchCategories,
    fetchCategoriesWithServices,
    submitContactForm,
    setFilter,
    clearFilter,
    searchServices,
    filterByCategory
  }
})