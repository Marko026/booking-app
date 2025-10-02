import { PrismaClient, ApartmentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log('🌱 Starting database seed...')

	// Clear existing data (for idempotency)
	await prisma.booking.deleteMany()
	await prisma.pricingRule.deleteMany()
	await prisma.apartment.deleteMany()
	await prisma.guest.deleteMany()

	console.log('✨ Cleared existing data')

	// Seed Apartments
	const apartment1 = await prisma.apartment.create({
		data: {
			name: 'Cozy Studio Downtown',
			description:
				'A charming studio apartment in the heart of the city. Perfect for solo travelers or couples. Features a modern kitchenette, comfortable queen bed, and large windows with city views. Walking distance to restaurants, shops, and public transportation.',
			maxGuests: 2,
			basePricePerNight: 50.0,
			photos: JSON.stringify([
				'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
				'https://images.unsplash.com/photo-1502672260066-6bc232fd4a56?w=800',
				'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
			]),
			amenities: {
				wifi: true,
				kitchen: true,
				airConditioning: true,
				heating: true,
				tv: true,
				workspace: true,
				parking: false,
				pool: false,
				gym: false,
				elevator: true,
			},
			status: ApartmentStatus.ACTIVE,
		},
	})

	const apartment2 = await prisma.apartment.create({
		data: {
			name: 'Spacious 2BR with Balcony',
			description:
				'Beautiful two-bedroom apartment with a large balcony overlooking the park. Fully equipped kitchen, modern bathroom, and spacious living room. Ideal for families or groups of friends. Quiet neighborhood with easy access to city center.',
			maxGuests: 4,
			basePricePerNight: 80.0,
			photos: JSON.stringify([
				'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
				'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
				'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
				'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
			]),
			amenities: {
				wifi: true,
				kitchen: true,
				airConditioning: true,
				heating: true,
				tv: true,
				workspace: true,
				parking: true,
				pool: false,
				gym: false,
				elevator: true,
				balcony: true,
				washingMachine: true,
			},
			status: ApartmentStatus.ACTIVE,
		},
	})

	console.log('✅ Created apartments:', {
		apartment1: apartment1.name,
		apartment2: apartment2.name,
	})

	// Seed Sample Guests (for testing)
	const guest1 = await prisma.guest.create({
		data: {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phone: '+1234567890',
			notes: 'VIP guest - prefers early check-in',
		},
	})

	const guest2 = await prisma.guest.create({
		data: {
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jane.smith@example.com',
			phone: '+9876543210',
		},
	})

	console.log('✅ Created sample guests:', {
		guest1: guest1.email,
		guest2: guest2.email,
	})

	// Seed Sample Pricing Rules
	const highSeasonRule = await prisma.pricingRule.create({
		data: {
			apartmentId: apartment2.id,
			name: 'Summer High Season',
			startDate: new Date('2025-06-01'),
			endDate: new Date('2025-09-15'),
			pricePerNight: 120.0,
			minStayDuration: 3,
			priority: 10,
			active: true,
		},
	})

	const weekendRule = await prisma.pricingRule.create({
		data: {
			apartmentId: apartment1.id,
			name: 'Weekend Premium',
			startDate: new Date('2025-01-01'),
			endDate: new Date('2025-12-31'),
			pricePerNight: 65.0,
			minStayDuration: 2,
			priority: 5,
			active: true,
		},
	})

	console.log('✅ Created pricing rules:', {
		highSeasonRule: highSeasonRule.name,
		weekendRule: weekendRule.name,
	})

	console.log('🎉 Database seeded successfully!')
}

main()
	.catch((e) => {
		console.error('❌ Error seeding database:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
