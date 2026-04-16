import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FormField } from './FormField'

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
}

export const TextareaField: Story = {
  args: {
    label: 'Message',
    fieldType: 'textarea',
    placeholder: 'Write your message here...',
    rows: 5,
  },
}

export const SelectField: Story = {
  args: {
    label: 'Country',
    fieldType: 'select',
    options: [
      { value: '', label: 'Select a country' },
      { value: 'us', label: 'United States' },
      { value: 'mx', label: 'Mexico' },
      { value: 'ca', label: 'Canada' },
    ],
  },
}

export const AllFieldTypes: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
  render: () => (
    <div className="flex max-w-lg flex-col gap-6">
      <FormField label="Full Name" placeholder="John Doe" required />
      <FormField
        label="Email"
        type="email"
        placeholder="john@example.com"
        helperText="We'll never share your email"
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Enter password"
        error="Password is too short"
      />
      <FormField
        label="Message"
        fieldType="textarea"
        placeholder="Write your message..."
        rows={4}
      />
      <FormField
        label="Country"
        fieldType="select"
        options={[
          { value: '', label: 'Select a country' },
          { value: 'us', label: 'United States' },
          { value: 'mx', label: 'Mexico' },
        ]}
      />
    </div>
  ),
}
