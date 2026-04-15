import type { Metadata } from 'next'
import { Cormorant, Heebo } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

const heebo = Heebo({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SwissDelight - Chocolate & Cake Shop',
  description: 'Premium chocolate and cake shop',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${heebo.variable}`}>
      <body>{children}</body>
    </html>
  )
}
