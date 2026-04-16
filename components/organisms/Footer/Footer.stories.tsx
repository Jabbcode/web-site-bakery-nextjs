import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Footer } from './Footer'

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutNewsletter: Story = {
  args: {
    showNewsletter: false,
  },
}

export const WithoutSocial: Story = {
  args: {
    showSocial: false,
  },
}

export const Minimal: Story = {
  args: {
    showNewsletter: false,
    showSocial: false,
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Shop', href: '/shop' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
  },
}

export const CustomCopyright: Story = {
  args: {
    copyrightText: '© 2025 My Bakery. Handcrafted with ❤️',
  },
}

export const InPage: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        {/* Page Content */}
        <div className="max-w-wide container mx-auto px-4 py-12">
          <h1 className="font-display text-h2 mb-8 text-[#241c10]">Page Content</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded bg-[#fcf8ed] p-6">
                <h3 className="font-display text-h5 mb-2 text-[#241c10]">Card {i}</h3>
                <p className="text-[#63605a]">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Story />
      </div>
    ),
  ],
}
