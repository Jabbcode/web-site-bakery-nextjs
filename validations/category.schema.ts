import { z } from 'zod'

export const categorySchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  name_es: z.string().min(1, 'Spanish name is required'),
  name_en: z.string().min(1, 'English name is required'),
  description_es: z.string().optional(),
  description_en: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

export type CategoryFormData = z.infer<typeof categorySchema>
