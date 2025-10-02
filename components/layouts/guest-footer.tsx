import Link from 'next/link'

export function GuestFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t bg-background">
			<div className="container py-8 md:py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-2">
						<Link href="/" className="inline-block">
							<span className="text-xl font-bold">
								Booking<span className="text-primary">App</span>
							</span>
						</Link>
						<p className="mt-4 text-sm text-muted-foreground">
							Modern apartment booking and management system. Find and book your
							perfect apartment with ease.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-sm font-semibold">Quick Links</h3>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									href="/apartments"
									className="text-muted-foreground hover:text-foreground"
								>
									Browse Apartments
								</Link>
							</li>
							<li>
								<Link
									href="/bookings/lookup"
									className="text-muted-foreground hover:text-foreground"
								>
									My Booking
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-muted-foreground hover:text-foreground"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="text-sm font-semibold">Support</h3>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									href="/help"
									className="text-muted-foreground hover:text-foreground"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-muted-foreground hover:text-foreground"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-muted-foreground hover:text-foreground"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/admin/login"
									className="text-muted-foreground hover:text-foreground"
								>
									Admin Login
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
					<p>© {currentYear} BookingApp. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
