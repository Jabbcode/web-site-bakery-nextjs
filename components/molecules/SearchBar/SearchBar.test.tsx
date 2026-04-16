import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders search icon', () => {
    render(<SearchBar />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('displays value correctly', () => {
    render(<SearchBar value="test query" readOnly />)
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument()
  })

  it('shows clear button when showClearButton is true and has value', () => {
    const onClear = vi.fn()
    render(<SearchBar value="test" showClearButton onClear={onClear} readOnly />)
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('does not show clear button when no value', () => {
    const onClear = vi.fn()
    render(<SearchBar value="" showClearButton onClear={onClear} />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('calls onClear when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<SearchBar value="test" showClearButton onClear={onClear} readOnly />)

    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)

    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<SearchBar disabled />)
    expect(screen.getByRole('searchbox')).toBeDisabled()
  })

  it('accepts custom className', () => {
    render(<SearchBar className="custom-class" />)
    expect(screen.getByRole('searchbox')).toHaveClass('custom-class')
  })
})
