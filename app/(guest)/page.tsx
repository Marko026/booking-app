export default function Home() {
	return (
		<div className="container py-12 md:py-24">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					Welcome to <span className="text-primary">BookingApp</span>
				</h1>
				<p className="mt-6 text-lg text-muted-foreground md:text-xl">
					A modern apartment booking and management system built with Next.js 15
				</p>
				<div className="mt-10 flex flex-col gap-4 sm:flex-row">
					<a
						href="/apartments"
						className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
					>
						Browse Apartments
					</a>
					<a
						href="/bookings/lookup"
						className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
					>
						Manage Booking
					</a>
				</div>
			</div>
		</div>
	)
}
