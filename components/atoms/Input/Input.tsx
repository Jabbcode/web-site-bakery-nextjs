'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'w-full rounded-md border bg-white px-3 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-9 text-sm',
        md: 'h-11 text-base',
        lg: 'h-13 text-lg',
      },
      hasError: {
        true: 'border-accent focus-visible:ring-accent',
        false: 'border-border focus:border-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, hasError, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const showError = Boolean(error)

    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="text-dark block text-sm font-medium">
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(inputVariants({ size, hasError: showError || hasError, className }))}
          aria-invalid={showError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-accent text-sm">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-text/70 text-sm">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
