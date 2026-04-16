import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'

const meta = {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

export const Default: Story = {
  args: {
    languages,
    currentLanguage: 'en',
    onLanguageChange: () => {},
  },
}

export const Spanish: Story = {
  args: {
    languages,
    currentLanguage: 'es',
    onLanguageChange: () => {},
  },
}

export const WithoutIcon: Story = {
  args: {
    languages,
    currentLanguage: 'en',
    showIcon: false,
    onLanguageChange: () => {},
  },
}

export const MoreLanguages: Story = {
  args: {
    languages: [
      { code: 'en', label: 'English', flag: '🇺🇸' },
      { code: 'es', label: 'Español', flag: '🇪🇸' },
      { code: 'fr', label: 'Français', flag: '🇫🇷' },
      { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    ],
    currentLanguage: 'en',
    onLanguageChange: () => {},
  },
}

export const Interactive: Story = {
  args: {
    languages,
    currentLanguage: 'en',
    onLanguageChange: () => {},
  },
  render: (args) => {
    const [currentLanguage, setCurrentLanguage] = useState(args.currentLanguage)

    return (
      <div className="flex flex-col items-center gap-6">
        <LanguageSwitcher
          {...args}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
        <p className="text-sm text-[#63605a]">
          Selected language: <strong>{currentLanguage.toUpperCase()}</strong>
        </p>
      </div>
    )
  },
}

export const InHeader: Story = {
  args: {
    languages,
    currentLanguage: 'en',
    onLanguageChange: () => {},
  },
  render: (args) => {
    const [currentLanguage, setCurrentLanguage] = useState(args.currentLanguage)

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
            <LanguageSwitcher
              {...args}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </div>
    )
  },
}
