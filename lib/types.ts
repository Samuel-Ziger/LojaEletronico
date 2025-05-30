export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  original_price: number | null
  sku: string | null
  stock_quantity: number
  category_id: number
  brand: string | null
  rating: number
  review_count: number
  is_featured: boolean
  is_active: boolean
  weight: number | null
  dimensions: any | null
  image_url: string | null
  badge: string | null
  created_at: string
  updated_at: string
  category?: Category
}
