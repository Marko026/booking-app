'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PhotoGalleryProps {
	photos: string[]
	apartmentName: string
}

export function PhotoGallery({ photos, apartmentName }: PhotoGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isLightboxOpen, setIsLightboxOpen] = useState(false)

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? photos.length - 1 : prevIndex - 1
		)
	}

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === photos.length - 1 ? 0 : prevIndex + 1
		)
	}

	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	if (photos.length === 0) {
		return (
			<div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
				<span className="text-gray-500">No photos available</span>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Main Image */}
			<div className="relative group">
				<Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
					<DialogTrigger asChild>
						<div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg cursor-pointer">
							<Image
								src={photos[currentIndex]}
								alt={`${apartmentName} - Photo ${currentIndex + 1}`}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
								placeholder="blur"
								blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
							/>
							<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
								<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<span className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
										Click to enlarge
									</span>
								</div>
							</div>
						</div>
					</DialogTrigger>

					<DialogContent className="max-w-7xl max-h-[90vh] p-0">
						<div className="relative h-[80vh] w-full">
							<Image
								src={photos[currentIndex]}
								alt={`${apartmentName} - Photo ${currentIndex + 1}`}
								fill
								className="object-contain"
								sizes="90vw"
							/>

							{/* Lightbox Navigation */}
							{photos.length > 1 && (
								<>
									<Button
										variant="outline"
										size="icon"
										className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
										onClick={goToPrevious}
									>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
										onClick={goToNext}
									>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</>
							)}
						</div>
					</DialogContent>
				</Dialog>

				{/* Navigation arrows for main view */}
				{photos.length > 1 && (
					<>
						<Button
							variant="outline"
							size="icon"
							className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={goToPrevious}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={goToNext}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</>
				)}
			</div>

			{/* Thumbnail Navigation */}
			{photos.length > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-2">
					{photos.map((photo, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
								index === currentIndex
									? 'border-primary ring-2 ring-primary ring-offset-2'
									: 'border-gray-200 hover:border-gray-300'
							}`}
						>
							<Image
								src={photo}
								alt={`${apartmentName} - Thumbnail ${index + 1}`}
								fill
								className="object-cover"
								sizes="64px"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
