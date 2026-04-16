'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '../Header/HeaderNav'

export interface MobileMenuProps {
  items?: NavItem[]
  className?: string
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const MobileMenu = ({ items = defaultNavItems, className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when route changes
  useEffect(() => {
    // This is intentional - we want to close the menu on navigation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
    setExpandedItems([])
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]
    )
  }

  return (
    <div className={cn('lg:hidden', className)}>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center justify-center p-2 text-[#241c10] transition-colors duration-200',
          'hover:text-[#ee2852]',
          'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
        )}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="animate-fade-in fixed inset-0 z-40 bg-[#241c10]/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu Drawer */}
      <div
        ref={menuRef}
        className={cn(
          'shadow-dropdown fixed top-0 right-0 z-50 h-full w-full max-w-sm transform overflow-y-auto bg-white transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dadada] p-6">
          <Link
            href="/"
            className="font-script text-[32px] leading-none text-[#241c10]"
            onClick={() => setIsOpen(false)}
          >
            SwissDelight
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center p-2 text-[#241c10] transition-colors hover:text-[#ee2852]"
            aria-label="Close mobile menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6" role="navigation" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = pathname === item.href
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedItems.includes(item.href)

              return (
                <li key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        'font-body flex-1 py-3 text-[15px] tracking-[0.01em] transition-colors',
                        isActive
                          ? 'font-medium text-[#241c10]'
                          : 'text-[#63605a] hover:text-[#241c10]'
                      )}
                      onClick={() => !hasChildren && setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.href)}
                        className="p-2 text-[#63605a] transition-transform hover:text-[#241c10]"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu */}
                  {hasChildren && isExpanded && (
                    <ul className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-[#dadada] pl-4">
                      {item.children?.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                'font-body block py-2 text-[14px] tracking-[0.01em] transition-colors',
                                isChildActive
                                  ? 'font-medium text-[#241c10]'
                                  : 'text-[#63605a] hover:text-[#241c10]'
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
