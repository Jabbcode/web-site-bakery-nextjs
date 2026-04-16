'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { AddressFormData } from '../types'

const addressSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  zip: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().optional(),
})

interface AddressFormProps {
  initialData?: AddressFormData
  onSubmit: (data: AddressFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function AddressForm({ initialData, onSubmit, onCancel, isLoading }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'MX',
      isDefault: false,
    },
  })

  const handleFormSubmit = async (data: AddressFormData) => {
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
          required
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
          required
        />
      </div>

      <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} />

      <Input
        label="Street Address"
        {...register('street')}
        error={errors.street?.message}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="City" {...register('city')} error={errors.city?.message} required />
        <Input
          label="State / Province"
          {...register('state')}
          error={errors.state?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Postal Code" {...register('zip')} error={errors.zip?.message} required />
        <Input label="Country" {...register('country')} error={errors.country?.message} required />
      </div>

      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('isDefault')}
            className="rounded border-border text-dark focus:ring-primary"
          />
          <span className="text-sm text-text">Set as default address</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="light" size="md" onClick={onCancel} disabled={isSubmitting || isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="md" isLoading={isSubmitting || isLoading}>
          {initialData ? 'Update Address' : 'Add Address'}
        </Button>
      </div>
    </form>
  )
}
