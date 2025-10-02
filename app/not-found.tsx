import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="max-w-md">
				<CardHeader>
					<div className="flex items-center gap-2">
						<FileQuestion className="h-6 w-6 text-muted-foreground" />
						<CardTitle>Page Not Found</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						The page you are looking for does not exist or has been moved.
						Please check the URL or navigate back to the homepage.
					</p>
				</CardContent>
				<CardFooter className="flex gap-2">
					<Link href="/" className="flex-1">
						<Button className="w-full">Go Home</Button>
					</Link>
					<Link href="/apartments" className="flex-1">
						<Button variant="outline" className="w-full">
							Browse Apartments
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
