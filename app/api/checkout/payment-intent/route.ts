import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// Stripe setup - will be implemented when Stripe is configured
// For now, this is a placeholder endpoint

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { amount: _amount, currency: _currency, orderId: _orderId } = body

    // TODO: Implement Stripe payment intent creation
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency,
    //   metadata: { orderId },
    // })

    // Placeholder response
    return NextResponse.json({
      clientSecret: 'placeholder_client_secret',
      message: 'Payment intent created (placeholder)',
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
