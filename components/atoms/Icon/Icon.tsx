'use client'

import { forwardRef, type SVGProps } from 'react'
import { type LucideIcon } from 'lucide-react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconVariants = cva('inline-block flex-shrink-0', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    variant: {
      default: 'text-current',
      primary: 'text-primary',
      dark: 'text-dark',
      text: 'text-text',
      accent: 'text-accent',
      gold: 'text-gold',
      light: 'text-text/50',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref'>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon
  label?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIconComponent, size, variant, className, label, ...props }, ref) => {
    return (
      <LucideIconComponent
        ref={ref}
        className={cn(iconVariants({ size, variant, className }))}
        aria-label={label}
        aria-hidden={!label}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'
