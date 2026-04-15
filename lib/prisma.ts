import { PrismaClient } from './generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only create Prisma client if not in build time
const createPrismaClient = () => {
  // Skip during build if no DATABASE_URL
  if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
    return null as unknown as PrismaClient
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
