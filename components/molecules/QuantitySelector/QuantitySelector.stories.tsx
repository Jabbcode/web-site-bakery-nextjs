import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { QuantitySelector } from './QuantitySelector'

const meta = {
  title: 'Molecules/QuantitySelector',
  component: QuantitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof QuantitySelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1,
    onChange: () => {},
  },
}

export const WithValue: Story = {
  args: {
    value: 5,
    onChange: () => {},
  },
}

export const SmallSize: Story = {
  args: {
    value: 1,
    size: 'sm',
    onChange: () => {},
  },
}

export const LargeSize: Story = {
  args: {
    value: 1,
    size: 'lg',
    onChange: () => {},
  },
}

export const WithLimits: Story = {
  args: {
    value: 1,
    min: 1,
    max: 10,
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
    onChange: () => {},
  },
}

export const Interactive: Story = {
  args: {
    value: 1,
    onChange: () => {},
  },
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value)

    return (
      <div className="flex flex-col items-center gap-4">
        <QuantitySelector {...args} value={quantity} onChange={setQuantity} />
        <p className="text-sm text-[#63605a]">Selected quantity: {quantity}</p>
      </div>
    )
  },
}

export const AllSizes: Story = {
  args: {
    value: 1,
    onChange: () => {},
  },
  render: () => {
    const [smallQty, setSmallQty] = useState(1)
    const [mediumQty, setMediumQty] = useState(1)
    const [largeQty, setLargeQty] = useState(1)

    return (
      <div className="flex flex-col gap-6 p-8">
        <div>
          <h3 className="mb-3 text-sm font-medium text-[#241c10]">Small</h3>
          <QuantitySelector value={smallQty} onChange={setSmallQty} size="sm" />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-[#241c10]">Medium (Default)</h3>
          <QuantitySelector value={mediumQty} onChange={setMediumQty} size="md" />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-[#241c10]">Large</h3>
          <QuantitySelector value={largeQty} onChange={setLargeQty} size="lg" />
        </div>
      </div>
    )
  },
}

export const ProductExample: Story = {
  args: {
    value: 1,
    onChange: () => {},
  },
  render: () => {
    const [quantity, setQuantity] = useState(1)

    return (
      <div className="max-w-sm rounded border border-[#dadada] p-6">
        <div className="mb-4 aspect-square w-full bg-[#fafafa]"></div>
        <h4 className="font-display mb-2 text-[21px] font-medium text-[#241c10]">
          Chocolate Delight Cake
        </h4>
        <p className="mb-4 text-sm text-[#63605a]">Rich chocolate cake with premium frosting</p>
        <div className="mb-4">
          <span className="font-display text-[27px] font-medium text-[#ee2852]">$34.99</span>
        </div>
        <div className="flex items-center justify-between">
          <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={10} />
          <button className="font-body inline-flex items-center justify-center border border-[#241c10] bg-transparent px-6 py-3 text-[13px] leading-[2em] tracking-[0.15em] text-[#241c10] uppercase transition-colors hover:bg-[#241c10] hover:text-white">
            Add to Cart
          </button>
        </div>
      </div>
    )
  },
}
