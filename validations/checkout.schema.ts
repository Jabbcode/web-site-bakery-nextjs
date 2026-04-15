import { z } from 'zod'

export const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone number')
    .optional(),

  // Shipping Address
  shippingStreet: z.string().min(5, 'Street address is required'),
  shippingCity: z.string().min(2, 'City is required'),
  shippingState: z.string().optional(),
  shippingZip: z.string().min(4, 'ZIP code is required'),
  shippingCountry: z.string().default('MX'),

  // Billing Address (optional)
  useDifferentBilling: z.boolean().default(false),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZip: z.string().optional(),
  billingCountry: z.string().optional(),

  // Notes
  customerNotes: z.string().max(500).optional(),

  // Currency
  currency: z.enum(['USD', 'MXN', 'EUR']).default('MXN'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
