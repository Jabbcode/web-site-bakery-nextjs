'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/atoms/Button'

interface Category {
  id: string
  name_en: string
  name_es: string
  slug: string
  isActive: boolean
  sortOrder: number
  _count?: {
    products: number
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data || [])
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
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display text-dark">Categories</h2>
          <p className="text-text mt-2">Manage product categories</p>
        </div>
        <Button variant="primary" size="md">
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-dark">{category.name_en}</h3>
                <p className="text-sm text-text">{category.slug}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  category.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="text-sm text-text mb-4">
              <p>Spanish: {category.name_es}</p>
              <p>Products: {category._count?.products || 0}</p>
              <p>Sort Order: {category.sortOrder}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="light" size="sm">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <p className="text-text">No categories found</p>
        </div>
      )}
    </div>
  )
}
