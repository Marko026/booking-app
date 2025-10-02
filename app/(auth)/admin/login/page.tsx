'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from '@/lib/auth-client'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const from = searchParams.get('from') || '/admin'

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	})

	async function onSubmit(data: LoginFormData) {
		setIsLoading(true)
		setError(null)

		try {
			const response = await signIn.email({
				email: data.email,
				password: data.password,
			})

			if (response.error) {
				setError(response.error.message || 'Invalid email or password')
				return
			}

			// Redirect to the original page or dashboard
			router.push(from)
			router.refresh()
		} catch {
			setError('An unexpected error occurred. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md space-y-8 p-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Admin Login
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Sign in to access the admin dashboard
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-8 space-y-6"
					>
						{error && (
							<div className="rounded-md bg-red-50 p-4">
								<p className="text-sm text-red-800">{error}</p>
							</div>
						)}

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="admin@example.com"
											autoComplete="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="••••••••"
											autoComplete="current-password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</Button>

						<div className="mt-4 text-center text-sm text-gray-500">
							<p>Development credentials:</p>
							<p className="font-mono">admin@example.com / admin123</p>
						</div>
					</form>
				</Form>
			</Card>
		</div>
	)
}
