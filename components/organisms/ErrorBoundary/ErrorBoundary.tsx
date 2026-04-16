'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, errorInfo: ErrorInfo, reset: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    })

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback, showDetails = false, className } = this.props

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback && errorInfo) {
        return fallback(error, errorInfo, this.handleReset)
      }

      // Default fallback UI
      return (
        <div
          className={cn(
            'flex min-h-screen items-center justify-center bg-[#fcf8ed] p-4',
            className
          )}
        >
          <div className="shadow-card w-full max-w-2xl rounded bg-white p-8 md:p-12">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ee2852]/10">
                <AlertTriangle className="h-8 w-8 text-[#ee2852]" />
              </div>
              <div>
                <h1 className="font-display text-h4 text-[#241c10]">Oops! Something went wrong</h1>
                <p className="mt-1 text-[#63605a]">
                  We&apos;re sorry, but something unexpected happened.
                </p>
              </div>
            </div>

            {showDetails && (
              <div className="mb-6 rounded border border-[#dadada] bg-[#fafafa] p-4">
                <h2 className="font-display mb-2 text-[18px] font-medium text-[#241c10]">
                  Error Details
                </h2>
                <p className="mb-2 font-mono text-sm text-[#ee2852]">{error.message}</p>
                {errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-[#63605a] hover:text-[#241c10]">
                      Component Stack
                    </summary>
                    <pre className="mt-2 overflow-auto text-xs text-[#63605a]">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={this.handleReset}
                className={cn(
                  'inline-flex items-center justify-center gap-2 bg-[#241c10] px-6 py-3',
                  'font-body text-[13px] font-medium tracking-[0.15em] text-white uppercase',
                  'transition-colors duration-200 hover:bg-[#ee2852]',
                  'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
                )}
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>

              <Link
                href="/"
                className={cn(
                  'inline-flex items-center justify-center gap-2 border border-[#dadada] bg-white px-6 py-3',
                  'font-body text-[13px] font-medium tracking-[0.15em] text-[#241c10] uppercase',
                  'transition-colors duration-200 hover:border-[#241c10]',
                  'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
                )}
              >
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 rounded bg-yellow-50 p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Development Mode:</strong> This error boundary is showing detailed error
                  information. In production, users will see a simpler message.
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return children
  }
}
