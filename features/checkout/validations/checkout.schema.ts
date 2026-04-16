import { z } from 'zod'

// Billing/Shipping Address Schema
export const addressSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  zip: z.string().min(4, 'Postal code is required'),
  country: z.string().default('MX'),
})

export type AddressFormData = z.infer<typeof addressSchema>

// Checkout Form Schema
export const checkoutSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),

  // Shipping Address
  shippingStreet: z.string().min(5, 'Street address is required'),
  shippingCity: z.string().min(2, 'City is required'),
  shippingState: z.string().optional(),
  shippingZip: z.string().min(4, 'Postal code is required'),
  shippingCountry: z.string().min(1, 'Country is required'),

  // Billing Address (optional, same as shipping if not provided)
  useDifferentBilling: z.boolean().optional(),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZip: z.string().optional(),
  billingCountry: z.string().optional(),

  // Notes
  customerNotes: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

// Create Order Request Schema
export const createOrderSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  shippingStreet: z.string(),
  shippingCity: z.string(),
  shippingState: z.string().optional(),
  shippingZip: z.string(),
  shippingCountry: z.string(),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZip: z.string().optional(),
  billingCountry: z.string().optional(),
  customerNotes: z.string().optional(),
  currency: z.enum(['USD', 'MXN', 'EUR']),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
