'use client'

import { useEffect, useRef } from 'react'
import { X, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { CartItem } from './CartItem'
import { useCartStore } from '../store/cartStore'
import { useCurrencyStore } from '@/lib/stores/currencyStore'

export interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const router = useRouter()
  const drawerRef = useRef<HTMLDivElement>(null)

  const { items, updateQuantity, removeItem, getItemCount, getTotal } = useCartStore()
  const { currency } = useCurrencyStore()

  useOnClickOutside(drawerRef, () => {
    if (isOpen) {
      onClose()
    }
  })

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const itemCount = getItemCount()
  const total = getTotal(currency)

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  const handleViewCart = () => {
    onClose()
    router.push('/cart')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#241c10]/60 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'shadow-dropdown fixed top-0 right-0 z-50 h-full w-full bg-white transition-transform duration-300 sm:w-[420px]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dadada] px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#241c10]" />
            <h2 className="font-display text-[21px] font-semibold text-[#241c10]">
              Shopping Cart ({itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#63605a] transition-colors hover:text-[#241c10]"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-73px)] flex-col">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-[#dadada]" />
              <h3 className="font-display mb-2 text-[21px] font-medium text-[#241c10]">
                Your cart is empty
              </h3>
              <p className="font-body mb-6 text-[15px] text-[#63605a]">
                Add some products to get started
              </p>
              <Button variant="primary" size="md" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6">
                {items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    currency={currency}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-[#dadada] p-6">
                {/* Total */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-[18px] font-semibold text-[#241c10]">
                    Subtotal
                  </span>
                  <span className="font-display text-[21px] font-semibold text-[#241c10]">
                    {currency === 'USD' && '$'}
                    {currency === 'EUR' && '€'}
                    {currency === 'MXN' && '$'}
                    {total.toFixed(2)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
                    Checkout
                  </Button>
                  <Button variant="default" size="lg" fullWidth onClick={handleViewCart}>
                    View Cart
                  </Button>
                </div>

                {/* Notice */}
                <p className="font-body mt-4 text-center text-[13px] text-[#63605a]">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
