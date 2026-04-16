'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const priceVariants = cva('font-display font-medium', {
  variants: {
    size: {
      sm: 'text-[21px] leading-[1.14em]', // h6
      md: 'text-[27px] leading-[1.04em]', // h5
      lg: 'text-[33px] leading-[1.03em]', // h4
    },
    variant: {
      default: 'text-[#241c10]',
      accent: 'text-[#ee2852]',
      primary: 'text-[#988779]',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface ProductPriceProps extends VariantProps<typeof priceVariants> {
  price: number
  originalPrice?: number
  currency?: string
  className?: string
  showCurrency?: boolean
  discountBadge?: boolean
}

const formatPrice = (price: number, currency: string = 'USD'): string => {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    MXN: '$',
  }

  const symbol = currencySymbols[currency] || currency
  return `${symbol}${price.toFixed(2)}`
}

const calculateDiscount = (original: number, current: number): number => {
  return Math.round(((original - current) / original) * 100)
}

export const ProductPrice = ({
  price,
  originalPrice,
  currency = 'USD',
  size,
  variant,
  className,
  showCurrency = true,
  discountBadge = false,
}: ProductPriceProps) => {
  const hasDiscount = originalPrice !== undefined && originalPrice > price
  const discountPercentage = hasDiscount ? calculateDiscount(originalPrice, price) : 0

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className={cn(priceVariants({ size, variant: hasDiscount ? 'accent' : variant }))}>
        {showCurrency ? formatPrice(price, currency) : price.toFixed(2)}
      </span>

      {hasDiscount && (
        <>
          <span
            className={cn(
              'font-display font-medium text-[#63605a] line-through',
              size === 'sm' && 'text-[18px]',
              size === 'md' && 'text-[21px]',
              size === 'lg' && 'text-[27px]'
            )}
          >
            {showCurrency ? formatPrice(originalPrice, currency) : originalPrice.toFixed(2)}
          </span>

          {discountBadge && (
            <span className="font-body rounded bg-[#ee2852] px-2 py-1 text-xs font-medium tracking-wider text-white uppercase">
              -{discountPercentage}%
            </span>
          )}
        </>
      )}
    </div>
  )
}
