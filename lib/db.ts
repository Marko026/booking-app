/**
 * Database Connection Manager
 *
 * This module provides a singleton PrismaClient instance to prevent
 * multiple database connections in development and ensure efficient
 * connection pooling in production.
 *
 * Usage:
 * ```typescript
 * import { prisma } from '@/lib/db'
 *
 * const apartments = await prisma.apartment.findMany()
 * ```
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined
}

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],
	})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export types for convenience
export type {
	Apartment,
	Guest,
	Booking,
	PricingRule,
	ApartmentStatus,
	BookingStatus,
} from '@prisma/client'
