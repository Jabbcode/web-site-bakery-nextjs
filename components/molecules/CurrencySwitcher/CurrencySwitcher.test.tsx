import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CurrencySwitcher } from './CurrencySwitcher'

const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
]

describe('CurrencySwitcher', () => {
  it('renders current currency', () => {
    render(
      <CurrencySwitcher currencies={currencies} currentCurrency="USD" onCurrencyChange={() => {}} />
    )
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('shows dropdown when button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CurrencySwitcher currencies={currencies} currentCurrency="USD" onCurrencyChange={() => {}} />
    )

    const button = screen.getByLabelText('Select currency')
    await user.click(button)

    expect(screen.getByText('US Dollar')).toBeInTheDocument()
    expect(screen.getByText('Euro')).toBeInTheDocument()
    expect(screen.getByText('British Pound')).toBeInTheDocument()
  })

  it('calls onCurrencyChange when currency is selected', async () => {
    const user = userEvent.setup()
    const onCurrencyChange = vi.fn()
    render(
      <CurrencySwitcher
        currencies={currencies}
        currentCurrency="USD"
        onCurrencyChange={onCurrencyChange}
      />
    )

    const button = screen.getByLabelText('Select currency')
    await user.click(button)

    const euroOption = screen.getByText('Euro')
    await user.click(euroOption)

    expect(onCurrencyChange).toHaveBeenCalledWith('EUR')
  })

  it('closes dropdown after selecting a currency', async () => {
    const user = userEvent.setup()
    render(
      <CurrencySwitcher currencies={currencies} currentCurrency="USD" onCurrencyChange={() => {}} />
    )

    const button = screen.getByLabelText('Select currency')
    await user.click(button)

    const euroOption = screen.getByText('Euro')
    await user.click(euroOption)

    expect(screen.queryByText('US Dollar')).not.toBeInTheDocument()
  })

  it('shows dollar sign icon by default', () => {
    render(
      <CurrencySwitcher currencies={currencies} currentCurrency="USD" onCurrencyChange={() => {}} />
    )
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('hides icon when showIcon is false', () => {
    render(
      <CurrencySwitcher
        currencies={currencies}
        currentCurrency="USD"
        onCurrencyChange={() => {}}
        showIcon={false}
      />
    )
    // Should only have chevron icon
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBe(1)
  })

  it('highlights current currency in dropdown', async () => {
    const user = userEvent.setup()
    render(
      <CurrencySwitcher currencies={currencies} currentCurrency="USD" onCurrencyChange={() => {}} />
    )

    const button = screen.getByLabelText('Select currency')
    await user.click(button)

    const usdOption = screen.getByText('US Dollar').closest('button')
    expect(usdOption).toHaveClass('font-medium')
  })

  it('displays currency symbols in dropdown', async () => {
    const user = userEvent.setup()
    render(
      <CurrencySwitcher currencies={currencies} currentCurrency="USD" onCurrencyChange={() => {}} />
    )

    const button = screen.getByLabelText('Select currency')
    await user.click(button)

    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('€')).toBeInTheDocument()
    expect(screen.getByText('£')).toBeInTheDocument()
  })
})
