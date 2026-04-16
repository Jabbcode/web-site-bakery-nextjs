'use client'

import { forwardRef, type HTMLAttributes, type ElementType } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva(
  // Base - EXACTO SwissDelight body text
  'font-body',
  {
    variants: {
      variant: {
        body: 'text-[15px] leading-[1.66em] tracking-[0.01em] text-text mb-6',
        small: 'text-sm leading-relaxed text-text',
        large: 'text-lg leading-relaxed text-text',
        muted: 'text-[15px] leading-[1.66em] tracking-[0.01em] text-text/70',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'body',
      align: 'left',
    },
  }
)

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: ElementType
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Component = 'p', variant, align, className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn(textVariants({ variant, align, className }))} {...props}>
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'
