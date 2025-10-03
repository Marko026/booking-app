import Link from 'next/link'

export function GuestFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t bg-white">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-2">
						<Link href="/" className="inline-block">
							<span className="text-xl font-bold text-gray-900">
								Booking<span className="text-primary">App</span>
							</span>
						</Link>
						<p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-md">
							Modern apartment booking and management system. Find and book your
							perfect apartment with ease and comfort.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-sm font-semibold text-gray-900 mb-4">
							Quick Links
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/apartments"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Browse Apartments
								</Link>
							</li>
							<li>
								<Link
									href="/bookings/lookup"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									My Booking
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="text-sm font-semibold text-gray-900 mb-4">
							Support
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/help"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/admin/login"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Admin Login
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 border-t border-gray-200 pt-8">
					<p className="text-center text-sm text-gray-500">
						© {currentYear} BookingApp. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
