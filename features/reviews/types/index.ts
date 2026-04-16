export interface Review {
  id: string
  rating: number
  title: string | null
  comment: string
  isApproved: boolean
  userId: string
  productId: string
  createdAt: string
  updatedAt: string
  user: {
    firstName: string | null
    lastName: string | null
  }
}

export interface ReviewFormData {
  rating: number
  title?: string
  comment: string
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}
