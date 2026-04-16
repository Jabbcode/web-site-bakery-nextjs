import { render, screen } from '@testing-library/react'
import { ProductPrice } from './ProductPrice'

describe('ProductPrice', () => {
  it('renders price with currency symbol', () => {
    render(<ProductPrice price={29.99} />)
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('formats price with two decimal places', () => {
    render(<ProductPrice price={30} />)
    expect(screen.getByText('$30.00')).toBeInTheDocument()
  })

  it('displays different currency symbols', () => {
    const { rerender } = render(<ProductPrice price={29.99} currency="EUR" />)
    expect(screen.getByText('€29.99')).toBeInTheDocument()

    rerender(<ProductPrice price={29.99} currency="GBP" />)
    expect(screen.getByText('£29.99')).toBeInTheDocument()
  })

  it('shows original price when discount is present', () => {
    render(<ProductPrice price={24.99} originalPrice={34.99} />)
    expect(screen.getByText('$24.99')).toBeInTheDocument()
    expect(screen.getByText('$34.99')).toBeInTheDocument()
  })

  it('applies line-through to original price', () => {
    render(<ProductPrice price={24.99} originalPrice={34.99} />)
    const originalPrice = screen.getByText('$34.99')
    expect(originalPrice).toHaveClass('line-through')
  })

  it('shows discount badge when enabled', () => {
    render(<ProductPrice price={20} originalPrice={40} discountBadge />)
    expect(screen.getByText('-50%')).toBeInTheDocument()
  })

  it('calculates discount percentage correctly', () => {
    const { rerender } = render(<ProductPrice price={30} originalPrice={40} discountBadge />)
    expect(screen.getByText('-25%')).toBeInTheDocument()

    rerender(<ProductPrice price={60} originalPrice={100} discountBadge />)
    expect(screen.getByText('-40%')).toBeInTheDocument()
  })

  it('does not show discount when prices are equal', () => {
    render(<ProductPrice price={30} originalPrice={30} discountBadge />)
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument()
  })

  it('can hide currency symbol', () => {
    render(<ProductPrice price={29.99} showCurrency={false} />)
    expect(screen.getByText('29.99')).toBeInTheDocument()
    expect(screen.queryByText('$29.99')).not.toBeInTheDocument()
  })

  it('applies size variants correctly', () => {
    const { rerender } = render(<ProductPrice price={29.99} size="sm" />)
    expect(screen.getByText('$29.99')).toHaveClass('text-[21px]')

    rerender(<ProductPrice price={29.99} size="md" />)
    expect(screen.getByText('$29.99')).toHaveClass('text-[27px]')

    rerender(<ProductPrice price={29.99} size="lg" />)
    expect(screen.getByText('$29.99')).toHaveClass('text-[33px]')
  })

  it('uses accent color when discounted', () => {
    render(<ProductPrice price={20} originalPrice={30} />)
    expect(screen.getByText('$20.00')).toHaveClass('text-[#ee2852]')
  })
})
