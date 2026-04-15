import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/server'
import { prisma } from '@/lib/prisma'
import { PaymentStatus, OrderStatus } from '@/lib/generated/prisma'

// Mark route as dynamic and use Node.js runtime
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.log('💰 Payment succeeded:', paymentIntent.id)

        // Update order in database
        await prisma.order.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: {
            paymentStatus: PaymentStatus.PAID,
            orderStatus: OrderStatus.CONFIRMED,
            stripePaidAt: new Date(),
          },
        })

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.log('❌ Payment failed:', paymentIntent.id)

        // Update order in database
        await prisma.order.update({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: {
            paymentStatus: PaymentStatus.FAILED,
          },
        })

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        console.log('💸 Refund processed:', paymentIntentId)

        // Update order in database
        await prisma.order.update({
          where: { stripePaymentIntentId: paymentIntentId },
          data: {
            paymentStatus: PaymentStatus.REFUNDED,
            orderStatus: OrderStatus.CANCELLED,
          },
        })

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
