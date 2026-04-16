import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'small', 'large', 'muted'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

const loremText =
  'Swiss Delight offers premium handcrafted chocolates and cakes made with the finest ingredients. Each piece is carefully crafted to perfection.'

export const Body: Story = {
  args: {
    variant: 'body',
    children: loremText,
  },
}

export const Small: Story = {
  args: {
    variant: 'small',
    children: loremText,
  },
}

export const Large: Story = {
  args: {
    variant: 'large',
    children: loremText,
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: loremText,
  },
}

export const Centered: Story = {
  args: {
    variant: 'body',
    align: 'center',
    children: loremText,
  },
}

export const RightAligned: Story = {
  args: {
    variant: 'body',
    align: 'right',
    children: loremText,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium text-dark">Body (Default)</h3>
        <Text variant="body">{loremText}</Text>
        <p className="text-sm text-text/70">15px, line-height 1.66em, Heebo</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-dark">Small</h3>
        <Text variant="small">{loremText}</Text>
        <p className="text-sm text-text/70">14px, Heebo</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-dark">Large</h3>
        <Text variant="large">{loremText}</Text>
        <p className="text-sm text-text/70">18px, Heebo</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-dark">Muted</h3>
        <Text variant="muted">{loremText}</Text>
        <p className="text-sm text-text/70">15px, 70% opacity</p>
      </div>
    </div>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <Text align="left">{loremText}</Text>
      <Text align="center">{loremText}</Text>
      <Text align="right">{loremText}</Text>
    </div>
  ),
}

export const SemanticHTML: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text as="p">This renders as {'<p>'} tag (default)</Text>
      <Text as="span">This renders as {'<span>'} tag</Text>
      <Text as="div">This renders as {'<div>'} tag</Text>
    </div>
  ),
}
