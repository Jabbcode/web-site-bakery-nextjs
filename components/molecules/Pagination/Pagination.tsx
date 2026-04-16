'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisiblePages?: number
  className?: string
  showFirstLast?: boolean
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
  showFirstLast = true,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)

    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages)
    }

    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const buttonBaseClass =
    'inline-flex h-11 min-w-[44px] items-center justify-center border border-[#dadada] bg-white px-3 font-body text-[15px] text-[#241c10] transition-colors duration-200 hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white'

  const pageButtonClass = (isActive: boolean) =>
    cn(buttonBaseClass, isActive && 'border-[#241c10] bg-[#241c10] text-white hover:bg-[#241c10]')

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonBaseClass}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* First Page (if not visible) */}
      {showFirstLast && currentPage > maxVisiblePages && (
        <>
          <button
            type="button"
            onClick={() => handlePageClick(1)}
            className={pageButtonClass(false)}
            aria-label="Go to page 1"
          >
            1
          </button>
          {currentPage > maxVisiblePages + 1 && (
            <span className="inline-flex h-11 min-w-[44px] items-center justify-center px-2 text-[#63605a]">
              ...
            </span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (typeof page === 'string') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-11 min-w-[44px] items-center justify-center px-2 text-[#63605a]"
              aria-hidden="true"
            >
              {page}
            </span>
          )
        }

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            className={pageButtonClass(page === currentPage)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Last Page (if not visible) */}
      {showFirstLast && currentPage < totalPages - maxVisiblePages + 1 && (
        <>
          {currentPage < totalPages - maxVisiblePages && (
            <span className="inline-flex h-11 min-w-[44px] items-center justify-center px-2 text-[#63605a]">
              ...
            </span>
          )}
          <button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            className={pageButtonClass(false)}
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonBaseClass}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  )
}
