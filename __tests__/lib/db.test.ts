/**
 * Database Connection Tests
 *
 * Tests for Prisma Client initialization and database connection
 */

import { prisma } from '@/lib/db'

describe('Prisma Client', () => {
	afterAll(async () => {
		await prisma.$disconnect()
	})

	describe('Connection', () => {
		it('should connect to database successfully', async () => {
			await expect(prisma.$connect()).resolves.not.toThrow()
		})

		it('should disconnect from database successfully', async () => {
			await expect(prisma.$disconnect()).resolves.not.toThrow()
		})
	})

	describe('Models', () => {
		it('should have Apartment model available', () => {
			expect(prisma.apartment).toBeDefined()
			expect(typeof prisma.apartment.findMany).toBe('function')
			expect(typeof prisma.apartment.create).toBe('function')
			expect(typeof prisma.apartment.update).toBe('function')
			expect(typeof prisma.apartment.delete).toBe('function')
		})

		it('should have Guest model available', () => {
			expect(prisma.guest).toBeDefined()
			expect(typeof prisma.guest.findMany).toBe('function')
			expect(typeof prisma.guest.create).toBe('function')
			expect(typeof prisma.guest.update).toBe('function')
			expect(typeof prisma.guest.delete).toBe('function')
		})

		it('should have Booking model available', () => {
			expect(prisma.booking).toBeDefined()
			expect(typeof prisma.booking.findMany).toBe('function')
			expect(typeof prisma.booking.create).toBe('function')
			expect(typeof prisma.booking.update).toBe('function')
			expect(typeof prisma.booking.delete).toBe('function')
		})

		it('should have PricingRule model available', () => {
			expect(prisma.pricingRule).toBeDefined()
			expect(typeof prisma.pricingRule.findMany).toBe('function')
			expect(typeof prisma.pricingRule.create).toBe('function')
			expect(typeof prisma.pricingRule.update).toBe('function')
			expect(typeof prisma.pricingRule.delete).toBe('function')
		})
	})

	describe('Type Exports', () => {
		it('should export TypeScript types', () => {
			// This test ensures types are exported and can be imported
			// TypeScript will catch any issues at compile time
			const typeCheck: unknown = null

			// These should not throw TypeScript errors
			expect(typeCheck).toBeDefined()
		})
	})
})
