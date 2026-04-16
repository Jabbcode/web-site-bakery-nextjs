import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders correctly', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies default variant', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('bg-border')
  })

  it('applies light variant', () => {
    const { container } = render(<Skeleton variant="light" />)
    expect(container.firstChild).toHaveClass('bg-light')
  })

  it('applies cream variant', () => {
    const { container } = render(<Skeleton variant="cream" />)
    expect(container.firstChild).toHaveClass('bg-cream')
  })

  it('has pulse animation', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('merges custom className', () => {
    const { container } = render(<Skeleton className="h-4 w-64" />)
    expect(container.firstChild).toHaveClass('h-4')
    expect(container.firstChild).toHaveClass('w-64')
  })

  it('is rounded by default', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('rounded')
  })
})
