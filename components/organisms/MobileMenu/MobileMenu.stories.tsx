import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MobileMenu } from './MobileMenu'

const meta = {
  title: 'Organisms/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MobileMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#fcf8ed] p-4">
        <div className="shadow-card flex items-center justify-between rounded bg-white p-4">
          <span className="font-script text-[32px] text-[#241c10]">SwissDelight</span>
          <Story />
        </div>
        <div className="mt-4 p-4">
          <p className="text-[#63605a]">Click the hamburger menu to open the mobile navigation</p>
        </div>
      </div>
    ),
  ],
}

const navItemsWithSubmenu = [
  { label: 'Home', href: '/' },
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Products', href: '/shop' },
      { label: 'Cakes', href: '/shop/cakes' },
      { label: 'Pastries', href: '/shop/pastries' },
      { label: 'Bread', href: '/shop/bread' },
    ],
  },
  {
    label: 'Pages',
    href: '/pages',
    children: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Blog', href: '/blog' },
]

export const WithSubmenu: Story = {
  args: {
    items: navItemsWithSubmenu,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#fcf8ed] p-4">
        <div className="shadow-card flex items-center justify-between rounded bg-white p-4">
          <span className="font-script text-[32px] text-[#241c10]">SwissDelight</span>
          <Story />
        </div>
        <div className="mt-4 p-4">
          <p className="text-[#63605a]">
            This menu includes submenus. Click on items with arrows to expand them.
          </p>
        </div>
      </div>
    ),
  ],
}

export const InMobileHeader: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#fcf8ed]">
        {/* Mobile Header */}
        <header className="shadow-header sticky top-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="font-script text-[32px] text-[#241c10]">SwissDelight</span>
            <Story />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4">
          <h1 className="font-display text-h3 mb-4 text-[#241c10]">Page Content</h1>
          <p className="mb-4 text-[#63605a]">
            This demonstrates how the mobile menu works in a realistic mobile header context.
          </p>
          <div className="grid gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="shadow-card rounded bg-white p-6">
                <h3 className="font-display text-h6 mb-2 text-[#241c10]">Card {i}</h3>
                <p className="text-[#63605a]">Some content here</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
}
