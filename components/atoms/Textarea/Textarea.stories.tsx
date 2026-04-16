import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    error: 'Message is required',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    helperText: 'Maximum 500 characters',
  },
}

export const Required: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    disabled: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <Textarea label="Default" placeholder="Enter your message..." />
      <Textarea
        label="With Helper"
        placeholder="Enter your message..."
        helperText="Maximum 500 characters"
      />
      <Textarea
        label="With Error"
        placeholder="Enter your message..."
        error="This field is required"
      />
      <Textarea label="Required" placeholder="Enter your message..." required />
      <Textarea label="Disabled" placeholder="Enter your message..." disabled />
    </div>
  ),
}
