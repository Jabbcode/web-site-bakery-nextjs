'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/atoms/Badge'
import { StarRating } from '@/components/molecules/StarRating'
import { ProductPrice } from '@/components/molecules/ProductPrice'

export interface ProductCardProps {
  id: string
  slug: string
  name: string
  image: string
  imageAlt?: string
  price: number
  originalPrice?: number
  currency?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isFeatured?: boolean
  inStock?: boolean
  onAddToCart?: (productId: string) => void
  onQuickView?: (productId: string) => void
  className?: string
}

export const ProductCard = ({
  id,
  slug,
  name,
  image,
  imageAlt,
  price,
  originalPrice,
  currency = 'USD',
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isFeatured = false,
  inStock = true,
  onAddToCart,
  onQuickView,
  className,
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onAddToCart) {
      onAddToCart(id)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onQuickView) {
      onQuickView(id)
    }
  }

  return (
    <Link
      href={`/shop/${slug}`}
      className={cn(
        'group relative block overflow-hidden bg-white transition-shadow duration-300',
        'hover:shadow-card',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#fcf8ed]">
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isNew && <Badge variant="new">New</Badge>}
          {isFeatured && <Badge variant="hot">Hot</Badge>}
          {!inStock && <Badge variant="default">Out of Stock</Badge>}
        </div>

        {/* Quick Actions */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center gap-2 bg-[#241c10]/60 opacity-0 transition-opacity duration-300',
            'group-hover:opacity-100'
          )}
        >
          {inStock && onAddToCart && (
            <button
              type="button"
              onClick={handleAddToCart}
              className={cn(
                'flex h-12 w-12 items-center justify-center bg-white text-[#241c10] transition-colors',
                'hover:bg-[#ee2852] hover:text-white',
                'focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#241c10] focus:outline-none'
              )}
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}

          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickView}
              className={cn(
                'flex h-12 w-12 items-center justify-center bg-white text-[#241c10] transition-colors',
                'hover:bg-[#ee2852] hover:text-white',
                'focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#241c10] focus:outline-none'
              )}
              aria-label={`Quick view ${name}`}
            >
              <Eye className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-display mb-2 text-[18px] font-medium text-[#241c10] transition-colors group-hover:text-[#ee2852]">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="mb-2 flex items-center gap-2">
            <StarRating rating={rating} size="sm" />
            {reviewCount > 0 && (
              <span className="font-body text-[13px] text-[#63605a]">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <ProductPrice
          price={price}
          originalPrice={originalPrice}
          currency={currency}
          size="md"
        />

        {/* Out of Stock Message */}
        {!inStock && (
          <p className="font-body mt-2 text-[13px] font-medium text-[#ee2852]">Out of Stock</p>
        )}
      </div>
    </Link>
  )
}
