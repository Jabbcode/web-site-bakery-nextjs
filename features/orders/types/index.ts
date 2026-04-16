import { OrderStatus, PaymentStatus } from '@/lib/generated/prisma'

export interface OrderItem {
  id: string
  productName_es: string
  productName_en: string
  productSlug: string
  productImage: string | null
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  orderNumber: string
  email: string
  firstName: string
  lastName: string
  phone: string | null
  shippingStreet: string
  shippingCity: string
  shippingState: string | null
  shippingZip: string
  shippingCountry: string
  billingStreet: string | null
  billingCity: string | null
  billingState: string | null
  billingZip: string | null
  billingCountry: string | null
  currency: string
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  orderStatus: OrderStatus
  paymentStatus: PaymentStatus
  customerNotes: string | null
  trackingNumber: string | null
  createdAt: string
  items: OrderItem[]
}

export interface OrdersResponse {
  orders: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
