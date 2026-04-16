import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Button } from '@/components/atoms/Button'

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Sidebar Title',
    children: (
      <div className="space-y-4">
        <p className="text-[#63605a]">This is the sidebar content.</p>
        <p className="text-[#63605a]">You can put any content here.</p>
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}

export const LeftPosition: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Left Sidebar',
    position: 'left',
    children: (
      <div className="space-y-4">
        <p className="text-[#63605a]">This sidebar opens from the left.</p>
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <Button onClick={() => setIsOpen(true)}>Open Left Sidebar</Button>
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}

export const WithoutTitle: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: (
      <div className="space-y-4">
        <h3 className="font-display text-h5 text-[#241c10]">Custom Content</h3>
        <p className="text-[#63605a]">Sidebar without a title shows close button at top-right.</p>
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}

export const FiltersSidebar: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Filters',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="font-display mb-3 text-[21px] font-medium text-[#241c10]">Category</h3>
          <div className="space-y-2">
            {['All Products', 'Cakes', 'Pastries', 'Bread'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 border-[#dadada]" />
                <span className="text-[#63605a]">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display mb-3 text-[21px] font-medium text-[#241c10]">Price Range</h3>
          <div className="space-y-2">
            <input type="range" min="0" max="100" className="w-full" />
            <div className="flex justify-between text-sm text-[#63605a]">
              <span>$0</span>
              <span>$100</span>
            </div>
          </div>
        </div>

        <Button variant="primary" className="w-full">
          Apply Filters
        </Button>
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}

export const CartSidebar: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Shopping Cart (2)',
    children: (
      <div className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 border-b border-[#dadada] pb-4">
              <div className="h-20 w-20 flex-shrink-0 bg-[#fcf8ed]" />
              <div className="flex-1">
                <h4 className="font-display mb-1 text-[15px] font-medium text-[#241c10]">
                  Chocolate Cake
                </h4>
                <p className="mb-2 text-sm text-[#63605a]">Qty: 1</p>
                <p className="font-display text-[15px] font-medium text-[#ee2852]">$29.99</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-[#dadada] pt-4">
          <div className="mb-4 flex justify-between">
            <span className="font-display text-[21px] font-medium text-[#241c10]">Total</span>
            <span className="font-display text-[21px] font-medium text-[#ee2852]">$59.98</span>
          </div>
          <Button variant="primary" className="w-full">
            Checkout
          </Button>
        </div>
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <Button onClick={() => setIsOpen(true)}>View Cart</Button>
        <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
}
