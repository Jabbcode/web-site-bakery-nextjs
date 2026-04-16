import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'light', 'cream'],
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-4 w-64',
  },
}

export const Circle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
}

export const Rectangle: Story = {
  args: {
    className: 'h-32 w-64',
  },
}

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <div className="w-64 space-y-4 rounded border border-border p-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">Variants</h3>
        <div className="flex flex-col gap-2">
          <Skeleton variant="default" className="h-4 w-64" />
          <Skeleton variant="light" className="h-4 w-64" />
          <Skeleton variant="cream" className="h-4 w-64" />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">Shapes</h3>
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">Product Grid</h3>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
