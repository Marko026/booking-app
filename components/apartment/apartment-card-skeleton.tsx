import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ApartmentCardSkeleton() {
	return (
		<Card className="overflow-hidden">
			{/* Image */}
			<Skeleton className="h-48 w-full rounded-b-none" />

			<CardHeader className="space-y-2">
				{/* Title */}
				<Skeleton className="h-6 w-3/4" />
				{/* Location */}
				<Skeleton className="h-4 w-1/2" />
			</CardHeader>

			<CardContent className="space-y-3">
				{/* Features */}
				<div className="flex gap-4">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-20" />
				</div>

				{/* Description */}
				<div className="space-y-2">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-5/6" />
				</div>
			</CardContent>

			<CardFooter className="flex items-center justify-between">
				{/* Price */}
				<Skeleton className="h-6 w-24" />
				{/* Button */}
				<Skeleton className="h-10 w-28" />
			</CardFooter>
		</Card>
	)
}

export function ApartmentCardSkeletonGrid({ count = 6 }: { count?: number }) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }).map((_, index) => (
				<ApartmentCardSkeleton key={index} />
			))}
		</div>
	)
}
