import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Booking App - Apartment Rental Management',
	description: 'Modern apartment booking and management system',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<div className="min-h-screen bg-gray-50">{children}</div>
				<Toaster position="top-right" richColors />
			</body>
		</html>
	)
}
