'use client'

import { useState } from 'react'
import { X, Filter } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { cn } from '@/lib/utils'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface ProductFiltersProps {
  categories?: FilterOption[]
  priceRanges?: FilterOption[]
  selectedCategory?: string
  selectedPriceRange?: string
  showFeatured?: boolean
  showNew?: boolean
  onCategoryChange?: (category: string | undefined) => void
  onPriceRangeChange?: (range: string | undefined) => void
  onFeaturedChange?: (featured: boolean) => void
  onNewChange?: (isNew: boolean) => void
  onClearAll?: () => void
  className?: string
}

export const ProductFilters = ({
  categories = [],
  priceRanges = [],
  selectedCategory,
  selectedPriceRange,
  showFeatured = false,
  showNew = false,
  onCategoryChange,
  onPriceRangeChange,
  onFeaturedChange,
  onNewChange,
  onClearAll,
  className,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters =
    selectedCategory !== undefined || selectedPriceRange !== undefined || showFeatured || showNew

  const handleCategoryClick = (value: string) => {
    if (onCategoryChange) {
      onCategoryChange(selectedCategory === value ? undefined : value)
    }
  }

  const handlePriceRangeClick = (value: string) => {
    if (onPriceRangeChange) {
      onPriceRangeChange(selectedPriceRange === value ? undefined : value)
    }
  }

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll()
    }
  }

  return (
    <div className={cn('relative', className)}>
      {/* Mobile Toggle Button */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Button
          variant="default"
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="default" className="ml-1">
              {[selectedCategory, selectedPriceRange, showFeatured, showNew].filter(Boolean).length}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="light" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      <div
        className={cn(
          'space-y-6',
          // Mobile: show/hide based on isOpen
          isOpen ? 'block' : 'hidden lg:block'
        )}
      >
        {/* Clear All (Desktop) */}
        {hasActiveFilters && (
          <div className="hidden items-center justify-between lg:flex">
            <h3 className="font-display text-[21px] font-semibold text-[#241c10]">Filters</h3>
            <Button variant="light" size="sm" onClick={handleClearAll}>
              <X className="mr-1 h-4 w-4" />
              Clear All
            </Button>
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="border-b border-[#dadada] pb-6">
            <h4 className="font-display mb-4 text-[18px] font-medium text-[#241c10]">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryClick(category.value)}
                  className={cn(
                    'font-body flex w-full items-center justify-between rounded px-3 py-2 text-left text-[15px] transition-colors',
                    selectedCategory === category.value
                      ? 'bg-[#241c10] text-white'
                      : 'text-[#63605a] hover:bg-[#fafafa]'
                  )}
                >
                  <span>{category.label}</span>
                  {category.count !== undefined && (
                    <span
                      className={cn(
                        'text-sm',
                        selectedCategory === category.value ? 'text-white/70' : 'text-[#63605a]'
                      )}
                    >
                      ({category.count})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        {priceRanges.length > 0 && (
          <div className="border-b border-[#dadada] pb-6">
            <h4 className="font-display mb-4 text-[18px] font-medium text-[#241c10]">
              Price Range
            </h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handlePriceRangeClick(range.value)}
                  className={cn(
                    'font-body flex w-full items-center justify-between rounded px-3 py-2 text-left text-[15px] transition-colors',
                    selectedPriceRange === range.value
                      ? 'bg-[#241c10] text-white'
                      : 'text-[#63605a] hover:bg-[#fafafa]'
                  )}
                >
                  <span>{range.label}</span>
                  {range.count !== undefined && (
                    <span
                      className={cn(
                        'text-sm',
                        selectedPriceRange === range.value ? 'text-white/70' : 'text-[#63605a]'
                      )}
                    >
                      ({range.count})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Special Filters */}
        <div className="space-y-3">
          <h4 className="font-display mb-4 text-[18px] font-medium text-[#241c10]">Special</h4>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={showFeatured}
              onChange={(e) => onFeaturedChange?.(e.target.checked)}
              className="h-5 w-5 rounded border-[#dadada] text-[#241c10] focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2"
            />
            <span className="font-body text-[15px] text-[#63605a]">Featured Products</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={showNew}
              onChange={(e) => onNewChange?.(e.target.checked)}
              className="h-5 w-5 rounded border-[#dadada] text-[#241c10] focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2"
            />
            <span className="font-body text-[15px] text-[#63605a]">New Arrivals</span>
          </label>
        </div>
      </div>
    </div>
  )
}
