'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Currency {
  code: string
  symbol: string
  label: string
}

export interface CurrencySwitcherProps {
  currencies: Currency[]
  currentCurrency: string
  onCurrencyChange: (currencyCode: string) => void
  className?: string
  showIcon?: boolean
}

export const CurrencySwitcher = ({
  currencies,
  currentCurrency,
  onCurrencyChange,
  className,
  showIcon = true,
}: CurrencySwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentCurr = currencies.find((curr) => curr.code === currentCurrency)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCurrencySelect = (code: string) => {
    onCurrencyChange(code)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'font-body inline-flex items-center gap-2 border border-[#dadada] bg-white px-4 py-2.5 text-[15px] text-[#241c10] transition-colors duration-200',
          'hover:border-[#241c10]',
          'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
        )}
        aria-label="Select currency"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {showIcon && <DollarSign className="h-4 w-4" />}
        <span className="uppercase">{currentCurr?.code || 'USD'}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'shadow-dropdown absolute top-full right-0 z-50 mt-1 min-w-[180px] border border-[#dadada] bg-white',
            'animate-fade-in'
          )}
        >
          {currencies.map((currency) => (
            <button
              key={currency.code}
              type="button"
              onClick={() => handleCurrencySelect(currency.code)}
              className={cn(
                'font-body flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[15px] transition-colors',
                currency.code === currentCurrency
                  ? 'bg-[#fafafa] font-medium text-[#241c10]'
                  : 'text-[#63605a] hover:bg-[#fafafa] hover:text-[#241c10]'
              )}
            >
              <span className="flex items-center gap-2">
                <span className="font-medium">{currency.symbol}</span>
                <span>{currency.code}</span>
              </span>
              <span className="text-sm text-[#63605a]">{currency.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
