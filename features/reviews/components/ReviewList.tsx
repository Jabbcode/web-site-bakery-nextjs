'use client'

import { useState, useEffect, useCallback } from 'react'
import { Review, ReviewStats as ReviewStatsType } from '../types'
import { ReviewItem } from './ReviewItem'
import { ReviewStats } from './ReviewStats'
import { ReviewForm } from './ReviewForm'
import { Button } from '@/components/atoms/Button'
import { useAuth } from '@clerk/nextjs'

interface ReviewListProps {
  productId: string
  locale: string
}

export function ReviewList({ productId, locale }: ReviewListProps) {
  const { isSignedIn } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStatsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reviews?productId=${productId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }

      const data = await response.json()
      setReviews(data)

      // Calculate stats
      const totalReviews = data.length
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

      data.forEach((review: Review) => {
        distribution[review.rating as keyof typeof distribution]++
      })

      const averageRating =
        totalReviews > 0
          ? data.reduce((sum: number, review: Review) => sum + review.rating, 0) / totalReviews
          : 0

      setStats({
        averageRating,
        totalReviews,
        distribution,
      })
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }, [productId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleReviewSuccess = () => {
    setShowForm(false)
    fetchReviews()
    alert('Thank you! Your review has been submitted and is pending approval.')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      {stats && stats.totalReviews > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ReviewStats stats={stats} />
          </div>
        </div>
      )}

      {/* Write Review Button */}
      {isSignedIn && !showForm && (
        <div>
          <Button variant="primary" size="md" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-light p-6 rounded-lg">
          <h3 className="text-h5 font-display text-dark mb-4">Write Your Review</h3>
          <ReviewForm
            productId={productId}
            onSuccess={handleReviewSuccess}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-h5 font-display text-dark">Customer Reviews</h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} locale={locale} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-light rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <h3 className="mt-4 text-h5 font-display text-dark">No reviews yet</h3>
          <p className="mt-2 text-text">Be the first to review this product!</p>
        </div>
      )}
    </div>
  )
}
