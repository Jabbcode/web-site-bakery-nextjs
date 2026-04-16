'use client'

import { ProductCard, type ProductCardProps } from '../ProductCard'
import { Pagination } from '@/components/molecules/Pagination'
import { Spinner } from '@/components/atoms/Spinner'
import { cn } from '@/lib/utils'

export interface ProductGridProps {
  products: ProductCardProps[]
  isLoading?: boolean
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onAddToCart?: (productId: string) => void
  onQuickView?: (productId: string) => void
  emptyMessage?: string
  columns?: 2 | 3 | 4
  className?: string
}

export const ProductGrid = ({
  products,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onAddToCart,
  onQuickView,
  emptyMessage = 'No products found',
  columns = 3,
  className,
}: ProductGridProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={cn('flex min-h-[400px] items-center justify-center', className)}>
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="font-body text-[15px] text-[#63605a]">Loading products...</p>
        </div>
      </div>
    )
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className={cn('flex min-h-[400px] items-center justify-center', className)}>
        <div className="text-center">
          <p className="font-display text-[27px] font-medium text-[#241c10]">{emptyMessage}</p>
          <p className="font-body mt-2 text-[15px] text-[#63605a]">
            Try adjusting your filters or search query
          </p>
        </div>
      </div>
    )
  }

  const gridColumns = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={className}>
      {/* Products Grid */}
      <div className={cn('grid gap-6', gridColumns[columns])}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}
