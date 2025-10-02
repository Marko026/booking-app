import { LogoutButton } from '@/components/admin/logout-button'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="border-b bg-white">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold text-gray-900">
						Booking Admin Dashboard
					</h1>
					<LogoutButton />
				</div>
			</header>
			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	)
}
