import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Sale</Badge>)
    expect(screen.getByText('Sale')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Badge>Sale</Badge>)
    const badge = screen.getByText('Sale')
    expect(badge).toHaveClass('text-[#3f3930]')
  })

  it('applies sale variant styles', () => {
    render(<Badge variant="sale">Sale</Badge>)
    const badge = screen.getByText('Sale')
    expect(badge).toHaveClass('text-accent')
  })

  it('applies new variant styles', () => {
    render(<Badge variant="new">New</Badge>)
    const badge = screen.getByText('New')
    expect(badge).toHaveClass('text-gold')
  })

  it('applies hot variant styles', () => {
    render(<Badge variant="hot">Hot</Badge>)
    const badge = screen.getByText('Hot')
    expect(badge).toHaveClass('text-accent')
  })

  it('merges custom className', () => {
    render(<Badge className="custom-class">Sale</Badge>)
    const badge = screen.getByText('Sale')
    expect(badge).toHaveClass('custom-class')
  })

  it('is positioned absolutely', () => {
    render(<Badge>Sale</Badge>)
    const badge = screen.getByText('Sale')
    expect(badge).toHaveClass('absolute')
  })
})
