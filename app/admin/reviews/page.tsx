'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { StarRating } from '@/features/reviews/components/StarRating'

interface Review {
  id: string
  rating: number
  title: string | null
  comment: string
  isApproved: boolean
  createdAt: string
  user: {
    firstName: string | null
    lastName: string | null
  }
  product: {
    name_en: string
    slug: string
  }
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // TODO: Create admin endpoint to fetch ALL reviews (approved + pending)
        // For now, this is a placeholder
        setReviews([])
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [filter])

  const handleApprove = async (reviewId: string) => {
    try {
      // TODO: Create PATCH /api/admin/reviews/[id] endpoint
      console.log('Approve review:', reviewId)
      alert('Review approved successfully')
    } catch (error) {
      console.error('Error approving review:', error)
    }
  }

  const handleReject = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return
    }

    try {
      // TODO: Create DELETE /api/admin/reviews/[id] endpoint
      console.log('Delete review:', reviewId)
      alert('Review deleted successfully')
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display text-dark">Reviews</h2>
        <p className="text-text mt-2">Moderate customer reviews</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {['pending', 'approved', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as typeof filter)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  filter === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => {
          const reviewDate = new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          const reviewerName =
            review.user.firstName && review.user.lastName
              ? `${review.user.firstName} ${review.user.lastName}`
              : 'Anonymous'

          return (
            <div key={review.id} className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="text-sm font-medium text-dark">{reviewerName}</span>
                    <span className="text-sm text-text">{reviewDate}</span>
                  </div>
                  {review.title && (
                    <h4 className="text-base font-medium text-dark mb-2">{review.title}</h4>
                  )}
                  <p className="text-text text-sm mb-3">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    Product: <span className="font-medium">{review.product.name_en}</span>
                  </p>
                </div>
                {!review.isApproved && (
                  <div className="flex space-x-2 ml-4">
                    <Button variant="primary" size="sm" onClick={() => handleApprove(review.id)}>
                      Approve
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(review.id)}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
              {review.isApproved && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xs text-green-600 font-medium">✓ Approved</span>
                  <Button variant="light" size="sm" onClick={() => handleReject(review.id)}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )
        })}

        {reviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-card p-12 text-center">
            <p className="text-text">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  )
}
