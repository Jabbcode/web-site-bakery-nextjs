'use client'

import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TagProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  showSeparator?: boolean
}

export const Tag = forwardRef<HTMLAnchorElement, TagProps>(
  ({ className, children, showSeparator = true, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          // EXACTO SwissDelight .widget .tagcloud a
          'relative inline-block align-top font-display text-[18px] font-medium italic leading-[1em] capitalize tracking-[0.01em] mr-[13px] mb-[11px] transition-colors duration-200 hover:text-dark',
          'after:content-["/"] after:relative after:right-[-7px]',
          !showSeparator && 'after:hidden',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Tag.displayName = 'Tag'
