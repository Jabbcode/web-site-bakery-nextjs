import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ProductStatus } from '@/lib/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Filters
    const categorySlug = searchParams.get('category')
    const isFeatured = searchParams.get('featured') === 'true'
    const isNew = searchParams.get('new') === 'true'
    const search = searchParams.get('search')

    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: Record<string, unknown> = {
      status: ProductStatus.ACTIVE,
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      }
    }

    if (isFeatured) {
      where.isFeatured = true
    }

    if (isNew) {
      where.isNew = true
    }

    if (search) {
      where.OR = [
        { name_es: { contains: search, mode: 'insensitive' } },
        { name_en: { contains: search, mode: 'insensitive' } },
        { description_es: { contains: search, mode: 'insensitive' } },
        { description_en: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Build orderBy clause
    const orderBy: Record<string, string> = {}
    if (sortBy === 'price') {
      orderBy.priceUSD = sortOrder
    } else if (sortBy === 'name') {
      orderBy.name_en = sortOrder
    } else {
      orderBy[sortBy] = sortOrder
    }

    // Fetch products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
          reviews: {
            where: { isApproved: true },
            select: { rating: true },
          },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    // Calculate average ratings
    const productsWithRatings = products.map((product) => {
      const ratings = product.reviews.map((r) => r.rating)
      const averageRating =
        ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

      return {
        ...product,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: ratings.length,
        reviews: undefined, // Remove detailed reviews from list
      }
    })

    return NextResponse.json({
      products: productsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
