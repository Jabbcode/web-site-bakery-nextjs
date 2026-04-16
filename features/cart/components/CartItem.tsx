'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { QuantitySelector } from '@/components/molecules/QuantitySelector'
import { ProductPrice } from '@/components/molecules/ProductPrice'
import { cn } from '@/lib/utils'
import type { CartItem as CartItemType } from '../store/cartStore'

export interface CartItemProps {
  item: CartItemType
  currency?: 'USD' | 'MXN' | 'EUR'
  onUpdateQuantity?: (productId: string, quantity: number) => void
  onRemove?: (productId: string) => void
  className?: string
}

export const CartItem = ({
  item,
  currency = 'USD',
  onUpdateQuantity,
  onRemove,
  className,
}: CartItemProps) => {
  const price =
    currency === 'USD' ? item.priceUSD : currency === 'MXN' ? item.priceMXN : item.priceEUR
  const total = price * item.quantity

  const handleQuantityChange = (newQuantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.productId, newQuantity)
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.productId)
    }
  }

  return (
    <div className={cn('flex gap-4 border-b border-[#dadada] py-6', className)}>
      {/* Product Image */}
      <Link href={`/shop/${item.productSlug}`} className="relative h-24 w-24 flex-shrink-0">
        {item.productImage ? (
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#fafafa]">
            <span className="font-body text-sm text-[#63605a]">No image</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        {/* Name and Remove */}
        <div className="mb-2 flex items-start justify-between gap-4">
          <Link
            href={`/shop/${item.productSlug}`}
            className="font-display text-[18px] font-medium text-[#241c10] transition-colors hover:text-[#ee2852]"
          >
            {item.productName}
          </Link>

          {onRemove && (
            <button
              type="button"
              onClick={handleRemove}
              className="flex-shrink-0 text-[#63605a] transition-colors hover:text-[#ee2852]"
              aria-label={`Remove ${item.productName} from cart`}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <ProductPrice price={price} currency={currency} size="sm" />
        </div>

        {/* Quantity and Total */}
        <div className="mt-auto flex items-center justify-between gap-4">
          {onUpdateQuantity ? (
            <QuantitySelector
              value={item.quantity}
              onChange={handleQuantityChange}
              min={1}
              max={99}
              size="sm"
            />
          ) : (
            <span className="font-body text-[15px] text-[#63605a]">Qty: {item.quantity}</span>
          )}

          <div className="text-right">
            <span className="font-body text-sm text-[#63605a]">Subtotal:</span>
            <ProductPrice price={total} currency={currency} size="sm" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
