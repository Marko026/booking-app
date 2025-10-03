import { ApartmentCardSkeleton } from '@/components/apartment/apartment-card-skeleton'

export default function Loading() {
	return (
		<div className="py-12">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header skeleton */}
				<div className="text-center mb-16">
					<div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
					<div className="h-6 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
				</div>

				{/* Apartment cards skeleton */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<ApartmentCardSkeleton />
					<ApartmentCardSkeleton />
				</div>
			</div>
		</div>
	)
}
