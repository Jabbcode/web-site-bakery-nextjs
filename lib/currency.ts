/**
 * Currency utilities for multi-currency support
 */

export type Currency = 'USD' | 'MXN' | 'EUR'

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  MXN: '$',
  EUR: '€',
}

export const CURRENCY_CODES: Record<Currency, string> = {
  USD: 'USD',
  MXN: 'MXN',
  EUR: 'EUR',
}

/**
 * Format price with currency symbol
 * @param amountInCents - Amount in cents
 * @param currency - Currency code (USD, MXN, EUR)
 * @returns Formatted price string
 */
export function formatPrice(amountInCents: number, currency: Currency): string {
  const amount = amountInCents / 100
  const symbol = CURRENCY_SYMBOLS[currency]

  // Format with thousands separator and 2 decimals
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  // EUR symbol goes after the number
  if (currency === 'EUR') {
    return `${formatted}${symbol}`
  }

  return `${symbol}${formatted}`
}

/**
 * Convert price between currencies
 * Note: These are approximate rates. In production, use a real-time exchange rate API
 */
interface ExchangeRates {
  [key: string]: {
    [key: string]: number
  }
}

const EXCHANGE_RATES: ExchangeRates = {
  USD: {
    USD: 1,
    MXN: 20,
    EUR: 0.92,
  },
  MXN: {
    USD: 0.05,
    MXN: 1,
    EUR: 0.046,
  },
  EUR: {
    USD: 1.09,
    MXN: 21.74,
    EUR: 1,
  },
}

/**
 * Convert amount from one currency to another
 * @param amount - Amount in cents
 * @param from - Source currency
 * @param to - Target currency
 * @returns Converted amount in cents
 */
export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount

  const fromRates = EXCHANGE_RATES[from]
  if (!fromRates) {
    throw new Error(`Conversion rate not found for ${from}`)
  }

  const rate = fromRates[to]
  if (!rate) {
    throw new Error(`Conversion rate not found for ${from} to ${to}`)
  }

  return Math.round(amount * rate)
}
