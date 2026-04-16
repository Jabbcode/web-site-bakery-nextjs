import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProductCard } from './ProductCard'

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '1',
    slug: 'chocolate-cake',
    name: 'Swiss Chocolate Delight Cake',
    image: 'https://placehold.co/400x400/fcf8ed/241c10?text=Cake',
    imageAlt: 'Swiss Chocolate Delight Cake',
    price: 2999,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 12,
    inStock: true,
    onAddToCart: (id) => console.log('Add to cart:', id),
    onQuickView: (id) => console.log('Quick view:', id),
  },
}

export const WithDiscount: Story = {
  args: {
    ...Default.args,
    originalPrice: 3999,
  },
}

export const NewProduct: Story = {
  args: {
    ...Default.args,
    isNew: true,
  },
}

export const FeaturedProduct: Story = {
  args: {
    ...Default.args,
    isFeatured: true,
  },
}

export const OutOfStock: Story = {
  args: {
    ...Default.args,
    inStock: false,
  },
}

export const NoRating: Story = {
  args: {
    ...Default.args,
    rating: 0,
    reviewCount: 0,
  },
}

export const MultipleProducts: Story = {
  args: {
    id: '1',
    slug: 'product',
    name: 'Product',
    image: '',
    price: 0,
  },
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        id="1"
        slug="chocolate-cake"
        name="Swiss Chocolate Cake"
        image="https://placehold.co/400x400/fcf8ed/241c10?text=Chocolate"
        price={2999}
        originalPrice={3999}
        rating={4.5}
        reviewCount={12}
        isNew
        inStock
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onQuickView={(id) => console.log('Quick view:', id)}
      />
      <ProductCard
        id="2"
        slug="vanilla-cake"
        name="Classic Vanilla Cake"
        image="https://placehold.co/400x400/fcf8ed/241c10?text=Vanilla"
        price={2499}
        rating={4.8}
        reviewCount={24}
        isFeatured
        inStock
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onQuickView={(id) => console.log('Quick view:', id)}
      />
      <ProductCard
        id="3"
        slug="strawberry-cake"
        name="Fresh Strawberry Cake"
        image="https://placehold.co/400x400/fcf8ed/241c10?text=Strawberry"
        price={3499}
        rating={4.3}
        reviewCount={8}
        inStock={false}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onQuickView={(id) => console.log('Quick view:', id)}
      />
    </div>
  ),
}

export const InGrid: Story = {
  args: {
    id: '1',
    slug: 'product',
    name: 'Product',
    image: '',
    price: 0,
  },
  render: () => (
    <div className="min-h-screen bg-[#fcf8ed] p-8">
      <div className="max-w-wide container mx-auto">
        <h1 className="font-display text-h2 mb-8 text-[#241c10]">Featured Products</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCard
              key={i}
              id={`${i}`}
              slug={`product-${i}`}
              name={`Delicious Cake ${i}`}
              image={`https://placehold.co/400x400/fcf8ed/241c10?text=Cake+${i}`}
              price={2999 + i * 100}
              originalPrice={i % 3 === 0 ? 3999 + i * 100 : undefined}
              rating={4 + Math.random()}
              reviewCount={Math.floor(Math.random() * 20)}
              isNew={i % 4 === 0}
              isFeatured={i % 5 === 0}
              inStock={i !== 3}
              onAddToCart={(id) => console.log('Add to cart:', id)}
              onQuickView={(id) => console.log('Quick view:', id)}
            />
          ))}
        </div>
      </div>
    </div>
  ),
}
