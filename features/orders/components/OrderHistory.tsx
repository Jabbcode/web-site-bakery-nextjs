'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Order } from '../types'
import { OrderStatusBadge, PaymentStatusBadge } from './OrderStatusBadge'
import { formatPrice } from '@/lib/currency'
import { Button } from '@/components/atoms/Button'

interface OrderHistoryProps {
  locale: string
}

export function OrderHistory({ locale }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/orders?page=${currentPage}&limit=10`)

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        setOrders(data.orders)
        setTotalPages(data.pagination.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [currentPage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-text">Loading orders...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-text"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h3 className="mt-4 text-h5 font-display text-dark">No orders yet</h3>
        <p className="mt-2 text-text">Start shopping to create your first order!</p>
        <div className="mt-6">
          <Link href={`/${locale}/shop`}>
            <Button variant="primary" size="md">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const currency = order.currency as 'USD' | 'MXN' | 'EUR'
          const orderDate = new Date(order.createdAt).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          return (
            <div
              key={order.id}
              className="bg-white border border-border rounded-lg p-4 sm:p-6 hover:shadow-card transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <Link
                    href={`/${locale}/account/orders/${order.id}`}
                    className="text-h6 font-display text-dark hover:text-primary transition-colors"
                  >
                    Order #{order.orderNumber}
                  </Link>
                  <p className="text-sm text-text mt-1">{orderDate}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  <OrderStatusBadge status={order.orderStatus} />
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="border-t border-border pt-4 mb-4">
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => {
                    const productName =
                      locale === 'es' ? item.productName_es : item.productName_en
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-text">
                          {productName} × {item.quantity}
                        </span>
                        <span className="text-dark font-medium">
                          {formatPrice(item.totalPrice, currency)}
                        </span>
                      </div>
                    )
                  })}
                  {order.items.length > 2 && (
                    <p className="text-sm text-text">
                      +{order.items.length - 2} more item
                      {order.items.length - 2 > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-border pt-4">
                <div className="mb-3 sm:mb-0">
                  <p className="text-sm text-text">Total</p>
                  <p className="text-h6 font-display text-dark">
                    {formatPrice(order.total, currency)}
                  </p>
                </div>
                <Link href={`/${locale}/account/orders/${order.id}`}>
                  <Button variant="light" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <Button
            variant="light"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-text">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="light"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
