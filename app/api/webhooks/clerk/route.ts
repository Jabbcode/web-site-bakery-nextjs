import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/lib/generated/prisma'

// Mark route as dynamic and use Node.js runtime
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable')
  }

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, public_metadata } = evt.data

    // Create user in database
    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0]?.email_address ?? '',
          firstName: first_name ?? null,
          lastName: last_name ?? null,
          role: (public_metadata?.role as UserRole) ?? UserRole.USER,
        },
      })

      console.log('✅ User created:', id)
    } catch (error) {
      console.error('❌ Error creating user:', error)
      return new Response('Error creating user', { status: 500 })
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, public_metadata } = evt.data

    // Update user in database
    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0]?.email_address ?? undefined,
          firstName: first_name ?? null,
          lastName: last_name ?? null,
          role: (public_metadata?.role as UserRole) ?? undefined,
        },
      })

      console.log('✅ User updated:', id)
    } catch (error) {
      console.error('❌ Error updating user:', error)
      return new Response('Error updating user', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    // Delete user from database
    try {
      await prisma.user.delete({
        where: { clerkId: id },
      })

      console.log('✅ User deleted:', id)
    } catch (error) {
      console.error('❌ Error deleting user:', error)
      return new Response('Error deleting user', { status: 500 })
    }
  }

  return new Response('Webhook processed', { status: 200 })
}
