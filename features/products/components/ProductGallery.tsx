'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
  className?: string
}

export const ProductGallery = ({ images, productName, className }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (images.length === 0) {
    return (
      <div className={cn('flex aspect-square items-center justify-center bg-[#fafafa]', className)}>
        <p className="font-body text-[15px] text-[#63605a]">No images available</p>
      </div>
    )
  }

  const selectedImage = images[selectedIndex]

  if (!selectedImage) {
    return null
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
  }

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className={cn('space-y-4', className)} data-testid="product-gallery">
      {/* Main Image */}
      <div className="group relative aspect-square overflow-hidden bg-[#fcf8ed]">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt || productName}
          fill
          className={cn(
            'object-cover transition-transform duration-300',
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onClick={handleZoomToggle}
        />

        {/* Zoom Icon Overlay */}
        {!isZoomed && (
          <div className="absolute top-4 right-4 rounded-full bg-white/90 p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-5 w-5 text-[#241c10]" />
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && !isZoomed && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              className={cn(
                'absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#241c10] transition-opacity',
                'opacity-0 group-hover:opacity-100',
                'hover:bg-white focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={cn(
                'absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#241c10] transition-opacity',
                'opacity-0 group-hover:opacity-100',
                'hover:bg-white focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none'
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute right-4 bottom-4 rounded bg-[#241c10]/80 px-3 py-1">
            <span className="font-body text-sm text-white">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                'relative aspect-square overflow-hidden bg-[#fcf8ed] transition-opacity',
                'hover:opacity-80 focus:ring-2 focus:ring-[#241c10] focus:ring-offset-2 focus:outline-none',
                index === selectedIndex
                  ? 'ring-2 ring-[#241c10] ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
