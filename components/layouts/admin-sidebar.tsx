'use client'

import { navigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import {
	BarChart,
	Building,
	Calendar,
	DollarSign,
	Home,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const iconMap = {
	Home,
	Calendar,
	DollarSign,
	Building,
	Users,
	BarChart,
}

export function AdminSidebar() {
	const pathname = usePathname()

	const isActive = (href: string) => {
		if (href === '/admin/dashboard')
			return pathname === href || pathname === '/admin'
		return pathname.startsWith(href)
	}

	return (
		<div className="flex h-full w-64 flex-col border-r bg-background">
			{/* Logo */}
			<div className="flex h-16 items-center border-b px-6">
				<Link href="/admin/dashboard" className="flex items-center space-x-2">
					<span className="text-lg font-bold">
						Booking<span className="text-primary">App</span>
					</span>
				</Link>
			</div>

			{/* Navigation */}
			<nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
				{navigation.admin.map((item) => {
					const Icon = iconMap[item.icon as keyof typeof iconMap]
					const active = isActive(item.href)

					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
								active
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-accent hover:text-foreground'
							)}
						>
							<Icon className="h-5 w-5" />
							{item.name}
						</Link>
					)
				})}
			</nav>

			{/* User Profile Section */}
			<div className="border-t p-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Users className="h-5 w-5" />
					</div>
					<div className="flex-1 text-sm">
						<p className="font-medium">Admin User</p>
						<p className="text-xs text-muted-foreground">
							admin@bookingapp.com
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
