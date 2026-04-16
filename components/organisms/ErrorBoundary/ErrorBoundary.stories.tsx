import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { Button } from '@/components/atoms/Button'

const meta = {
  title: 'Organisms/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

// Component that throws an error
const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error from BuggyComponent')
  }
  return <div className="p-4 text-[#63605a]">Component loaded successfully</div>
}

export const Default: Story = {
  args: {
    showDetails: true,
    children: null,
  },
  render: (args) => {
    const [shouldThrow, setShouldThrow] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <div className="mb-4">
          <Button onClick={() => setShouldThrow(true)}>Trigger Error</Button>
        </div>

        <ErrorBoundary {...args}>
          <div className="shadow-card rounded bg-white p-8">
            <h2 className="font-display text-h4 mb-4 text-[#241c10]">Protected Content</h2>
            <BuggyComponent shouldThrow={shouldThrow} />
          </div>
        </ErrorBoundary>
      </div>
    )
  },
}

export const WithoutDetails: Story = {
  args: {
    showDetails: false,
    children: null,
  },
  render: (args) => {
    const [shouldThrow, setShouldThrow] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <div className="mb-4">
          <Button onClick={() => setShouldThrow(true)}>Trigger Error</Button>
        </div>

        <ErrorBoundary {...args}>
          <div className="shadow-card rounded bg-white p-8">
            <h2 className="font-display text-h4 mb-4 text-[#241c10]">Protected Content</h2>
            <BuggyComponent shouldThrow={shouldThrow} />
          </div>
        </ErrorBoundary>
      </div>
    )
  },
}

export const CustomFallback: Story = {
  args: {
    children: null,
    fallback: (error, _errorInfo, reset) => (
      <div className="flex min-h-screen items-center justify-center bg-[#fcf8ed] p-4">
        <div className="shadow-card w-full max-w-md rounded bg-white p-8 text-center">
          <h2 className="font-display text-h3 mb-4 text-[#ee2852]">Custom Error UI</h2>
          <p className="mb-4 text-[#63605a]">This is a custom error fallback.</p>
          <p className="mb-6 font-mono text-sm text-[#241c10]">{error.message}</p>
          <Button onClick={reset}>Reset</Button>
        </div>
      </div>
    ),
  },
  render: (args) => {
    const [shouldThrow, setShouldThrow] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <div className="mb-4">
          <Button onClick={() => setShouldThrow(true)}>Trigger Error</Button>
        </div>

        <ErrorBoundary {...args}>
          <div className="shadow-card rounded bg-white p-8">
            <h2 className="font-display text-h4 mb-4 text-[#241c10]">Protected Content</h2>
            <BuggyComponent shouldThrow={shouldThrow} />
          </div>
        </ErrorBoundary>
      </div>
    )
  },
}

export const NestedBoundaries: Story = {
  args: {
    showDetails: true,
    children: null,
  },
  render: (args) => {
    const [shouldThrowOuter, setShouldThrowOuter] = useState(false)
    const [shouldThrowInner, setShouldThrowInner] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <div className="mb-4 flex gap-2">
          <Button onClick={() => setShouldThrowOuter(true)}>Trigger Outer Error</Button>
          <Button onClick={() => setShouldThrowInner(true)}>Trigger Inner Error</Button>
        </div>

        <ErrorBoundary {...args}>
          <div className="shadow-card mb-4 rounded bg-white p-8">
            <h2 className="font-display text-h4 mb-4 text-[#241c10]">Outer Boundary</h2>
            <BuggyComponent shouldThrow={shouldThrowOuter} />

            <ErrorBoundary showDetails={true}>
              <div className="mt-4 rounded border border-[#dadada] p-4">
                <h3 className="font-display text-h6 mb-2 text-[#241c10]">Inner Boundary</h3>
                <BuggyComponent shouldThrow={shouldThrowInner} />
              </div>
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      </div>
    )
  },
}

export const WithErrorHandler: Story = {
  args: {
    showDetails: true,
    children: null,
    onError: (error, errorInfo) => {
      console.log('Error caught by ErrorBoundary:', error.message)
      console.log('Component stack:', errorInfo.componentStack)
      // In real app, send to error tracking service (Sentry, etc.)
    },
  },
  render: (args) => {
    const [shouldThrow, setShouldThrow] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <div className="mb-4">
          <Button onClick={() => setShouldThrow(true)}>Trigger Error (Check Console)</Button>
        </div>

        <ErrorBoundary {...args}>
          <div className="shadow-card rounded bg-white p-8">
            <h2 className="font-display text-h4 mb-4 text-[#241c10]">Protected Content</h2>
            <p className="mb-4 text-[#63605a]">
              This boundary has an onError handler that logs to the console.
            </p>
            <BuggyComponent shouldThrow={shouldThrow} />
          </div>
        </ErrorBoundary>
      </div>
    )
  },
}
