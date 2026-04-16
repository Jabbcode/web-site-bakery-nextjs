'use client'

import { useCartStore, CartItem } from '@/features/cart/store/cartStore'
import { formatPrice } from '@/lib/currency'
import Image from 'next/image'

interface OrderSummaryProps {
  currency: 'USD' | 'MXN' | 'EUR'
  className?: string
}

export function OrderSummary({ currency, className = '' }: OrderSummaryProps) {
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)

  const subtotal = getTotal(currency)
  const shipping = 0 // Free shipping
  const tax = Math.round(subtotal * 0.16) // 16% IVA for Mexico
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className={`bg-light p-6 rounded-lg ${className}`}>
        <h2 className="text-h5 font-display mb-4">Order Summary</h2>
        <p className="text-text">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className={`bg-light p-6 rounded-lg ${className}`}>
      <h2 className="text-h5 font-display mb-4">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item: CartItem) => {
          const price =
            currency === 'USD'
              ? item.priceUSD
              : currency === 'MXN'
                ? item.priceMXN
                : item.priceEUR
          const itemTotal = price * item.quantity

          return (
            <div key={item.productId} className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="relative w-16 h-16 flex-shrink-0 bg-cream rounded overflow-hidden">
                {item.productImage && (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-dark truncate">{item.productName}</h4>
                <p className="text-sm text-text">Qty: {item.quantity}</p>
              </div>

              {/* Price */}
              <div className="text-sm font-medium text-dark">
                {formatPrice(itemTotal, currency)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border my-4" />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-body">
          <span className="text-text">Subtotal</span>
          <span className="text-dark">{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-body">
          <span className="text-text">Shipping</span>
          <span className="text-dark">{shipping === 0 ? 'Free' : formatPrice(shipping, currency)}</span>
        </div>
        <div className="flex justify-between text-body">
          <span className="text-text">Tax (16%)</span>
          <span className="text-dark">{formatPrice(tax, currency)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border my-4" />

      {/* Total */}
      <div className="flex justify-between text-h6 font-display">
        <span>Total</span>
        <span>{formatPrice(total, currency)}</span>
      </div>
    </div>
  )
}
