'use client'

import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export default function AccountDashboard() {
  const { user } = useUser()
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-h4 font-display text-dark mb-2">
          Welcome back, {user?.firstName || 'Customer'}!
        </h2>
        <p className="text-text">
          Manage your orders, addresses, and account settings from your dashboard.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-h5 font-display text-dark mb-2">Orders</h3>
              <p className="text-sm text-text">View and track your orders</p>
            </div>
            <svg
              className="w-8 h-8 text-primary"
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
          </div>
          <Link href={`/${locale}/account/orders`}>
            <Button variant="light" size="sm" fullWidth>
              View Orders
            </Button>
          </Link>
        </div>

        {/* Addresses Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-h5 font-display text-dark mb-2">Addresses</h3>
              <p className="text-sm text-text">Manage your shipping addresses</p>
            </div>
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <Link href={`/${locale}/account/addresses`}>
            <Button variant="light" size="sm" fullWidth>
              Manage Addresses
            </Button>
          </Link>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-h5 font-display text-dark mb-4">Account Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-text">Email</p>
            <p className="text-dark font-medium">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <div>
            <p className="text-sm text-text">Name</p>
            <p className="text-dark font-medium">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
