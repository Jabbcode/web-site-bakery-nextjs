import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
  const defaultProps = {
    id: '1',
    slug: 'test-product',
    name: 'Test Product',
    image: '/test-image.jpg',
    price: 2999,
  }

  it('renders product name', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('renders product image', () => {
    render(<ProductCard {...defaultProps} imageAlt="Test alt" />)
    const image = screen.getByAltText('Test alt')
    expect(image).toBeInTheDocument()
  })

  it('renders price', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument()
  })

  it('renders original price when provided', () => {
    render(<ProductCard {...defaultProps} originalPrice={3999} />)
    expect(screen.getByText(/\$39\.99/)).toBeInTheDocument()
    expect(screen.getByText(/\$29\.99/)).toBeInTheDocument()
  })

  it('renders New badge when isNew is true', () => {
    render(<ProductCard {...defaultProps} isNew />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders Hot badge when isFeatured is true', () => {
    render(<ProductCard {...defaultProps} isFeatured />)
    expect(screen.getByText('Hot')).toBeInTheDocument()
  })

  it('renders Out of Stock badge when not in stock', () => {
    render(<ProductCard {...defaultProps} inStock={false} />)
    expect(screen.getAllByText('Out of Stock')).toHaveLength(2) // Badge + message
  })

  it('renders rating when provided', () => {
    render(<ProductCard {...defaultProps} rating={4.5} reviewCount={10} />)
    expect(screen.getByText('(10)')).toBeInTheDocument()
  })

  it('does not render rating when rating is 0', () => {
    render(<ProductCard {...defaultProps} rating={0} />)
    const stars = screen.queryByRole('img', { hidden: true })
    expect(stars).not.toBeInTheDocument()
  })

  it('calls onAddToCart when cart button is clicked', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()

    render(<ProductCard {...defaultProps} onAddToCart={onAddToCart} />)

    const cartButton = screen.getByLabelText(/add test product to cart/i)
    await user.click(cartButton)

    expect(onAddToCart).toHaveBeenCalledWith('1')
  })

  it('calls onQuickView when quick view button is clicked', async () => {
    const user = userEvent.setup()
    const onQuickView = vi.fn()

    render(<ProductCard {...defaultProps} onQuickView={onQuickView} />)

    const quickViewButton = screen.getByLabelText(/quick view test product/i)
    await user.click(quickViewButton)

    expect(onQuickView).toHaveBeenCalledWith('1')
  })

  it('does not render cart button when out of stock', () => {
    render(<ProductCard {...defaultProps} inStock={false} onAddToCart={vi.fn()} />)

    const cartButton = screen.queryByLabelText(/add.*to cart/i)
    expect(cartButton).not.toBeInTheDocument()
  })

  it('links to product page', () => {
    render(<ProductCard {...defaultProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/shop/test-product')
  })

  it('applies custom className', () => {
    const { container } = render(<ProductCard {...defaultProps} className="custom-class" />)

    const link = container.querySelector('a')
    expect(link).toHaveClass('custom-class')
  })
})
