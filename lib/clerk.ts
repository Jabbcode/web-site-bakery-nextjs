import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'
import { UserRole } from './generated/prisma'

/**
 * Get the current authenticated user from database
 * Syncs with Clerk user data
 */
export async function getCurrentUser() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  return user
}

/**
 * Check if current user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === UserRole.ADMIN
}

/**
 * Require authentication
 * Throws error if user is not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

/**
 * Require admin role
 * Throws error if user is not admin
 */
export async function requireAdmin() {
  const user = await requireAuth()

  if (user.role !== UserRole.ADMIN) {
    throw new Error('Forbidden: Admin access required')
  }

  return user
}

/**
 * Get Clerk user with full details
 */
export async function getClerkUser() {
  return await currentUser()
}
