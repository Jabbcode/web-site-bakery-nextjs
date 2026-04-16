import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders brand name', () => {
    render(<Footer />)
    expect(screen.getByText('SwissDelight')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText(/123 Baker Street/i)).toBeInTheDocument()
    expect(screen.getByText(/\+41 44 123 4567/i)).toBeInTheDocument()
    expect(screen.getByText(/hello@swissdelight.ch/i)).toBeInTheDocument()
  })

  it('renders footer columns', () => {
    render(<Footer />)
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
  })

  it('renders newsletter section when showNewsletter is true', () => {
    render(<Footer showNewsletter={true} />)
    expect(screen.getByText('Newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('does not render newsletter section when showNewsletter is false', () => {
    render(<Footer showNewsletter={false} />)
    expect(screen.queryByText('Newsletter')).not.toBeInTheDocument()
  })

  it('renders social links when showSocial is true', () => {
    render(<Footer showSocial={true} />)
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
  })

  it('does not render social links when showSocial is false', () => {
    render(<Footer showSocial={false} />)
    expect(screen.queryByLabelText('Facebook')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Instagram')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Twitter')).not.toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer copyrightText="© 2025 Test Company" />)
    expect(screen.getByText('© 2025 Test Company')).toBeInTheDocument()
  })

  it('renders custom columns', () => {
    const customColumns = [
      {
        title: 'Custom Column',
        links: [
          { label: 'Link 1', href: '/link-1' },
          { label: 'Link 2', href: '/link-2' },
        ],
      },
    ]

    render(<Footer columns={customColumns} />)
    expect(screen.getByText('Custom Column')).toBeInTheDocument()
    expect(screen.getByText('Link 1')).toBeInTheDocument()
    expect(screen.getByText('Link 2')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Footer className="custom-class" />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('custom-class')
  })
})
