'use client'

import { useCartStore } from '../store/cartStore'
import { useCurrencyStore } from '@/lib/stores/currencyStore'
import type { CartItem } from '../store/cartStore'

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart, getItemCount, getTotal } =
    useCartStore()
  const { currency } = useCurrencyStore()

  const itemCount = getItemCount()
  const total = getTotal(currency)

  const addToCart = (item: CartItem) => {
    addItem(item)
  }

  const removeFromCart = (productId: string) => {
    removeItem(productId)
  }

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      updateQuantity(productId, quantity)
    }
  }

  const isInCart = (productId: string): boolean => {
    return items.some((item) => item.productId === productId)
  }

  const getItemQuantity = (productId: string): number => {
    const item = items.find((item) => item.productId === productId)
    return item?.quantity || 0
  }

  return {
    items,
    itemCount,
    total,
    currency,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }
}
