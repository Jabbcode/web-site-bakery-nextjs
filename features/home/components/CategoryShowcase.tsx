'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Category {
  id: string
  slug: string
  name_en: string
  name_es: string
  image: string | null
  _count?: {
    products: number
  }
}

interface CategoryShowcaseProps {
  locale: string
}

export function CategoryShowcase({ locale }: CategoryShowcaseProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.slice(0, 4)) // Show only first 4 categories
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 bg-cream">
        <div className="max-w-wide container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-wide container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-script text-3xl text-primary mb-2">Explore</p>
          <h2 className="text-h2 font-display text-dark mb-4">Our Categories</h2>
          <p className="text-body text-text max-w-2xl mx-auto">
            From classic favorites to innovative creations, find the perfect cake for every occasion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categoryName = locale === 'es' ? category.name_es : category.name_en

            return (
              <Link
                key={category.id}
                href={`/${locale}/shop?category=${category.slug}`}
                className="group relative overflow-hidden rounded-lg bg-white shadow-card hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={categoryName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-light flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-text"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-h5 font-display mb-2">{categoryName}</h3>
                  {category._count && (
                    <p className="text-sm opacity-90">
                      {category._count.products} {category._count.products === 1 ? 'product' : 'products'}
                    </p>
                  )}
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5 text-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
