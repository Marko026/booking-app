/**
 * Prisma Schema Validation Tests
 *
 * Integration tests for database schema and relationships
 */

import { prisma } from '@/lib/db'
import type { ApartmentStatus, BookingStatus } from '@/lib/db'

describe('Prisma Schema Validation', () => {
	beforeAll(async () => {
		// Clean up test data
		await prisma.booking.deleteMany()
		await prisma.pricingRule.deleteMany()
		await prisma.apartment.deleteMany()
		await prisma.guest.deleteMany()
	})

	afterAll(async () => {
		await prisma.$disconnect()
	})

	describe('Apartment Model', () => {
		it('should create an apartment with all required fields', async () => {
			const apartment = await prisma.apartment.create({
				data: {
					name: 'Test Apartment',
					description: 'A test apartment description',
					maxGuests: 4,
					basePricePerNight: 75.5,
					photos: JSON.stringify(['photo1.jpg', 'photo2.jpg']),
					amenities: { wifi: true, parking: false },
					status: 'ACTIVE' as ApartmentStatus,
				},
			})

			expect(apartment.id).toBeDefined()
			expect(apartment.name).toBe('Test Apartment')
			expect(apartment.maxGuests).toBe(4)
			expect(apartment.basePricePerNight).toBe(75.5)
			expect(apartment.status).toBe('ACTIVE')
			expect(apartment.createdAt).toBeInstanceOf(Date)
			expect(apartment.updatedAt).toBeInstanceOf(Date)
		})

		it('should update apartment updatedAt timestamp', async () => {
			const apartment = await prisma.apartment.create({
				data: {
					name: 'Update Test',
					description: 'Test description',
					maxGuests: 2,
					basePricePerNight: 50,
					photos: JSON.stringify([]),
					amenities: {},
				},
			})

			const originalUpdatedAt = apartment.updatedAt

			// Wait a bit to ensure timestamp difference
			await new Promise((resolve) => setTimeout(resolve, 100))

			const updated = await prisma.apartment.update({
				where: { id: apartment.id },
				data: { name: 'Updated Name' },
			})

			expect(updated.updatedAt.getTime()).toBeGreaterThan(
				originalUpdatedAt.getTime()
			)
		})
	})

	describe('Guest Model', () => {
		it('should create a guest with all required fields', async () => {
			const guest = await prisma.guest.create({
				data: {
					firstName: 'John',
					lastName: 'Doe',
					email: 'john.test@example.com',
					phone: '+1234567890',
					notes: 'Test notes',
				},
			})

			expect(guest.id).toBeDefined()
			expect(guest.firstName).toBe('John')
			expect(guest.lastName).toBe('Doe')
			expect(guest.email).toBe('john.test@example.com')
			expect(guest.phone).toBe('+1234567890')
			expect(guest.notes).toBe('Test notes')
		})

		it('should enforce email uniqueness', async () => {
			const email = 'unique.test@example.com'

			await prisma.guest.create({
				data: {
					firstName: 'First',
					lastName: 'User',
					email,
					phone: '+1111111111',
				},
			})

			await expect(
				prisma.guest.create({
					data: {
						firstName: 'Second',
						lastName: 'User',
						email, // Same email
						phone: '+2222222222',
					},
				})
			).rejects.toThrow()
		})
	})

	describe('Booking Model', () => {
		let testApartment: { id: string; name: string }
		let testGuest: { id: string; firstName: string }

		beforeEach(async () => {
			testApartment = await prisma.apartment.create({
				data: {
					name: 'Booking Test Apartment',
					description: 'Test',
					maxGuests: 2,
					basePricePerNight: 100,
					photos: JSON.stringify([]),
					amenities: {},
				},
			})

			testGuest = await prisma.guest.create({
				data: {
					firstName: 'Booking',
					lastName: 'Tester',
					email: `booking.test.${Date.now()}@example.com`,
					phone: '+9999999999',
				},
			})
		})

		it('should create a booking with all required fields', async () => {
			const booking = await prisma.booking.create({
				data: {
					apartmentId: testApartment.id,
					guestId: testGuest.id,
					confirmationCode: 'TEST1234',
					startDate: new Date('2025-12-01'),
					endDate: new Date('2025-12-05'),
					numberOfGuests: 2,
					totalPrice: 400,
					status: 'PENDING' as BookingStatus,
					notes: 'Test booking',
				},
			})

			expect(booking.id).toBeDefined()
			expect(booking.apartmentId).toBe(testApartment.id)
			expect(booking.guestId).toBe(testGuest.id)
			expect(booking.confirmationCode).toBe('TEST1234')
			expect(booking.numberOfGuests).toBe(2)
			expect(booking.totalPrice).toBe(400)
			expect(booking.status).toBe('PENDING')
		})

		it('should enforce confirmation code uniqueness', async () => {
			const code = 'UNIQUE123'

			await prisma.booking.create({
				data: {
					apartmentId: testApartment.id,
					guestId: testGuest.id,
					confirmationCode: code,
					startDate: new Date('2025-12-01'),
					endDate: new Date('2025-12-05'),
					numberOfGuests: 2,
					totalPrice: 400,
				},
			})

			await expect(
				prisma.booking.create({
					data: {
						apartmentId: testApartment.id,
						guestId: testGuest.id,
						confirmationCode: code, // Same code
						startDate: new Date('2025-12-10'),
						endDate: new Date('2025-12-15'),
						numberOfGuests: 2,
						totalPrice: 400,
					},
				})
			).rejects.toThrow()
		})

		it('should load booking with apartment and guest relations', async () => {
			const booking = await prisma.booking.create({
				data: {
					apartmentId: testApartment.id,
					guestId: testGuest.id,
					confirmationCode: 'REL12345',
					startDate: new Date('2025-12-01'),
					endDate: new Date('2025-12-05'),
					numberOfGuests: 2,
					totalPrice: 400,
				},
			})

			const bookingWithRelations = await prisma.booking.findUnique({
				where: { id: booking.id },
				include: { apartment: true, guest: true },
			})

			expect(bookingWithRelations).toBeDefined()
			expect(bookingWithRelations?.apartment.name).toBe(
				'Booking Test Apartment'
			)
			expect(bookingWithRelations?.guest.firstName).toBe('Booking')
		})
	})

	describe('PricingRule Model', () => {
		let testApartment: { id: string; name: string }

		beforeEach(async () => {
			testApartment = await prisma.apartment.create({
				data: {
					name: 'Pricing Test Apartment',
					description: 'Test',
					maxGuests: 2,
					basePricePerNight: 100,
					photos: JSON.stringify([]),
					amenities: {},
				},
			})
		})

		it('should create a pricing rule with all required fields', async () => {
			const rule = await prisma.pricingRule.create({
				data: {
					apartmentId: testApartment.id,
					name: 'Test Season',
					startDate: new Date('2025-06-01'),
					endDate: new Date('2025-09-01'),
					pricePerNight: 150,
					minStayDuration: 3,
					priority: 10,
					active: true,
				},
			})

			expect(rule.id).toBeDefined()
			expect(rule.apartmentId).toBe(testApartment.id)
			expect(rule.name).toBe('Test Season')
			expect(rule.pricePerNight).toBe(150)
			expect(rule.minStayDuration).toBe(3)
			expect(rule.priority).toBe(10)
			expect(rule.active).toBe(true)
		})

		it('should load pricing rule with apartment relation', async () => {
			const rule = await prisma.pricingRule.create({
				data: {
					apartmentId: testApartment.id,
					name: 'Relation Test',
					startDate: new Date('2025-06-01'),
					endDate: new Date('2025-09-01'),
					pricePerNight: 150,
					priority: 5,
				},
			})

			const ruleWithApartment = await prisma.pricingRule.findUnique({
				where: { id: rule.id },
				include: { apartment: true },
			})

			expect(ruleWithApartment).toBeDefined()
			expect(ruleWithApartment?.apartment.name).toBe('Pricing Test Apartment')
		})
	})

	describe('Cascading Deletes', () => {
		it('should cascade delete bookings when apartment is deleted', async () => {
			const apartment = await prisma.apartment.create({
				data: {
					name: 'Cascade Test',
					description: 'Test',
					maxGuests: 2,
					basePricePerNight: 100,
					photos: JSON.stringify([]),
					amenities: {},
				},
			})

			const guest = await prisma.guest.create({
				data: {
					firstName: 'Cascade',
					lastName: 'Test',
					email: `cascade.test.${Date.now()}@example.com`,
					phone: '+8888888888',
				},
			})

			const booking = await prisma.booking.create({
				data: {
					apartmentId: apartment.id,
					guestId: guest.id,
					confirmationCode: 'CASCADE1',
					startDate: new Date('2025-12-01'),
					endDate: new Date('2025-12-05'),
					numberOfGuests: 2,
					totalPrice: 400,
				},
			})

			await prisma.apartment.delete({ where: { id: apartment.id } })

			const deletedBooking = await prisma.booking.findUnique({
				where: { id: booking.id },
			})

			expect(deletedBooking).toBeNull()
		})
	})
})
