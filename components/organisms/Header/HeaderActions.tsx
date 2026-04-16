'use client'

import { ShoppingCart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher, type Language } from '@/components/molecules/LanguageSwitcher'
import { CurrencySwitcher, type Currency } from '@/components/molecules/CurrencySwitcher'
import { Badge } from '@/components/atoms/Badge'

export interface HeaderActionsProps {
  cartItemCount?: number
  onCartClick?: () => void
  onUserClick?: () => void
  currentLanguage?: string
  languages?: Language[]
  onLanguageChange?: (code: string) => void
  currentCurrency?: string
  currencies?: Currency[]
  onCurrencyChange?: (code: string) => void
  showLanguageSwitcher?: boolean
  showCurrencySwitcher?: boolean
  className?: string
}

const defaultLanguages: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

const defaultCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'MXN', symbol: '$', label: 'Mexican Peso' },
]

export const HeaderActions = ({
  cartItemCount = 0,
  onCartClick,
  onUserClick,
  currentLanguage = 'en',
  languages = defaultLanguages,
  onLanguageChange = () => {},
  currentCurrency = 'USD',
  currencies = defaultCurrencies,
  onCurrencyChange = () => {},
  showLanguageSwitcher = true,
  showCurrencySwitcher = true,
  className,
}: HeaderActionsProps) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Language Switcher */}
      {showLanguageSwitcher && (
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          showIcon={false}
        />
      )}

      {/* Currency Switcher */}
      {showCurrencySwitcher && (
        <CurrencySwitcher
          currencies={currencies}
          currentCurrency={currentCurrency}
          onCurrencyChange={onCurrencyChange}
          showIcon={false}
        />
      )}

      {/* Cart Button */}
      <button
        type="button"
        onClick={onCartClick}
        className={cn(
          'relative inline-flex items-center justify-center p-2 text-[#241c10] transition-colors duration-200',
          'hover:text-[#ee2852]',
          'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
        )}
        aria-label={`Shopping cart with ${cartItemCount} items`}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1">
            <Badge variant="sale">{cartItemCount > 99 ? '99+' : cartItemCount}</Badge>
          </span>
        )}
      </button>

      {/* User Button */}
      <button
        type="button"
        onClick={onUserClick}
        className={cn(
          'inline-flex items-center justify-center p-2 text-[#241c10] transition-colors duration-200',
          'hover:text-[#ee2852]',
          'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
        )}
        aria-label="User account"
      >
        <User className="h-5 w-5" />
      </button>
    </div>
  )
}
