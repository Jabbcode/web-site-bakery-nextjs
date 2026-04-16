import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Header } from './Header'

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    sticky: true,
  },
}

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#fcf8ed]">
        <Story />
        <div className="p-8">
          <p className="text-[#63605a]">
            Scroll down to see the header become sticky and change background
          </p>
          <div className="mt-4 h-[150vh] bg-white p-8">
            <h2 className="font-display text-h3 text-[#241c10]">Page Content</h2>
          </div>
        </div>
      </div>
    ),
  ],
}

export const NonSticky: Story = {
  args: {
    variant: 'default',
    sticky: false,
  },
}

export const WithContent: Story = {
  args: {
    variant: 'default',
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#fcf8ed]">
        <Story />
        <div className="max-w-wide container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="shadow-card rounded bg-white p-6">
                <h3 className="font-display text-h5 mb-2 text-[#241c10]">Product {i}</h3>
                <p className="text-[#63605a]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 h-[100vh]">
            <p className="text-[#63605a]">Scroll to test sticky header behavior</p>
          </div>
        </div>
      </div>
    ),
  ],
}
