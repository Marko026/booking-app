import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="py-16">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<Card>
						<CardHeader>
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
								<Search className="h-8 w-8 text-red-600" />
							</div>
							<CardTitle className="text-2xl font-bold text-gray-900">
								Apartment Not Found
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="text-gray-600">
							<p className="mb-2">
								Sorry, we couldn&apos;t find the apartment you&apos;re looking for.
							</p>
								<p>
									The apartment may have been removed or the link might be
									incorrect.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-3 justify-center">
								<Button asChild>
									<Link href="/" className="flex items-center gap-2">
										<Home className="h-4 w-4" />
										Back to Home
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href="/" className="flex items-center gap-2">
										<Search className="h-4 w-4" />
										Browse Apartments
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
