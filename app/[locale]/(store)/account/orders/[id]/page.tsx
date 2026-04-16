'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { OrderDetails } from '@/features/orders/components/OrderDetails'
import { Order } from '@/features/orders/types'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'

export default function OrderDetailPage() {
  const params = useParams()
  const locale = params.locale as string
  const orderId = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/orders/${orderId}`)

        if (!response.ok) {
          throw new Error('Failed to fetch order')
        }

        const data = await response.json()
        setOrder(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-text">Loading order...</span>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 text-center">
        <h2 className="text-h4 font-display text-dark mb-2">Order Not Found</h2>
        <p className="text-text mb-6">
          {error || 'The order you are looking for does not exist.'}
        </p>
        <Link href={`/${locale}/account/orders`}>
          <Button variant="primary" size="md">
            Back to Orders
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link href={`/${locale}/account/orders`}>
          <Button variant="light" size="sm">
            ← Back to Orders
          </Button>
        </Link>
      </div>
      <OrderDetails order={order} locale={locale} />
    </div>
  )
}
