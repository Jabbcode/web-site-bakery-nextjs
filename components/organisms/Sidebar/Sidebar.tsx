'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'right'
  title?: string
  children: React.ReactNode
  className?: string
}

export const Sidebar = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  className,
}: SidebarProps) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-fade-in fixed inset-0 z-40 bg-[#241c10]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          'shadow-dropdown fixed top-0 z-50 h-full w-full max-w-md transform overflow-y-auto bg-white transition-transform duration-300',
          position === 'right' && 'right-0',
          position === 'left' && 'left-0',
          isOpen && position === 'right' && 'translate-x-0',
          !isOpen && position === 'right' && 'translate-x-full',
          isOpen && position === 'left' && 'translate-x-0',
          !isOpen && position === 'left' && '-translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Sidebar'}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-[#dadada] p-6">
            <h2 className="font-display text-[27px] font-medium text-[#241c10]">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'inline-flex items-center justify-center p-2 text-[#241c10] transition-colors',
                'hover:text-[#ee2852]',
                'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
              )}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className={cn('p-6', !title && 'pt-12')}>
          {!title && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 inline-flex items-center justify-center p-2 text-[#241c10] transition-colors',
                'hover:text-[#ee2852]',
                'focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
              )}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
