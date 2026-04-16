'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { useCartStore } from '../store/cartStore'
import type { CartItem } from '../store/cartStore'

export interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    slug: string
    image: string | null
    priceUSD: number
    priceMXN: number
    priceEUR: number
  }
  quantity?: number
  variant?: 'primary' | 'default' | 'secondary' | 'light' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  onAdded?: () => void
  className?: string
}

export const AddToCartButton = ({
  product,
  quantity = 1,
  variant = 'primary',
  size = 'lg',
  fullWidth,
  disabled,
  onAdded,
  className,
}: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Create cart item
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.image,
      quantity,
      priceUSD: product.priceUSD,
      priceMXN: product.priceMXN,
      priceEUR: product.priceEUR,
    }

    // Add to cart
    addItem(cartItem)

    // Show success state
    setJustAdded(true)
    setIsAdding(false)

    // Call callback
    if (onAdded) {
      onAdded()
    }

    // Reset success state after 2 seconds
    setTimeout(() => {
      setJustAdded(false)
    }, 2000)
  }

  return (
    <Button
      variant={justAdded ? 'secondary' : variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isAdding}
      isLoading={isAdding}
      onClick={handleAddToCart}
      icon={justAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
      className={className}
    >
      {justAdded ? 'Added to Cart' : 'Add to Cart'}
    </Button>
  )
}
