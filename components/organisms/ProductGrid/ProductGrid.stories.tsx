import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { ProductGrid } from './ProductGrid'
import type { ProductCardProps } from '../ProductCard'

const meta = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>

export default meta
type Story = StoryObj<typeof meta>

const mockProducts: ProductCardProps[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  slug: `product-${i + 1}`,
  name: `Delicious Cake ${i + 1}`,
  image: `https://placehold.co/400x400/fcf8ed/241c10?text=Cake+${i + 1}`,
  price: 2999 + i * 100,
  originalPrice: i % 3 === 0 ? 3999 + i * 100 : undefined,
  rating: 4 + Math.random(),
  reviewCount: Math.floor(Math.random() * 20),
  isNew: i % 5 === 0,
  isFeatured: i % 7 === 0,
  inStock: i !== 3,
}))

export const Default: Story = {
  args: {
    products: mockProducts.slice(0, 6),
    onAddToCart: (id) => console.log('Add to cart:', id),
    onQuickView: (id) => console.log('Quick view:', id),
  },
}

export const Loading: Story = {
  args: {
    products: [],
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    products: [],
    emptyMessage: 'No products match your search',
  },
}

export const TwoColumns: Story = {
  args: {
    products: mockProducts.slice(0, 6),
    columns: 2,
    onAddToCart: (id) => console.log('Add to cart:', id),
    onQuickView: (id) => console.log('Quick view:', id),
  },
}

export const FourColumns: Story = {
  args: {
    products: mockProducts,
    columns: 4,
    onAddToCart: (id) => console.log('Add to cart:', id),
    onQuickView: (id) => console.log('Quick view:', id),
  },
}

export const WithPagination: Story = {
  args: {
    products: mockProducts.slice(0, 9),
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page changed to:', page),
    onAddToCart: (id) => console.log('Add to cart:', id),
    onQuickView: (id) => console.log('Quick view:', id),
  },
}

export const Interactive: Story = {
  args: {
    products: [],
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const totalPages = Math.ceil(mockProducts.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const currentProducts = mockProducts.slice(startIndex, startIndex + itemsPerPage)

    return (
      <div className="min-h-screen bg-[#fcf8ed] p-8">
        <div className="max-w-wide container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-display text-h2 text-[#241c10]">All Products</h1>
            <p className="font-body text-[15px] text-[#63605a]">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, mockProducts.length)} of{' '}
              {mockProducts.length} products
            </p>
          </div>

          <ProductGrid
            {...args}
            products={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onAddToCart={(id) => console.log('Add to cart:', id)}
            onQuickView={(id) => console.log('Quick view:', id)}
          />
        </div>
      </div>
    )
  },
}
