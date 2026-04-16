'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/organisms/ProductCard'
import { Button } from '@/components/atoms/Button'

interface Product {
  id: string
  slug: string
  name_en: string
  name_es: string
  priceUSD: number
  priceMXN: number
  priceEUR: number
  discountedPriceUSD: number | null
  discountedPriceMXN: number | null
  discountedPriceEUR: number | null
  images: Array<{ url: string; alt_en: string | null }>
  isFeatured: boolean
  isNew: boolean
  stock: number
  averageRating?: number
}

interface FeaturedProductsProps {
  locale: string
  currency: 'USD' | 'MXN' | 'EUR'
}

export function FeaturedProducts({ locale, currency }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products?featured=true&limit=6')
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-wide container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-wide container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-script text-3xl text-primary mb-2">Handcrafted with Love</p>
          <h2 className="text-h2 font-display text-dark mb-4">Featured Products</h2>
          <p className="text-body text-text max-w-2xl mx-auto">
            Discover our most popular and beloved cakes, handcrafted with premium ingredients
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={locale === 'es' ? product.name_es : product.name_en}
              image={product.images[0]?.url || '/images/placeholder.png'}
              price={currency === 'USD' ? product.priceUSD : currency === 'MXN' ? product.priceMXN : product.priceEUR}
              originalPrice={
                currency === 'USD'
                  ? product.discountedPriceUSD ? product.priceUSD : undefined
                  : currency === 'MXN'
                  ? product.discountedPriceMXN ? product.priceMXN : undefined
                  : product.discountedPriceEUR ? product.priceEUR : undefined
              }
              currency={currency}
              rating={product.averageRating}
              isNew={product.isNew}
              isFeatured={product.isFeatured}
              inStock={product.stock > 0}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href={`/${locale}/shop`}>
            <Button variant="primary" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
