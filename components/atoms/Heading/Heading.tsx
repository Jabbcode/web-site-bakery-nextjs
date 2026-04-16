'use client'

import { forwardRef, type HTMLAttributes, type ElementType } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva(
  // Base - EXACTO SwissDelight h1-h6
  'font-display text-dark',
  {
    variants: {
      variant: {
        h1: 'text-[78px] leading-[1.1em] tracking-[0.02em] font-light my-[25px]',
        h2: 'text-[67px] leading-[1.1em] tracking-[0.02em] font-light my-[25px]',
        h3: 'text-[38px] leading-[1.1em] tracking-[0.02em] font-normal my-[25px]',
        h4: 'text-[33px] leading-[1.03em] font-medium my-[25px]',
        h5: 'text-[27px] leading-[1.04em] font-medium my-[25px]',
        h6: 'text-[21px] leading-[1.14em] font-semibold my-[25px]',
      },
    },
    defaultVariants: {
      variant: 'h2',
    },
  }
)

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: ElementType
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, variant, className, children, ...props }, ref) => {
    const Component = as || (variant as ElementType) || 'h2'

    return (
      <Component ref={ref} className={cn(headingVariants({ variant, className }))} {...props}>
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'
