'use client'

import { OrderStatus, PaymentStatus } from '@/lib/generated/prisma'

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  className?: string
}

const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; label_es: string; color: string }
> = {
  PENDING: {
    label: 'Pending',
    label_es: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
  },
  CONFIRMED: {
    label: 'Confirmed',
    label_es: 'Confirmado',
    color: 'bg-blue-100 text-blue-800',
  },
  PROCESSING: {
    label: 'Processing',
    label_es: 'Procesando',
    color: 'bg-purple-100 text-purple-800',
  },
  SHIPPED: {
    label: 'Shipped',
    label_es: 'Enviado',
    color: 'bg-indigo-100 text-indigo-800',
  },
  DELIVERED: {
    label: 'Delivered',
    label_es: 'Entregado',
    color: 'bg-green-100 text-green-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    label_es: 'Cancelado',
    color: 'bg-red-100 text-red-800',
  },
}

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; label_es: string; color: string }
> = {
  PENDING: {
    label: 'Pending',
    label_es: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
  },
  PAID: {
    label: 'Paid',
    label_es: 'Pagado',
    color: 'bg-green-100 text-green-800',
  },
  FAILED: {
    label: 'Failed',
    label_es: 'Fallido',
    color: 'bg-red-100 text-red-800',
  },
  REFUNDED: {
    label: 'Refunded',
    label_es: 'Reembolsado',
    color: 'bg-gray-100 text-gray-800',
  },
}

export function OrderStatusBadge({ status, className = '' }: OrderStatusBadgeProps) {
  const config = ORDER_STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {config.label}
    </span>
  )
}

export function PaymentStatusBadge({ status, className = '' }: PaymentStatusBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {config.label}
    </span>
  )
}
