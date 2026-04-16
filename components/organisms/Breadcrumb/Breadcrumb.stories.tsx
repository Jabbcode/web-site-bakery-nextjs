import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Organisms/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Cakes', href: '/shop/cakes' },
      { label: 'Chocolate Cake' },
    ],
  },
}

export const WithoutHome: Story = {
  args: {
    showHome: false,
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Products', href: '/shop/products' },
      { label: 'Product Name' },
    ],
  },
}

export const ShortPath: Story = {
  args: {
    items: [{ label: 'About' }],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Categories', href: '/shop/categories' },
      { label: 'Cakes', href: '/shop/categories/cakes' },
      { label: 'Special Occasions', href: '/shop/categories/cakes/special' },
      { label: 'Wedding Cakes', href: '/shop/categories/cakes/special/wedding' },
      { label: 'Classic White Wedding Cake' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Cakes', href: '/shop/cakes' },
      { label: 'Chocolate Cake' },
    ],
    separator: <span>/</span>,
  },
}

export const InPageContext: Story = {
  args: {
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Cakes', href: '/shop/cakes' },
      { label: 'Swiss Chocolate Delight Cake' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#fcf8ed]">
        <div className="max-w-wide container mx-auto px-4">
          <Story />
          <div className="py-8">
            <h1 className="font-display text-h2 mb-4 text-[#241c10]">
              Swiss Chocolate Delight Cake
            </h1>
            <p className="text-[#63605a]">
              A rich and decadent chocolate cake made with premium Swiss chocolate, layered with
              silky chocolate ganache and topped with chocolate shavings.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
}
