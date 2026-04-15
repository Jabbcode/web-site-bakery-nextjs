import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia',
  typescript: true,
})

/**
 * Supported currencies
 */
export const SUPPORTED_CURRENCIES = {
  USD: 'usd',
  MXN: 'mxn',
  EUR: 'eur',
} as const

export type SupportedCurrency = keyof typeof SUPPORTED_CURRENCIES

/**
 * Currency conversion rates (base: USD)
 * In production, these should come from a currency API
 */
export const CURRENCY_RATES: Record<SupportedCurrency, number> = {
  USD: 1,
  MXN: 20.0, // 1 USD = 20 MXN (approximate)
  EUR: 0.93, // 1 USD = 0.93 EUR (approximate)
}

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  from: SupportedCurrency,
  to: SupportedCurrency
): number {
  if (from === to) return amount

  // Convert to USD first, then to target currency
  const amountInUSD = amount / CURRENCY_RATES[from]
  return Math.round(amountInUSD * CURRENCY_RATES[to])
}

/**
 * Create a payment intent
 */
export async function createPaymentIntent(
  amount: number,
  currency: SupportedCurrency,
  metadata?: Stripe.MetadataParam
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount,
    currency: SUPPORTED_CURRENCIES[currency],
    automatic_payment_methods: {
      enabled: true,
    },
    metadata,
  })
}

/**
 * Retrieve a payment intent
 */
export async function retrievePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.retrieve(paymentIntentId)
}

/**
 * Update a payment intent
 */
export async function updatePaymentIntent(
  paymentIntentId: string,
  params: Stripe.PaymentIntentUpdateParams
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.update(paymentIntentId, params)
}

/**
 * Cancel a payment intent
 */
export async function cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.cancel(paymentIntentId)
}

/**
 * Create a refund
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number
): Promise<Stripe.Refund> {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
  })
}
