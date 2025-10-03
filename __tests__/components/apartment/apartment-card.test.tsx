import { ApartmentCard } from '@/components/apartment/apartment-card'
import { render, screen } from '@testing-library/react'

const mockApartment = {
	id: '1',
	name: 'Cozy Studio Downtown',
	description:
		'A charming studio apartment in the heart of the city. Perfect for solo travelers or couples.',
	maxGuests: 2,
	basePricePerNight: 50.0,
	photos: [
		'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
		'https://images.unsplash.com/photo-1502672260066-6bc232fd4a56?w=800',
	],
	amenities: {
		wifi: true,
		kitchen: true,
		airConditioning: true,
		parking: false,
	},
}

describe('ApartmentCard', () => {
	it('should display apartment information', () => {
		render(<ApartmentCard apartment={mockApartment} />)

		expect(screen.getByText('Cozy Studio Downtown')).toBeInTheDocument()
		expect(screen.getByText('2 guests')).toBeInTheDocument()
		expect(screen.getByText('€50.00 per night')).toBeInTheDocument()
		expect(screen.getByText(/A charming studio apartment/)).toBeInTheDocument()
	})

	it('should have accessible image alt text', () => {
		render(<ApartmentCard apartment={mockApartment} />)

		const image = screen.getByRole('img')
		expect(image).toHaveAttribute('alt', 'Cozy Studio Downtown - Main view')
	})

	it('should have a working view details link', () => {
		render(<ApartmentCard apartment={mockApartment} />)

		const viewDetailsButton = screen.getByRole('link', {
			name: /view details/i,
		})
		expect(viewDetailsButton).toHaveAttribute('href', '/apartments/1')
	})

	it('should truncate long descriptions', () => {
		const longDescription = 'A'.repeat(150)
		const apartmentWithLongDescription = {
			...mockApartment,
			description: longDescription,
		}

		render(<ApartmentCard apartment={apartmentWithLongDescription} />)

		const description = screen.getByText(/A{120}\.\.\./)
		expect(description).toBeInTheDocument()
	})
})
