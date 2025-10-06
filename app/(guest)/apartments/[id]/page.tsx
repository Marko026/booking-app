import { ApartmentDetails } from '@/components/apartment/apartment-details'
import { prisma } from '@/lib/db'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ApartmentDetailPageProps {
	params: { id: string }
}

export async function generateMetadata({
	params,
}: ApartmentDetailPageProps): Promise<Metadata> {
	const { id } = await params
	const apartment = await prisma.apartment.findUnique({
		where: { id },
	})

	if (!apartment) {
		return {
			title: 'Apartment Not Found | BookingApp',
			description: 'The requested apartment could not be found.',
		}
	}

	const photos = JSON.parse(apartment.photos) as string[]

	return {
		title: `${apartment.name} | BookingApp`,
		description: apartment.description,
		openGraph: {
			title: `${apartment.name} | BookingApp`,
			description: apartment.description,
			images: photos.length > 0 ? [photos[0]] : [],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: `${apartment.name} | BookingApp`,
			description: apartment.description,
			images: photos.length > 0 ? [photos[0]] : [],
		},
	}
}

export default async function ApartmentDetailPage({
	params,
}: ApartmentDetailPageProps) {
	const { id } = await params
	const apartment = await prisma.apartment.findUnique({
		where: { id },
	})

	if (!apartment) {
		notFound()
	}

	// Parse photos and amenities from JSON strings
	const apartmentWithParsedData = {
		...apartment,
		photos: JSON.parse(apartment.photos) as string[],
		amenities: apartment.amenities as Record<string, boolean>,
	}

	return <ApartmentDetails apartment={apartmentWithParsedData} />
}
