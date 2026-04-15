import { z } from 'zod'

export const productSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  sku: z.string().optional(),
  name_es: z.string().min(1, 'Spanish name is required'),
  name_en: z.string().min(1, 'English name is required'),
  description_es: z.string().optional(),
  description_en: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  priceUSD: z.number().int().positive('Price must be positive'),
  priceMXN: z.number().int().positive().optional(),
  priceEUR: z.number().int().positive().optional(),
  discountPercent: z.number().int().min(0).max(100).optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  lowStockThreshold: z.number().int().min(0).default(5),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  weight: z.number().positive().optional(),
  servings: z.number().int().positive().optional(),
  preparationTime: z.number().int().positive().optional(),
  metaTitle_es: z.string().max(60).optional(),
  metaTitle_en: z.string().max(60).optional(),
  metaDescription_es: z.string().max(160).optional(),
  metaDescription_en: z.string().max(160).optional(),
})

export type ProductFormData = z.infer<typeof productSchema>
