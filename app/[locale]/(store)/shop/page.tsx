'use client'

import { useProducts } from '@/features/products/api/queries'
import { useProductFilters } from '@/features/products/hooks'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { ProductFilters, ProductSort, type FilterOption } from '@/features/products/components'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Breadcrumb } from '@/components/organisms/Breadcrumb'
import { Heading } from '@/components/atoms/Heading'
import { useDebounce } from '@/hooks/useDebounce'

// Mock data for filters (en producción vendrían de la API)
const categories: FilterOption[] = [
  { value: 'chocolate-cakes', label: 'Chocolate Cakes', count: 12 },
  { value: 'fruit-cakes', label: 'Fruit Cakes', count: 8 },
  { value: 'cream-cakes', label: 'Cream Cakes', count: 15 },
  { value: 'wedding-cakes', label: 'Wedding Cakes', count: 6 },
  { value: 'birthday-cakes', label: 'Birthday Cakes', count: 20 },
]

const priceRanges: FilterOption[] = [
  { value: '0-2000', label: '$0 - $20', count: 15 },
  { value: '2000-4000', label: '$20 - $40', count: 25 },
  { value: '4000-6000', label: '$40 - $60', count: 12 },
  { value: '6000-10000', label: '$60 - $100', count: 9 },
  { value: '10000+', label: '$100+', count: 4 },
]

export default function ShopPage() {
  const filters = useProductFilters()
  const debouncedSearch = useDebounce(filters.search, 500)

  // Parse sort value to API format
  const getSortParams = () => {
    switch (filters.sortBy) {
      case 'newest':
        return { sortBy: 'createdAt' as const, sortOrder: 'desc' as const }
      case 'price-asc':
        return { sortBy: 'price' as const, sortOrder: 'asc' as const }
      case 'price-desc':
        return { sortBy: 'price' as const, sortOrder: 'desc' as const }
      case 'name-asc':
        return { sortBy: 'name' as const, sortOrder: 'asc' as const }
      case 'name-desc':
        return { sortBy: 'name' as const, sortOrder: 'desc' as const }
      default:
        return { sortBy: 'createdAt' as const, sortOrder: 'desc' as const }
    }
  }

  const sortParams = getSortParams()

  // Fetch products with React Query
  const { data, isLoading } = useProducts({
    page: filters.page,
    limit: 12,
    category: filters.category,
    featured: filters.featured || undefined,
    new: filters.new || undefined,
    search: debouncedSearch,
    ...sortParams,
  })

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
  ]

  return (
    <div className="min-h-screen bg-[#fcf8ed]">
      {/* Breadcrumb */}
      <div className="border-b border-[#dadada] bg-white py-6">
        <div className="max-w-wide container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-[#dadada] bg-white py-12">
        <div className="max-w-wide container mx-auto px-4 text-center">
          <Heading as="h1" className="mb-4">
            Our Products
          </Heading>
          <p className="font-body text-[15px] text-[#63605a]">
            Discover our delicious selection of handcrafted cakes and pastries
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-wide container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Sidebar - Filters */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <ProductFilters
                categories={categories}
                priceRanges={priceRanges}
                selectedCategory={filters.category}
                selectedPriceRange={filters.priceRange}
                showFeatured={filters.featured}
                showNew={filters.new}
                onCategoryChange={filters.setCategory}
                onPriceRangeChange={filters.setPriceRange}
                onFeaturedChange={filters.setFeatured}
                onNewChange={filters.setNew}
                onClearAll={filters.clearAll}
              />
            </aside>

            {/* Main Content */}
            <main>
              {/* Toolbar */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search Bar */}
                <div className="flex-1 sm:max-w-md">
                  <SearchBar
                    value={filters.search || ''}
                    onChange={(e) => filters.setSearch(e.target.value || undefined)}
                    placeholder="Search products..."
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-4">
                  {data && (
                    <p className="font-body text-[15px] text-[#63605a]">
                      Showing {data.products.length} of {data.pagination.total} products
                    </p>
                  )}
                  <ProductSort
                    value={filters.sortBy}
                    onChange={(value) =>
                      filters.setSortBy(
                        value as
                          | 'newest'
                          | 'price-asc'
                          | 'price-desc'
                          | 'name-asc'
                          | 'name-desc'
                          | 'popular'
                      )
                    }
                  />
                </div>
              </div>

              {/* Products Grid */}
              <ProductGrid
                products={
                  data?.products.map((product) => ({
                    id: product.id,
                    slug: product.slug,
                    name: product.name_en, // TODO: use locale
                    image: product.images[0]?.url || '/images/placeholder.png',
                    price: product.discountedPriceUSD || product.priceUSD,
                    originalPrice:
                      product.discountedPriceUSD && product.discountedPriceUSD < product.priceUSD
                        ? product.priceUSD
                        : undefined,
                    rating: product.averageRating,
                    reviewCount: product.reviewCount,
                    isNew: product.isNew,
                    isFeatured: product.isFeatured,
                    inStock: product.stock > 0,
                  })) || []
                }
                isLoading={isLoading}
                currentPage={filters.page}
                totalPages={data?.pagination.totalPages || 1}
                onPageChange={filters.setPage}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onQuickView={(id) => console.log('Quick view:', id)}
                emptyMessage={
                  filters.hasActiveFilters
                    ? 'No products match your filters'
                    : 'No products available'
                }
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
