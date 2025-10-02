import { Card } from '@/components/ui/card'
import { requireAuth } from '@/lib/auth'

export default async function AdminDashboardPage() {
	const session = await requireAuth()

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight text-gray-900">
					Dashboard
				</h2>
				<p className="mt-2 text-gray-600">Welcome back, {session.user.name}!</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card className="p-6">
					<h3 className="text-lg font-semibold text-gray-900">Bookings</h3>
					<p className="mt-2 text-sm text-gray-600">
						Manage apartment bookings
					</p>
				</Card>

				<Card className="p-6">
					<h3 className="text-lg font-semibold text-gray-900">Apartments</h3>
					<p className="mt-2 text-sm text-gray-600">
						Manage apartment listings
					</p>
				</Card>

				<Card className="p-6">
					<h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
					<p className="mt-2 text-sm text-gray-600">View booking analytics</p>
				</Card>
			</div>

			<Card className="p-6">
				<h3 className="text-lg font-semibold text-gray-900">Session Info</h3>
				<pre className="mt-4 overflow-auto rounded bg-gray-100 p-4 text-sm">
					{JSON.stringify(session, null, 2)}
				</pre>
			</Card>
		</div>
	)
}
