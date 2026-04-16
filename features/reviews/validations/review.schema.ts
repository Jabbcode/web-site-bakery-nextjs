import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  title: z.string().optional(),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
  productId: z.string(),
})

export type ReviewInput = z.infer<typeof reviewSchema>
