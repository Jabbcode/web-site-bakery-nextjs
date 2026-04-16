'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const starRatingVariants = cva('inline-flex items-center gap-1', {
  variants: {
    size: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const starSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

export interface StarRatingProps extends VariantProps<typeof starRatingVariants> {
  rating: number
  maxRating?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  showCount?: boolean
  count?: number
  className?: string
}

export const StarRating = ({
  rating,
  maxRating = 5,
  interactive = false,
  onChange,
  showCount = false,
  count,
  size,
  className,
}: StarRatingProps) => {
  const sizeValue = size || 'md'
  const [hoverRating, setHoverRating] = useState(0)
  const [localRating, setLocalRating] = useState(rating)

  const displayRating = interactive && hoverRating > 0 ? hoverRating : localRating

  const handleClick = (value: number) => {
    if (!interactive) return
    setLocalRating(value)
    onChange?.(value)
  }

  const handleMouseEnter = (value: number) => {
    if (!interactive) return
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    setHoverRating(0)
  }

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className={cn(starRatingVariants({ size: sizeValue }))}>
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= displayRating
          const isPartial = !isFilled && starValue - 0.5 <= displayRating

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={!interactive}
              className={cn(
                'relative inline-flex transition-colors',
                interactive && 'cursor-pointer hover:scale-110',
                !interactive && 'cursor-default'
              )}
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
            >
              <Star
                className={cn(
                  starSizes[sizeValue],
                  'transition-all',
                  isFilled && 'fill-[#a7760c] text-[#a7760c]',
                  isPartial && 'fill-[#a7760c]/50 text-[#a7760c]',
                  !isFilled && !isPartial && 'fill-none text-[#dadada]'
                )}
              />
            </button>
          )
        })}
      </div>

      {showCount && count !== undefined && (
        <span className="font-body text-sm text-[#63605a]">({count})</span>
      )}
    </div>
  )
}
