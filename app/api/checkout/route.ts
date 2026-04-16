import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { createOrderSchema } from '@/features/checkout/validations/checkout.schema'
import { PaymentStatus, OrderStatus, PaymentMethod } from '@/lib/generated/prisma'

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `SD-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createOrderSchema.parse(body)

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch products to calculate totals
    const productIds = validatedData.items.map((item) => item.productId)
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
    })

    // Calculate totals in the selected currency
    let subtotal = 0
    const orderItems = validatedData.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) {
        throw new Error(`Product ${item.productId} not found`)
      }

      // Get price in selected currency
      let unitPrice = 0
      if (validatedData.currency === 'USD') {
        unitPrice = product.discountedPriceUSD || product.priceUSD
      } else if (validatedData.currency === 'MXN') {
        unitPrice = product.discountedPriceMXN || product.priceMXN || product.priceUSD * 20 // Fallback conversion
      } else if (validatedData.currency === 'EUR') {
        unitPrice = product.discountedPriceEUR || product.priceEUR || Math.round(product.priceUSD * 0.92) // Fallback conversion
      }

      const totalPrice = unitPrice * item.quantity
      subtotal += totalPrice

      return {
        productId: product.id,
        productName_es: product.name_es,
        productName_en: product.name_en,
        productSlug: product.slug,
        productImage: product.images[0]?.url || null,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
      }
    })

    const shipping = 0 // Free shipping
    const tax = Math.round(subtotal * 0.16) // 16% IVA
    const total = subtotal + shipping + tax

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone || null,
        shippingStreet: validatedData.shippingStreet,
        shippingCity: validatedData.shippingCity,
        shippingState: validatedData.shippingState || null,
        shippingZip: validatedData.shippingZip,
        shippingCountry: validatedData.shippingCountry,
        billingStreet: validatedData.billingStreet || validatedData.shippingStreet,
        billingCity: validatedData.billingCity || validatedData.shippingCity,
        billingState: validatedData.billingState || validatedData.shippingState,
        billingZip: validatedData.billingZip || validatedData.shippingZip,
        billingCountry: validatedData.billingCountry || validatedData.shippingCountry,
        currency: validatedData.currency,
        subtotal,
        tax,
        shipping,
        total,
        orderStatus: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: PaymentMethod.STRIPE,
        customerNotes: validatedData.customerNotes || null,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({
      order,
      message: 'Order created successfully',
    })
  } catch (error) {
    console.error('Error creating order:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
