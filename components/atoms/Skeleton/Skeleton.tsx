'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonVariants = cva(
  // Base - Animated pulse usando colores SwissDelight
  'animate-pulse bg-border rounded',
  {
    variants: {
      variant: {
        default: 'bg-border',
        light: 'bg-light',
        cream: 'bg-cream',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, className }))}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
