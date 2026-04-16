import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sale', 'new', 'hot'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Sale',
  },
}

export const Sale: Story = {
  args: {
    variant: 'sale',
    children: 'Sale',
  },
}

export const New: Story = {
  args: {
    variant: 'new',
    children: 'New',
  },
}

export const Hot: Story = {
  args: {
    variant: 'hot',
    children: 'Hot',
  },
}

export const OnProduct: Story = {
  render: () => (
    <div className="relative h-64 w-64 overflow-hidden border border-gray-300 bg-[#fcf8ed]">
      <Badge variant="sale">Sale</Badge>
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-600">Product Image</p>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="relative h-48 w-48 overflow-hidden border border-gray-300 bg-[#fcf8ed]">
        <Badge variant="default">Sale</Badge>
        <div className="flex h-full items-center justify-center">
          <p className="text-xs text-gray-600">Default</p>
        </div>
      </div>
      <div className="relative h-48 w-48 overflow-hidden border border-gray-300 bg-[#fcf8ed]">
        <Badge variant="sale">Sale</Badge>
        <div className="flex h-full items-center justify-center">
          <p className="text-xs text-gray-600">Sale</p>
        </div>
      </div>
      <div className="relative h-48 w-48 overflow-hidden border border-gray-300 bg-[#fcf8ed]">
        <Badge variant="new">New</Badge>
        <div className="flex h-full items-center justify-center">
          <p className="text-xs text-gray-600">New</p>
        </div>
      </div>
      <div className="relative h-48 w-48 overflow-hidden border border-gray-300 bg-[#fcf8ed]">
        <Badge variant="hot">Hot</Badge>
        <div className="flex h-full items-center justify-center">
          <p className="text-xs text-gray-600">Hot</p>
        </div>
      </div>
    </div>
  ),
}
