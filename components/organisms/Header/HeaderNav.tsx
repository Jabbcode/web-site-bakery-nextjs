'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface HeaderNavProps {
  items?: NavItem[]
  className?: string
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const HeaderNav = ({ items = defaultNavItems, className }: HeaderNavProps) => {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center', className)} role="navigation" aria-label="Main">
      <ul className="flex items-center gap-8">
        {items.map((item) => {
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'group font-body relative text-[15px] tracking-[0.01em] transition-colors duration-200',
                  isActive ? 'font-medium text-[#241c10]' : 'text-[#63605a] hover:text-[#241c10]'
                )}
              >
                <span className="relative inline-block">
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[1px] bg-[#241c10] transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
