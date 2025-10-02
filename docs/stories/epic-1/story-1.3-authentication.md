# Story 1.3: BetterAuth Authentication Setup

## Status

**Ready for Development**

## Story

**As an** admin user,  
**I want** secure authentication protecting admin routes,  
**so that** only authorized users can manage bookings and apartment data.

## Epic

Epic 1: Foundation & Core Infrastructure

## Acceptance Criteria

1. BetterAuth installed and configured with appropriate session strategy
2. Authentication API routes created (/api/auth/\*)
3. Admin user schema/table integrated (email, password hash, role)
4. Seed script updated to create default admin user for development
5. Middleware created to protect /admin/\* routes
6. Login page created at /admin/login with email/password form using React Hook Form + Zod
7. Session management implemented with secure cookies
8. Logout functionality implemented
9. Auth helper utilities created (getSession, requireAuth) in lib/auth.ts
10. Redirect logic implemented (unauthorized → login, authorized → dashboard)
11. Authentication tested with successful login/logout flow

## Tasks / Subtasks

- [ ] Install and configure BetterAuth (AC: 1)
  - [ ] Install BetterAuth: `pnpm add better-auth`
  - [ ] Install bcrypt for password hashing: `pnpm add bcrypt @types/bcrypt`
  - [ ] Create lib/auth.ts configuration file
  - [ ] Configure session strategy (cookies, 7-day expiration)
  - [ ] Set up auth configuration with NextAuth secret

- [ ] Create authentication API routes (AC: 2)
  - [ ] Create app/api/auth/[...auth]/route.ts
  - [ ] Implement login endpoint
  - [ ] Implement logout endpoint
  - [ ] Implement session endpoint
  - [ ] Configure CSRF protection

- [ ] Add AdminUser model to Prisma schema (AC: 3)
  - [ ] Add AdminUser model to prisma/schema.prisma
  - [ ] Fields: id, email (unique), passwordHash, name, role
  - [ ] Add role enum: OWNER, ADMIN
  - [ ] Add timestamps: createdAt, updatedAt, lastLoginAt
  - [ ] Run migration: `pnpm exec prisma migrate dev --name add-admin-user`

- [ ] Update seed script with admin user (AC: 4)
  - [ ] Import bcrypt in prisma/seed.ts
  - [ ] Hash default password
  - [ ] Create default admin user:
    - Email: admin@example.com
    - Password: admin123 (hashed)
    - Role: OWNER
  - [ ] Run seed script
  - [ ] Document admin credentials in README (development only)

- [ ] Create authentication middleware (AC: 5)
  - [ ] Create middleware.ts in project root
  - [ ] Implement route protection for /admin/\* paths
  - [ ] Check session validity
  - [ ] Redirect to /admin/login if unauthorized
  - [ ] Configure matcher for protected routes

- [ ] Create login page (AC: 6)
  - [ ] Create app/(auth)/admin/login/page.tsx
  - [ ] Install React Hook Form: `pnpm add react-hook-form @hookform/resolvers`
  - [ ] Create login form with email and password fields
  - [ ] Implement Zod validation schema
  - [ ] Add shadcn/ui Form components
  - [ ] Add "Remember me" checkbox (optional)
  - [ ] Display error messages for failed login
  - [ ] Add loading state during authentication

- [ ] Implement session management (AC: 7)
  - [ ] Configure HTTP-only cookies
  - [ ] Set secure flag for production
  - [ ] Set SameSite attribute
  - [ ] Implement 7-day session expiration
  - [ ] Session refresh on activity

- [ ] Implement logout functionality (AC: 8)
  - [ ] Create logout button component
  - [ ] Implement API call to logout endpoint
  - [ ] Clear session cookies
  - [ ] Redirect to login page after logout
  - [ ] Add logout button to admin layout

- [ ] Create auth helper utilities (AC: 9)
  - [ ] Create lib/auth.ts with helper functions
  - [ ] Implement getSession() for server components
  - [ ] Implement requireAuth() for protected routes
  - [ ] Implement getServerSession() wrapper
  - [ ] Export auth types

- [ ] Implement redirect logic (AC: 10)
  - [ ] Redirect unauthorized users to /admin/login
  - [ ] Store original URL for post-login redirect
  - [ ] Redirect authenticated users away from login page
  - [ ] Implement redirect to dashboard after successful login

- [ ] Test authentication flow (AC: 11)
  - [ ] Test successful login with valid credentials
  - [ ] Test failed login with invalid credentials
  - [ ] Test logout functionality
  - [ ] Test protected route access
  - [ ] Test session persistence
  - [ ] Test session expiration

## Dev Notes

### Relevant Architecture Information

**Authentication Strategy (from Backend Architecture):**

**BetterAuth Configuration:**

- Session management: Server-side sessions with HTTP-only cookies
- Session duration: 7 days
- Security: Passwords hashed with bcrypt (salt rounds >= 10)

**Middleware Pattern (from Backend Architecture - Middleware Layer):**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/lib/auth'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Admin routes require authentication
	if (pathname.startsWith('/admin')) {
		const session = getSession(request)

		if (!session) {
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
```

**Auth Helper Utilities:**

```typescript
// lib/auth.ts
import { cookies } from 'next/headers'
import { prisma } from './db'

export async function getServerSession() {
	const cookieStore = cookies()
	const sessionToken = cookieStore.get('session-token')

	if (!sessionToken) return null

	// Verify and return session
	// Implementation depends on BetterAuth specifics
}

export async function requireAuth() {
	const session = await getServerSession()

	if (!session) {
		throw new Error('Unauthorized')
	}

	return session
}
```

**Security Requirements (NFR7 from Backend Architecture):**

- Admin endpoints protected with authentication
- Session tokens rotated on privilege escalation
- Logout invalidates server-side session immediately
- No client-side session storage (cookies only)

**Form Validation Schema:**

```typescript
// lib/validations/auth-schemas.ts
import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
```

### Testing

**Test File Location:**

- Auth utility tests: `__tests__/lib/auth.test.ts`
- Login page tests: `__tests__/pages/admin/login.test.tsx`
- Middleware tests: `__tests__/middleware.test.ts`
- Integration tests: `__tests__/integration/auth-flow.test.ts`

**Testing Standards:**

- Test successful authentication flow
- Test unauthorized access attempts
- Test session persistence
- Test logout functionality
- Mock BetterAuth responses in tests

**Test Example:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/(auth)/admin/login/page';

describe('Login Page', () => {
  it('should display login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should show error for invalid credentials', async () => {
    render(<LoginPage />);
    // Test implementation
  });
});
```

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## Dev Agent Record

### Agent Model Used

_To be populated by dev agent_

### Debug Log References

_To be populated by dev agent_

### Completion Notes List

_To be populated by dev agent_

### File List

_To be populated by dev agent_

## QA Results

### Review Date: 2025-10-02

### Reviewed By: Quinn (Test Architect)

### Code Quality Assessment

**Overall Assessment: EXCELLENT** - This story provides a comprehensive authentication system design with proper security practices, session management, and middleware protection. The story demonstrates strong understanding of security principles and includes all necessary components for a robust authentication layer.

**Strengths:**

- Complete BetterAuth integration with proper configuration
- Secure session management with HTTP-only cookies
- Comprehensive middleware protection for admin routes
- Proper password hashing with bcrypt
- Form validation with React Hook Form and Zod
- Clear authentication flow and redirect logic
- Comprehensive testing approach

### Refactoring Performed

No refactoring needed - story is well-structured and comprehensive.

### Compliance Check

- **Coding Standards:** ✓ Excellent - Proper TypeScript integration and security practices
- **Project Structure:** ✓ Excellent - Clear authentication organization and file structure
- **Testing Strategy:** ✓ Good - Comprehensive testing approach with multiple test types
- **All ACs Met:** ✓ All 11 acceptance criteria are clearly defined and actionable

### Improvements Checklist

- [x] Complete authentication system design
- [x] Secure session management
- [x] Middleware protection
- [x] Form validation and error handling
- [x] Proper password hashing
- [x] Comprehensive testing approach
- [ ] Consider adding rate limiting for login attempts
- [ ] Consider adding account lockout after failed attempts

### Security Review

**Status: PASS** - Excellent security practices including HTTP-only cookies, proper password hashing, and secure session management.

### Performance Considerations

**Status: PASS** - Efficient authentication flow with proper session management and middleware optimization.

### Files Modified During Review

No files modified during review.

### Gate Status

**Gate: PASS** → docs/qa/gates/1.3-authentication.yml

**Risk Profile:** Low - Well-defined authentication system with proper security practices
**NFR Assessment:** All non-functional requirements properly addressed

### Recommended Status

✓ **Ready for Implementation** - Story is comprehensive, well-structured, and ready for development agent execution.
