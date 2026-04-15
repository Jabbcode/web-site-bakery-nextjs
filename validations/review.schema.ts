import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  title: z.string().max(100, 'Title must be less than 100 characters').optional(),
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
  productId: z.string().min(1, 'Product ID is required'),
})

export type ReviewFormData = z.infer<typeof reviewSchema>
