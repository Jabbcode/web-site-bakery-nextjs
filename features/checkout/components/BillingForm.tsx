'use client'

import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormData } from '../validations/checkout.schema'
import { Input } from '@/components/atoms/Input'

interface BillingFormProps {
  form: UseFormReturn<CheckoutFormData>
}

export function BillingForm({ form }: BillingFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form

  const useDifferentBilling = watch('useDifferentBilling')

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-h6 font-display mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              required
            />
          </div>
          <div>
            <Input
              label="Phone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>
        </div>
      </div>

      {/* Billing Name */}
      <div>
        <h3 className="text-h6 font-display mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input
              label="First Name"
              {...register('firstName')}
              error={errors.firstName?.message}
              required
            />
          </div>
          <div>
            <Input
              label="Last Name"
              {...register('lastName')}
              error={errors.lastName?.message}
              required
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="text-h6 font-display mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <Input
            label="Street Address"
            {...register('shippingStreet')}
            error={errors.shippingStreet?.message}
            required
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="City"
              {...register('shippingCity')}
              error={errors.shippingCity?.message}
              required
            />
            <Input
              label="State / Province"
              {...register('shippingState')}
              error={errors.shippingState?.message}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Postal Code"
              {...register('shippingZip')}
              error={errors.shippingZip?.message}
              required
            />
            <Input
              label="Country"
              {...register('shippingCountry')}
              error={errors.shippingCountry?.message}
              required
            />
          </div>
        </div>
      </div>

      {/* Different Billing Address */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('useDifferentBilling')}
            className="rounded border-border text-dark focus:ring-primary"
          />
          <span className="text-body">Use different billing address</span>
        </label>
      </div>

      {/* Billing Address (conditional) */}
      {useDifferentBilling && (
        <div>
          <h3 className="text-h6 font-display mb-4">Billing Address</h3>
          <div className="space-y-4">
            <Input
              label="Street Address"
              {...register('billingStreet')}
              error={errors.billingStreet?.message}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="City"
                {...register('billingCity')}
                error={errors.billingCity?.message}
              />
              <Input
                label="State / Province"
                {...register('billingState')}
                error={errors.billingState?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Postal Code"
                {...register('billingZip')}
                error={errors.billingZip?.message}
              />
              <Input
                label="Country"
                {...register('billingCountry')}
                error={errors.billingCountry?.message}
              />
            </div>
          </div>
        </div>
      )}

      {/* Customer Notes */}
      <div>
        <label htmlFor="customerNotes" className="block text-sm font-medium text-text mb-2">
          Order Notes (Optional)
        </label>
        <textarea
          id="customerNotes"
          {...register('customerNotes')}
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Notes about your order, e.g. special delivery instructions..."
        />
        {errors.customerNotes && (
          <p className="mt-1 text-sm text-accent">{errors.customerNotes.message}</p>
        )}
      </div>
    </div>
  )
}
