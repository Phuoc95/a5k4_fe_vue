export interface GalleryItem {
  image_id: number
  title: string
  description?: string
  image_path: string
  category: GalleryCategory
  is_featured: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

export enum GalleryCategory {
  WEDDING = 'wedding',
  DECORATION = 'decoration',
  SOUND_LIGHTING = 'sound_lighting',
  OTHER = 'other'
}

export const GalleryCategoryLabels: Record<GalleryCategory, string> = {
  [GalleryCategory.WEDDING]: 'Đám cưới',
  [GalleryCategory.DECORATION]: 'Trang trí',
  [GalleryCategory.SOUND_LIGHTING]: 'Âm thanh & Ánh sáng',
  [GalleryCategory.OTHER]: 'Khác'
}

export interface GalleryFilter {
  category?: GalleryCategory | 'all'
  per_page?: number
  search?: string
  page?: number
}

export interface GalleryResponse {
  data: GalleryItem[]
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
}