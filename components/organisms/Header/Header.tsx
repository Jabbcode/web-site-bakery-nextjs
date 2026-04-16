'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { HeaderNav } from './HeaderNav'
import { HeaderActions } from './HeaderActions'

export interface HeaderProps {
  variant?: 'default' | 'transparent'
  sticky?: boolean
  className?: string
}

export const Header = ({ variant = 'default', sticky = true, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
      setIsSticky(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  return (
    <header
      className={cn(
        'top-0 left-0 z-50 w-full transition-all duration-300',
        sticky && 'sticky',
        variant === 'transparent' && !isScrolled && 'bg-transparent',
        variant === 'default' && 'bg-white',
        isScrolled && 'shadow-header bg-white',
        isSticky && 'py-3',
        !isSticky && 'py-5',
        className
      )}
      role="banner"
    >
      <div className="max-w-wide container mx-auto px-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-script text-[40px] leading-none text-[#241c10] transition-colors hover:text-[#ee2852]"
          >
            SwissDelight
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden items-center gap-8 lg:flex">
            <HeaderNav />
            <HeaderActions />
          </div>
        </div>
      </div>
    </header>
  )
}
