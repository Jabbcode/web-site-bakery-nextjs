import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // TODO: Implement email sending (e.g., with Resend, SendGrid, etc.)
    // For now, just log the message
    console.log('Contact form submission:', validatedData)

    // In production, you would:
    // 1. Send email to admin
    // 2. Send confirmation email to customer
    // 3. Store in database (optional)

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}
