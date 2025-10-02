'use client'

import { LogoutButton } from '@/components/admin/logout-button'
import { usePathname } from 'next/navigation'

export function AdminHeader() {
	const pathname = usePathname()

	// Generate page title and breadcrumbs from pathname
	const getPageInfo = () => {
		const segments = pathname.split('/').filter(Boolean)

		if (segments.length === 1 || pathname === '/admin/dashboard') {
			return { title: 'Dashboard', breadcrumbs: ['Dashboard'] }
		}

		// Convert path segments to readable titles
		const title = segments[segments.length - 1]
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')

		const breadcrumbs = segments.slice(1).map((segment) =>
			segment
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')
		)

		return { title, breadcrumbs: ['Admin', ...breadcrumbs] }
	}

	const { title, breadcrumbs } = getPageInfo()

	return (
		<header className="flex h-16 items-center justify-between border-b bg-background px-6">
			<div>
				<h1 className="text-2xl font-semibold">{title}</h1>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					{breadcrumbs.map((crumb, index) => (
						<span key={index}>
							{index > 0 && <span className="mx-2">/</span>}
							{crumb}
						</span>
					))}
				</div>
			</div>

			<div className="flex items-center gap-4">
				<LogoutButton />
			</div>
		</header>
	)
}
