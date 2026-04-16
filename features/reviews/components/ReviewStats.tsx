'use client'

import { ReviewStats as ReviewStatsType } from '../types'
import { StarRating } from './StarRating'

interface ReviewStatsProps {
  stats: ReviewStatsType
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  const { averageRating, totalReviews, distribution } = stats

  return (
    <div className="bg-light p-6 rounded-lg">
      <div className="text-center mb-6">
        <div className="text-5xl font-display text-dark mb-2">
          {averageRating.toFixed(1)}
        </div>
        <StarRating rating={averageRating} size="lg" />
        <p className="text-sm text-text mt-2">
          Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating as keyof typeof distribution]
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

          return (
            <div key={rating} className="flex items-center space-x-3">
              <span className="text-sm text-text w-12">{rating} stars</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-text w-12 text-right">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
