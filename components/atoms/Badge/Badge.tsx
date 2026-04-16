'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // Base - EXACTO SwissDelight .qodef-woo-product-mark
  'absolute top-0 right-0 z-[5] font-script text-[28px] leading-[1] -rotate-[10deg] pt-[23px] px-5 pb-[6px]',
  {
    variants: {
      variant: {
        default: 'text-[#3f3930]',
        sale: 'text-accent',
        new: 'text-gold',
        hot: 'text-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
