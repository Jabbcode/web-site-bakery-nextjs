import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Link } from './Link'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'light', 'underline', 'nav'],
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
}

export const Primary: Story = {
  args: {
    href: '#',
    variant: 'primary',
    children: 'Primary Link',
  },
}

export const Accent: Story = {
  args: {
    href: '#',
    variant: 'accent',
    children: 'Accent Link',
  },
}

export const Light: Story = {
  args: {
    href: '#',
    variant: 'light',
    children: 'Light Link',
  },
}

export const Underline: Story = {
  args: {
    href: '#',
    variant: 'underline',
    children: 'Underlined Link',
  },
}

export const Nav: Story = {
  args: {
    href: '#',
    variant: 'nav',
    children: 'Navigation Link',
  },
}

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: 'External Link',
  },
}

export const AllVariants: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">Variants</h3>
        <div className="flex flex-col gap-3">
          <Link href="#" variant="default">
            Default Link (dark → accent on hover)
          </Link>
          <Link href="#" variant="primary">
            Primary Link (primary → primary-hover)
          </Link>
          <Link href="#" variant="accent">
            Accent Link (accent → accent-hover)
          </Link>
          <Link href="#" variant="light">
            Light Link (text → dark)
          </Link>
          <Link href="#" variant="underline">
            Underlined Link (shows underline on hover)
          </Link>
          <Link href="#" variant="nav">
            NAVIGATION LINK
          </Link>
        </div>
      </div>
      <div>
        <h3 className="text-dark mb-4 text-sm font-medium">In Context</h3>
        <div className="flex flex-col gap-4">
          <p className="text-text">
            This is a paragraph with an{' '}
            <Link href="#" variant="underline">
              inline link
            </Link>{' '}
            that shows underline on hover.
          </p>
          <nav className="flex gap-6">
            <Link href="/" variant="nav">
              Home
            </Link>
            <Link href="/shop" variant="nav">
              Shop
            </Link>
            <Link href="/about" variant="nav">
              About
            </Link>
            <Link href="/contact" variant="nav">
              Contact
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="#" variant="primary">
              Learn More
            </Link>
            <Link href="https://example.com" variant="accent">
              External Link →
            </Link>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Footer: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <footer className="bg-[#fcf8ed] p-8">
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="font-display text-dark mb-3 text-lg font-medium">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link href="/about" variant="light">
              About Us
            </Link>
            <Link href="/products" variant="light">
              Our Products
            </Link>
            <Link href="/contact" variant="light">
              Contact
            </Link>
            <Link href="/faq" variant="light">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ),
}
