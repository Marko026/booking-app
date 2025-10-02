import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
	className?: string
	count?: number
}

export function LoadingSkeleton({
	className,
	count = 1,
}: LoadingSkeletonProps) {
	return (
		<div className={cn('space-y-4', className)}>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			))}
		</div>
	)
}
