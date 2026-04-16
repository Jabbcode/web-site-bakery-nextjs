import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Select } from './Select'

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { value: '', label: 'Select an option' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'strawberry', label: 'Strawberry' },
]

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Flavor',
    options: defaultOptions,
  },
}

export const WithError: Story = {
  args: {
    label: 'Flavor',
    options: defaultOptions,
    error: 'Please select a flavor',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Flavor',
    options: defaultOptions,
    helperText: 'Choose your favorite flavor',
  },
}

export const Required: Story = {
  args: {
    label: 'Flavor',
    options: defaultOptions,
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Flavor',
    options: defaultOptions,
    disabled: true,
  },
}

export const AllVariants: Story = {
  args: {
    options: defaultOptions,
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Select label="Default" options={defaultOptions} />
      <Select
        label="With Helper"
        options={defaultOptions}
        helperText="Choose your favorite flavor"
      />
      <Select label="With Error" options={defaultOptions} error="This field is required" />
      <Select label="Required" options={defaultOptions} required />
      <Select label="Disabled" options={defaultOptions} disabled />
    </div>
  ),
}
