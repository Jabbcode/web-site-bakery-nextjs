import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Spinner } from './Spinner'

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'dark', 'accent', 'light'],
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">Sizes</h3>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">Variants</h3>
        <div className="flex items-center gap-6">
          <Spinner variant="primary" />
          <Spinner variant="dark" />
          <Spinner variant="accent" />
          <Spinner variant="light" />
        </div>
      </div>
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">In Context</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span className="text-text">Loading...</span>
          </div>
          <div className="bg-cream flex h-32 w-64 items-center justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  ),
}
