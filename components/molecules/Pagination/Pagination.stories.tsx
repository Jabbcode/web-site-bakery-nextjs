import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => {},
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
}

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    onPageChange: () => {},
  },
}

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    onPageChange: () => {},
  },
}

export const Interactive: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: () => {},
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage)

    return (
      <div className="flex flex-col gap-6">
        <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
        <p className="text-center text-sm text-[#63605a]">
          Current page: <strong>{currentPage}</strong> of {args.totalPages}
        </p>
      </div>
    )
  },
}

export const ProductListing: Story = {
  args: {
    currentPage: 1,
    totalPages: 12,
    onPageChange: () => {},
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage)

    return (
      <div className="flex flex-col gap-8">
        {/* Mock product grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-[33px] font-medium text-[#241c10]">All Products</h2>
            <p className="text-sm text-[#63605a]">
              Showing page {currentPage} of {args.totalPages}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="rounded border border-[#dadada] p-4">
                <div className="mb-4 aspect-square w-full bg-[#fafafa]"></div>
                <h3 className="font-display mb-2 text-[18px] font-medium text-[#241c10]">
                  Product {(currentPage - 1) * 9 + i + 1}
                </h3>
                <p className="text-sm text-[#63605a]">$29.99</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    )
  },
}
