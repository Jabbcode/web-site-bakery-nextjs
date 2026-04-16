import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showSeparator: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Chocolate',
    href: '#',
  },
}

export const WithoutSeparator: Story = {
  args: {
    children: 'Chocolate',
    href: '#',
    showSeparator: false,
  },
}

export const TagCloud: Story = {
  render: () => (
    <div className="max-w-md">
      <Tag href="#">Chocolate</Tag>
      <Tag href="#">Vanilla</Tag>
      <Tag href="#">Strawberry</Tag>
      <Tag href="#">Caramel</Tag>
      <Tag href="#">Cookies</Tag>
      <Tag href="#" showSeparator={false}>
        Cream
      </Tag>
    </div>
  ),
}

export const Categories: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">Product Categories</h3>
        <div>
          <Tag href="#">Cakes</Tag>
          <Tag href="#">Chocolates</Tag>
          <Tag href="#">Pastries</Tag>
          <Tag href="#" showSeparator={false}>
            Desserts
          </Tag>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-dark">Popular Tags</h3>
        <div>
          <Tag href="#">Birthday</Tag>
          <Tag href="#">Wedding</Tag>
          <Tag href="#">Anniversary</Tag>
          <Tag href="#">Special</Tag>
          <Tag href="#" showSeparator={false}>
            Custom
          </Tag>
        </div>
      </div>
    </div>
  ),
}
