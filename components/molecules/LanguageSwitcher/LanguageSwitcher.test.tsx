import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSwitcher } from './LanguageSwitcher'

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

describe('LanguageSwitcher', () => {
  it('renders current language', () => {
    render(
      <LanguageSwitcher languages={languages} currentLanguage="en" onLanguageChange={() => {}} />
    )
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('shows dropdown when button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <LanguageSwitcher languages={languages} currentLanguage="en" onLanguageChange={() => {}} />
    )

    const button = screen.getByLabelText('Select language')
    await user.click(button)

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('calls onLanguageChange when language is selected', async () => {
    const user = userEvent.setup()
    const onLanguageChange = vi.fn()
    render(
      <LanguageSwitcher
        languages={languages}
        currentLanguage="en"
        onLanguageChange={onLanguageChange}
      />
    )

    const button = screen.getByLabelText('Select language')
    await user.click(button)

    const spanishOption = screen.getByText('Español')
    await user.click(spanishOption)

    expect(onLanguageChange).toHaveBeenCalledWith('es')
  })

  it('closes dropdown after selecting a language', async () => {
    const user = userEvent.setup()
    render(
      <LanguageSwitcher languages={languages} currentLanguage="en" onLanguageChange={() => {}} />
    )

    const button = screen.getByLabelText('Select language')
    await user.click(button)

    const spanishOption = screen.getByText('Español')
    await user.click(spanishOption)

    expect(screen.queryByText('English')).not.toBeInTheDocument()
  })

  it('shows globe icon by default', () => {
    render(
      <LanguageSwitcher languages={languages} currentLanguage="en" onLanguageChange={() => {}} />
    )
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('hides globe icon when showIcon is false', () => {
    render(
      <LanguageSwitcher
        languages={languages}
        currentLanguage="en"
        onLanguageChange={() => {}}
        showIcon={false}
      />
    )
    // Should still have chevron icon
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBe(1)
  })

  it('highlights current language in dropdown', async () => {
    const user = userEvent.setup()
    render(
      <LanguageSwitcher languages={languages} currentLanguage="en" onLanguageChange={() => {}} />
    )

    const button = screen.getByLabelText('Select language')
    await user.click(button)

    const englishOption = screen.getByText('English').closest('button')
    expect(englishOption).toHaveClass('font-medium')
  })

  it('renders language flags when provided', async () => {
    const user = userEvent.setup()
    render(
      <LanguageSwitcher languages={languages} currentLanguage="en" onLanguageChange={() => {}} />
    )

    const button = screen.getByLabelText('Select language')
    await user.click(button)

    expect(screen.getByText('🇺🇸')).toBeInTheDocument()
    expect(screen.getByText('🇪🇸')).toBeInTheDocument()
  })
})
