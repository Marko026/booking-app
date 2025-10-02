'use client'

import { Button } from '@/components/ui/button'
import { navigation } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function GuestHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const pathname = usePathname()

	const isActive = (href: string) => {
		if (href === '/') return pathname === href
		return pathname.startsWith(href)
	}

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<nav className="container flex h-16 items-center justify-between">
				{/* Logo */}
				<div className="flex items-center gap-6 md:gap-10">
					<Link href="/" className="flex items-center space-x-2">
						<span className="inline-block text-xl font-bold">
							Booking<span className="text-primary">App</span>
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:gap-6">
						{navigation.guest.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									'text-sm font-medium transition-colors hover:text-primary',
									isActive(item.href) ? 'text-foreground' : 'text-foreground/60'
								)}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>

				{/* Desktop CTA */}
				<div className="hidden items-center gap-4 md:flex">
					<Link href="/admin/login">
						<Button variant="ghost" size="sm">
							Admin Login
						</Button>
					</Link>
					<Link href="/apartments">
						<Button size="sm">Book Now</Button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</nav>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="border-t md:hidden">
					<div className="container space-y-1 py-4">
						{navigation.guest.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									'block rounded-md px-3 py-2 text-base font-medium',
									isActive(item.href)
										? 'bg-primary/10 text-primary'
										: 'text-foreground/60 hover:bg-accent hover:text-foreground'
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<div className="space-y-2 pt-4">
							<Link
								href="/admin/login"
								className="block"
								onClick={() => setMobileMenuOpen(false)}
							>
								<Button variant="outline" size="sm" className="w-full">
									Admin Login
								</Button>
							</Link>
							<Link
								href="/apartments"
								className="block"
								onClick={() => setMobileMenuOpen(false)}
							>
								<Button size="sm" className="w-full">
									Book Now
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
