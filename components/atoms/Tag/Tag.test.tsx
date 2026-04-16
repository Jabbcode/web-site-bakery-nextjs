import { render, screen } from '@testing-library/react'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag href="#">Chocolate</Tag>)
    expect(screen.getByText('Chocolate')).toBeInTheDocument()
  })

  it('renders as an anchor element', () => {
    render(<Tag href="#chocolate">Chocolate</Tag>)
    const tag = screen.getByText('Chocolate')
    expect(tag.tagName).toBe('A')
    expect(tag).toHaveAttribute('href', '#chocolate')
  })

  it('shows separator by default', () => {
    const { container } = render(<Tag href="#">Chocolate</Tag>)
    const tag = container.querySelector('a')
    expect(tag).toHaveClass('after:content-["/"]')
  })

  it('hides separator when showSeparator is false', () => {
    const { container } = render(
      <Tag href="#" showSeparator={false}>
        Chocolate
      </Tag>
    )
    const tag = container.querySelector('a')
    expect(tag).toHaveClass('after:hidden')
  })

  it('applies italic Cormorant font', () => {
    render(<Tag href="#">Chocolate</Tag>)
    const tag = screen.getByText('Chocolate')
    expect(tag).toHaveClass('font-display')
    expect(tag).toHaveClass('italic')
  })

  it('applies capitalize text transform', () => {
    render(<Tag href="#">Chocolate</Tag>)
    const tag = screen.getByText('Chocolate')
    expect(tag).toHaveClass('capitalize')
  })

  it('merges custom className', () => {
    render(
      <Tag href="#" className="custom-class">
        Chocolate
      </Tag>
    )
    const tag = screen.getByText('Chocolate')
    expect(tag).toHaveClass('custom-class')
  })
})
