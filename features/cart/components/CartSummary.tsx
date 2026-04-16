'use client'

import { Button } from '@/components/atoms/Button'
import { ProductPrice } from '@/components/molecules/ProductPrice'
import { cn } from '@/lib/utils'

export interface CartSummaryProps {
  subtotal: number
  shipping?: number
  tax?: number
  total: number
  currency?: 'USD' | 'MXN' | 'EUR'
  itemCount: number
  onCheckout?: () => void
  isCheckoutDisabled?: boolean
  className?: string
}

export const CartSummary = ({
  subtotal,
  shipping = 0,
  tax = 0,
  total,
  currency = 'USD',
  itemCount,
  onCheckout,
  isCheckoutDisabled = false,
  className,
}: CartSummaryProps) => {
  const hasShipping = shipping > 0
  const hasTax = tax > 0

  return (
    <div className={cn('rounded border border-[#dadada] bg-white p-6', className)}>
      <h3 className="font-display mb-6 text-[21px] font-semibold text-[#241c10]">Cart Summary</h3>

      {/* Items Count */}
      <div className="mb-4 flex items-center justify-between border-b border-[#dadada] pb-4">
        <span className="font-body text-[15px] text-[#63605a]">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Subtotal */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-body text-[15px] text-[#63605a]">Subtotal</span>
        <ProductPrice price={subtotal} currency={currency} size="sm" />
      </div>

      {/* Shipping */}
      {hasShipping && (
        <div className="mb-3 flex items-center justify-between">
          <span className="font-body text-[15px] text-[#63605a]">Shipping</span>
          <ProductPrice price={shipping} currency={currency} size="sm" />
        </div>
      )}

      {/* Tax */}
      {hasTax && (
        <div className="mb-3 flex items-center justify-between">
          <span className="font-body text-[15px] text-[#63605a]">Tax</span>
          <ProductPrice price={tax} currency={currency} size="sm" />
        </div>
      )}

      {/* Total */}
      <div className="mb-6 flex items-center justify-between border-t border-[#dadada] pt-4">
        <span className="font-display text-[18px] font-semibold text-[#241c10]">Total</span>
        <ProductPrice price={total} currency={currency} size="md" />
      </div>

      {/* Checkout Button */}
      {onCheckout && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onCheckout}
          disabled={isCheckoutDisabled || itemCount === 0}
        >
          Proceed to Checkout
        </Button>
      )}

      {/* Free Shipping Notice */}
      {!hasShipping && (
        <p className="font-body mt-4 text-center text-[13px] text-[#63605a]">
          Free shipping on all orders
        </p>
      )}
    </div>
  )
}
