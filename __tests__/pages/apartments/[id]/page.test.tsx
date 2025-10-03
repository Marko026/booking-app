import ApartmentDetailPage from '@/app/(guest)/apartments/[id]/page'
import { prisma } from '@/lib/db'
import { render, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'

// Mock Next.js modules
jest.mock('next/navigation', () => ({
	notFound: jest.fn(),
}))

jest.mock('@/lib/db', () => ({
	prisma: {
		apartment: {
			findUnique: jest.fn(),
		},
	},
}))

const mockApartment = {
	id: '1',
	name: 'Cozy Studio Downtown',
	description: 'A charming studio apartment in the heart of the city.',
	maxGuests: 2,
	basePricePerNight: 50.0,
	photos: JSON.stringify([
		'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
	]),
	amenities: {
		wifi: true,
		kitchen: true,
		airConditioning: true,
		parking: false,
	},
	status: 'ACTIVE',
	createdAt: new Date(),
	updatedAt: new Date(),
}

describe('ApartmentDetailPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should render apartment details when apartment exists', async () => {
		;(prisma.apartment.findUnique as jest.Mock).mockResolvedValue(mockApartment)

		const result = await ApartmentDetailPage({ params: { id: '1' } })
		render(result)

		expect(screen.getByText('Cozy Studio Downtown')).toBeInTheDocument()
		expect(screen.getByText('2 guests')).toBeInTheDocument()
		expect(screen.getByText('€50.00 per night')).toBeInTheDocument()
		expect(screen.getByText(/A charming studio apartment/)).toBeInTheDocument()
	})

	it('should call notFound when apartment does not exist', async () => {
		;(prisma.apartment.findUnique as jest.Mock).mockResolvedValue(null)

		await ApartmentDetailPage({ params: { id: 'nonexistent' } })

		expect(notFound).toHaveBeenCalled()
	})

	it('should parse photos and amenities from JSON strings', async () => {
		;(prisma.apartment.findUnique as jest.Mock).mockResolvedValue(mockApartment)

		const result = await ApartmentDetailPage({ params: { id: '1' } })
		render(result)

		// Check that amenities are displayed (WiFi, Kitchen, etc.)
		expect(screen.getByText('WiFi')).toBeInTheDocument()
		expect(screen.getByText('Kitchen')).toBeInTheDocument()
		expect(screen.getByText('Air Conditioning')).toBeInTheDocument()
	})
})
