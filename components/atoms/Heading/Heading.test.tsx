import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders children correctly', () => {
    render(<Heading>Test Heading</Heading>)
    expect(screen.getByText('Test Heading')).toBeInTheDocument()
  })

  it('renders as h1 when variant is h1', () => {
    render(<Heading variant="h1">Heading 1</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as h2 by default', () => {
    render(<Heading>Default Heading</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Heading variant="h1">H1</Heading>)
    expect(screen.getByText('H1')).toHaveClass('text-[78px]')

    rerender(<Heading variant="h6">H6</Heading>)
    expect(screen.getByText('H6')).toHaveClass('text-[21px]')
  })

  it('renders with custom tag using as prop', () => {
    render(
      <Heading variant="h1" as="div">
        Div Heading
      </Heading>
    )
    const element = screen.getByText('Div Heading')
    expect(element.tagName).toBe('DIV')
    expect(element).toHaveClass('text-[78px]')
  })

  it('uses Cormorant font', () => {
    render(<Heading>Test</Heading>)
    expect(screen.getByText('Test')).toHaveClass('font-display')
  })

  it('has dark color', () => {
    render(<Heading>Test</Heading>)
    expect(screen.getByText('Test')).toHaveClass('text-dark')
  })
})
