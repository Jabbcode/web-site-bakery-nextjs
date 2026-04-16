'use client'

import { ProductCard, type ProductCardProps } from '@/components/organisms/ProductCard'
import { Spinner } from '@/components/atoms/Spinner'
import { cn } from '@/lib/utils'

export interface RelatedProductsProps {
  products: ProductCardProps[]
  isLoading?: boolean
  title?: string
  columns?: 2 | 3 | 4
  onAddToCart?: (productId: string) => void
  onQuickView?: (productId: string) => void
  className?: string
}

export const RelatedProducts = ({
  products,
  isLoading = false,
  title = 'Related Products',
  columns = 4,
  onAddToCart,
  onQuickView,
  className,
}: RelatedProductsProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={cn('py-12', className)}>
        <div className="max-w-wide container mx-auto px-4">
          <h2 className="font-display mb-8 text-center text-[33px] font-medium text-[#241c10]">
            {title}
          </h2>
          <div className="flex min-h-[300px] items-center justify-center">
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (products.length === 0) {
    return null
  }

  const gridColumns = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <section className={cn('py-12', className)}>
      <div className="max-w-wide container mx-auto px-4">
        {/* Section Title */}
        <h2 className="font-display mb-8 text-center text-[33px] font-medium text-[#241c10]">
          {title}
        </h2>

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
      </div>
    </section>
  )
}
