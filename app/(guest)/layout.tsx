import { GuestFooter } from '@/components/layouts/guest-footer'
import { GuestHeader } from '@/components/layouts/guest-header'

export default function GuestLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<GuestHeader />
			<main className="flex-1">{children}</main>
			<GuestFooter />
		</div>
	)
}
