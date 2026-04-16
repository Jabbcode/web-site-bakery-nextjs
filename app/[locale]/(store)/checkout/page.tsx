'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@clerk/nextjs'
import { checkoutSchema, CheckoutFormData } from '@/features/checkout/validations/checkout.schema'
import { BillingForm } from '@/features/checkout/components/BillingForm'
import { PaymentForm } from '@/features/checkout/components/PaymentForm'
import { OrderSummary } from '@/features/checkout/components/OrderSummary'
import { CheckoutSteps } from '@/features/checkout/components/CheckoutSteps'
import { useCartStore } from '@/features/cart/store/cartStore'
import { Button } from '@/components/atoms/Button'
import { useParams } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const { isSignedIn } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  // For now, hardcode currency - should come from global state/context
  const currency: 'USD' | 'MXN' | 'EUR' = 'MXN'

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      shippingStreet: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      shippingCountry: 'MX',
      useDifferentBilling: false,
      customerNotes: '',
    },
  })

  // Redirect if not signed in
  if (!isSignedIn) {
    router.push(`/${locale}/sign-in?redirect=${encodeURIComponent(`/${locale}/checkout`)}`)
    return null
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push(`/${locale}/shop`)
    return null
  }

  const handleStepOne = async () => {
    const isValid = await form.trigger([
      'email',
      'firstName',
      'lastName',
      'shippingStreet',
      'shippingCity',
      'shippingZip',
      'shippingCountry',
    ])

    if (isValid) {
      setCurrentStep(2)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    try {
      const formData = form.getValues()

      // Create order
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          currency,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create order')
      }

      const { order } = await response.json()

      // Clear cart
      clearCart()

      // Redirect to success page
      router.push(`/${locale}/checkout/success?orderId=${order.id}`)
    } catch (error) {
      console.error('Checkout error:', error)
      alert(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-h2 font-display text-dark">Checkout</h1>
        </div>

        {/* Checkout Steps */}
        <CheckoutSteps currentStep={currentStep} locale={locale} />

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-card">
              {currentStep === 1 && (
                <div>
                  <BillingForm form={form} />
                  <div className="mt-6 flex justify-end">
                    <Button variant="primary" size="lg" onClick={handleStepOne}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  {/* Review Information */}
                  <div className="mb-6 p-4 bg-light rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-dark mb-2">Shipping Address</h3>
                        <p className="text-sm text-text">
                          {form.getValues('firstName')} {form.getValues('lastName')}
                          <br />
                          {form.getValues('shippingStreet')}
                          <br />
                          {form.getValues('shippingCity')}, {form.getValues('shippingState')}{' '}
                          {form.getValues('shippingZip')}
                          <br />
                          {form.getValues('shippingCountry')}
                        </p>
                      </div>
                      <Button variant="light" size="sm" onClick={() => setCurrentStep(1)}>
                        Edit
                      </Button>
                    </div>
                  </div>

                  <PaymentForm onSubmit={handlePlaceOrder} isProcessing={isProcessing} />

                  <div className="mt-4">
                    <Button variant="light" size="md" fullWidth onClick={() => setCurrentStep(1)}>
                      Back to Information
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary currency={currency} className="sticky top-24" />
          </div>
        </div>
      </div>
    </div>
  )
}
