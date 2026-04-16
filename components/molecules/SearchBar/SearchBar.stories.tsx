import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'Search products...',
    value: 'chocolate cake',
  },
}

export const WithClearButton: Story = {
  args: {
    placeholder: 'Search products...',
    value: 'chocolate cake',
    showClearButton: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Search products...',
    disabled: true,
  },
}

export const Interactive: Story = {
  args: {
    placeholder: 'Search products...',
  },
  render: (args) => {
    const [value, setValue] = useState('')

    return (
      <div className="flex max-w-xl flex-col gap-4">
        <SearchBar
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showClearButton
          onClear={() => setValue('')}
        />
        {value && (
          <p className="text-sm text-[#63605a]">
            Searching for: <strong>{value}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const Sizes: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-[#241c10]">Full Width</h3>
        <SearchBar placeholder="Search products..." />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-[#241c10]">Medium</h3>
        <div className="max-w-md">
          <SearchBar placeholder="Search products..." />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-[#241c10]">Small</h3>
        <div className="max-w-xs">
          <SearchBar placeholder="Search..." />
        </div>
      </div>
    </div>
  ),
}
