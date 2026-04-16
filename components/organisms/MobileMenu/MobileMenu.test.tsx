import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MobileMenu } from './MobileMenu'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('MobileMenu', () => {
  it('renders hamburger button', () => {
    render(<MobileMenu />)
    expect(screen.getByLabelText(/toggle mobile menu/i)).toBeInTheDocument()
  })

  it('opens menu when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<MobileMenu />)

    const button = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(button)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('SwissDelight')).toBeInTheDocument()
  })

  it('closes menu when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<MobileMenu />)

    // Open menu
    const openButton = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(openButton)

    // Close menu
    const closeButton = screen.getByLabelText(/close mobile menu/i)
    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders navigation items', async () => {
    const user = userEvent.setup()
    render(<MobileMenu />)

    const button = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(button)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders custom navigation items', async () => {
    const user = userEvent.setup()
    const customItems = [
      { label: 'Custom Item 1', href: '/custom-1' },
      { label: 'Custom Item 2', href: '/custom-2' },
    ]

    render(<MobileMenu items={customItems} />)

    const button = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(button)

    expect(screen.getByText('Custom Item 1')).toBeInTheDocument()
    expect(screen.getByText('Custom Item 2')).toBeInTheDocument()
  })

  it('expands submenu when chevron is clicked', async () => {
    const user = userEvent.setup()
    const itemsWithSubmenu = [
      {
        label: 'Shop',
        href: '/shop',
        children: [
          { label: 'Cakes', href: '/shop/cakes' },
          { label: 'Pastries', href: '/shop/pastries' },
        ],
      },
    ]

    render(<MobileMenu items={itemsWithSubmenu} />)

    // Open menu
    const menuButton = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(menuButton)

    // Expand submenu
    const expandButton = screen.getByLabelText(/toggle shop submenu/i)
    await user.click(expandButton)

    expect(screen.getByText('Cakes')).toBeInTheDocument()
    expect(screen.getByText('Pastries')).toBeInTheDocument()
  })

  it('closes overlay when clicked', async () => {
    const user = userEvent.setup()
    render(<MobileMenu />)

    // Open menu
    const button = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(button)

    // Find and click overlay (it has aria-hidden="true")
    const overlay = document.querySelector('[aria-hidden="true"]')
    expect(overlay).toBeInTheDocument()

    if (overlay) {
      await user.click(overlay)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    }
  })

  it('shows X icon when menu is open', async () => {
    const user = userEvent.setup()
    render(<MobileMenu />)

    const button = screen.getByLabelText(/toggle mobile menu/i)
    await user.click(button)

    // Check for X icon (it's a lucide-react icon)
    const svg = button.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
