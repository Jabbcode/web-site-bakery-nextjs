'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Order } from '../types'
import { OrderStatusBadge, PaymentStatusBadge } from './OrderStatusBadge'
import { formatPrice } from '@/lib/currency'

interface OrderDetailsProps {
  order: Order
  locale: string
}

export function OrderDetails({ order, locale }: OrderDetailsProps) {
  const currency = order.currency as 'USD' | 'MXN' | 'EUR'
  const orderDate = new Date(order.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
          <div>
            <h2 className="text-h4 font-display text-dark mb-2">
              Order #{order.orderNumber}
            </h2>
            <p className="text-sm text-text">{orderDate}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <OrderStatusBadge status={order.orderStatus} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
        </div>

        {/* Tracking Number */}
        {order.trackingNumber && (
          <div className="bg-light p-4 rounded-lg">
            <p className="text-sm text-text mb-1">Tracking Number</p>
            <p className="font-medium text-dark">{order.trackingNumber}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-h5 font-display text-dark mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => {
            const productName = locale === 'es' ? item.productName_es : item.productName_en

            return (
              <div key={item.id} className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-cream rounded overflow-hidden">
                  {item.productImage && (
                    <Image
                      src={item.productImage}
                      alt={productName}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${locale}/shop/${item.productSlug}`}
                    className="font-medium text-dark hover:text-primary transition-colors"
                  >
                    {productName}
                  </Link>
                  <div className="mt-1 text-sm text-text">
                    <p>Quantity: {item.quantity}</p>
                    <p>Unit Price: {formatPrice(item.unitPrice, currency)}</p>
                  </div>
                </div>

                {/* Total Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-medium text-dark">
                    {formatPrice(item.totalPrice, currency)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Totals */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="space-y-2 max-w-sm ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-text">Subtotal</span>
              <span className="text-dark">{formatPrice(order.subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text">Shipping</span>
              <span className="text-dark">
                {order.shipping === 0 ? 'Free' : formatPrice(order.shipping, currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text">Tax</span>
              <span className="text-dark">{formatPrice(order.tax, currency)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text">Discount</span>
                <span className="text-accent">-{formatPrice(order.discount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-display text-h6 text-dark">Total</span>
              <span className="font-display text-h6 text-dark">
                {formatPrice(order.total, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-h5 font-display text-dark mb-4">Shipping Address</h3>
        <div className="text-sm text-text space-y-1">
          <p className="text-dark font-medium">
            {order.firstName} {order.lastName}
          </p>
          <p>{order.shippingStreet}</p>
          <p>
            {order.shippingCity}
            {order.shippingState && `, ${order.shippingState}`} {order.shippingZip}
          </p>
          <p>{order.shippingCountry}</p>
          {order.phone && <p className="pt-2">Phone: {order.phone}</p>}
        </div>
      </div>

      {/* Billing Address */}
      {order.billingStreet && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-h5 font-display text-dark mb-4">Billing Address</h3>
          <div className="text-sm text-text space-y-1">
            <p className="text-dark font-medium">
              {order.firstName} {order.lastName}
            </p>
            <p>{order.billingStreet}</p>
            <p>
              {order.billingCity}
              {order.billingState && `, ${order.billingState}`} {order.billingZip}
            </p>
            <p>{order.billingCountry}</p>
          </div>
        </div>
      )}

      {/* Customer Notes */}
      {order.customerNotes && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-h5 font-display text-dark mb-4">Order Notes</h3>
          <p className="text-sm text-text">{order.customerNotes}</p>
        </div>
      )}
    </div>
  )
}
