import { render, screen } from '@testing-library/react'
import { Link } from './Link'

describe('Link', () => {
  it('renders children correctly', () => {
    render(<Link href="#">Test Link</Link>)
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('renders as Next.js Link for internal URLs', () => {
    render(<Link href="/about">About</Link>)
    const link = screen.getByText('About')
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders as external link for http URLs', () => {
    render(<Link href="https://example.com">External</Link>)
    const link = screen.getByText('External')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders as external link when external prop is true', () => {
    render(
      <Link href="/path" external>
        External
      </Link>
    )
    const link = screen.getByText('External')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(
      <Link href="#" variant="default">
        Default
      </Link>
    )
    expect(screen.getByText('Default')).toHaveClass('text-dark')

    rerender(
      <Link href="#" variant="accent">
        Accent
      </Link>
    )
    expect(screen.getByText('Accent')).toHaveClass('text-accent')
  })

  it('applies nav variant with uppercase', () => {
    render(
      <Link href="#" variant="nav">
        Nav Link
      </Link>
    )
    expect(screen.getByText('Nav Link')).toHaveClass('uppercase')
  })

  it('has no underline by default', () => {
    render(<Link href="#">Link</Link>)
    expect(screen.getByText('Link')).toHaveClass('no-underline')
  })

  it('has transition effect', () => {
    render(<Link href="#">Link</Link>)
    expect(screen.getByText('Link')).toHaveClass('transition-colors')
  })

  it('merges custom className', () => {
    render(
      <Link href="#" className="custom-class">
        Link
      </Link>
    )
    expect(screen.getByText('Link')).toHaveClass('custom-class')
  })
})
