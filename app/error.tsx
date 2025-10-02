'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Global error:', error)
		// TODO: Send to Sentry in Story 1.6
	}, [error])

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="max-w-md">
				<CardHeader>
					<div className="flex items-center gap-2">
						<AlertCircle className="h-6 w-6 text-destructive" />
						<CardTitle>Something went wrong</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						We apologize for the inconvenience. An error occurred while
						processing your request. Please try again or contact support if the
						problem persists.
					</p>
					{process.env.NODE_ENV === 'development' && (
						<details className="mt-4 rounded-lg bg-muted p-3">
							<summary className="cursor-pointer text-sm font-medium">
								Error Details (Development only)
							</summary>
							<pre className="mt-2 whitespace-pre-wrap text-xs">
								{error.message}
							</pre>
							{error.digest && (
								<p className="mt-2 text-xs text-muted-foreground">
									Digest: {error.digest}
								</p>
							)}
						</details>
					)}
				</CardContent>
				<CardFooter className="flex gap-2">
					<Button onClick={() => reset()} variant="outline">
						Try Again
					</Button>
					<Button onClick={() => (window.location.href = '/')}>Go Home</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
