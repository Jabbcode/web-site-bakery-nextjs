'use client'

import { useParams } from 'next/navigation'
import { OrderHistory } from '@/features/orders/components/OrderHistory'

export default function OrdersPage() {
  const params = useParams()
  const locale = params.locale as string

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-h3 font-display text-dark">My Orders</h2>
        <p className="text-text mt-2">View and track all your orders</p>
      </div>
      <OrderHistory locale={locale} />
    </div>
  )
}
