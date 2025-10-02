import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Skip middleware for login page, Next.js internals, and API routes
	if (
		pathname === '/admin/login' ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api')
	) {
		return NextResponse.next()
	}

	// Check for session cookie
	const sessionCookie = request.cookies.get('booking-app.session-token')

	// Protect /admin routes
	if (pathname.startsWith('/admin')) {
		if (!sessionCookie) {
			const loginUrl = new URL('/admin/login', request.url)
			loginUrl.searchParams.set('from', pathname)
			return NextResponse.redirect(loginUrl)
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*'],
}
