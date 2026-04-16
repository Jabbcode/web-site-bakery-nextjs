'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { formatPrice } from '@/lib/currency'
import { useParams } from 'next/navigation'

interface OrderData {
  id: string
  orderNumber: string
  email: string
  firstName: string
  lastName: string
  total: number
  currency: string
  createdAt: string
  items: Array<{
    productName_en: string
    productName_es: string
    quantity: number
    totalPrice: number
  }>
}

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params.locale as string
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      router.push(`/${locale}/shop`)
      return
    }

    // Fetch order details
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order')
        }
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order:', error)
        // Redirect to shop if order not found
        router.push(`/${locale}/shop`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router, locale])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  const currency = order.currency as 'USD' | 'MXN' | 'EUR'

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-h2 font-display text-dark mb-2">Order Confirmed!</h1>
          <p className="text-body text-text">
            Thank you for your order. We&apos;ve sent a confirmation email to{' '}
            <span className="font-medium">{order.email}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-card p-6 sm:p-8 mb-6">
          <div className="border-b border-border pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-h5 font-display text-dark mb-1">Order #{order.orderNumber}</h2>
                <p className="text-sm text-text">
                  {new Date(order.createdAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text mb-1">Total</p>
                <p className="text-h5 font-display text-dark">
                  {formatPrice(order.total, currency)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="text-h6 font-display text-dark">Order Items</h3>
            {order.items.map((item, index) => {
              const productName = locale === 'es' ? item.productName_es : item.productName_en
              return (
                <div key={index} className="flex justify-between items-start py-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-dark">{productName}</p>
                    <p className="text-sm text-text">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-dark">
                      {formatPrice(item.totalPrice, currency)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Shipping Address */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-h6 font-display text-dark mb-3">Shipping Address</h3>
            <p className="text-body text-text">
              {order.firstName} {order.lastName}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/account/orders/${order.id}`}>
            <Button variant="primary" size="lg">
              View Order Details
            </Button>
          </Link>
          <Link href={`/${locale}/shop`}>
            <Button variant="light" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
