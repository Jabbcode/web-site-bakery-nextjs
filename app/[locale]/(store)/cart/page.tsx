'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/organisms/Breadcrumb'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { CartItem } from '@/features/cart/components/CartItem'
import { CartSummary } from '@/features/cart/components/CartSummary'
import { useCartStore } from '@/features/cart/store/cartStore'
import { useCurrencyStore } from '@/lib/stores/currencyStore'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getItemCount, getTotal } = useCartStore()
  const { currency } = useCurrencyStore()

  const itemCount = getItemCount()
  const subtotal = getTotal(currency)
  const shipping = 0 // Free shipping
  const tax = 0 // Will be calculated at checkout
  const total = subtotal + shipping + tax

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
  ]

  const handleCheckout = () => {
    router.push('/checkout')
  }

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
            Shopping Cart
          </Heading>
          <p className="font-body text-[15px] text-[#63605a]">
            {itemCount === 0
              ? 'Your cart is empty'
              : `You have ${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-wide container mx-auto px-4">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-6 h-24 w-24 text-[#dadada]" />
              <Heading as="h2" className="mb-4">
                Your cart is empty
              </Heading>
              <p className="font-body mb-8 text-[15px] text-[#63605a]">
                Looks like you haven&apos;t added anything to your cart yet
              </p>
              <Link href="/shop">
                <Button variant="primary" size="lg" icon={<ArrowLeft className="h-5 w-5" />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            /* Cart Content */
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              {/* Cart Items */}
              <div>
                {/* Continue Shopping Link */}
                <Link
                  href="/shop"
                  className="font-body mb-6 inline-flex items-center gap-2 text-[15px] text-[#63605a] transition-colors hover:text-[#241c10]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>

                {/* Items List */}
                <div className="rounded border border-[#dadada] bg-white">
                  <div className="border-b border-[#dadada] px-6 py-4">
                    <h2 className="font-display text-[21px] font-semibold text-[#241c10]">
                      Cart Items ({itemCount})
                    </h2>
                  </div>
                  <div className="px-6">
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
                </div>
              </div>

              {/* Cart Summary */}
              <div>
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  currency={currency}
                  itemCount={itemCount}
                  onCheckout={handleCheckout}
                  className="sticky top-24"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
