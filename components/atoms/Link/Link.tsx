'use client'

import { forwardRef, type AnchorHTMLAttributes } from 'react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const linkVariants = cva(
  // Base - EXACTO SwissDelight a
  'inline-block no-underline transition-colors duration-[0.2s] ease-out',
  {
    variants: {
      variant: {
        default: 'text-[#241c10] hover:text-[#ee2852]',
        primary: 'text-[#988779] hover:text-[#7a6d62]',
        accent: 'text-[#ee2852] hover:text-[#d31e45]',
        light: 'text-[#63605a] hover:text-[#241c10]',
        underline: 'text-[#241c10] underline-offset-4 hover:underline hover:text-[#ee2852]',
        nav: 'text-[#241c10] hover:text-[#ee2852] uppercase tracking-wide text-sm font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    Omit<NextLinkProps, 'as' | 'passHref'>,
    VariantProps<typeof linkVariants> {
  external?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, className, children, external, href, ...props }, ref) => {
    const isExternal = external || (typeof href === 'string' && href.startsWith('http'))

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href as string}
          className={cn(linkVariants({ variant, className }))}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, className }))}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'
