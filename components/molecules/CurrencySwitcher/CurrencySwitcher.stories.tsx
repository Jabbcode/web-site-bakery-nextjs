import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { CurrencySwitcher } from './CurrencySwitcher'

const meta = {
  title: 'Molecules/CurrencySwitcher',
  component: CurrencySwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CurrencySwitcher>

export default meta
type Story = StoryObj<typeof meta>

const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'MXN', symbol: '$', label: 'Mexican Peso' },
]

export const Default: Story = {
  args: {
    currencies,
    currentCurrency: 'USD',
    onCurrencyChange: () => {},
  },
}

export const Euro: Story = {
  args: {
    currencies,
    currentCurrency: 'EUR',
    onCurrencyChange: () => {},
  },
}

export const WithoutIcon: Story = {
  args: {
    currencies,
    currentCurrency: 'USD',
    showIcon: false,
    onCurrencyChange: () => {},
  },
}

export const Interactive: Story = {
  args: {
    currencies,
    currentCurrency: 'USD',
    onCurrencyChange: () => {},
  },
  render: (args) => {
    const [currentCurrency, setCurrentCurrency] = useState(args.currentCurrency)
    const selectedCurr = args.currencies.find((c) => c.code === currentCurrency)

    return (
      <div className="flex flex-col items-center gap-6">
        <CurrencySwitcher
          {...args}
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
        />
        <p className="text-sm text-[#63605a]">
          Selected: <strong>{selectedCurr?.label}</strong> ({selectedCurr?.symbol})
        </p>
      </div>
    )
  },
}

export const WithPriceExample: Story = {
  args: {
    currencies,
    currentCurrency: 'USD',
    onCurrencyChange: () => {},
  },
  render: (args) => {
    const [currentCurrency, setCurrentCurrency] = useState(args.currentCurrency)
    const selectedCurr = args.currencies.find((c) => c.code === currentCurrency)

    const prices: Record<string, number> = {
      USD: 29.99,
      EUR: 27.5,
      GBP: 23.99,
      MXN: 549.99,
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between rounded border border-[#dadada] p-6">
          <div>
            <h3 className="font-display mb-2 text-[21px] font-medium text-[#241c10]">
              Chocolate Cake
            </h3>
            <p className="font-display text-[33px] font-medium text-[#ee2852]">
              {selectedCurr?.symbol}
              {prices[currentCurrency]?.toFixed(2)}
            </p>
          </div>
          <CurrencySwitcher
            {...args}
            currentCurrency={currentCurrency}
            onCurrencyChange={setCurrentCurrency}
          />
        </div>
      </div>
    )
  },
}

export const InHeader: Story = {
  args: {
    currencies,
    currentCurrency: 'USD',
    onCurrencyChange: () => {},
  },
  render: (args) => {
    const [currentCurrency, setCurrentCurrency] = useState(args.currentCurrency)
    const [currentLanguage, setCurrentLanguage] = useState('en')

    return (
      <div className="w-full border-b border-[#dadada] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="font-script text-[32px] text-[#241c10]">SwissDelight</div>
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <a href="#" className="font-body text-[15px] text-[#241c10] hover:text-[#ee2852]">
                Shop
              </a>
              <a href="#" className="font-body text-[15px] text-[#241c10] hover:text-[#ee2852]">
                About
              </a>
              <a href="#" className="font-body text-[15px] text-[#241c10] hover:text-[#ee2852]">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <CurrencySwitcher
                {...args}
                currentCurrency={currentCurrency}
                onCurrencyChange={setCurrentCurrency}
              />
              <button
                onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'es' : 'en')}
                className="font-body inline-flex items-center gap-2 border border-[#dadada] bg-white px-4 py-2.5 text-[15px] text-[#241c10] transition-colors hover:border-[#241c10]"
              >
                <span className="uppercase">{currentLanguage}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
