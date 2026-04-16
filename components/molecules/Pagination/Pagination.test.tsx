import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('does not render when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders navigation buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('calls onPageChange when page number is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    await user.click(screen.getByLabelText('Go to page 3'))

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when next button is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />)

    await user.click(screen.getByLabelText('Next page'))

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when previous button is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)

    await user.click(screen.getByLabelText('Previous page'))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />)
    const currentPageButton = screen.getByLabelText('Go to page 3')
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    expect(currentPageButton).toHaveClass('bg-[#241c10]')
  })

  it('shows ellipsis for many pages', () => {
    render(<Pagination currentPage={10} totalPages={50} onPageChange={() => {}} />)
    const ellipses = screen.getAllByText('...')
    expect(ellipses.length).toBeGreaterThan(0)
  })

  it('limits visible page numbers based on maxVisiblePages', () => {
    render(
      <Pagination currentPage={10} totalPages={50} maxVisiblePages={5} onPageChange={() => {}} />
    )

    // Should show limited number of page buttons
    const pageButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.startsWith('Go to page'))

    // Should show approximately maxVisiblePages + first + last
    expect(pageButtons.length).toBeLessThanOrEqual(10)
  })

  it('does not call onPageChange when clicking current page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)

    await user.click(screen.getByLabelText('Go to page 3'))

    expect(onPageChange).not.toHaveBeenCalled()
  })
})
