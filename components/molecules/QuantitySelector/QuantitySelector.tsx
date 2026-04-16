'use client'

import { Minus, Plus } from 'lucide-react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const quantitySelectorVariants = cva('inline-flex items-center border border-[#dadada]', {
  variants: {
    size: {
      sm: 'h-9',
      md: 'h-11',
      lg: 'h-13',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const buttonSizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-13 w-13',
}

const inputSizes = {
  sm: 'h-9 w-12 text-sm',
  md: 'h-11 w-16 text-base',
  lg: 'h-13 w-20 text-lg',
}

export interface QuantitySelectorProps extends VariantProps<typeof quantitySelectorVariants> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
  disabled?: boolean
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size,
  className,
  disabled = false,
}: QuantitySelectorProps) => {
  const sizeValue = size || 'md'
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  const isDecrementDisabled = disabled || value <= min
  const isIncrementDisabled = disabled || value >= max

  return (
    <div className={cn(quantitySelectorVariants({ size: sizeValue }), className)}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className={cn(
          buttonSizes[sizeValue],
          'inline-flex items-center justify-center border-r border-[#dadada] transition-colors',
          'hover:bg-[#fafafa]',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent'
        )}
        aria-label="Decrement quantity"
      >
        <Minus className="h-4 w-4 text-[#241c10]" />
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className={cn(
          inputSizes[sizeValue],
          'font-body border-none bg-transparent text-center text-[#241c10] outline-none',
          'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        className={cn(
          buttonSizes[sizeValue],
          'inline-flex items-center justify-center border-l border-[#dadada] transition-colors',
          'hover:bg-[#fafafa]',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent'
        )}
        aria-label="Increment quantity"
      >
        <Plus className="h-4 w-4 text-[#241c10]" />
      </button>
    </div>
  )
}
