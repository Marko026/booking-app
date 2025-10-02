import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './db'

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'sqlite',
	}),
	user: {
		modelName: 'adminUser',
		fields: {
			email: 'email',
			name: 'name',
			emailVerified: 'emailVerified',
			image: 'image',
		},
		additionalFields: {
			role: {
				type: 'string',
				required: true,
				defaultValue: 'ADMIN',
			},
			lastLoginAt: {
				type: 'date',
				required: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // Update session every 24 hours
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache for 5 minutes
		},
	},
	advanced: {
		cookiePrefix: 'booking-app',
		useSecureCookies: process.env.NODE_ENV === 'production',
		crossSubDomainCookies: {
			enabled: false,
		},
	},
})

export async function getServerSession() {
	try {
		const session = await auth.api.getSession({
			headers: await import('next/headers').then((m) => m.headers()),
		})
		return session
	} catch {
		return null
	}
}

export async function requireAuth() {
	const session = await getServerSession()

	if (!session) {
		throw new Error('Unauthorized')
	}

	return session
}

export type Session = Awaited<ReturnType<typeof getServerSession>>
