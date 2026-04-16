'use client'

import { useAuth } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AccountLayoutProps {
  children: React.ReactNode
}

const ACCOUNT_NAVIGATION = [
  {
    name: 'Dashboard',
    name_es: 'Panel',
    href: '/account',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: 'Orders',
    name_es: 'Pedidos',
    href: '/account/orders',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    name: 'Addresses',
    name_es: 'Direcciones',
    href: '/account/addresses',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    ),
  },
]

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const locale = params.locale as string

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    router.push(`/${locale}/sign-in?redirect=${encodeURIComponent(pathname)}`)
    return null
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-h2 font-display text-dark">My Account</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-card p-4 space-y-1">
              {ACCOUNT_NAVIGATION.map((item) => {
                const href = `/${locale}${item.href}`
                const isActive = pathname === href
                const label = locale === 'es' ? item.name_es : item.name

                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-md transition-colors
                      ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-text hover:bg-light hover:text-dark'
                      }
                    `}
                  >
                    <span className={isActive ? 'text-white' : 'text-text'}>{item.icon}</span>
                    <span className="font-medium">{label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  )
}
