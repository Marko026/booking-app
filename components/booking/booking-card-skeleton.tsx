import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BookingCardSkeleton() {
	return (
		<Card>
			<CardHeader className="space-y-2">
				{/* Booking ID */}
				<Skeleton className="h-4 w-32" />
				{/* Status Badge */}
				<Skeleton className="h-6 w-24" />
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Apartment Name */}
				<div className="space-y-2">
					<Skeleton className="h-5 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>

				{/* Dates */}
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Skeleton className="h-3 w-16" />
						<Skeleton className="h-4 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-3 w-16" />
						<Skeleton className="h-4 w-full" />
					</div>
				</div>

				{/* Guest Info */}
				<div className="space-y-2">
					<Skeleton className="h-3 w-20" />
					<Skeleton className="h-4 w-40" />
				</div>

				{/* Total Price */}
				<div className="flex items-center justify-between border-t pt-4">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-6 w-24" />
				</div>
			</CardContent>

			<CardFooter className="flex gap-2">
				<Skeleton className="h-10 flex-1" />
				<Skeleton className="h-10 w-28" />
			</CardFooter>
		</Card>
	)
}

export function BookingCardSkeletonList({ count = 4 }: { count?: number }) {
	return (
		<div className="space-y-4">
			{Array.from({ length: count }).map((_, index) => (
				<BookingCardSkeleton key={index} />
			))}
		</div>
	)
}
