import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    hasError: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    error: 'Email is required',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    helperText: 'We will never share your email',
  },
}

export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    size: 'lg',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">States</h3>
        <div className="flex flex-col gap-4">
          <Input label="Default" placeholder="Enter text..." />
          <Input label="With Helper" placeholder="Enter text..." helperText="This is helper text" />
          <Input label="With Error" placeholder="Enter text..." error="This field is required" />
          <Input label="Required" placeholder="Enter text..." required />
          <Input label="Disabled" placeholder="Enter text..." disabled />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">Sizes</h3>
        <div className="flex flex-col gap-4">
          <Input label="Small" placeholder="Small input" size="sm" />
          <Input label="Medium" placeholder="Medium input" size="md" />
          <Input label="Large" placeholder="Large input" size="lg" />
        </div>
      </div>
    </div>
  ),
}
