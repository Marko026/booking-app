export const navigation = {
	guest: [
		{ name: 'Home', href: '/' },
		{ name: 'Apartments', href: '/apartments' },
		{ name: 'My Booking', href: '/bookings/lookup' },
		{ name: 'Contact', href: '/contact' },
	],
	admin: [
		{ name: 'Dashboard', href: '/admin/dashboard', icon: 'Home' },
		{ name: 'Bookings', href: '/admin/bookings', icon: 'Calendar' },
		{ name: 'Pricing', href: '/admin/pricing', icon: 'DollarSign' },
		{ name: 'Apartments', href: '/admin/apartments', icon: 'Building' },
		{ name: 'Guests', href: '/admin/guests', icon: 'Users' },
		{ name: 'Analytics', href: '/admin/analytics', icon: 'BarChart' },
	],
}
