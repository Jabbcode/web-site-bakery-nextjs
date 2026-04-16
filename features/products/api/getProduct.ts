export interface ProductDetail {
  id: string
  slug: string
  sku: string | null
  name_es: string
  name_en: string
  description_es: string | null
  description_en: string | null
  priceUSD: number
  priceMXN: number | null
  priceEUR: number | null
  discountPercent: number | null
  discountedPriceUSD: number | null
  discountedPriceMXN: number | null
  discountedPriceEUR: number | null
  stock: number
  weight: number | null
  servings: number | null
  preparationTime: number | null
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
    sortOrder: number
  }[]
  reviews: {
    id: string
    rating: number
    title: string | null
    comment: string
    createdAt: string
    user: {
      firstName: string | null
      lastName: string | null
    }
  }[]
  averageRating: number
  reviewCount: number
}

export async function getProduct(slug: string): Promise<ProductDetail> {
  const response = await fetch(`/api/products/${slug}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found')
    }
    throw new Error('Failed to fetch product')
  }

  return response.json()
}
