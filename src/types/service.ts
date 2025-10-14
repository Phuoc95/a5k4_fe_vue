export interface Service {
  service_id: number
  category_id: number
  name: string
  description: string
  base_price: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface ServiceCategory {
  category_id: number
  name: string
  description?: string
  icon_class: string
  created_at?: string
  updated_at?: string
  services?: Service[]
}

export interface ServiceWithCategory extends Service {
  category: ServiceCategory
}

export interface ServiceFilter {
  category_id?: number
  search?: string
  is_active?: boolean
  min_price?: number
  max_price?: number
}

export interface ServiceResponse {
  data: Service[]
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
}

export interface CategoryServiceResponse {
  data: ServiceCategory[]
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
}

export interface ServiceContactForm {
  name: string
  email: string
  phone: string
  service_id?: number
  message: string
  preferred_date?: string
  budget?: number
}