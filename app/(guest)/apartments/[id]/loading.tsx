import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className="py-8">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Back button skeleton */}
				<div className="mb-6">
					<Skeleton className="h-10 w-32" />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Photo gallery skeleton */}
					<div className="space-y-4">
						<Skeleton className="h-64 md:h-96 w-full rounded-lg" />
						<div className="flex gap-2">
							<Skeleton className="h-16 w-16 rounded-md" />
							<Skeleton className="h-16 w-16 rounded-md" />
							<Skeleton className="h-16 w-16 rounded-md" />
						</div>
					</div>

					{/* Apartment info skeleton */}
					<div className="space-y-6">
						{/* Title and basic info */}
						<div>
							<Skeleton className="h-8 w-3/4 mb-2" />
							<div className="flex gap-4">
								<Skeleton className="h-6 w-24" />
								<Skeleton className="h-6 w-32" />
							</div>
						</div>

						{/* Description card */}
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-48" />
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-5/6" />
								</div>
							</CardContent>
						</Card>

						{/* Amenities card */}
						<Card>
							<CardHeader>
								<Skeleton className="h-6 w-32" />
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-3">
									<div className="flex items-center gap-2">
										<Skeleton className="h-4 w-4" />
										<Skeleton className="h-4 w-20" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-4 w-4" />
										<Skeleton className="h-4 w-24" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-4 w-4" />
										<Skeleton className="h-4 w-16" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-4 w-4" />
										<Skeleton className="h-4 w-28" />
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Buttons */}
						<div className="space-y-3">
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
