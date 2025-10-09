export interface Service {
  id: number
  name: string
  description: string
  icon: string
  category_id: number
}

export interface ServiceCategory {
  id: number
  name: string
  slug: string
  services: Service[]
}
