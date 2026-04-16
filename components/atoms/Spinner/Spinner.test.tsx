import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<Spinner label="Loading products" />)
    expect(screen.getByLabelText('Loading products')).toBeInTheDocument()
    expect(screen.getByText('Loading products')).toBeInTheDocument()
  })

  it('applies size variants correctly', () => {
    const { container, rerender } = render(<Spinner size="sm" />)
    expect(container.querySelector('.w-4')).toBeInTheDocument()

    rerender(<Spinner size="lg" />)
    expect(container.querySelector('.w-12')).toBeInTheDocument()
  })

  it('applies color variants correctly', () => {
    const { container, rerender } = render(<Spinner variant="primary" />)
    expect(container.querySelector('.text-primary')).toBeInTheDocument()

    rerender(<Spinner variant="accent" />)
    expect(container.querySelector('.text-accent')).toBeInTheDocument()
  })

  it('has spinning animation', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })
})
