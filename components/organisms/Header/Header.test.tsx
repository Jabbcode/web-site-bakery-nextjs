import { render, screen } from '@testing-library/react'
import { Header } from './Header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders logo link', () => {
    render(<Header />)
    const logo = screen.getByText('SwissDelight')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders with default variant', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('bg-white')
  })

  it('renders with transparent variant', () => {
    const { container } = render(<Header variant="transparent" />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('bg-transparent')
  })

  it('applies sticky class when sticky prop is true', () => {
    const { container } = render(<Header sticky={true} />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky')
  })

  it('does not apply sticky class when sticky prop is false', () => {
    const { container } = render(<Header sticky={false} />)
    const header = container.querySelector('header')
    expect(header).not.toHaveClass('sticky')
  })

  it('renders HeaderNav component', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders cart button with correct label', () => {
    render(<Header />)
    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
  })

  it('renders user account button', () => {
    render(<Header />)
    expect(screen.getByLabelText(/user account/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Header className="custom-class" />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('custom-class')
  })
})
