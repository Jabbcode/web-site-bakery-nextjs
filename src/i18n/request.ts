import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Import messages statically
import esMessages from '../../public/locales/es.json'
import enMessages from '../../public/locales/en.json'

const messages = {
  es: esMessages,
  en: enMessages,
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as 'en' | 'es')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  }
})
