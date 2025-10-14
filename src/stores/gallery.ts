import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useApi } from '@/composables/useApi' // TODO: Uncomment when implementing real API calls
import type { GalleryItem, GalleryFilter } from '@/types/gallery'
import { GalleryCategory } from '@/types/gallery'

export const useGalleryStore = defineStore('gallery', () => {
  // State
  const galleries = ref<GalleryItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentFilter = ref<GalleryFilter>({
    category: 'all',
    per_page: 12,
    search: ''
  })
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)

  // Getters
  const filteredGalleries = computed(() => {
    if (currentFilter.value.category === 'all') {
      return galleries.value
    }
    return galleries.value.filter(gallery => gallery.category === currentFilter.value.category)
  })

  const featuredGalleries = computed(() => {
    return galleries.value.filter(gallery => gallery.is_featured)
  })

  const categories = computed(() => {
    const uniqueCategories = [...new Set(galleries.value.map(gallery => gallery.category))]
    return uniqueCategories
  })

  // Actions
  // const { get } = useApi() // TODO: Uncomment when implementing real API calls

  const fetchGalleries = async (filter?: Partial<GalleryFilter>) => {
    loading.value = true
    error.value = null

    try {
      // Update current filter
      if (filter) {
        currentFilter.value = { ...currentFilter.value, ...filter }
      }

      // TODO: Replace with actual API call
      // Build query parameters
      // const params = new URLSearchParams()
      // if (currentFilter.value.per_page) {
      //   params.append('per_page', currentFilter.value.per_page.toString())
      // }
      // if (currentFilter.value.search) {
      //   params.append('search', currentFilter.value.search)
      // }

      // const response = await get<GalleryResponse>(`/api/gallery?${params.toString()}`)

      // Mock data for development
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

      const mockGalleries: GalleryItem[] = [
        {
          image_id: 1,
          title: 'Đám Cưới Hoành Tráng',
          description: 'Sự kiện đám cưới trọn gói với trang trí sang trọng',
          image_path: '/images/galleries/wedding-1.jpg',
          category: GalleryCategory.WEDDING,
          is_featured: true,
          display_order: 1,
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z'
        },
        {
          image_id: 2,
          title: 'Trang Trí Sân Khấu',
          description: 'Thiết kế sân khấu ấn tượng cho ngày trọng đại',
          image_path: '/images/galleries/decoration-1.jpg',
          category: GalleryCategory.DECORATION,
          is_featured: true,
          display_order: 2,
          created_at: '2024-01-14T10:00:00Z',
          updated_at: '2024-01-14T10:00:00Z'
        },
        {
          image_id: 3,
          title: 'Trang Trí Gia Tiên',
          description: 'Trang trí bàn thờ gia tiên trang nghiêm và đẹp mắt',
          image_path: '/images/galleries/decoration-2.jpg',
          category: GalleryCategory.DECORATION,
          is_featured: false,
          display_order: 3,
          created_at: '2024-01-13T10:00:00Z',
          updated_at: '2024-01-13T10:00:00Z'
        },
        {
          image_id: 4,
          title: 'Tiệc Tại Nhà',
          description: 'Dịch vụ tổ chức tiệc tại nhà chuyên nghiệp',
          image_path: '/images/galleries/wedding-2.jpg',
          category: GalleryCategory.WEDDING,
          is_featured: false,
          display_order: 4,
          created_at: '2024-01-12T10:00:00Z',
          updated_at: '2024-01-12T10:00:00Z'
        },
        {
          image_id: 5,
          title: 'Tiệc Tại Công Ty',
          description: 'Tổ chức tiệc công ty chuyên nghiệp',
          image_path: '/images/galleries/other-1.jpg',
          category: GalleryCategory.OTHER,
          is_featured: false,
          display_order: 5,
          created_at: '2024-01-11T10:00:00Z',
          updated_at: '2024-01-11T10:00:00Z'
        },
        {
          image_id: 6,
          title: 'Sự Kiện Đám Cưới',
          description: 'Dịch vụ tổ chức sự kiện trọn gói',
          image_path: '/images/galleries/wedding-3.jpg',
          category: GalleryCategory.WEDDING,
          is_featured: true,
          display_order: 6,
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-10T10:00:00Z'
        },
        {
          image_id: 7,
          title: 'Sinh Nhật',
          description: 'Tổ chức sinh nhật ấn tượng',
          image_path: '/images/galleries/other-2.jpg',
          category: GalleryCategory.OTHER,
          is_featured: false,
          display_order: 7,
          created_at: '2024-01-09T10:00:00Z',
          updated_at: '2024-01-09T10:00:00Z'
        },
        {
          image_id: 8,
          title: 'Sự Kiện',
          description: 'Tổ chức sự kiện chuyên nghiệp',
          image_path: '/images/galleries/other-3.jpg',
          category: GalleryCategory.OTHER,
          is_featured: false,
          display_order: 8,
          created_at: '2024-01-08T10:00:00Z',
          updated_at: '2024-01-08T10:00:00Z'
        },
        {
          image_id: 9,
          title: 'Dịch Vụ',
          description: 'Dịch vụ trọn gói chất lượng cao',
          image_path: '/images/galleries/decoration-3.jpg',
          category: GalleryCategory.DECORATION,
          is_featured: false,
          display_order: 9,
          created_at: '2024-01-07T10:00:00Z',
          updated_at: '2024-01-07T10:00:00Z'
        },
        {
          image_id: 10,
          title: 'Âm Thanh Ánh Sáng',
          description: 'Hệ thống âm thanh và ánh sáng chuyên nghiệp',
          image_path: '/images/galleries/sound-lighting-1.jpg',
          category: GalleryCategory.SOUND_LIGHTING,
          is_featured: true,
          display_order: 10,
          created_at: '2024-01-06T10:00:00Z',
          updated_at: '2024-01-06T10:00:00Z'
        },
        {
          image_id: 11,
          title: 'Hệ Thống Âm Thanh',
          description: 'Thiết bị âm thanh chất lượng cao',
          image_path: '/images/galleries/sound-lighting-2.jpg',
          category: GalleryCategory.SOUND_LIGHTING,
          is_featured: false,
          display_order: 11,
          created_at: '2024-01-05T10:00:00Z',
          updated_at: '2024-01-05T10:00:00Z'
        },
        {
          image_id: 12,
          title: 'Hệ Thống Ánh Sáng',
          description: 'Hệ thống ánh sáng LED hiện đại',
          image_path: '/images/galleries/sound-lighting-3.jpg',
          category: GalleryCategory.SOUND_LIGHTING,
          is_featured: false,
          display_order: 12,
          created_at: '2024-01-04T10:00:00Z',
          updated_at: '2024-01-04T10:00:00Z'
        }
      ]

      // Filter galleries based on current filter
      let filteredGalleries = mockGalleries

      if (currentFilter.value.category !== 'all') {
        filteredGalleries = filteredGalleries.filter(
          gallery => gallery.category === currentFilter.value.category
        )
      }

      if (currentFilter.value.search) {
        const searchTerm = currentFilter.value.search.toLowerCase()
        filteredGalleries = filteredGalleries.filter(
          gallery =>
            gallery.title.toLowerCase().includes(searchTerm) ||
            (gallery.description && gallery.description.toLowerCase().includes(searchTerm))
        )
      }

      // Simulate pagination
      const page = filter?.page || 1
      const perPage = currentFilter.value.per_page || 12
      const startIndex = (page - 1) * perPage
      const endIndex = startIndex + perPage
      const paginatedGalleries = filteredGalleries.slice(startIndex, endIndex)

      galleries.value = page === 1 ? paginatedGalleries : [...galleries.value, ...paginatedGalleries]
      totalItems.value = filteredGalleries.length
      totalPages.value = Math.ceil(filteredGalleries.length / perPage)
      currentPage.value = page

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch galleries'
      console.error('Error fetching galleries:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchGalleryBySlug = async (slug: string): Promise<GalleryItem | null> => {
    loading.value = true
    error.value = null

    try {
      // TODO: Replace with actual API call
      // const response = await get<{ data: GalleryItem }>(`/api/gallery/${slug}`)
      // return response.data || null

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300))
      const mockGallery = galleries.value.find(g => g.title.toLowerCase().includes(slug.toLowerCase()))
      return mockGallery || null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch gallery item'
      console.error('Error fetching gallery item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const setFilter = (filter: Partial<GalleryFilter>) => {
    currentFilter.value = { ...currentFilter.value, ...filter }
  }

  const clearFilter = () => {
    currentFilter.value = {
      category: 'all',
      per_page: 12,
      search: ''
    }
  }

  const searchGalleries = async (searchTerm: string) => {
    await fetchGalleries({ search: searchTerm })
  }

  const filterByCategory = async (category: GalleryCategory | 'all') => {
    await fetchGalleries({ category })
  }

  return {
    // State
    galleries,
    loading,
    error,
    currentFilter,
    currentPage,
    totalPages,
    totalItems,

    // Getters
    filteredGalleries,
    featuredGalleries,
    categories,

    // Actions
    fetchGalleries,
    fetchGalleryBySlug,
    setFilter,
    clearFilter,
    searchGalleries,
    filterByCategory
  }
})
