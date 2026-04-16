import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { StarRating } from './StarRating'

const meta = {
  title: 'Molecules/StarRating',
  component: StarRating,
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
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rating: 4,
  },
}

export const FullRating: Story = {
  args: {
    rating: 5,
  },
}

export const HalfRating: Story = {
  args: {
    rating: 3.5,
  },
}

export const WithCount: Story = {
  args: {
    rating: 4.5,
    showCount: true,
    count: 127,
  },
}

export const SmallSize: Story = {
  args: {
    rating: 4,
    size: 'sm',
    showCount: true,
    count: 45,
  },
}

export const LargeSize: Story = {
  args: {
    rating: 4.5,
    size: 'lg',
    showCount: true,
    count: 289,
  },
}

export const Interactive: Story = {
  args: {
    rating: 0,
    interactive: true,
  },
  render: (args) => {
    const [rating, setRating] = useState(args.rating)

    return (
      <div className="flex flex-col items-center gap-4">
        <StarRating {...args} rating={rating} onChange={setRating} />
        <p className="text-sm text-[#63605a]">
          {rating > 0 ? `You rated: ${rating} stars` : 'Click to rate'}
        </p>
      </div>
    )
  },
}

export const AllVariants: Story = {
  args: {
    rating: 4,
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">Sizes</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">Small:</span>
            <StarRating rating={4} size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">Medium:</span>
            <StarRating rating={4} size="md" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">Large:</span>
            <StarRating rating={4} size="lg" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">Different Ratings</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">5.0:</span>
            <StarRating rating={5} showCount count={234} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">4.5:</span>
            <StarRating rating={4.5} showCount count={189} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">4.0:</span>
            <StarRating rating={4} showCount count={127} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">3.5:</span>
            <StarRating rating={3.5} showCount count={89} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-[#63605a]">3.0:</span>
            <StarRating rating={3} showCount count={45} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-[#241c10]">Product Card Example</h3>
        <div className="max-w-sm rounded border border-[#dadada] p-6">
          <div className="mb-4 aspect-square w-full bg-[#fafafa]"></div>
          <h4 className="font-display mb-2 text-[21px] font-medium text-[#241c10]">
            Chocolate Delight Cake
          </h4>
          <div className="mb-4 flex items-center justify-between">
            <StarRating rating={4.5} size="sm" showCount count={127} />
            <span className="font-display text-[27px] font-medium text-[#ee2852]">$34.99</span>
          </div>
          <p className="text-sm text-[#63605a]">
            Rich chocolate cake with premium frosting and decorations
          </p>
        </div>
      </div>
    </div>
  ),
}
