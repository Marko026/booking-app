import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPricePerNight } from '@/lib/utils/format'
import { Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ApartmentCardProps {
	apartment: {
		id: string
		name: string
		description: string
		maxGuests: number
		basePricePerNight: number
		photos: string[]
		amenities: Record<string, boolean>
	}
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
	const primaryPhoto = apartment.photos[0] || '/placeholder-apartment.jpg'
	const truncatedDescription =
		apartment.description.length > 120
			? `${apartment.description.substring(0, 120)}...`
			: apartment.description

	return (
		<Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-0 shadow-md">
			<div className="relative h-56 overflow-hidden">
				<Image
					src={primaryPhoto}
					alt={`${apartment.name} - Main view`}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-110"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					placeholder="blur"
					blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			<CardContent className="p-6">
				<div className="space-y-4">
					<div>
						<h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
							{apartment.name}
						</h2>
						<p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
							{truncatedDescription}
						</p>
					</div>

					<div className="flex items-center justify-between pt-2 border-t border-gray-100">
						<div className="flex items-center gap-1 text-sm text-gray-600">
							<Users className="h-4 w-4" />
							<span className="font-medium">{apartment.maxGuests} guests</span>
						</div>
						<div className="font-bold text-lg text-gray-900">
							{formatPricePerNight(apartment.basePricePerNight)}
						</div>
					</div>

					<div className="pt-2">
						<Button
							asChild
							className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
						>
							<Link href={`/apartments/${apartment.id}`}>View Details</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
