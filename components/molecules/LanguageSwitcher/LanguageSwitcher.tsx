'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Language {
  code: string
  label: string
  flag?: string
}

export interface LanguageSwitcherProps {
  languages: Language[]
  currentLanguage: string
  onLanguageChange: (languageCode: string) => void
  className?: string
  showIcon?: boolean
}

export const LanguageSwitcher = ({
  languages,
  currentLanguage,
  onLanguageChange,
  className,
  showIcon = true,
}: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (code: string) => {
    onLanguageChange(code)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'font-body inline-flex items-center gap-2 border border-[#dadada] bg-white px-4 py-2.5 text-[15px] text-[#241c10] transition-colors duration-200',
          'hover:border-[#241c10]',
          'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {showIcon && <Globe className="h-4 w-4" />}
        <span className="uppercase">{currentLang?.code || 'EN'}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'shadow-dropdown absolute top-full right-0 z-50 mt-1 min-w-[150px] border border-[#dadada] bg-white',
            'animate-fade-in'
          )}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleLanguageSelect(language.code)}
              className={cn(
                'font-body flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors',
                language.code === currentLanguage
                  ? 'bg-[#fafafa] font-medium text-[#241c10]'
                  : 'text-[#63605a] hover:bg-[#fafafa] hover:text-[#241c10]'
              )}
            >
              {language.flag && <span className="text-lg">{language.flag}</span>}
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
