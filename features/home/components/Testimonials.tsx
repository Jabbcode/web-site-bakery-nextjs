'use client'

import { useState } from 'react'
import { StarRating } from '@/features/reviews/components/StarRating'

interface Testimonial {
  id: number
  name: string
  rating: number
  comment: string
  image?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    rating: 5,
    comment: 'The chocolate cake was absolutely divine! Perfect for my daughter\'s birthday. Everyone loved it and asked where I got it from.',
  },
  {
    id: 2,
    name: 'John Smith',
    rating: 5,
    comment: 'Best bakery in town! The quality and taste are exceptional. I order from here for all special occasions.',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    rating: 5,
    comment: 'Incredible attention to detail and amazing flavors. The red velvet cake was a hit at our wedding!',
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToTestimonial = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className="py-16 bg-light">
      <div className="max-w-wide container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-script text-3xl text-primary mb-2">What Our Customers Say</p>
          <h2 className="text-h2 font-display text-dark mb-4">Testimonials</h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`
                  transition-opacity duration-500
                  ${index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'}
                `}
              >
                <div className="bg-white rounded-lg shadow-card p-8 md:p-12 text-center">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg
                      className="w-12 h-12 mx-auto text-primary opacity-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    <StarRating rating={testimonial.rating} size="md" />
                  </div>

                  {/* Comment */}
                  <p className="text-lg text-text italic mb-6 leading-relaxed">
                    &quot;{testimonial.comment}&quot;
                  </p>

                  {/* Name */}
                  <div className="font-medium text-dark">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300'}
                `}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
