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
          'font-display hover:text-dark relative mr-[13px] mb-[11px] inline-block align-top text-[18px] leading-[1em] font-medium tracking-[0.01em] capitalize italic transition-colors duration-200',
          'after:relative after:right-[-7px] after:content-["/"]',
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
