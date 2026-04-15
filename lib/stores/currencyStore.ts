import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'USD' | 'MXN' | 'EUR'

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  MXN: '$',
  EUR: '€',
}

export const CURRENCY_NAMES: Record<Currency, string> = {
  USD: 'US Dollar',
  MXN: 'Mexican Peso',
  EUR: 'Euro',
}

interface CurrencyState {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (priceUSD: number, priceMXN: number, priceEUR: number) => string
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'MXN', // Default currency

      setCurrency: (currency) => set({ currency }),

      formatPrice: (priceUSD, priceMXN, priceEUR) => {
        const { currency } = get()
        const price = currency === 'USD' ? priceUSD : currency === 'MXN' ? priceMXN : priceEUR

        // Convert from cents to dollars/pesos/euros
        const amount = price / 100

        const locale = currency === 'USD' ? 'en-US' : currency === 'MXN' ? 'es-MX' : 'de-DE'

        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
        }).format(amount)
      },
    }),
    {
      name: 'currency-storage',
    }
  )
)
