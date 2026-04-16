'use client'

import { CHECKOUT_STEPS } from '../types'

interface CheckoutStepsProps {
  currentStep: number
  locale: string
}

export function CheckoutSteps({ currentStep, locale }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-center space-x-4">
          {CHECKOUT_STEPS.map((step, index) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep
            const stepName = locale === 'es' ? step.name_es : step.name_en

            return (
              <li key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div className="flex items-center">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                      ${
                        isCompleted
                          ? 'bg-primary border-primary text-white'
                          : isCurrent
                            ? 'border-primary text-primary'
                            : 'border-border text-text'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span
                    className={`
                      ml-2 text-sm font-medium
                      ${isCurrent ? 'text-dark' : 'text-text'}
                    `}
                  >
                    {stepName}
                  </span>
                </div>

                {/* Connector Line */}
                {index < CHECKOUT_STEPS.length - 1 && (
                  <div
                    className={`
                      w-12 h-0.5 mx-4
                      ${isCompleted ? 'bg-primary' : 'bg-border'}
                    `}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
