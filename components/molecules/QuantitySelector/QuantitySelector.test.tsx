import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuantitySelector } from './QuantitySelector'

describe('QuantitySelector', () => {
  it('renders with initial value', () => {
    render(<QuantitySelector value={5} onChange={() => {}} />)
    expect(screen.getByDisplayValue('5')).toBeInTheDocument()
  })

  it('renders increment and decrement buttons', () => {
    render(<QuantitySelector value={1} onChange={() => {}} />)
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument()
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument()
  })

  it('calls onChange when increment button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantitySelector value={1} onChange={onChange} />)

    await user.click(screen.getByLabelText('Increase quantity'))

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('calls onChange when decrement button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantitySelector value={5} onChange={onChange} />)

    await user.click(screen.getByLabelText('Decrease quantity'))

    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('disables decrement button at minimum value', () => {
    render(<QuantitySelector value={1} min={1} onChange={() => {}} />)
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled()
  })

  it('disables increment button at maximum value', () => {
    render(<QuantitySelector value={10} max={10} onChange={() => {}} />)
    expect(screen.getByLabelText('Increase quantity')).toBeDisabled()
  })

  it('does not decrement below minimum', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantitySelector value={1} min={1} onChange={onChange} />)

    await user.click(screen.getByLabelText('Decrease quantity'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not increment above maximum', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantitySelector value={10} max={10} onChange={onChange} />)

    await user.click(screen.getByLabelText('Increase quantity'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('disables all interactions when disabled prop is true', () => {
    render(<QuantitySelector value={5} disabled onChange={() => {}} />)

    expect(screen.getByLabelText('Increase quantity')).toBeDisabled()
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled()
    expect(screen.getByLabelText('Quantity')).toBeDisabled()
  })

  it('allows manual input of valid values', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantitySelector value={1} min={1} max={99} onChange={onChange} />)

    const input = screen.getByLabelText('Quantity')
    await user.clear(input)
    await user.type(input, '15')

    expect(onChange).toHaveBeenCalledWith(15)
  })

  it('ignores invalid manual input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantitySelector value={5} min={1} max={10} onChange={onChange} />)

    const input = screen.getByLabelText('Quantity')
    await user.clear(input)
    await user.type(input, '999')

    expect(onChange).not.toHaveBeenCalledWith(999)
  })
})
