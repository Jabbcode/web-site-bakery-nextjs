'use client'

import { useState } from 'react'
import { Button } from '@/components/atoms/Button'

interface PaymentFormProps {
  onSubmit: () => Promise<void>
  isProcessing: boolean
}

export function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'card'>('stripe')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-h6 font-display mb-4">Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-start p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value as 'stripe')}
              className="mt-1 text-primary focus:ring-primary"
            />
            <div className="ml-3">
              <div className="font-medium text-dark">Credit Card (Stripe)</div>
              <p className="text-sm text-text mt-1">
                Pay securely with your credit or debit card via Stripe
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <svg className="h-6 w-auto" viewBox="0 0 32 21" fill="none">
                  <rect width="32" height="21" rx="2" fill="#252525" />
                  <path
                    d="M14.5 7.5h3v6h-3v-6zm5.5 0h-1.5l1.5 6h1.5l1.5-6h-1.5l-1 4-1-4z"
                    fill="white"
                  />
                </svg>
                <span className="text-xs text-text">
                  Visa, Mastercard, Amex
                </span>
              </div>
            </div>
          </label>

          <label className="flex items-start p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors opacity-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              disabled
              className="mt-1 text-primary focus:ring-primary"
            />
            <div className="ml-3">
              <div className="font-medium text-dark">Cash on Delivery</div>
              <p className="text-sm text-text mt-1">
                Coming soon
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Stripe Payment Info */}
      {paymentMethod === 'stripe' && (
        <div className="bg-light p-4 rounded-lg">
          <p className="text-sm text-text">
            After clicking &quot;Place Order&quot;, you will be redirected to Stripe&apos;s secure payment page to complete your purchase.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isProcessing}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center text-sm text-text">
        <svg
          className="w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        Secure SSL encrypted payment
      </div>
    </form>
  )
}
