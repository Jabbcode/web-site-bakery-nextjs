'use client'

import { use } from 'react'
import { useProduct } from '@/features/products/api/queries'
import {
  ProductGallery,
  ProductTabs,
  RelatedProducts,
  type ProductImage,
  type ProductTab,
} from '@/features/products/components'
import { Breadcrumb } from '@/components/organisms/Breadcrumb'
import { Heading } from '@/components/atoms/Heading'
import { ProductPrice } from '@/components/molecules/ProductPrice'
import { StarRating } from '@/components/molecules/StarRating'
import { QuantitySelector } from '@/components/molecules/QuantitySelector'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Spinner } from '@/components/atoms/Spinner'
import { ReviewList } from '@/features/reviews/components/ReviewList'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default function ProductPage({ params }: PageProps) {
  const { locale, slug } = use(params)
  const { data: product, isLoading } = useProduct(slug)
  const [quantity, setQuantity] = useState(1)

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fcf8ed]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fcf8ed]">
        <div className="text-center">
          <Heading as="h2" className="mb-4">
            Product not found
          </Heading>
          <p className="font-body text-[15px] text-[#63605a]">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.category.name_en, href: `/shop?category=${product.category.slug}` },
    { label: product.name_en, href: `/shop/${product.slug}` },
  ]

  const productImages: ProductImage[] =
    product.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt_en || product.name_en,
    })) || []

  const inStock = product.stock > 0

  const tabs: ProductTab[] = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <div className="prose max-w-none">
          <p className="font-body text-[15px] leading-[1.66em] text-[#63605a]">
            {product.description_en || 'No description available.'}
          </p>
        </div>
      ),
    },
    {
      id: 'additional',
      label: 'Additional Information',
      content: (
        <div className="space-y-3">
          <div className="flex border-b border-[#dadada] pb-3">
            <span className="font-body w-1/3 font-medium text-[#241c10]">Weight</span>
            <span className="font-body text-[#63605a]">{product.weight || 'N/A'} g</span>
          </div>
          <div className="flex border-b border-[#dadada] pb-3">
            <span className="font-body w-1/3 font-medium text-[#241c10]">Servings</span>
            <span className="font-body text-[#63605a]">{product.servings || 'N/A'}</span>
          </div>
          <div className="flex border-b border-[#dadada] pb-3">
            <span className="font-body w-1/3 font-medium text-[#241c10]">Prep Time</span>
            <span className="font-body text-[#63605a]">
              {product.preparationTime ? `${product.preparationTime} min` : 'N/A'}
            </span>
          </div>
          <div className="flex border-b border-[#dadada] pb-3">
            <span className="font-body w-1/3 font-medium text-[#241c10]">Category</span>
            <span className="font-body text-[#63605a]">{product.category.name_en}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'reviews',
      label: `Reviews (${product.reviewCount})`,
      content: <ReviewList productId={product.id} locale={locale} />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#fcf8ed]">
      {/* Breadcrumb */}
      <div className="border-b border-[#dadada] bg-white py-6">
        <div className="max-w-wide container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Product Content */}
      <div className="py-12">
        <div className="max-w-wide container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <ProductGallery images={productImages} productName={product.name_en} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isFeatured && <Badge variant="hot">Hot</Badge>}
                {!inStock && <Badge variant="default">Out of Stock</Badge>}
              </div>

              {/* Title */}
              <Heading as="h1">{product.name_en}</Heading>

              {/* Rating */}
              {product.averageRating > 0 && (
                <div className="flex items-center gap-3">
                  <StarRating rating={product.averageRating} size="md" />
                  <span className="font-body text-[15px] text-[#63605a]">
                    ({product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

              {/* Price */}
              <ProductPrice
                price={product.discountedPriceUSD || product.priceUSD}
                originalPrice={
                  product.discountedPriceUSD && product.discountedPriceUSD < product.priceUSD
                    ? product.priceUSD
                    : undefined
                }
                currency="USD"
                size="lg"
                discountBadge
              />

              {/* Quantity & Add to Cart */}
              {inStock ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <QuantitySelector
                      value={quantity}
                      onChange={setQuantity}
                      min={1}
                      max={product.stock}
                    />
                    <span className="font-body text-[13px] text-[#63605a]">
                      {product.stock} in stock
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      icon={<ShoppingCart className="h-5 w-5" />}
                      onClick={() => console.log('Add to cart:', product.id, quantity)}
                    >
                      Add to Cart
                    </Button>

                    <Button
                      variant="default"
                      size="lg"
                      icon={<Heart className="h-5 w-5" />}
                      onClick={() => console.log('Add to wishlist:', product.id)}
                      aria-label="Add to wishlist"
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded border border-[#dadada] bg-white p-4">
                  <p className="font-body text-[15px] font-medium text-[#ee2852]">Out of stock</p>
                </div>
              )}

              {/* Meta */}
              <div className="space-y-2 border-t border-[#dadada] pt-6">
                <div className="flex">
                  <span className="font-body w-24 text-[15px] text-[#63605a]">SKU:</span>
                  <span className="font-body text-[15px] text-[#241c10]">{product.sku}</span>
                </div>
                <div className="flex">
                  <span className="font-body w-24 text-[15px] text-[#63605a]">Category:</span>
                  <span className="font-body text-[15px] text-[#241c10]">
                    {product.category.name_en}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <ProductTabs tabs={tabs} defaultTab="description" />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        products={[]}
        title="Related Products"
        columns={4}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onQuickView={(id) => console.log('Quick view:', id)}
        className="border-t border-[#dadada] bg-white"
      />
    </div>
  )
}
