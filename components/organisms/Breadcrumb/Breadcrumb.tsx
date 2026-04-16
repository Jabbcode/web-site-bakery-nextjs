'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  separator?: React.ReactNode
  className?: string
}

export const Breadcrumb = ({ items, showHome = true, separator, className }: BreadcrumbProps) => {
  const allItems = showHome ? [{ label: 'Home', href: '/' }, ...items] : items

  return (
    <nav className={cn('py-6', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isHome = index === 0 && showHome

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'font-body inline-flex items-center gap-2 text-[14px] tracking-[0.01em] transition-colors',
                    'text-[#63605a] hover:text-[#241c10]'
                  )}
                >
                  {isHome && <Home className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'font-body inline-flex items-center gap-2 text-[14px] tracking-[0.01em]',
                    isLast ? 'font-medium text-[#241c10]' : 'text-[#63605a]'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isHome && <Home className="h-4 w-4" />}
                  <span>{item.label}</span>
                </span>
              )}

              {!isLast && (
                <span className="text-[#dadada]" aria-hidden="true">
                  {separator || <ChevronRight className="h-4 w-4" />}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
