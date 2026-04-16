export interface CheckoutStep {
  id: number
  name: string
  name_es: string
  name_en: string
}

export const CHECKOUT_STEPS: CheckoutStep[] = [
  { id: 1, name: 'information', name_es: 'Información', name_en: 'Information' },
  { id: 2, name: 'payment', name_es: 'Pago', name_en: 'Payment' },
  { id: 3, name: 'confirmation', name_es: 'Confirmación', name_en: 'Confirmation' },
]

export interface OrderSummaryData {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: 'USD' | 'MXN' | 'EUR'
}
