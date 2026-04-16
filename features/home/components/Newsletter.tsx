'use client'

import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // TODO: Implement newsletter API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage({
        type: 'success',
        text: 'Thank you for subscribing! Check your email for confirmation.',
      })
      setEmail('')
    } catch {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-wide container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-h3 font-display text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/90 mb-8">
            Get exclusive offers, recipes, and updates delivered to your inbox
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="md"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Subscribe
            </Button>
          </form>

          {/* Message */}
          {message && (
            <div
              className={`
                mt-4 p-4 rounded-lg
                ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              `}
            >
              {message.text}
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-sm text-white/70 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
