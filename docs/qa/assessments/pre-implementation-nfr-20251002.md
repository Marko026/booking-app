# Non-Functional Requirements (NFR) Assessment

**Project:** Booking App for Two Apartments  
**Assessment Date:** October 2, 2025  
**Assessed By:** Quinn (Test Architect)  
**Review Type:** Pre-Implementation Documentation Review

---

## Executive Summary

**Overall NFR Coverage:** 90% (23/25 requirements fully specified)  
**NFR Validation Status:** **PASS WITH CONCERNS** ✅⚠️

**Strengths:**

- Performance targets clearly defined with measurable metrics
- Comprehensive security requirements with multi-layered approach
- Strong usability and accessibility standards (WCAG 2.1 AA)
- Detailed testing requirements with coverage goals

**Gaps:**

- NFR6 (Rate limiting) - Configuration details incomplete
- NFR10 (Concurrent bookings) - Strategy not fully defined

---

## Performance Requirements

### NFR1: Calendar Availability Response Time ✅ **PASS**

**Requirement:** Calendar availability checks must respond within 500ms for optimal user experience

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Target clearly specified: < 500ms response time
- PRD Section: Non-Functional Requirements → Performance (NFR1)
- Backend Architecture Section: Database Indexes Strategy
  - Composite index on `(apartmentId, startDate, endDate)` for optimized availability queries

**Test Scenarios:**

```gherkin
Scenario: Fast availability check
  Given 100 existing bookings in database
  When guest requests availability for Apartment 1 from June 15-20
  Then API responds within 500ms
  And response includes accurate available/booked dates
```

**Validation Method:**

- Performance testing with k6 or Artillery
- API response time monitoring in Vercel Analytics
- Database query performance profiling with Prisma

**Recommendation:** ✅ No changes needed. Strategy is sound.

---

### NFR2: Image Optimization ✅ **PASS**

**Requirement:** Images must be optimized using WebP format with lazy loading and progressive loading

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Frontend Architecture documents Next.js Image component usage
- WebP/AVIF format specified with JPEG fallbacks
- Lazy loading below-the-fold images
- Blur-up placeholders for better perceived performance
- PRD Section: Performance Optimizations → Image Handling

**Implementation Strategy:**

```typescript
// Example from Frontend Architecture
import Image from 'next/image';

<Image
  src={apartmentPhoto}
  alt="Apartment living room"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  loading="lazy"
  quality={85}
/>;
```

**Test Scenarios:**

```gherkin
Scenario: Image optimization reduces load time
  Given apartment detail page with 10 high-resolution photos
  When guest loads the page on 3G connection
  Then page achieves LCP < 2.5s
  And images progressively load with blur placeholders
  And WebP format is used with JPEG fallback
```

**Recommendation:** ✅ Excellent. Consider adding automated Lighthouse checks in CI/CD.

---

### NFR3: Core Web Vitals Targets ✅ **PASS**

**Requirement:** The application must achieve Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Specific, measurable targets defined
- Multiple optimization strategies documented:
  - Image optimization (NFR2)
  - Code splitting (dynamic imports for admin panel)
  - SSR/SSG with Next.js App Router
  - CDN delivery via Vercel Edge Network
- Monitoring strategy: Vercel Analytics for performance tracking

**Test Scenarios:**

```gherkin
Scenario: Core Web Vitals meet targets
  Given homepage deployed to production
  When measured with Lighthouse on 4G connection
  Then LCP < 2.5 seconds
  And FID < 100 milliseconds
  And CLS < 0.1
```

**Validation Method:**

- Lighthouse CI in GitHub Actions
- Real User Monitoring (RUM) with Vercel Analytics
- Synthetic monitoring with PageSpeed Insights

**Recommendation:** ✅ Excellent. Set up Lighthouse CI in Epic 1 for continuous monitoring.

---

### NFR4: Database Query Optimization ✅ **PASS**

**Requirement:** Database queries must be optimized with proper indexing for availability checks

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture documents comprehensive indexing strategy:
  - Composite index on `(apartmentId, startDate, endDate)` for availability queries
  - Index on `confirmationCode` for booking lookups
  - Index on `status` for admin filtering
  - Index on `email` for guest identification
- Prisma ORM ensures parameterized queries (SQL injection prevention)

**Prisma Schema:**

```prisma
model Booking {
  id               String        @id @default(uuid())
  apartmentId      String
  startDate        DateTime      @db.Date
  endDate          DateTime      @db.Date
  status           BookingStatus @default(PENDING)

  @@index([apartmentId, startDate, endDate])
  @@index([confirmationCode])
  @@index([status])
  @@map("bookings")
}
```

**Test Scenarios:**

```gherkin
Scenario: Availability query uses index
  Given 10,000 bookings in database
  When API checks availability for Apartment 1 from June 15-20
  Then database query uses index (EXPLAIN shows index scan)
  And query executes in < 50ms
```

**Validation Method:**

- Prisma query logging in development
- Database EXPLAIN ANALYZE for query plans
- Performance profiling with realistic data volumes

**Recommendation:** ✅ Excellent. Consider adding connection pooling configuration for serverless environments.

---

## Security Requirements

### NFR5: Input Validation with Zod ✅ **PASS**

**Requirement:** All API inputs must be validated using Zod schemas to prevent injection attacks

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture specifies Zod validation at API boundaries
- Frontend Architecture shows React Hook Form + Zod integration
- Example schemas provided for booking, pricing, and authentication

**Implementation Strategy:**

```typescript
// From Backend Architecture
const CreateBookingSchema = z.object({
	apartmentId: z.string().uuid(),
	startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	numberOfGuests: z.number().int().min(1).max(10),
	guestInfo: z.object({
		firstName: z.string().min(1).max(100),
		lastName: z.string().min(1).max(100),
		email: z.string().email(),
		phone: z.string().regex(/^\+?\d{10,15}$/),
	}),
})
```

**Test Scenarios:**

```gherkin
Scenario: Malicious input is rejected
  Given booking API endpoint
  When attacker sends booking request with SQL injection in email field
  Then API returns 400 Bad Request
  And error message describes validation failure
  And no database query is executed

Scenario: XSS attempt is blocked
  Given booking API endpoint
  When attacker sends <script> tag in special requests field
  Then API sanitizes input before storing
  And script is not executed when displayed
```

**Recommendation:** ✅ Excellent. Consider adding automated security scanning (OWASP ZAP) in CI/CD.

---

### NFR6: Rate Limiting ⚠️ **CONCERNS**

**Requirement:** Booking endpoints must implement rate limiting (5 requests/minute per IP) to prevent spam

**Status:** ⚠️ **INCOMPLETE SPECIFICATION**

**Evidence:**

- Backend Architecture mentions Upstash rate limiter
- Target rate specified: 5 requests/5 minutes per IP
- Tech stack table lists `@upstash/ratelimit` v1.x

**Missing Details:**

1. ❌ Sliding window algorithm not documented
2. ❌ Redis key structure not specified
3. ❌ Error response format (429 with Retry-After header) not detailed
4. ❌ Rate limit monitoring strategy not defined

**Recommendation:** 🔧 **MUST ADDRESS BEFORE EPIC 2**

Add to Backend Architecture:

```typescript
// lib/middleware/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const bookingLimiter = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(5, '5 m'), // ← Specify algorithm
	analytics: true,
	prefix: '@booking-app/bookings', // ← Redis key prefix
})

export async function rateLimitMiddleware(req: NextRequest) {
	const ip = req.ip ?? '127.0.0.1'
	const { success, limit, remaining, reset } = await bookingLimiter.limit(ip)

	if (!success) {
		return NextResponse.json(
			{
				error: 'Too many requests',
				code: 'RATE_LIMIT_EXCEEDED', // ← Error code
			},
			{
				status: 429,
				headers: {
					'X-RateLimit-Limit': limit.toString(),
					'X-RateLimit-Remaining': remaining.toString(),
					'X-RateLimit-Reset': new Date(reset).toISOString(),
					'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(), // ← Retry-After header
				},
			}
		)
	}

	return null
}
```

**Test Scenarios:**

```gherkin
Scenario: Rate limit enforced on booking endpoint
  Given clean rate limit state
  When user makes 5 booking requests in 1 minute
  Then all 5 requests succeed
  When user makes 6th booking request within same minute
  Then API returns 429 Too Many Requests
  And response includes Retry-After header
  And response includes X-RateLimit-Limit: 5
  And response includes X-RateLimit-Remaining: 0
```

---

### NFR7: Admin Authentication with BetterAuth ✅ **PASS**

**Requirement:** Admin endpoints must be protected with authentication using BetterAuth

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture documents BetterAuth integration
- Session management: HTTP-only cookies, 7-day expiration
- Middleware protects `/admin/*` routes
- Server-side session validation

**Implementation Strategy:**

```typescript
// From Backend Architecture - middleware.ts
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/admin')) {
		const session = getSession(request)

		if (!session) {
			return NextResponse.redirect(new URL('/admin/login', request.url))
		}
	}

	return NextResponse.next()
}
```

**Test Scenarios:**

```gherkin
Scenario: Unauthenticated admin access is blocked
  Given no active admin session
  When user navigates to /admin/bookings
  Then user is redirected to /admin/login
  And original URL is preserved for post-login redirect

Scenario: Authenticated admin access is allowed
  Given valid admin session
  When user navigates to /admin/bookings
  Then admin bookings page is displayed
  And session is refreshed
```

**Recommendation:** ✅ Excellent. Consider adding session timeout warnings for better UX.

---

### NFR8: File Upload Security ✅ **PASS**

**Requirement:** File uploads must include image validation and security scanning

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture specifies Cloudinary integration with:
  - File type validation
  - Size limits
  - Secure upload with signed requests
- Tech stack table: Cloudinary v1.x for image upload and optimization

**Security Measures:**

```typescript
// File validation strategy (to be implemented)
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

async function validateImageUpload(file: File): Promise<void> {
	if (!ALLOWED_FILE_TYPES.includes(file.type)) {
		throw new ValidationError(
			'Invalid file type. Only JPEG, PNG, WebP allowed.'
		)
	}

	if (file.size > MAX_FILE_SIZE) {
		throw new ValidationError('File size exceeds 5MB limit.')
	}

	// Cloudinary performs additional validation server-side
}
```

**Test Scenarios:**

```gherkin
Scenario: Malicious file upload is rejected
  Given admin photo upload form
  When admin attempts to upload .exe file disguised as .jpg
  Then upload is rejected with "Invalid file type" error
  And file is not stored in Cloudinary

Scenario: Oversized image is rejected
  Given admin photo upload form
  When admin attempts to upload 10MB image
  Then upload is rejected with "File size exceeds limit" error
```

**Recommendation:** ✅ Good. Consider adding image dimension validation (max 4K resolution) to prevent resource exhaustion.

---

### NFR9: XSS Protection ✅ **PASS**

**Requirement:** All user inputs must be sanitized to prevent XSS attacks

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- React's built-in XSS protection (auto-escaping in JSX)
- Zod validation prevents script injection at API level
- Backend Architecture mentions input sanitization

**Implementation Strategy:**

```typescript
// React auto-escapes by default
<p>{booking.notes}</p>; // Safe - React escapes HTML

// For rich text (if needed in future)
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
```

**Test Scenarios:**

```gherkin
Scenario: XSS in special requests is prevented
  Given booking form with special requests field
  When guest enters "<script>alert('XSS')</script>" in special requests
  Then script is stored as plain text
  And when admin views booking, script does not execute
  And text is displayed as: &lt;script&gt;alert('XSS')&lt;/script&gt;
```

**Recommendation:** ✅ Excellent. React's default behavior provides strong XSS protection.

---

## Scalability & Reliability Requirements

### NFR10: Concurrent Booking Support ⚠️ **CONCERNS**

**Requirement:** The application must support concurrent bookings without data corruption

**Status:** ⚠️ **INCOMPLETE SPECIFICATION**

**Evidence:**

- Backend Architecture mentions preventing double-bookings (FR26)
- Serverless architecture with automatic scaling on Vercel
- Prisma ORM for database access

**Missing Details:**

1. ❌ Transaction isolation level not specified (Serializable, Repeatable Read, Read Committed?)
2. ❌ Locking strategy not defined (optimistic vs pessimistic locking)
3. ❌ Retry logic for transaction conflicts not documented
4. ❌ Concurrency testing strategy not detailed

**Recommendation:** 🔧 **CRITICAL - MUST ADDRESS BEFORE EPIC 2**

Refer to **Risk Assessment R1 (Double-Booking)** and **R2 (Data Corruption)** for detailed mitigation strategies.

**Required Documentation:**

1. Specify transaction isolation: `Serializable` (safest) or `Read Committed` with explicit locking
2. Implement pessimistic locking with `SELECT FOR UPDATE` (recommended for MVP)
3. Add retry logic for Prisma transaction conflicts (error code `P2034`)
4. Document concurrency testing with 10+ simultaneous booking attempts

**See:** `docs/qa/assessments/pre-implementation-risk-20251002.md` → R1 for full implementation examples.

---

### NFR11: 99.9% Uptime Availability ✅ **PASS**

**Requirement:** The system must maintain 99.9% uptime availability

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Vercel hosting provides 99.99% SLA
- Serverless architecture with automatic failover
- Database hosting: Supabase with built-in replication
- Error tracking: Sentry for production monitoring

**Uptime Strategy:**

- **Automatic Scaling:** Vercel serverless functions scale to zero and up to thousands of concurrent requests
- **Edge Network:** Global CDN reduces latency and provides redundancy
- **Database Replication:** Supabase provides automatic backups and point-in-time recovery
- **Health Checks:** (Recommended) Add `/api/health` endpoint for monitoring

**Test Scenarios:**

```gherkin
Scenario: Application handles traffic spikes
  Given application deployed to Vercel
  When traffic increases from 10 to 1000 requests/minute
  Then all requests are handled within SLA
  And response times remain < 500ms
  And no requests are dropped
```

**Recommendation:** ✅ Excellent. Add health check endpoints in Epic 1 for comprehensive monitoring.

---

### NFR12: Error Tracking with Sentry ✅ **PASS**

**Requirement:** Error tracking must be implemented using Sentry for production monitoring

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture specifies Sentry integration
- Tech stack table: Sentry v7.x for error monitoring
- Structured error handling with ApiError hierarchy
- Logging includes correlation IDs and request context

**Implementation Strategy:**

```typescript
// Backend Architecture - Error Handling
import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	environment: process.env.NODE_ENV,
	tracesSampleRate: 1.0, // 100% in dev, reduce in prod
	beforeSend(event, hint) {
		// Filter sensitive data (PII)
		if (event.user) {
			delete event.user.email
		}
		return event
	},
})
```

**Test Scenarios:**

```gherkin
Scenario: Errors are captured in Sentry
  Given application deployed to production
  When booking creation fails with database error
  Then error is logged to Sentry with:
    - Stack trace
    - Request context (method, URL, headers)
    - User context (user ID, IP - no PII)
    - Correlation ID for tracing
```

**Recommendation:** ✅ Excellent. Ensure PII (email, phone) is filtered from Sentry reports.

---

### NFR13: SQL Injection Prevention ✅ **PASS**

**Requirement:** The database must use Prisma ORM with parameterized queries for SQL injection prevention

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Prisma ORM exclusively used for database access
- No raw SQL queries (except for advanced features like `SELECT FOR UPDATE`)
- Zod validation at API boundaries prevents malicious inputs
- Type-safe queries with TypeScript

**Prisma Safety:**

```typescript
// Prisma automatically parameterizes queries
const bookings = await prisma.booking.findMany({
	where: {
		apartmentId: userInput, // Safe - Prisma parameterizes
		startDate: { lte: endDate },
	},
})

// Even raw queries use parameterization
const result = await prisma.$queryRaw`
  SELECT * FROM bookings WHERE apartment_id = ${apartmentId}
` // Safe - Prisma parameterizes with ${}
```

**Test Scenarios:**

```gherkin
Scenario: SQL injection is prevented
  Given booking search endpoint
  When attacker sends apartmentId = "1' OR '1'='1"
  Then Prisma parameterizes the query
  And no unintended data is returned
  And SQL injection attack fails
```

**Recommendation:** ✅ Excellent. Prisma provides strong SQL injection protection by default.

---

## Usability & Accessibility Requirements

### NFR14: Mobile Responsive Design ✅ **PASS**

**Requirement:** The application must be fully responsive across mobile breakpoints (320px, 375px, 768px, 1024px)

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- UI Architecture specifies 4 breakpoints with adaptation patterns
- Mobile-first approach with TailwindCSS
- Touch-optimized interactions (44px touch targets)
- Bottom sheets for mobile modals

**Responsive Strategy:**

```
320px: Small phones (iPhone SE) - single column, stacked content
375px: Standard phones (iPhone 12) - optimized touch, mobile calendar
768px: Tablets (iPad) - two-column layouts where appropriate
1024px+: Desktop - multi-column, persistent sidebars, hover interactions
```

**Test Scenarios:**

```gherkin
Scenario: Mobile booking flow is usable
  Given guest on iPhone 12 (375px width)
  When guest completes booking flow
  Then all touch targets are ≥ 44x44px
  And calendar is touch-optimized with swipe gestures
  And booking form fits viewport without horizontal scroll
  And all actions completable without zooming
```

**Recommendation:** ✅ Excellent. Test on real devices in addition to browser DevTools.

---

### NFR15: Real-Time Form Validation ✅ **PASS**

**Requirement:** Form validation must provide real-time, helpful error messages

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Frontend Architecture specifies React Hook Form + Zod
- Inline validation with helpful error messages
- Real-time validation as user types (debounced)
- Success indicators for valid fields

**Implementation Strategy:**

```typescript
// From Frontend Architecture
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const form = useForm({
	resolver: zodResolver(BookingSchema),
	mode: 'onChange', // Real-time validation
})
```

**Test Scenarios:**

```gherkin
Scenario: Form validation is helpful
  Given booking form
  When guest enters invalid email "john@"
  Then inline error displays: "Please enter a valid email address"
  And error appears immediately (< 500ms after typing stops)
  When guest corrects to "john@example.com"
  Then error disappears and success checkmark appears
```

**Recommendation:** ✅ Excellent. Ensure validation messages are accessible to screen readers (aria-describedby).

---

### NFR16: Loading States with Skeleton Placeholders ✅ **PASS**

**Requirement:** Loading states must use skeleton placeholders to improve perceived performance

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Frontend Architecture includes LoadingSkeleton component
- UI Architecture specifies skeleton designs for apartments, bookings, calendar
- Next.js loading.tsx files for automatic loading states

**Implementation Strategy:**

```typescript
// From Frontend Architecture
import { Skeleton } from '@/components/ui/skeleton';

export function BookingCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" /> {/* Title */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" /> {/* Line 1 */}
        <Skeleton className="h-4 w-3/4" /> {/* Line 2 */}
      </CardContent>
    </Card>
  );
}
```

**Test Scenarios:**

```gherkin
Scenario: Skeleton improves perceived performance
  Given slow 3G connection
  When guest navigates to apartment listings
  Then skeleton placeholders display within 100ms
  And skeletons match actual content layout
  And transition to real content is smooth (no layout shift)
```

**Recommendation:** ✅ Excellent. Ensure skeleton shapes match actual content to minimize CLS.

---

### NFR17: Clear User Feedback ✅ **PASS**

**Requirement:** Success and error states must provide clear feedback to users

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- UI Architecture specifies Toast notification system
- Success, error, warning, info variants with distinct colors/icons
- Auto-dismiss after 5 seconds (7 for errors)
- Swipe-to-dismiss on mobile

**Implementation Strategy:**

```typescript
// From UI Architecture
import { toast } from '@/hooks/use-toast'

// Success feedback
toast({
	title: 'Booking confirmed!',
	description: 'Confirmation email sent to your inbox.',
	variant: 'success',
})

// Error feedback
toast({
	title: 'Booking failed',
	description: 'These dates are no longer available.',
	variant: 'destructive',
	duration: 7000, // Longer for errors
})
```

**Test Scenarios:**

```gherkin
Scenario: User receives clear feedback
  Given booking form
  When guest submits valid booking
  Then success toast appears with "Booking confirmed!"
  And toast auto-dismisses after 5 seconds
  And user is redirected to confirmation page

Scenario: Error feedback is clear
  Given booking form with conflicting dates
  When guest submits booking
  Then error toast appears with specific reason
  And error persists until user dismisses (7 seconds)
  And form highlights conflicting dates
```

**Recommendation:** ✅ Excellent. Ensure toasts are accessible to screen readers (aria-live regions).

---

### NFR18: Mobile-First TailwindCSS ✅ **PASS**

**Requirement:** The UI must follow mobile-first design principles using TailwindCSS

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Frontend Architecture uses TailwindCSS v3.4+
- Mobile-first breakpoint strategy (base styles for mobile, then `md:`, `lg:` for larger screens)
- UI Architecture specifies mobile-first adaptation patterns

**TailwindCSS Strategy:**

```typescript
// Base styles apply to mobile, then progressively enhance
<div className="
  flex flex-col      // Mobile: vertical stack
  md:flex-row        // Tablet: horizontal layout
  lg:gap-6           // Desktop: larger gaps
">
```

**Test Scenarios:**

```gherkin
Scenario: Mobile-first design is evident
  Given homepage on 320px viewport
  Then layout is usable and readable
  And no horizontal scrolling required
  When viewport increases to 1024px
  Then layout enhances with multi-column design
  And content doesn't reflow (no CLS)
```

**Recommendation:** ✅ Excellent. Tailwind's mobile-first approach is industry best practice.

---

## Development & Testing Requirements

### NFR19-NFR22: Comprehensive Testing ✅ **PASS**

**Requirements:**

- **NFR19:** Unit tests for components, API logic, utilities using Jest + React Testing Library
- **NFR20:** Integration tests covering API endpoints, database operations, email notifications
- **NFR21:** TypeScript strict mode with proper type definitions
- **NFR22:** Version control with GitHub, CI/CD using GitHub Actions

**Status:** ✅ **ALL WELL-DEFINED**

**Evidence:**

**NFR19 - Unit Testing:**

- Backend Architecture specifies Jest v29.x + React Testing Library
- Coverage goals: 80% overall, 90% for services, 100% for API routes
- Test structure: `__tests__/` directory with AAA pattern (Arrange-Act-Assert)
- Mock library: `jest-mock-extended` for TypeScript

**NFR20 - Integration Testing:**

- Testcontainers PostgreSQL for realistic database testing
- API endpoint testing with Supertest
- Email service mocking (no real emails in tests)
- Coverage goal: 20% of test pyramid (appropriate balance)

**NFR21 - TypeScript Strict Mode:**

- Frontend Architecture enforces strict mode
- Coding standards: "Never use `any` type"
- Type safety: Zod schemas generate types, Prisma generates client types
- Shared types between frontend and backend in monorepo

**NFR22 - CI/CD with GitHub Actions:**

- Backend Architecture documents deployment strategy
- CI/CD pipeline: Lint → Type-check → Tests → Deploy
- Vercel integration for automatic preview deployments (PRs)
- Production deployment on merge to main branch

**Test Strategy Summary:**

```
Test Pyramid (Target Distribution):
- 70% Unit Tests (fast, isolated)
- 20% Integration Tests (realistic)
- 10% E2E Tests (critical flows)
```

**Validation:**

```gherkin
Scenario: CI/CD pipeline prevents bad code
  Given pull request with failing tests
  When developer attempts to merge
  Then GitHub Actions blocks merge
  And PR shows test failure details

Scenario: TypeScript catches errors early
  Given code with type errors
  When developer runs build
  Then TypeScript compilation fails
  And specific type errors are displayed
```

**Recommendation:** ✅ Excellent. Test strategy is comprehensive and well-balanced.

---

## Hosting & Infrastructure Requirements

### NFR23: Vercel Hosting ✅ **PASS**

**Requirement:** The application must be hosted on Vercel for optimal Next.js performance

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture specifies Vercel as primary hosting
- Automatic deployments on git push
- Preview deployments for pull requests
- Serverless functions with auto-scaling
- Edge Network for global CDN

**Vercel Benefits:**

- Zero-config Next.js optimization
- Automatic HTTPS and security headers
- Built-in analytics and monitoring
- 99.99% uptime SLA

**Test Scenarios:**

```gherkin
Scenario: Vercel deployment is successful
  Given code pushed to main branch
  When GitHub Actions completes successfully
  Then Vercel deploys to production
  And production URL is accessible
  And all serverless functions work
  And Core Web Vitals are met
```

**Recommendation:** ✅ Excellent. Vercel is ideal for Next.js applications.

---

### NFR24: Database Hosting Strategy ✅ **PASS**

**Requirement:** MVP uses SQLite for development; production uses PostgreSQL (Supabase/Neon/Railway)

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Backend Architecture documents dual database strategy
- Development: SQLite for simplicity, zero configuration
- Production: PostgreSQL via Supabase (preferred) for:
  - ACID compliance
  - Connection pooling
  - Automatic backups
  - Real-time capabilities (future)
- Migration strategy: Prisma Migrate for schema versioning

**Database Strategy:**

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql" // Production
  // provider = "sqlite"  // Local development
  url      = env("DATABASE_URL")
}
```

**Test Scenarios:**

```gherkin
Scenario: Database migration is smooth
  Given SQLite schema in development
  When deploying to production with PostgreSQL
  Then Prisma migrations apply successfully
  And all data types are compatible
  And indexes are created correctly
```

**Recommendation:** ✅ Excellent. Consider documenting migration steps (SQLite → PostgreSQL) explicitly.

---

### NFR25: CDN for Static Assets ✅ **PASS**

**Requirement:** Static assets must be served via CDN (Vercel Edge Network) for global performance

**Status:** ✅ **WELL-DEFINED**

**Evidence:**

- Vercel Edge Network provides automatic CDN
- Next.js Image component automatically uses CDN
- Static assets (images, fonts) served from Edge Locations
- Global distribution reduces latency

**CDN Strategy:**

- **Static Generation (SSG):** Apartment listings pre-rendered at build time
- **Edge Caching:** API routes can use `revalidate` for caching
- **Image CDN:** Vercel automatically optimizes and caches images

**Test Scenarios:**

```gherkin
Scenario: CDN improves global performance
  Given user in Europe accessing Vercel app
  Then static assets are served from European edge location
  And images are served in WebP format
  And latency is < 100ms for cached assets
```

**Recommendation:** ✅ Excellent. Vercel Edge Network provides automatic, global CDN.

---

## NFR Compliance Summary

| **NFR ID** | **Category**   | **Status**  | **Notes**                           |
| ---------- | -------------- | ----------- | ----------------------------------- |
| **NFR1**   | Performance    | ✅ PASS     | < 500ms availability checks         |
| **NFR2**   | Performance    | ✅ PASS     | WebP/AVIF image optimization        |
| **NFR3**   | Performance    | ✅ PASS     | Core Web Vitals targets defined     |
| **NFR4**   | Performance    | ✅ PASS     | Database indexing strategy          |
| **NFR5**   | Security       | ✅ PASS     | Zod input validation                |
| **NFR6**   | Security       | ⚠️ CONCERNS | Rate limiting details incomplete    |
| **NFR7**   | Security       | ✅ PASS     | BetterAuth authentication           |
| **NFR8**   | Security       | ✅ PASS     | File upload security                |
| **NFR9**   | Security       | ✅ PASS     | XSS protection with React           |
| **NFR10**  | Scalability    | ⚠️ CONCERNS | Concurrent booking strategy missing |
| **NFR11**  | Reliability    | ✅ PASS     | 99.9% uptime target                 |
| **NFR12**  | Reliability    | ✅ PASS     | Sentry error tracking               |
| **NFR13**  | Security       | ✅ PASS     | SQL injection prevention            |
| **NFR14**  | Usability      | ✅ PASS     | Mobile responsive design            |
| **NFR15**  | Usability      | ✅ PASS     | Real-time form validation           |
| **NFR16**  | Usability      | ✅ PASS     | Loading skeleton placeholders       |
| **NFR17**  | Usability      | ✅ PASS     | Clear user feedback (toasts)        |
| **NFR18**  | Usability      | ✅ PASS     | Mobile-first TailwindCSS            |
| **NFR19**  | Testing        | ✅ PASS     | Unit testing strategy               |
| **NFR20**  | Testing        | ✅ PASS     | Integration testing strategy        |
| **NFR21**  | Development    | ✅ PASS     | TypeScript strict mode              |
| **NFR22**  | DevOps         | ✅ PASS     | GitHub + CI/CD                      |
| **NFR23**  | Hosting        | ✅ PASS     | Vercel hosting                      |
| **NFR24**  | Database       | ✅ PASS     | SQLite → PostgreSQL strategy        |
| **NFR25**  | Infrastructure | ✅ PASS     | CDN for static assets               |

**Overall Compliance:** 23/25 PASS (92%), 2/25 CONCERNS (8%)

---

## Test Coverage Matrix

| **NFR**  | **Unit Tests** | **Integration Tests** | **E2E Tests** | **Load Tests** |
| -------- | -------------- | --------------------- | ------------- | -------------- |
| NFR1     | ✅             | ✅                    | ✅            | ✅ Required    |
| NFR2     | ✅             | ✅                    | ✅            | -              |
| NFR3     | -              | -                     | ✅            | ✅ Lighthouse  |
| NFR4     | ✅             | ✅                    | -             | ✅ Required    |
| NFR5     | ✅             | ✅                    | -             | -              |
| NFR6     | ✅             | ✅                    | -             | ✅ Required    |
| NFR7     | ✅             | ✅                    | ✅            | -              |
| NFR8     | ✅             | ✅                    | -             | -              |
| NFR9     | ✅             | ✅                    | ✅            | -              |
| NFR10    | ✅             | ✅ Required           | -             | ✅ Critical    |
| NFR11    | -              | ✅                    | -             | ✅ Required    |
| NFR12    | ✅             | ✅                    | -             | -              |
| NFR13    | ✅             | ✅                    | -             | -              |
| NFR14-18 | ✅             | -                     | ✅            | -              |
| NFR19-22 | ✅             | ✅                    | ✅            | -              |
| NFR23-25 | -              | -                     | ✅            | ✅ Lighthouse  |

---

## Recommendations

### Immediate (Before Epic 2)

1. **[NFR6] Complete Rate Limiting Specification** ⚠️ CRITICAL
   - Add Upstash configuration with sliding window algorithm
   - Define Redis key structure
   - Document 429 error response format with Retry-After header
   - Set up rate limit monitoring in Sentry

2. **[NFR10] Define Concurrent Booking Strategy** ⚠️ CRITICAL
   - Specify transaction isolation level (Serializable recommended)
   - Implement pessimistic locking with SELECT FOR UPDATE
   - Add retry logic for transaction conflicts
   - Write load tests with 50+ concurrent bookings

### Important (Epic 1-2)

3. **Add Health Check Endpoints** ℹ️
   - Create `/api/health` for application health
   - Create `/api/health/db` for database connectivity
   - Integrate with uptime monitoring (UptimeRobot, Pingdom)

4. **Enable Prisma Query Logging in Development** ℹ️
   - Configure `log: ['query', 'info', 'warn', 'error']`
   - Helps debug slow queries during development

### Future (Epic 3+)

5. **Implement Circuit Breaker Pattern** ℹ️
   - Add circuit breaker for email service (Resend)
   - Add circuit breaker for file storage (Cloudinary)
   - Graceful degradation when external services fail

6. **Automated Security Scanning** ℹ️
   - Integrate OWASP ZAP in CI/CD for security testing
   - Add Snyk for dependency vulnerability scanning
   - Schedule quarterly penetration testing

---

## Conclusion

**NFR Assessment Result:** **PASS WITH CONCERNS** ✅⚠️

Your non-functional requirements are comprehensive and well-defined. The two concerns (NFR6 rate limiting configuration, NFR10 concurrent booking strategy) are addressable during Epic 1-2 implementation and do not block starting development.

**Key Strengths:**

- ✅ Strong performance targets with clear metrics
- ✅ Comprehensive security requirements (9 security NFRs)
- ✅ Excellent usability and accessibility standards
- ✅ Thorough testing strategy with coverage goals

**Critical Actions:**

- ⚠️ Define transaction isolation and locking strategy before Epic 2
- ⚠️ Complete rate limiting configuration before Epic 2

**Overall NFR Readiness:** **92%** ✅

You're ready to begin Epic 1 (Foundation & Core Infrastructure) with confidence that your non-functional requirements will guide a high-quality, secure, performant application.

---

**Reviewer:** Quinn (Test Architect)  
**Assessment Date:** October 2, 2025  
**Next Review:** After Epic 2 Implementation
