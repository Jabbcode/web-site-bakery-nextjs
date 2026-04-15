import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { updateSession } from '@/lib/supabase/middleware'
import { routing } from './i18n/routing'

// Create next-intl middleware
const intlMiddleware = createIntlMiddleware(routing)

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/:locale',
  '/:locale/sign-in(.*)',
  '/:locale/sign-up(.*)',
  '/:locale/shop(.*)',
  '/api/webhooks(.*)',
  '/api/products(.*)',
  '/api/categories(.*)',
])

// Admin routes that require admin role
const isAdminRoute = createRouteMatcher(['/admin(.*)', '/:locale/admin(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Handle i18n routing first
  const intlResponse = intlMiddleware(req)

  // Update Supabase session
  const supabaseResponse = await updateSession(req)

  // Protect admin routes
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Check if user has admin role
    const metadata = sessionClaims?.metadata as { role?: string } | undefined
    if (metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // Merge responses
  return intlResponse || supabaseResponse
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
