import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProductPrice } from './ProductPrice'

const meta = {
  title: 'Molecules/ProductPrice',
  component: ProductPrice,
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
      options: ['default', 'accent', 'primary'],
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'MXN'],
    },
  },
} satisfies Meta<typeof ProductPrice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: 29.99,
  },
}

export const WithDiscount: Story = {
  args: {
    price: 24.99,
    originalPrice: 34.99,
  },
}

export const WithDiscountBadge: Story = {
  args: {
    price: 19.99,
    originalPrice: 39.99,
    discountBadge: true,
  },
}

export const SmallSize: Story = {
  args: {
    price: 15.99,
    originalPrice: 25.99,
    size: 'sm',
    discountBadge: true,
  },
}

export const LargeSize: Story = {
  args: {
    price: 49.99,
    originalPrice: 79.99,
    size: 'lg',
    discountBadge: true,
  },
}

export const DifferentCurrencies: Story = {
  args: {
    price: 29.99,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ProductPrice price={29.99} currency="USD" />
      <ProductPrice price={29.99} currency="EUR" />
      <ProductPrice price={29.99} currency="GBP" />
      <ProductPrice price={599.99} currency="MXN" />
    </div>
  ),
}

export const AllVariants: Story = {
  args: {
    price: 29.99,
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">Sizes</h3>
        <div className="flex flex-col gap-4">
          <ProductPrice price={29.99} size="sm" />
          <ProductPrice price={29.99} size="md" />
          <ProductPrice price={29.99} size="lg" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">With Discount</h3>
        <div className="flex flex-col gap-4">
          <ProductPrice price={24.99} originalPrice={34.99} size="sm" />
          <ProductPrice price={24.99} originalPrice={34.99} size="md" discountBadge />
          <ProductPrice price={24.99} originalPrice={34.99} size="lg" discountBadge />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">Color Variants</h3>
        <div className="flex flex-col gap-4">
          <ProductPrice price={29.99} variant="default" />
          <ProductPrice price={29.99} variant="accent" />
          <ProductPrice price={29.99} variant="primary" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">Product Card Example</h3>
        <div className="max-w-sm rounded border border-[#dadada] p-6">
          <div className="mb-4 aspect-square w-full bg-[#fafafa]"></div>
          <h4 className="font-display mb-2 text-[21px] font-medium text-[#241c10]">
            Chocolate Delight Cake
          </h4>
          <p className="mb-4 text-sm text-[#63605a]">Rich chocolate cake with premium frosting</p>
          <ProductPrice price={34.99} originalPrice={49.99} discountBadge />
        </div>
      </div>
    </div>
  ),
}
