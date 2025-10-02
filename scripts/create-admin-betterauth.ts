/**
 * Script to create admin user using BetterAuth API
 * This ensures password is hashed correctly by BetterAuth
 */

async function createAdminUser() {
	const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

	try {
		console.log('🔐 Creating admin user via BetterAuth API...')

		const response = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: 'Admin User',
				email: 'admin@example.com',
				password: 'admin123',
			}),
		})

		if (!response.ok) {
			const error = await response.text()
			throw new Error(`Failed to create admin user: ${error}`)
		}

		console.log('✅ Admin user created successfully!')
		console.log('')
		console.log('📧 Email: admin@example.com')
		console.log('🔑 Password: admin123')
		console.log('🌐 Login at: http://localhost:3000/admin/login')
	} catch (error) {
		console.error('❌ Error creating admin user:', error)
		process.exit(1)
	}
}

createAdminUser()
