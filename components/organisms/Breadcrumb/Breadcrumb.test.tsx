import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders breadcrumb items', () => {
    const items = [
      { label: 'Shop', href: '/shop' },
      { label: 'Cakes', href: '/shop/cakes' },
      { label: 'Chocolate Cake' },
    ]

    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Cakes')).toBeInTheDocument()
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument()
  })

  it('renders home link by default', () => {
    const items = [{ label: 'Shop', href: '/shop' }]

    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('does not render home when showHome is false', () => {
    const items = [{ label: 'Shop', href: '/shop' }]

    render(<Breadcrumb items={items} showHome={false} />)

    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('renders links for non-last items', () => {
    const items = [{ label: 'Shop', href: '/shop' }, { label: 'Final Item' }]

    render(<Breadcrumb items={items} />)

    const homeLink = screen.getByText('Home').closest('a')
    const shopLink = screen.getByText('Shop').closest('a')
    const finalItem = screen.getByText('Final Item')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(shopLink).toHaveAttribute('href', '/shop')
    expect(finalItem.closest('a')).toBeNull()
  })

  it('marks last item as current page', () => {
    const items = [{ label: 'Shop', href: '/shop' }, { label: 'Current Page' }]

    render(<Breadcrumb items={items} />)

    const currentPage = screen.getByText('Current Page')
    expect(currentPage).toHaveAttribute('aria-current', 'page')
  })

  it('renders separators between items', () => {
    const items = [
      { label: 'First', href: '/first' },
      { label: 'Second', href: '/second' },
      { label: 'Third' },
    ]

    const { container } = render(<Breadcrumb items={items} />)

    // Should have 3 separators (Home -> First -> Second -> Third)
    const separators = container.querySelectorAll('[aria-hidden="true"]')
    expect(separators.length).toBe(3)
  })

  it('renders custom separator', () => {
    const items = [{ label: 'First', href: '/first' }, { label: 'Second' }]

    render(<Breadcrumb items={items} separator={<span>/</span>} />)

    const separators = screen.getAllByText('/')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const items = [{ label: 'Test' }]

    const { container } = render(<Breadcrumb items={items} className="custom-class" />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('custom-class')
  })

  it('renders home icon', () => {
    const items = [{ label: 'Test' }]

    const { container } = render(<Breadcrumb items={items} />)

    const homeIcon = container.querySelector('svg')
    expect(homeIcon).toBeInTheDocument()
  })
})
