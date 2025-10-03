import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPricePerNight } from '@/lib/utils/format'
import { ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'
import { AmenitiesList } from './amenities-list'
import { PhotoGallery } from './photo-gallery'

interface ApartmentDetailsProps {
	apartment: {
		id: string
		name: string
		description: string
		maxGuests: number
		basePricePerNight: number
		photos: string[]
		amenities: Record<string, boolean>
	}
}

export function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
	return (
		<div className="py-8">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Back Button */}
				<div className="mb-8">
					<Button variant="ghost" asChild>
						<Link
							href="/"
							className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Apartments
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Photo Gallery */}
					<div>
						<PhotoGallery
							photos={apartment.photos}
							apartmentName={apartment.name}
						/>
					</div>

					{/* Apartment Information */}
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								{apartment.name}
							</h1>
							<div className="flex items-center gap-4 text-lg text-gray-600 mb-4">
								<div className="flex items-center gap-1">
									<Users className="h-5 w-5" />
									<span>{apartment.maxGuests} guests</span>
								</div>
								<div className="font-semibold text-gray-900">
									{formatPricePerNight(apartment.basePricePerNight)}
								</div>
							</div>
						</div>

						{/* Description */}
						<Card>
							<CardHeader>
								<CardTitle>About this apartment</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-lg leading-relaxed text-gray-700">
									{apartment.description}
								</p>
							</CardContent>
						</Card>

						{/* Amenities */}
						<Card>
							<CardHeader>
								<CardTitle>Amenities</CardTitle>
							</CardHeader>
							<CardContent>
								<AmenitiesList amenities={apartment.amenities} />
							</CardContent>
						</Card>

						{/* Call to Action Buttons */}
						<div className="space-y-3">
							<Button size="lg" className="w-full" asChild>
								<Link href={`/bookings/${apartment.id}`}>
									Check Availability
								</Link>
							</Button>
							<Button variant="outline" size="lg" className="w-full" asChild>
								<Link
									href={`mailto:info@bookingapp.com?subject=Inquiry about ${apartment.name}`}
								>
									Contact Owner
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
