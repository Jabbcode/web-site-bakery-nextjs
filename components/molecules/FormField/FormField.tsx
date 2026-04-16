'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Select, type SelectProps } from '@/components/atoms/Select'
import { cn } from '@/lib/utils'

export interface FormFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
  fieldType?: 'input' | 'textarea' | 'select'
  options?: SelectProps['options']
  rows?: number
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className,
      id,
      fieldType = 'input',
      options,
      rows,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className={cn('flex w-full flex-col gap-2', className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className="font-body text-[15px] leading-[1.66em] font-normal tracking-[0.01em] text-[#241c10]"
          >
            {label}
            {required && <span className="ml-1 text-[#ee2852]">*</span>}
          </label>
        )}

        {fieldType === 'textarea' ? (
          <Textarea
            id={fieldId}
            error={error}
            rows={rows}
            {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : fieldType === 'select' && options ? (
          <Select
            id={fieldId}
            options={options}
            error={error}
            {...(props as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}
          />
        ) : (
          <Input ref={ref} id={fieldId} type={type} error={error} {...props} />
        )}

        {error && (
          <span className="text-sm leading-[1.5em] text-[#ee2852]" role="alert">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span className="text-sm leading-[1.5em] text-[#63605a]/70">{helperText}</span>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
