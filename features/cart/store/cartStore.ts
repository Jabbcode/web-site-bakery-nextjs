import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  productName: string
  productSlug: string
  productImage: string | null
  quantity: number
  priceUSD: number
  priceMXN: number
  priceEUR: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getTotal: (currency: 'USD' | 'MXN' | 'EUR') => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === item.productId)

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            }
          }

          // Add new item
          return { items: [...state.items, item] }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotal: (currency) => {
        const state = get()
        return state.items.reduce((total, item) => {
          const price =
            currency === 'USD' ? item.priceUSD : currency === 'MXN' ? item.priceMXN : item.priceEUR
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
