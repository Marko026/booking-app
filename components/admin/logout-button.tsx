'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
	const router = useRouter()

	async function handleLogout() {
		await signOut()
		router.push('/admin/login')
		router.refresh()
	}

	return (
		<Button variant="outline" onClick={handleLogout}>
			Logout
		</Button>
	)
}
