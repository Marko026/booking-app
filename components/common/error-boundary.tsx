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
import React from 'react'

interface ErrorBoundaryProps {
	children: React.ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
	error: Error | null
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log to error reporting service (e.g., Sentry)
		console.error('Error caught by boundary:', error, errorInfo)
		// TODO: Send to Sentry in Story 1.6
	}

	render() {
		if (this.state.hasError) {
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
								processing your request. Please try again or contact support if
								the problem persists.
							</p>
							{process.env.NODE_ENV === 'development' && this.state.error && (
								<details className="mt-4 rounded-lg bg-muted p-3">
									<summary className="cursor-pointer text-sm font-medium">
										Error Details (Development only)
									</summary>
									<pre className="mt-2 whitespace-pre-wrap text-xs">
										{this.state.error.toString()}
									</pre>
								</details>
							)}
						</CardContent>
						<CardFooter className="flex gap-2">
							<Button
								onClick={() => this.setState({ hasError: false, error: null })}
								variant="outline"
							>
								Try Again
							</Button>
							<Button onClick={() => (window.location.href = '/')}>
								Go Home
							</Button>
						</CardFooter>
					</Card>
				</div>
			)
		}

		return this.props.children
	}
}
