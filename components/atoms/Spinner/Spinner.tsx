'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  // Base - EXACTO SwissDelight .qodef-m-pagination-spinner
  'inline-block animate-spin',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-8 h-8', // 32px como SwissDelight
        lg: 'w-12 h-12',
      },
      variant: {
        primary: 'text-primary',
        dark: 'text-dark',
        accent: 'text-accent',
        light: 'text-text/30',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
)

export interface SpinnerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        role="status"
        aria-label={label || 'Loading'}
        {...props}
      >
        <Loader2 className={cn(spinnerVariants({ size, variant }))} />
        <span className="sr-only">{label || 'Loading...'}</span>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'
