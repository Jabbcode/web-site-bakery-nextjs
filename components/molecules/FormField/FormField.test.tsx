import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders label correctly', () => {
    render(<FormField label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders required asterisk when required', () => {
    render(<FormField label="Email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders helper text when provided', () => {
    render(<FormField label="Password" helperText="At least 8 characters" />)
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument()
  })

  it('renders error message when provided', () => {
    render(<FormField label="Email" error="Invalid email" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email')
  })

  it('does not show helper text when error is present', () => {
    render(<FormField label="Email" helperText="Helper" error="Error" />)
    expect(screen.queryByText('Helper')).not.toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders input field by default', () => {
    render(<FormField label="Email" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders textarea when fieldType is textarea', () => {
    render(<FormField label="Message" fieldType="textarea" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders select when fieldType is select', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ]
    render(<FormField label="Choose" fieldType="select" options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('associates label with input via id', () => {
    render(<FormField label="Email" id="email-field" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email')
    expect(input).toHaveAttribute('id', 'email-field')
    expect(label).toHaveAttribute('for', 'email-field')
  })
})
