import { render } from '@testing-library/react'
import { Heart } from 'lucide-react'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders icon correctly', () => {
    const { container } = render(<Icon icon={Heart} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies size variants correctly', () => {
    const { container, rerender } = render(<Icon icon={Heart} size="sm" />)
    expect(container.querySelector('svg')).toHaveClass('h-4')
    expect(container.querySelector('svg')).toHaveClass('w-4')

    rerender(<Icon icon={Heart} size="xl" />)
    expect(container.querySelector('svg')).toHaveClass('h-8')
    expect(container.querySelector('svg')).toHaveClass('w-8')
  })

  it('applies color variants correctly', () => {
    const { container, rerender } = render(<Icon icon={Heart} variant="primary" />)
    expect(container.querySelector('svg')).toHaveClass('text-primary')

    rerender(<Icon icon={Heart} variant="accent" />)
    expect(container.querySelector('svg')).toHaveClass('text-accent')
  })

  it('has accessible label when provided', () => {
    const { container } = render(<Icon icon={Heart} label="Favorite" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-label', 'Favorite')
    expect(svg).not.toHaveAttribute('aria-hidden')
  })

  it('is hidden from screen readers when no label', () => {
    const { container } = render(<Icon icon={Heart} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('merges custom className', () => {
    const { container } = render(<Icon icon={Heart} className="custom-class" />)
    expect(container.querySelector('svg')).toHaveClass('custom-class')
  })

  it('renders with default variant', () => {
    const { container } = render(<Icon icon={Heart} />)
    expect(container.querySelector('svg')).toHaveClass('text-current')
  })
})
