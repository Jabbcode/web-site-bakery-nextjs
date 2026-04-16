import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductGrid } from './ProductGrid'
import type { ProductCardProps } from '../ProductCard'

const mockProducts: ProductCardProps[] = [
  {
    id: '1',
    slug: 'product-1',
    name: 'Product 1',
    image: '/test-1.jpg',
    price: 2999,
  },
  {
    id: '2',
    slug: 'product-2',
    name: 'Product 2',
    image: '/test-2.jpg',
    price: 3999,
  },
  {
    id: '3',
    slug: 'product-3',
    name: 'Product 3',
    image: '/test-3.jpg',
    price: 4999,
  },
]

describe('ProductGrid', () => {
  it('renders products', () => {
    render(<ProductGrid products={mockProducts} />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('Product 3')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(<ProductGrid products={[]} isLoading />)

    expect(screen.getByText(/loading products/i)).toBeInTheDocument()
  })

  it('renders empty state', () => {
    render(<ProductGrid products={[]} emptyMessage="No products available" />)

    expect(screen.getByText('No products available')).toBeInTheDocument()
  })

  it('renders custom empty message', () => {
    render(<ProductGrid products={[]} emptyMessage="Custom empty message" />)

    expect(screen.getByText('Custom empty message')).toBeInTheDocument()
  })

  it('renders pagination when totalPages > 1', () => {
    render(
      <ProductGrid products={mockProducts} currentPage={1} totalPages={3} onPageChange={vi.fn()} />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('does not render pagination when totalPages = 1', () => {
    render(<ProductGrid products={mockProducts} currentPage={1} totalPages={1} />)

    const pagination = screen.queryByText('1')
    expect(pagination).not.toBeInTheDocument()
  })

  it('calls onPageChange when page is changed', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(
      <ProductGrid
        products={mockProducts}
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />
    )

    const page2Button = screen.getByText('2')
    await user.click(page2Button)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onAddToCart when cart button is clicked', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()

    render(<ProductGrid products={mockProducts} onAddToCart={onAddToCart} />)

    const cartButton = screen.getByLabelText(/add product 1 to cart/i)
    await user.click(cartButton)

    expect(onAddToCart).toHaveBeenCalledWith('1')
  })

  it('calls onQuickView when quick view button is clicked', async () => {
    const user = userEvent.setup()
    const onQuickView = vi.fn()

    render(<ProductGrid products={mockProducts} onQuickView={onQuickView} />)

    const quickViewButton = screen.getByLabelText(/quick view product 1/i)
    await user.click(quickViewButton)

    expect(onQuickView).toHaveBeenCalledWith('1')
  })

  it('applies 2 column layout', () => {
    const { container } = render(<ProductGrid products={mockProducts} columns={2} />)

    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('sm:grid-cols-2')
  })

  it('applies 3 column layout', () => {
    const { container } = render(<ProductGrid products={mockProducts} columns={3} />)

    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('lg:grid-cols-3')
  })

  it('applies 4 column layout', () => {
    const { container } = render(<ProductGrid products={mockProducts} columns={4} />)

    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('xl:grid-cols-4')
  })

  it('applies custom className', () => {
    const { container } = render(<ProductGrid products={mockProducts} className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
