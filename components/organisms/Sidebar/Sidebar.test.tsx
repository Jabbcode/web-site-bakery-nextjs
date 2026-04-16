import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Sidebar isOpen={false} onClose={() => {}}>
        Content
      </Sidebar>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(
      <Sidebar isOpen={true} onClose={() => {}}>
        Content
      </Sidebar>
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Sidebar isOpen={true} onClose={() => {}} title="Test Title">
        Content
      </Sidebar>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Sidebar isOpen={true} onClose={onClose} title="Test">
        Content
      </Sidebar>
    )

    const closeButton = screen.getByLabelText(/close sidebar/i)
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Sidebar isOpen={true} onClose={onClose}>
        Content
      </Sidebar>
    )

    const overlay = document.querySelector('[aria-hidden="true"]')
    expect(overlay).toBeInTheDocument()

    if (overlay) {
      await user.click(overlay)
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  })

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Sidebar isOpen={true} onClose={onClose}>
        Content
      </Sidebar>
    )

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders in right position by default', () => {
    const { container } = render(
      <Sidebar isOpen={true} onClose={() => {}}>
        Content
      </Sidebar>
    )

    const sidebar = container.querySelector('[role="dialog"]')
    expect(sidebar).toHaveClass('right-0')
  })

  it('renders in left position when specified', () => {
    const { container } = render(
      <Sidebar isOpen={true} onClose={() => {}} position="left">
        Content
      </Sidebar>
    )

    const sidebar = container.querySelector('[role="dialog"]')
    expect(sidebar).toHaveClass('left-0')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Sidebar isOpen={true} onClose={() => {}} className="custom-class">
        Content
      </Sidebar>
    )

    const sidebar = container.querySelector('[role="dialog"]')
    expect(sidebar).toHaveClass('custom-class')
  })

  it('renders children content', () => {
    render(
      <Sidebar isOpen={true} onClose={() => {}}>
        <div>
          <h1>Title</h1>
          <p>Description</p>
        </div>
      </Sidebar>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})
