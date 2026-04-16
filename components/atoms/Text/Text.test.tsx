import { render, screen } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Test text</Text>)
    expect(screen.getByText('Test text')).toBeInTheDocument()
  })

  it('renders as p tag by default', () => {
    const { container } = render(<Text>Paragraph</Text>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Text variant="body">Body</Text>)
    expect(screen.getByText('Body')).toHaveClass('text-[15px]')

    rerender(<Text variant="muted">Muted</Text>)
    expect(screen.getByText('Muted')).toHaveClass('text-text/70')
  })

  it('applies alignment correctly', () => {
    const { rerender } = render(<Text align="left">Left</Text>)
    expect(screen.getByText('Left')).toHaveClass('text-left')

    rerender(<Text align="center">Center</Text>)
    expect(screen.getByText('Center')).toHaveClass('text-center')

    rerender(<Text align="right">Right</Text>)
    expect(screen.getByText('Right')).toHaveClass('text-right')
  })

  it('renders with custom tag using as prop', () => {
    render(<Text as="span">Span text</Text>)
    const element = screen.getByText('Span text')
    expect(element.tagName).toBe('SPAN')
  })

  it('uses Heebo font', () => {
    render(<Text>Test</Text>)
    expect(screen.getByText('Test')).toHaveClass('font-body')
  })

  it('merges custom className', () => {
    render(<Text className="custom-class">Test</Text>)
    expect(screen.getByText('Test')).toHaveClass('custom-class')
  })
})
