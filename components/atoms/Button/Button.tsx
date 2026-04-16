'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles - EXACTO SwissDelight .qodef-theme-button
  'relative inline-flex items-center justify-center gap-2 w-auto font-body font-normal no-underline uppercase cursor-pointer transition-[color,background-color,border-color] duration-[200ms] ease-out disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Default: transparent con borde semi-transparente (estilo principal SwissDelight)
        default: 'text-dark bg-transparent border border-[rgba(36,28,16,0.4)] hover:bg-transparent',
        // Primary: fondo oscuro
        primary: 'text-white bg-dark border border-dark hover:bg-dark/90',
        // Secondary: fondo primary color
        secondary: 'text-white bg-primary border border-primary hover:bg-primary/90',
        // Light: fondo claro
        light: 'text-dark bg-white border border-border hover:bg-light',
        // Danger: fondo accent
        danger: 'text-white bg-accent border border-accent hover:bg-accent/90',
      },
      size: {
        // EXACTO de SwissDelight: padding 13px 38px 12px
        sm: 'text-[11px] leading-[2em] tracking-[0.15em] pt-[11px] px-[30px] pb-[10px]',
        md: 'text-[13px] leading-[2em] tracking-[0.15em] pt-[13px] px-[38px] pb-[12px]',
        lg: 'text-[15px] leading-[2em] tracking-[0.15em] pt-[15px] px-[46px] pb-[14px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
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
