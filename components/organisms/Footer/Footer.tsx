'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  columns?: FooterColumn[]
  showNewsletter?: boolean
  showSocial?: boolean
  copyrightText?: string
  className?: string
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Cakes', href: '/shop/cakes' },
      { label: 'Pastries', href: '/shop/pastries' },
      { label: 'Bread', href: '/shop/bread' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]

export const Footer = ({
  columns = defaultColumns,
  showNewsletter = true,
  showSocial = true,
  copyrightText = '© 2025 SwissDelight. All rights reserved.',
  className,
}: FooterProps) => {
  return (
    <footer className={cn('bg-[#fcf8ed]', className)} role="contentinfo">
      {/* Top Area */}
      <div className="border-b border-[#dadada]">
        <div className="max-w-wide container mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="font-script mb-6 inline-block text-[40px] leading-none text-[#241c10]"
              >
                SwissDelight
              </Link>
              <p className="font-body mb-6 text-[15px] leading-[1.66em] text-[#63605a]">
                Crafting artisanal cakes and pastries with Swiss precision and love since 1985.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#988779]" />
                  <span className="font-body text-[14px] text-[#63605a]">
                    123 Baker Street, Zurich, Switzerland
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#988779]" />
                  <span className="font-body text-[14px] text-[#63605a]">+41 44 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#988779]" />
                  <span className="font-body text-[14px] text-[#63605a]">
                    hello@swissdelight.ch
                  </span>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display mb-6 text-[21px] font-medium text-[#241c10]">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-[15px] text-[#63605a] transition-colors hover:text-[#241c10]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Column */}
            {showNewsletter && (
              <div>
                <h3 className="font-display mb-6 text-[21px] font-medium text-[#241c10]">
                  Newsletter
                </h3>
                <p className="font-body mb-4 text-[15px] text-[#63605a]">
                  Subscribe to get special offers and updates.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={cn(
                      'w-full border border-[#dadada] bg-white px-4 py-3',
                      'font-body text-[15px] text-[#241c10] placeholder:text-[#63605a]',
                      'transition-colors duration-200',
                      'hover:border-[#241c10]',
                      'focus:border-[#241c10] focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
                    )}
                  />
                  <button
                    type="submit"
                    className={cn(
                      'font-body w-full bg-[#241c10] px-6 py-3 text-[13px] font-medium tracking-[0.15em] text-white uppercase',
                      'transition-colors duration-200',
                      'hover:bg-[#ee2852]',
                      'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
                    )}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="bg-[#fcf8ed]">
        <div className="max-w-wide container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="font-body text-[14px] text-[#63605a]">{copyrightText}</p>

            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[14px] text-[#63605a] transition-colors hover:text-[#241c10]"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[14px] text-[#63605a] transition-colors hover:text-[#241c10]"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[14px] text-[#63605a] transition-colors hover:text-[#241c10]"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
