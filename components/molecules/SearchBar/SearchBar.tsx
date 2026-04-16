'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
  showClearButton?: boolean
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onClear, showClearButton = false, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ''

    return (
      <div className="relative w-full">
        <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
          <Search className="h-5 w-5 text-[#63605a]" />
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            'font-body w-full rounded-none border border-[#dadada] bg-white py-3 pr-12 pl-12 text-[15px] leading-[1.66em] tracking-[0.01em] text-[#241c10] transition-colors duration-200',
            'placeholder:text-[#63605a]/50',
            'focus:border-[#241c10] focus:outline-none',
            'disabled:cursor-not-allowed disabled:bg-[#fafafa] disabled:text-[#63605a]/50',
            className
          )}
          {...props}
        />

        {showClearButton && hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[#63605a] transition-colors hover:text-[#241c10]"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'
