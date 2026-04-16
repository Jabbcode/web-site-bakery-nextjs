export interface GetProductsParams {
  page?: number
  limit?: number
  category?: string
  featured?: boolean
  new?: boolean
  search?: string
  sortBy?: 'createdAt' | 'price' | 'name'
  sortOrder?: 'asc' | 'desc'
}

export interface ProductListItem {
  id: string
  slug: string
  name_es: string
  name_en: string
  description_es: string | null
  description_en: string | null
  priceUSD: number
  priceMXN: number | null
  priceEUR: number | null
  discountPercent: number | null
  discountedPriceUSD: number | null
  stock: number
  isFeatured: boolean
  isNew: boolean
  category: {
    id: string
    slug: string
    name_es: string
    name_en: string
  }
  images: {
    id: string
    url: string
    alt_es: string | null
    alt_en: string | null
  }[]
  averageRating: number
  reviewCount: number
}

export interface GetProductsResponse {
  products: ProductListItem[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function getProducts(params: GetProductsParams = {}): Promise<GetProductsResponse> {
  const searchParams = new URLSearchParams()

  if (params.page) searchParams.set('page', params.page.toString())
  if (params.limit) searchParams.set('limit', params.limit.toString())
  if (params.category) searchParams.set('category', params.category)
  if (params.featured) searchParams.set('featured', 'true')
  if (params.new) searchParams.set('new', 'true')
  if (params.search) searchParams.set('search', params.search)
  if (params.sortBy) searchParams.set('sortBy', params.sortBy)
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)

  const response = await fetch(`/api/products?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}
