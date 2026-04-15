'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-dark text-white hover:bg-dark/90 active:bg-dark/80',
        secondary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary/80',
        outline: 'border-2 border-dark text-dark hover:bg-dark hover:text-white active:bg-dark/90',
        ghost: 'text-dark hover:bg-light active:bg-border',
        link: 'text-dark underline-offset-4 hover:underline',
        danger: 'bg-accent text-white hover:bg-accent-hover active:bg-accent/80',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      disabled,
      children,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const showIcon = !isLoading && icon
    const showLoader = isLoading

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {showLoader && <Loader2 className="h-4 w-4 animate-spin" />}
        {showIcon && iconPosition === 'left' && icon}
        {children}
        {showIcon && iconPosition === 'right' && icon}
      </button>
    )
  }
)

Button.displayName = 'Button'
