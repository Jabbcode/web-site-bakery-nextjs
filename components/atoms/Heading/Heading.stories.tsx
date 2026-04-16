import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Heading } from './Heading'

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Swiss Delight',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Premium Chocolate',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Our Collection',
  },
}

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'Featured Products',
  },
}

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'Categories',
  },
}

export const H6: Story = {
  args: {
    variant: 'h6',
    children: 'Product Details',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div>
        <Heading variant="h1">Heading 1 - Swiss Delight</Heading>
        <p className="text-text/70 text-sm">78px, font-light, Cormorant</p>
      </div>
      <div>
        <Heading variant="h2">Heading 2 - Premium Chocolate</Heading>
        <p className="text-text/70 text-sm">67px, font-light, Cormorant</p>
      </div>
      <div>
        <Heading variant="h3">Heading 3 - Our Collection</Heading>
        <p className="text-text/70 text-sm">38px, font-normal, Cormorant</p>
      </div>
      <div>
        <Heading variant="h4">Heading 4 - Featured Products</Heading>
        <p className="text-text/70 text-sm">33px, font-medium, Cormorant</p>
      </div>
      <div>
        <Heading variant="h5">Heading 5 - Categories</Heading>
        <p className="text-text/70 text-sm">27px, font-medium, Cormorant</p>
      </div>
      <div>
        <Heading variant="h6">Heading 6 - Product Details</Heading>
        <p className="text-text/70 text-sm">21px, font-semibold, Cormorant</p>
      </div>
    </div>
  ),
}

export const SemanticHTML: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Heading variant="h1" as="h1">
        This renders as {'<h1>'} tag
      </Heading>
      <Heading variant="h2" as="div">
        This is h2 style but renders as {'<div>'}
      </Heading>
      <Heading variant="h3">Default renders as h3 tag when variant is h3</Heading>
    </div>
  ),
}
