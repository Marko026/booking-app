import {
	Car,
	ChefHat,
	Dumbbell,
	ArrowUp,
	Home,
	Laptop,
	Waves,
	Thermometer,
	TreePine,
	Tv,
	WashingMachine,
	Wifi,
	Wind,
} from 'lucide-react'

interface AmenitiesListProps {
	amenities: Record<string, boolean>
}

const amenityIcons: Record<
	string,
	React.ComponentType<{ className?: string }>
> = {
	wifi: Wifi,
	kitchen: ChefHat,
	parking: Car,
	airConditioning: Wind,
	heating: Thermometer,
	tv: Tv,
	workspace: Laptop,
	pool: Waves,
	gym: Dumbbell,
	elevator: ArrowUp,
	balcony: Home,
	washingMachine: WashingMachine,
	garden: TreePine,
}

const amenityLabels: Record<string, string> = {
	wifi: 'WiFi',
	kitchen: 'Kitchen',
	parking: 'Parking',
	airConditioning: 'Air Conditioning',
	heating: 'Heating',
	tv: 'TV',
	workspace: 'Workspace',
	pool: 'Pool',
	gym: 'Gym',
	elevator: 'Elevator',
	balcony: 'Balcony',
	washingMachine: 'Washing Machine',
	garden: 'Garden',
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
	const availableAmenities = Object.entries(amenities)
		.filter(([_, isAvailable]) => isAvailable)
		.map(([key, _]) => ({
			key,
			icon: amenityIcons[key],
			label: amenityLabels[key],
		}))
		.filter(({ icon }) => icon) // Only include amenities with defined icons

	if (availableAmenities.length === 0) {
		return <div className="text-gray-500 text-sm">No amenities listed</div>
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
			{availableAmenities.map(({ key, icon: Icon, label }) => (
				<div key={key} className="flex items-center gap-2 text-sm">
					<Icon className="h-4 w-4 text-green-600 flex-shrink-0" />
					<span className="text-gray-700">{label}</span>
				</div>
			))}
		</div>
	)
}
