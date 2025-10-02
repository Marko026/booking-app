# Booking App Frontend Architecture Document

## Change Log

| Date       | Version | Description          | Author              |
| ---------- | ------- | -------------------- | ------------------- |
| 2025-01-01 | v1.0    | Initial architecture | Winston (Architect) |

## Template and Framework Selection

Based on the comprehensive PRD and UI/UX specification, the frontend architecture will be built using:

**Selected Framework Stack:**

- **Next.js 15** with App Router for the framework
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library (built on Radix UI)
- **Framer Motion** for animations
- **React Hook Form** with **Zod** for form validation

**Detailed Rationale:**

**Framework Selection - Next.js 15 with App Router:**

- **Trade-offs:** Next.js 15 brings significant improvements including better Server Components performance, enhanced caching strategies, and improved developer experience. The App Router is now mature and stable.
- **Key Assumptions:** Your booking app will benefit from Next.js 15's improved server-side rendering, better image optimization, and enhanced performance metrics.
- **Decision Points:** Next.js 15's improved caching and server components are perfect for your apartment listings and real-time availability updates.

**Component Library - shadcn/ui:**

- **Trade-offs:** Chose shadcn/ui over other component libraries because it's built on Radix UI primitives (excellent accessibility), uses Tailwind CSS (matches your styling approach), and provides copy-paste components (no runtime dependencies, full customization).
- **Key Assumptions:** You need accessible components that can be fully customized to match your brand, and you want to avoid bundle size bloat from large component libraries.
- **Decision Points:** shadcn/ui's approach of copying components into your codebase gives you full control over styling and behavior, perfect for your custom booking calendar and apartment cards.

**Styling - Tailwind CSS:**

- **Trade-offs:** Chose utility-first CSS over CSS-in-JS or CSS Modules for faster development, better performance, and consistency with shadcn/ui. This means learning Tailwind patterns but provides excellent developer experience.
- **Key Assumptions:** Your team values rapid prototyping, consistent design system, and performance optimization.
- **Decision Points:** Tailwind's utility classes work perfectly with your responsive design requirements and color palette specifications.

**Animation - Framer Motion:**

- **Trade-offs:** Chose Framer Motion over CSS animations for complex interactions like your booking calendar transitions and page transitions. Adds bundle size but provides excellent React integration.
- **Key Assumptions:** Your UI/UX spec emphasizes smooth animations and micro-interactions for better user experience.
- **Decision Points:** Framer Motion's React integration makes it easier to implement the specific animations you've defined (page transitions, modal entries, toast notifications).

## Frontend Tech Stack

### Technology Stack Table

| Category          | Technology                          | Version  | Purpose                                    | Rationale                                                               |
| ----------------- | ----------------------------------- | -------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| Framework         | Next.js                             | 15+      | Full-stack React framework with App Router | Provides SSR/SSG for SEO, API routes for backend, optimized performance |
| UI Library        | shadcn/ui + Radix UI                | Latest   | Accessible, customizable component library | Built on Radix primitives, copy-paste approach, full customization      |
| Styling           | Tailwind CSS                        | 3.4+     | Utility-first CSS framework                | Fast development, consistent design system, matches shadcn/ui           |
| State Management  | React Server Components + URL state | Built-in | Server-side state + client URL state       | Minimal client state, leverages Next.js App Router patterns             |
| Routing           | Next.js App Router                  | Built-in | File-based routing with layouts            | SEO-optimized, nested layouts, loading/error states                     |
| Build Tool        | Next.js (Turbopack)                 | Built-in | Fast bundling and development              | Optimized for Next.js, faster than Webpack                              |
| Styling           | Tailwind CSS + CSS Variables        | 3.4+     | Design system and theming                  | Custom properties for colors, spacing, dark mode support                |
| Testing           | Jest + React Testing Library        | Latest   | Component and integration testing          | Industry standard, excellent React testing support                      |
| Component Library | shadcn/ui components                | Latest   | Pre-built accessible components            | Button, Card, Input, Calendar, Dialog, Toast, etc.                      |
| Form Handling     | React Hook Form + Zod               | Latest   | Form state and validation                  | Performance, type safety, excellent DX                                  |
| Animation         | Framer Motion                       | Latest   | Smooth animations and transitions          | React integration, accessibility support, performance                   |
| Dev Tools         | ESLint + Prettier + Husky           | Latest   | Code quality and formatting                | Consistent code style, pre-commit hooks                                 |

## Project Structure

```
booking-app/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── admin/                    # Admin dashboard routes
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── bookings/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   ├── calendar/
│   │   │   │   └── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── apartments/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── guests/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── apartments/               # Public apartment pages
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── bookings/                 # Public booking pages
│   │   ├── confirmation/
│   │   │   └── [code]/
│   │   │       └── page.tsx
│   │   ├── lookup/
│   │   │   └── page.tsx
│   │   └── [apartmentId]/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── admin/
│   │   │   ├── analytics/
│   │   │   │   └── route.ts
│   │   │   ├── bookings/
│   │   │   │   └── route.ts
│   │   │   ├── pricing/
│   │   │   │   └── route.ts
│   │   │   └── apartments/
│   │   │       └── route.ts
│   │   ├── bookings/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   ├── [code]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── apartments/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── availability/
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── pricing/
│   │       └── [id]/
│   │           └── route.ts
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Global error boundary
│   └── page.tsx                  # Homepage
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   ├── calendar.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   └── index.ts
│   ├── forms/                    # Form components
│   │   ├── booking-form.tsx
│   │   ├── pricing-form.tsx
│   │   ├── apartment-form.tsx
│   │   └── auth-form.tsx
│   ├── layouts/                  # Layout components
│   │   ├── guest-layout.tsx
│   │   ├── admin-layout.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── sidebar.tsx
│   ├── booking/                  # Booking-specific components
│   │   ├── availability-calendar.tsx
│   │   ├── booking-card.tsx
│   │   ├── price-calculator.tsx
│   │   ├── booking-summary.tsx
│   │   └── confirmation-details.tsx
│   ├── apartment/                # Apartment-specific components
│   │   ├── apartment-card.tsx
│   │   ├── photo-gallery.tsx
│   │   ├── amenities-list.tsx
│   │   └── apartment-details.tsx
│   ├── admin/                    # Admin-specific components
│   │   ├── dashboard-widgets.tsx
│   │   ├── bookings-table.tsx
│   │   ├── pricing-calendar.tsx
│   │   └── analytics-charts.tsx
│   └── common/                   # Common utility components
│       ├── loading-skeleton.tsx
│       ├── error-boundary.tsx
│       ├── page-header.tsx
│       ├── status-badge.tsx
│       └── empty-state.tsx
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication utilities
│   ├── db.ts                     # Database utilities
│   ├── validations.ts            # Zod schemas
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   ├── email.ts                  # Email utilities
│   └── pricing.ts                # Pricing calculation logic
├── hooks/                        # Custom React hooks
│   ├── use-booking.ts
│   ├── use-pricing.ts
│   ├── use-availability.ts
│   ├── use-auth.ts
│   └── use-debounce.ts
├── types/                        # TypeScript type definitions
│   ├── booking.ts
│   ├── apartment.ts
│   ├── pricing.ts
│   ├── auth.ts
│   └── api.ts
├── styles/                       # Additional styles
│   ├── components.css            # Component-specific styles
│   └── animations.css            # Custom animations
├── public/                       # Static assets
│   ├── images/
│   │   ├── apartments/
│   │   └── icons/
│   ├── favicon.ico
│   └── manifest.json
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── __tests__/                    # Test files
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── utils/
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables
├── .gitignore
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
├── pnpm-lock.yaml               # Package lock file
└── README.md                     # Project documentation
```

**Directory Structure Rationale:**

**App Router Structure:**

- **Route Groups:** `(auth)` groups auth-related routes without affecting URL structure
- **Nested Layouts:** Each route group has its own layout for consistent styling and navigation
- **API Routes:** Organized by feature with proper RESTful structure
- **Dynamic Routes:** `[id]` and `[code]` for dynamic content

**Component Organization:**

- **UI Components:** shadcn/ui components in dedicated `ui/` folder
- **Feature Components:** Organized by domain (booking, apartment, admin)
- **Layout Components:** Reusable layout structures
- **Form Components:** Specialized form components with validation

**Utility Organization:**

- **lib/:** Core business logic and utilities
- **hooks/:** Custom React hooks for state management
- **types/:** Centralized TypeScript definitions
- **styles/:** Additional CSS beyond Tailwind

## Component Standards

### Component Template

```typescript
'use client'; // Only if component needs client-side features

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComponentNameProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  onAction?: () => void;
}

export function ComponentName({
  title,
  description,
  className,
  children,
  onAction,
}: ComponentNameProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (!onAction) return;

    setIsLoading(true);
    try {
      await onAction();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('w-full', className)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent>
          {children}
          {onAction && (
            <Button
              onClick={handleAction}
              disabled={isLoading}
              className="mt-4">
              {isLoading ? 'Loading...' : 'Action'}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

### Naming Conventions

**Components:**

- Use PascalCase for component names: `BookingCard`, `AvailabilityCalendar`
- Use descriptive, domain-specific names: `ApartmentDetails` not `Details`
- Prefix with feature area when needed: `AdminBookingTable`, `GuestBookingForm`

**Files:**

- Use kebab-case for file names: `booking-card.tsx`, `availability-calendar.tsx`
- Match component name in PascalCase: `BookingCard` component in `booking-card.tsx`

**Props:**

- Use camelCase: `onBookingCreate`, `maxGuests`
- Use descriptive names: `isLoading` not `loading`, `onSubmit` not `submit`
- Boolean props start with `is`, `has`, `can`: `isVisible`, `hasError`, `canSubmit`

**State Variables:**

- Use camelCase: `selectedDates`, `bookingForm`
- Use descriptive names: `isSubmitting` not `loading`, `selectedApartment` not `apt`

**Functions:**

- Use camelCase: `handleBookingSubmit`, `calculateTotalPrice`
- Use action verbs: `handle`, `calculate`, `validate`, `fetch`
- Event handlers start with `handle`: `handleClick`, `handleSubmit`

**Constants:**

- Use UPPER_SNAKE_CASE: `MAX_GUESTS`, `BOOKING_STATUS`
- Group related constants in objects: `BOOKING_STATUS.PENDING`, `BOOKING_STATUS.CONFIRMED`

**CSS Classes:**

- Use Tailwind utility classes: `bg-primary text-white p-4`
- Use `cn()` utility for conditional classes: `cn('base-class', { 'conditional-class': condition })`
- Create CSS variables for custom values: `var(--primary-color)`

**API Endpoints:**

- Use RESTful conventions: `GET /api/bookings`, `POST /api/bookings`
- Use kebab-case for multi-word resources: `/api/pricing-rules`
- Use descriptive query parameters: `?startDate=2025-01-01&endDate=2025-01-31`

**Environment Variables:**

- Use UPPER_SNAKE_CASE: `DATABASE_URL`, `NEXTAUTH_SECRET`
- Prefix with app name for clarity: `BOOKING_APP_DATABASE_URL`

## State Management

### Store Structure

```
lib/
├── state/
│   ├── booking-store.ts          # Booking-related state
│   ├── apartment-store.ts        # Apartment data state
│   ├── pricing-store.ts          # Pricing calculations state
│   ├── auth-store.ts             # Authentication state
│   └── ui-store.ts               # UI state (modals, toasts, etc.)
├── hooks/
│   ├── use-booking.ts            # Booking state management
│   ├── use-pricing.ts            # Pricing calculations
│   ├── use-availability.ts       # Availability checking
│   ├── use-auth.ts               # Authentication state
│   └── use-debounce.ts           # Debounced values
```

### State Management Template

```typescript
'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface BookingState {
	// State
	bookings: Booking[]
	selectedBooking: Booking | null
	isLoading: boolean
	error: string | null

	// Actions
	setBookings: (bookings: Booking[]) => void
	setSelectedBooking: (booking: Booking | null) => void
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void

	// Async Actions
	fetchBookings: () => Promise<void>
	createBooking: (bookingData: CreateBookingData) => Promise<void>
	updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
	deleteBooking: (id: string) => Promise<void>
}

export const useBookingStore = create<BookingState>()(
	devtools(
		immer((set, get) => ({
			// Initial State
			bookings: [],
			selectedBooking: null,
			isLoading: false,
			error: null,

			// Sync Actions
			setBookings: (bookings) =>
				set((state) => {
					state.bookings = bookings
				}),

			setSelectedBooking: (booking) =>
				set((state) => {
					state.selectedBooking = booking
				}),

			setLoading: (loading) =>
				set((state) => {
					state.isLoading = loading
				}),

			setError: (error) =>
				set((state) => {
					state.error = error
				}),

			// Async Actions
			fetchBookings: async () => {
				set((state) => {
					state.isLoading = true
					state.error = null
				})

				try {
					const response = await fetch('/api/bookings')
					if (!response.ok) throw new Error('Failed to fetch bookings')

					const bookings = await response.json()
					set((state) => {
						state.bookings = bookings
						state.isLoading = false
					})
				} catch (error) {
					set((state) => {
						state.error =
							error instanceof Error ? error.message : 'Unknown error'
						state.isLoading = false
					})
				}
			},

			createBooking: async (bookingData) => {
				set((state) => {
					state.isLoading = true
					state.error = null
				})

				try {
					const response = await fetch('/api/bookings', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(bookingData),
					})

					if (!response.ok) throw new Error('Failed to create booking')

					const newBooking = await response.json()
					set((state) => {
						state.bookings.push(newBooking)
						state.isLoading = false
					})
				} catch (error) {
					set((state) => {
						state.error =
							error instanceof Error ? error.message : 'Unknown error'
						state.isLoading = false
					})
				}
			},

			updateBooking: async (id, updates) => {
				set((state) => {
					state.isLoading = true
					state.error = null
				})

				try {
					const response = await fetch(`/api/bookings/${id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updates),
					})

					if (!response.ok) throw new Error('Failed to update booking')

					const updatedBooking = await response.json()
					set((state) => {
						const index = state.bookings.findIndex((b) => b.id === id)
						if (index !== -1) {
							state.bookings[index] = updatedBooking
						}
						if (state.selectedBooking?.id === id) {
							state.selectedBooking = updatedBooking
						}
						state.isLoading = false
					})
				} catch (error) {
					set((state) => {
						state.error =
							error instanceof Error ? error.message : 'Unknown error'
						state.isLoading = false
					})
				}
			},

			deleteBooking: async (id) => {
				set((state) => {
					state.isLoading = true
					state.error = null
				})

				try {
					const response = await fetch(`/api/bookings/${id}`, {
						method: 'DELETE',
					})

					if (!response.ok) throw new Error('Failed to delete booking')

					set((state) => {
						state.bookings = state.bookings.filter((b) => b.id !== id)
						if (state.selectedBooking?.id === id) {
							state.selectedBooking = null
						}
						state.isLoading = false
					})
				} catch (error) {
					set((state) => {
						state.error =
							error instanceof Error ? error.message : 'Unknown error'
						state.isLoading = false
					})
				}
			},
		})),
		{
			name: 'booking-store',
		}
	)
)
```

**State Management Rationale:**

**Zustand over Redux:**

- **Simpler API:** Less boilerplate, easier to learn and maintain
- **TypeScript Support:** Excellent type inference and safety
- **Performance:** No unnecessary re-renders, selective subscriptions
- **DevTools:** Built-in Redux DevTools support for debugging

**Immer Integration:**

- **Immutability:** Automatic immutable updates without spread operators
- **Readability:** Direct mutations that are automatically converted to immutable updates
- **Performance:** Structural sharing for efficient updates

**Server State Strategy:**

- **React Query/SWR Alternative:** Use Zustand with manual cache management
- **Server Components:** Leverage Next.js App Router for server-side data fetching
- **URL State:** Use `nuqs` for search parameters and filters
- **Optimistic Updates:** Update UI immediately, rollback on error

## API Integration

### Service Template

```typescript
import { z } from 'zod'

// API Response Types
const BookingResponseSchema = z.object({
	id: z.string(),
	apartmentId: z.string(),
	guestId: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	numberOfGuests: z.number(),
	totalPrice: z.number(),
	status: z.enum(['pending', 'confirmed', 'cancelled']),
	confirmationCode: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
})

const CreateBookingSchema = z.object({
	apartmentId: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	numberOfGuests: z.number(),
	guestInfo: z.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email(),
		phone: z.string(),
	}),
	specialRequests: z.string().optional(),
})

export type Booking = z.infer<typeof BookingResponseSchema>
export type CreateBookingData = z.infer<typeof CreateBookingSchema>

// API Error Types
export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public code?: string
	) {
		super(message)
		this.name = 'ApiError'
	}
}

// Service Class
export class BookingService {
	private baseUrl: string

	constructor(baseUrl: string = '/api') {
		this.baseUrl = baseUrl
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`

		const config: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			...options,
		}

		try {
			const response = await fetch(url, config)

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				throw new ApiError(
					errorData.message || `HTTP ${response.status}`,
					response.status,
					errorData.code
				)
			}

			return await response.json()
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}

			// Network or parsing errors
			throw new ApiError(
				'Network error or invalid response',
				0,
				'NETWORK_ERROR'
			)
		}
	}

	// Booking Operations
	async getBookings(params?: {
		status?: string
		apartmentId?: string
		startDate?: string
		endDate?: string
		page?: number
		limit?: number
	}): Promise<Booking[]> {
		const searchParams = new URLSearchParams()

		if (params?.status) searchParams.set('status', params.status)
		if (params?.apartmentId) searchParams.set('apartmentId', params.apartmentId)
		if (params?.startDate) searchParams.set('startDate', params.startDate)
		if (params?.endDate) searchParams.set('endDate', params.endDate)
		if (params?.page) searchParams.set('page', params.page.toString())
		if (params?.limit) searchParams.set('limit', params.limit.toString())

		const queryString = searchParams.toString()
		const endpoint = `/bookings${queryString ? `?${queryString}` : ''}`

		return this.request<Booking[]>(endpoint)
	}

	async getBookingById(id: string): Promise<Booking> {
		return this.request<Booking>(`/bookings/${id}`)
	}

	async getBookingByCode(code: string): Promise<Booking> {
		return this.request<Booking>(`/bookings/code/${code}`)
	}

	async createBooking(data: CreateBookingData): Promise<Booking> {
		// Validate input data
		const validatedData = CreateBookingSchema.parse(data)

		return this.request<Booking>('/bookings', {
			method: 'POST',
			body: JSON.stringify(validatedData),
		})
	}

	async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
		return this.request<Booking>(`/bookings/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updates),
		})
	}

	async deleteBooking(id: string): Promise<void> {
		await this.request<void>(`/bookings/${id}`, {
			method: 'DELETE',
		})
	}

	async cancelBooking(code: string): Promise<Booking> {
		return this.request<Booking>(`/bookings/${code}/cancel`, {
			method: 'PUT',
		})
	}
}

// Singleton instance
export const bookingService = new BookingService()

// Custom Hook for API Integration
export function useBookingApi() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<ApiError | null>(null)

	const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
		setIsLoading(true)
		setError(null)

		try {
			const result = await apiCall()
			return result
		} catch (err) {
			const apiError =
				err instanceof ApiError ? err : new ApiError('Unknown error', 0)
			setError(apiError)
			return null
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		execute,
	}
}
```

### API Client Configuration

```typescript
// lib/api-client.ts
import { toast } from '@/hooks/use-toast'

// Global API Error Handler
export function handleApiError(error: ApiError) {
	console.error('API Error:', error)

	// Show user-friendly error message
	toast({
		title: 'Error',
		description: getErrorMessage(error),
		variant: 'destructive',
	})

	// Log to monitoring service (Sentry, etc.)
	if (typeof window !== 'undefined') {
		// Sentry.captureException(error)
	}
}

function getErrorMessage(error: ApiError): string {
	switch (error.status) {
		case 400:
			return 'Invalid request. Please check your input and try again.'
		case 401:
			return 'You are not authorized. Please log in again.'
		case 403:
			return 'You do not have permission to perform this action.'
		case 404:
			return 'The requested resource was not found.'
		case 409:
			return 'This booking is no longer available. Please try different dates.'
		case 429:
			return 'Too many requests. Please wait a moment and try again.'
		case 500:
			return 'Server error. Please try again later.'
		default:
			return error.message || 'An unexpected error occurred.'
	}
}

// Request Interceptor for Authentication
export function createAuthenticatedRequest(
	originalRequest: RequestInit
): RequestInit {
	// Add authentication headers if available
	const token = localStorage.getItem('auth-token')

	if (token) {
		return {
			...originalRequest,
			headers: {
				...originalRequest.headers,
				Authorization: `Bearer ${token}`,
			},
		}
	}

	return originalRequest
}

// Retry Logic for Failed Requests
export async function withRetry<T>(
	apiCall: () => Promise<T>,
	maxRetries: number = 3,
	delay: number = 1000
): Promise<T> {
	let lastError: Error

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await apiCall()
		} catch (error) {
			lastError = error as Error

			// Don't retry on client errors (4xx)
			if (
				error instanceof ApiError &&
				error.status >= 400 &&
				error.status < 500
			) {
				throw error
			}

			// Don't retry on last attempt
			if (attempt === maxRetries) {
				throw error
			}

			// Exponential backoff delay
			await new Promise((resolve) =>
				setTimeout(resolve, delay * Math.pow(2, attempt))
			)
		}
	}

	throw lastError!
}

// Rate Limiting Helper
export class RateLimiter {
	private requests: Map<string, number[]> = new Map()

	canMakeRequest(key: string, limit: number, windowMs: number): boolean {
		const now = Date.now()
		const requests = this.requests.get(key) || []

		// Remove old requests outside the window
		const validRequests = requests.filter((time) => now - time < windowMs)

		if (validRequests.length >= limit) {
			return false
		}

		// Add current request
		validRequests.push(now)
		this.requests.set(key, validRequests)

		return true
	}
}

export const rateLimiter = new RateLimiter()
```

**API Integration Rationale:**

**Service Layer Pattern:**

- **Separation of Concerns:** API logic separated from UI components
- **Reusability:** Service methods can be used across different components
- **Type Safety:** Full TypeScript support with Zod validation
- **Error Handling:** Centralized error handling with user-friendly messages

**Error Handling Strategy:**

- **ApiError Class:** Structured error handling with status codes and error types
- **Global Error Handler:** Consistent error display using toast notifications
- **Retry Logic:** Automatic retry for transient failures with exponential backoff
- **Rate Limiting:** Client-side rate limiting to prevent API abuse

**Authentication Integration:**

- **Request Interceptors:** Automatic token injection for authenticated requests
- **Token Management:** Secure token storage and refresh logic
- **Permission Handling:** Proper 401/403 error handling with redirects

## Routing

### Route Configuration

```typescript
// middleware.ts - Route protection middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes require authentication
  if (pathname.startsWith('/admin')) {
    const session = getSession(request);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // API routes protection
  if (pathname.startsWith('/api/admin')) {
    const session = getSession(request);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

// app/layout.tsx - Root layout with providers
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/providers/auth-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Booking App',
  description: 'Direct apartment booking system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

// app/(auth)/admin/layout.tsx - Admin layout
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/layouts/admin-sidebar';
import { AdminHeader } from '@/components/layouts/admin-header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// app/(guest)/layout.tsx - Guest layout
import { GuestHeader } from '@/components/layouts/guest-header';
import { GuestFooter } from '@/components/layouts/guest-footer';

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <GuestHeader />
      <main className="flex-1">{children}</main>
      <GuestFooter />
    </div>
  );
}

// lib/navigation.ts - Navigation configuration
export const navigation = {
  guest: [
    { name: 'Home', href: '/' },
    { name: 'Apartments', href: '/apartments' },
    { name: 'My Booking', href: '/bookings/lookup' },
    { name: 'Contact', href: '/contact' },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'Home' },
    { name: 'Bookings', href: '/admin/bookings', icon: 'Calendar' },
    { name: 'Pricing', href: '/admin/pricing', icon: 'DollarSign' },
    { name: 'Apartments', href: '/admin/apartments', icon: 'Building' },
    { name: 'Guests', href: '/admin/guests', icon: 'Users' },
    { name: 'Analytics', href: '/admin/analytics', icon: 'BarChart' },
  ],
};

// components/layouts/guest-header.tsx - Guest navigation
('use client');

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from '@/lib/navigation';

export function GuestHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">
                Booking App
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8 ml-8">
              {navigation.guest.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                    pathname === item.href
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <Link
              href="/bookings/[apartmentId]"
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// components/layouts/admin-sidebar.tsx - Admin navigation
('use client');

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from '@/lib/navigation';
import { LucideIcon } from 'lucide-react';

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col',
        className
      )}>
      <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-xl font-bold text-primary">Admin Panel</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.admin.map((item) => {
              const Icon = item.icon as LucideIcon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    pathname === item.href
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}>
                  <Icon
                    className={cn(
                      'mr-3 flex-shrink-0 h-6 w-6',
                      pathname === item.href
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
```

**Routing Strategy Rationale:**

**App Router Benefits:**

- **File-based Routing:** Intuitive route structure matching the file system
- **Nested Layouts:** Shared layouts for different sections (guest vs admin)
- **Server Components:** Automatic server-side rendering for better performance
- **Loading States:** Built-in loading.tsx and error.tsx for better UX

**Route Protection:**

- **Middleware:** Centralized authentication checking for protected routes
- **Server-side Auth:** Server Components can access session data directly
- **Client-side Guards:** Additional protection for sensitive operations
- **Redirect Logic:** Automatic redirects to login for unauthenticated users

**Layout Strategy:**

- **Guest Layout:** Clean, marketing-focused design with booking CTAs
- **Admin Layout:** Dashboard-style with sidebar navigation and data tables
- **Route Groups:** `(auth)` and `(guest)` groups for different layout needs
- **Responsive Design:** Mobile-optimized navigation with hamburger menus

## Styling Guidelines

### Styling Approach

**Tailwind CSS + CSS Variables System:**

The application uses Tailwind CSS as the primary styling solution with a custom CSS variables system for theming. This approach provides:

- **Utility-first styling** for rapid development and consistent spacing
- **CSS custom properties** for dynamic theming and dark mode support
- **Component-level styling** using Tailwind's `@apply` directive when needed
- **Responsive design** with mobile-first breakpoints
- **Design system consistency** through predefined color and spacing scales

### Global Theme Variables

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		/* Colors */
		--primary: 37 99 235; /* #2563EB */
		--primary-foreground: 255 255 255;
		--secondary: 16 185 129; /* #10B981 */
		--secondary-foreground: 255 255 255;
		--accent: 245 158 11; /* #F59E0B */
		--accent-foreground: 0 0 0;
		--success: 5 150 105; /* #059669 */
		--warning: 217 119 6; /* #D97706 */
		--error: 220 38 38; /* #DC2626 */
		--neutral: 107 114 128; /* #6B7280 */

		/* Backgrounds */
		--background: 255 255 255; /* #FFFFFF */
		--background-secondary: 249 250 251; /* #F9FAFB */
		--foreground: 17 24 39; /* #111827 */
		--muted: 107 114 128; /* #6B7280 */
		--muted-foreground: 156 163 175; /* #9CA3AF */

		/* Borders */
		--border: 229 231 235; /* #E5E7EB */
		--border-light: 243 244 246; /* #F3F4F6 */

		/* Shadows */
		--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		--shadow-md:
			0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		--shadow-lg:
			0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

		/* Spacing Scale (based on 4px) */
		--spacing-xs: 0.25rem; /* 4px */
		--spacing-sm: 0.5rem; /* 8px */
		--spacing-md: 1rem; /* 16px */
		--spacing-lg: 1.5rem; /* 24px */
		--spacing-xl: 2rem; /* 32px */
		--spacing-2xl: 3rem; /* 48px */
		--spacing-3xl: 4rem; /* 64px */

		/* Typography */
		--font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
		--font-family-mono: 'JetBrains Mono', ui-monospace, monospace;

		/* Border Radius */
		--radius-sm: 0.125rem; /* 2px */
		--radius: 0.25rem; /* 4px */
		--radius-md: 0.375rem; /* 6px */
		--radius-lg: 0.5rem; /* 8px */
		--radius-xl: 0.75rem; /* 12px */

		/* Transitions */
		--transition-fast: 150ms ease-in-out;
		--transition-normal: 200ms ease-in-out;
		--transition-slow: 300ms ease-in-out;
	}

	/* Dark mode support (future enhancement) */
	.dark {
		--background: 17 24 39; /* #111827 */
		--background-secondary: 31 41 55; /* #1F2937 */
		--foreground: 249 250 251; /* #F9FAFB */
		--muted: 156 163 175; /* #9CA3AF */
		--muted-foreground: 107 114 128; /* #6B7280 */
		--border: 75 85 99; /* #4B5563 */
		--border-light: 55 65 81; /* #374151 */
	}

	/* Base styles */
	* {
		@apply border-border;
	}

	body {
		@apply bg-background text-foreground;
		font-feature-settings:
			'rlig' 1,
			'calt' 1;
	}

	/* Custom scrollbar */
	::-webkit-scrollbar {
		@apply w-2;
	}

	::-webkit-scrollbar-track {
		@apply bg-gray-100;
	}

	::-webkit-scrollbar-thumb {
		@apply bg-gray-300 rounded-full;
	}

	::-webkit-scrollbar-thumb:hover {
		@apply bg-gray-400;
	}
}

@layer components {
	/* Component-specific styles */
	.btn-primary {
		@apply bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2;
	}

	.btn-secondary {
		@apply bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-2 focus:ring-secondary focus:ring-offset-2;
	}

	.card {
		@apply bg-white rounded-lg border border-border shadow-sm;
	}

	.input {
		@apply border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
	}
}

@layer utilities {
	/* Custom utilities */
	.text-balance {
		text-wrap: balance;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
}
```

## Testing Requirements

### Component Test Template

```typescript
// __tests__/components/booking-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingCard } from '@/components/booking/booking-card';
import { mockBooking } from '@/__mocks__/booking';

describe('BookingCard', () => {
  const defaultProps = {
    booking: mockBooking,
    onEdit: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders booking information correctly', () => {
    render(<BookingCard {...defaultProps} />);

    expect(screen.getByText(mockBooking.confirmationCode)).toBeInTheDocument();
    expect(screen.getByText(mockBooking.guest.firstName)).toBeInTheDocument();
    expect(screen.getByText(mockBooking.apartment.name)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<BookingCard {...defaultProps} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockBooking.id);
  });

  it('shows confirmation dialog when cancel button is clicked', () => {
    render(<BookingCard {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  it('displays correct status badge', () => {
    render(<BookingCard {...defaultProps} />);

    const statusBadge = screen.getByTestId('status-badge');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('handles loading state', () => {
    render(<BookingCard {...defaultProps} isLoading />);

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});

// __tests__/api/bookings.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/bookings/route';
import { prisma } from '@/lib/db';

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: {
    booking: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('/api/bookings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET returns list of bookings', async () => {
    const mockBookings = [
      {
        id: '1',
        confirmationCode: 'ABC123',
        status: 'confirmed',
        guest: { firstName: 'John', lastName: 'Doe' },
        apartment: { name: 'Apartment 1' },
      },
    ];

    (prisma.booking.findMany as jest.Mock).mockResolvedValue(mockBookings);

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockBookings);
  });

  it('POST creates new booking', async () => {
    const bookingData = {
      apartmentId: '1',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      numberOfGuests: 2,
      guestInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
      },
    };

    const mockCreatedBooking = {
      id: '2',
      confirmationCode: 'XYZ789',
      ...bookingData,
    };

    (prisma.booking.create as jest.Mock).mockResolvedValue(mockCreatedBooking);

    const { req, res } = createMocks({
      method: 'POST',
      body: bookingData,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(prisma.booking.create).toHaveBeenCalledWith({
      data: bookingData,
      include: {
        guest: true,
        apartment: true,
      },
    });
  });

  it('returns 400 for invalid booking data', async () => {
    const invalidData = {
      apartmentId: '1',
      // Missing required fields
    };

    const { req, res } = createMocks({
      method: 'POST',
      body: invalidData,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toHaveProperty('error');
  });
});
```

### Testing Best Practices

1. **Unit Tests**: Test individual components in isolation with mocked dependencies
2. **Integration Tests**: Test component interactions and API integration
3. **E2E Tests**: Test critical user flows (booking creation, admin management)
4. **Coverage Goals**: Aim for 80% code coverage on business logic
5. **Test Structure**: Follow Arrange-Act-Assert pattern for clarity
6. **Mock External Dependencies**: Mock API calls, routing, and state management
7. **Accessibility Testing**: Test keyboard navigation and screen reader compatibility
8. **Performance Testing**: Test component rendering performance and bundle size

## Environment Configuration

### Required Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/booking_app"
DIRECT_URL="postgresql://username:password@localhost:5432/booking_app"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Service
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="bookings@yourdomain.com"
EMAIL_TO="owner@yourdomain.com"

# File Storage (optional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Analytics & Monitoring
SENTRY_DSN="your-sentry-dsn"
VERCEL_ANALYTICS_ID="your-analytics-id"

# App Configuration
APP_NAME="Booking App"
APP_URL="https://yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"

# Rate Limiting
UPSTASH_REDIS_REST_URL="your-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# Development
NODE_ENV="development"
```

## Frontend Developer Standards

### Critical Coding Rules

1. **Always use TypeScript strict mode** - No `any` types allowed
2. **Server Components by default** - Only use `'use client'` when absolutely necessary
3. **Consistent error handling** - Use the ApiError class for all API errors
4. **Form validation** - Always validate with Zod schemas before API calls
5. **Loading states** - Show loading indicators for all async operations
6. **Accessibility first** - All interactive elements must be keyboard accessible
7. **Mobile-first responsive** - Design for mobile, enhance for desktop
8. **Performance optimization** - Use React.memo, useMemo, and useCallback appropriately
9. **SEO optimization** - Use proper meta tags and semantic HTML
10. **Security** - Sanitize all user inputs and validate on both client and server

### Quick Reference

**Common Commands:**

```bash
# Development
pnpm dev                 # Start development server
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Run ESLint
pnpm type-check         # Run TypeScript checks

# Testing
pnpm test               # Run tests
pnpm test:watch         # Run tests in watch mode
pnpm test:coverage      # Run tests with coverage
pnpm test:e2e           # Run E2E tests

# Database
pnpm db:generate        # Generate Prisma client
pnpm db:migrate         # Run database migrations
pnpm db:seed            # Seed database with sample data
pnpm db:studio          # Open Prisma Studio

# Deployment
pnpm deploy             # Deploy to Vercel
```

**Key Import Patterns:**

```typescript
// Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Utilities
import { cn } from '@/lib/utils'
import { formatDate, formatCurrency } from '@/lib/utils'

// Types
import type { Booking, Apartment } from '@/types'

// Hooks
import { useBookingStore } from '@/lib/state/booking-store'
import { useBookingApi } from '@/hooks/use-booking'
```

**File Naming Conventions:**

- Components: `kebab-case.tsx` (e.g., `booking-card.tsx`)
- Pages: `page.tsx` (Next.js App Router)
- API routes: `route.ts`
- Utilities: `kebab-case.ts` (e.g., `date-utils.ts`)
- Types: `kebab-case.ts` (e.g., `booking-types.ts`)

**Project-Specific Patterns:**

- Use `cn()` utility for conditional classes
- Always wrap async operations in try-catch blocks
- Use Zustand stores for complex state management
- Implement optimistic updates for better UX
- Use Server Components for data fetching when possible
- Implement proper error boundaries for error handling
