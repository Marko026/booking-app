import { ApartmentCard } from '@/components/apartment/apartment-card'
import { prisma } from '@/lib/db'

export default async function Home() {
	const apartments = await prisma.apartment.findMany({
		where: {
			status: 'ACTIVE',
		},
		orderBy: {
			createdAt: 'asc',
		},
	})

	// Parse photos and amenities from JSON strings
	const apartmentsWithParsedData = apartments.map((apartment) => ({
		...apartment,
		photos: JSON.parse(apartment.photos) as string[],
		amenities: apartment.amenities as Record<string, boolean>,
	}))

	return (
		<div className="py-12">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						Welcome to <span className="text-primary">BookingApp</span>
					</h1>
					<p className="mt-6 text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
						Discover your perfect stay in our carefully selected apartments
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{apartmentsWithParsedData.map((apartment) => (
						<ApartmentCard key={apartment.id} apartment={apartment} />
					))}
				</div>
			</div>
		</div>
	)
}
