'use client'

import { Review } from '../types'
import { StarRating } from './StarRating'

interface ReviewItemProps {
  review: Review
  locale: string
}

export function ReviewItem({ review, locale }: ReviewItemProps) {
  const reviewDate = new Date(review.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const reviewerName = review.user.firstName && review.user.lastName
    ? `${review.user.firstName} ${review.user.lastName.charAt(0)}.`
    : 'Anonymous'

  return (
    <div className="border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm font-medium text-dark">{reviewerName}</span>
          </div>
          {review.title && (
            <h4 className="text-base font-medium text-dark mb-1">{review.title}</h4>
          )}
        </div>
        <span className="text-sm text-text">{reviewDate}</span>
      </div>
      <p className="text-text text-sm leading-relaxed">{review.comment}</p>
    </div>
  )
}
