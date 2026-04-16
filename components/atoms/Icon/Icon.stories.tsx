import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Star,
  ChevronRight,
  Check,
  X,
  Mail,
  Phone,
} from 'lucide-react'
import { Icon } from './Icon'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'dark', 'text', 'accent', 'gold', 'light', 'white'],
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: Heart,
  },
}

export const Primary: Story = {
  args: {
    icon: Heart,
    variant: 'primary',
  },
}

export const Accent: Story = {
  args: {
    icon: Heart,
    variant: 'accent',
  },
}

export const Small: Story = {
  args: {
    icon: Star,
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    icon: ShoppingCart,
    size: 'xl',
  },
}

export const AllSizes: Story = {
  args: {
    icon: Heart,
  },
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size="xs" />
        <span className="text-text text-xs">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size="sm" />
        <span className="text-text text-xs">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size="md" />
        <span className="text-text text-xs">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size="lg" />
        <span className="text-text text-xs">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Heart} size="xl" />
        <span className="text-text text-xs">xl</span>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  args: {
    icon: Heart,
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">Color Variants</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="default" />
            <span className="text-text text-xs">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="primary" />
            <span className="text-text text-xs">primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="dark" />
            <span className="text-text text-xs">dark</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="text" />
            <span className="text-text text-xs">text</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="accent" />
            <span className="text-text text-xs">accent</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="gold" />
            <span className="text-text text-xs">gold</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon icon={Heart} variant="light" />
            <span className="text-text text-xs">light</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">Common Icons</h3>
        <div className="flex flex-wrap gap-6">
          <Icon icon={Heart} size="lg" variant="accent" label="Favorite" />
          <Icon icon={ShoppingCart} size="lg" variant="dark" label="Cart" />
          <Icon icon={User} size="lg" variant="dark" label="Account" />
          <Icon icon={Search} size="lg" variant="text" label="Search" />
          <Icon icon={Star} size="lg" variant="gold" label="Rating" />
          <Icon icon={ChevronRight} size="lg" variant="text" label="Next" />
          <Icon icon={Check} size="lg" variant="primary" label="Confirmed" />
          <Icon icon={X} size="lg" variant="accent" label="Close" />
          <Icon icon={Mail} size="lg" variant="text" label="Email" />
          <Icon icon={Phone} size="lg" variant="text" label="Phone" />
        </div>
      </div>
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">In Context</h3>
        <div className="flex flex-col gap-4">
          <button className="text-dark hover:text-accent inline-flex items-center gap-2">
            <Icon icon={Heart} size="sm" />
            <span>Add to Wishlist</span>
          </button>
          <button className="text-dark inline-flex items-center gap-2 rounded border border-gray-300 px-4 py-2 hover:bg-gray-50">
            <Icon icon={ShoppingCart} size="sm" />
            <span>Add to Cart</span>
          </button>
          <div className="flex items-center gap-1">
            <Icon icon={Star} size="sm" variant="gold" />
            <Icon icon={Star} size="sm" variant="gold" />
            <Icon icon={Star} size="sm" variant="gold" />
            <Icon icon={Star} size="sm" variant="gold" />
            <Icon icon={Star} size="sm" variant="light" />
            <span className="text-text ml-2 text-sm">4.0</span>
          </div>
        </div>
      </div>
    </div>
  ),
}
