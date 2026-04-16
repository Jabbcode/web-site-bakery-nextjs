import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('renders correct number of stars', () => {
    render(<StarRating rating={4} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)
  })

  it('fills correct number of stars based on rating', () => {
    render(<StarRating rating={3} />)
    const stars = screen.getAllByRole('button')

    expect(stars[0]?.querySelector('svg')).toHaveClass('fill-[#a7760c]')
    expect(stars[1]?.querySelector('svg')).toHaveClass('fill-[#a7760c]')
    expect(stars[2]?.querySelector('svg')).toHaveClass('fill-[#a7760c]')
    expect(stars[3]?.querySelector('svg')).toHaveClass('fill-none')
    expect(stars[4]?.querySelector('svg')).toHaveClass('fill-none')
  })

  it('shows review count when enabled', () => {
    render(<StarRating rating={4} showCount count={127} />)
    expect(screen.getByText('(127)')).toBeInTheDocument()
  })

  it('does not show count when showCount is false', () => {
    render(<StarRating rating={4} showCount={false} count={127} />)
    expect(screen.queryByText('(127)')).not.toBeInTheDocument()
  })

  it('calls onChange when interactive star is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<StarRating rating={0} interactive onChange={onChange} />)

    const thirdStar = screen.getByLabelText('3 stars')
    await user.click(thirdStar)

    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('does not call onChange when not interactive', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<StarRating rating={4} interactive={false} onChange={onChange} />)

    const firstStar = screen.getByLabelText('1 star')
    await user.click(firstStar)

    expect(onChange).not.toHaveBeenCalled()
  })

  it('disables buttons when not interactive', () => {
    render(<StarRating rating={4} interactive={false} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  it('enables buttons when interactive', () => {
    render(<StarRating rating={4} interactive />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).not.toBeDisabled()
    })
  })

  it('handles custom maxRating', () => {
    render(<StarRating rating={3} maxRating={10} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(10)
  })
})
