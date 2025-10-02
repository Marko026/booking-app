import { AdminHeader } from '@/components/layouts/admin-header'
import { AdminSidebar } from '@/components/layouts/admin-sidebar'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex h-screen overflow-hidden bg-background">
			{/* Sidebar */}
			<AdminSidebar />

			{/* Main Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<AdminHeader />
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	)
}
