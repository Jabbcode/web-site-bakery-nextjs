'use client'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export interface SortOption {
  value: string
  label: string
}

export interface ProductSortProps {
  options?: SortOption[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const defaultOptions: SortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
]

export const ProductSort = ({
  options = defaultOptions,
  value = 'newest',
  onChange,
  className,
}: ProductSortProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue)
    }
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'font-body flex items-center gap-2 rounded border border-[#dadada] bg-white px-4 py-2.5 text-[15px] text-[#241c10] transition-colors',
          'hover:border-[#241c10] focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
        )}
        aria-label="Sort products"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-medium">Sort by:</span>
        <span>{selectedOption?.label || 'Select'}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'shadow-dropdown absolute top-full right-0 z-50 mt-2 min-w-[220px] rounded border border-[#dadada] bg-white',
            'animate-fade-in'
          )}
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'font-body block w-full px-4 py-3 text-left text-[15px] transition-colors',
                'hover:bg-[#fafafa]',
                value === option.value
                  ? 'bg-[#fcf8ed] font-medium text-[#241c10]'
                  : 'text-[#63605a]'
              )}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
