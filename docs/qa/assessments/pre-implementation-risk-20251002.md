# Risk Profile: Pre-Implementation Documentation Review

**Project:** Booking App for Two Apartments  
**Assessment Date:** October 2, 2025  
**Assessed By:** Quinn (Test Architect)  
**Review Type:** Pre-Implementation Architecture & Requirements Review

---

## Risk Summary

| **Category**     | **Critical** | **High** | **Medium** | **Low** | **Total** |
| ---------------- | ------------ | -------- | ---------- | ------- | --------- |
| **Architecture** | 1            | 1        | 0          | 0       | 2         |
| **Security**     | 0            | 0        | 1          | 0       | 1         |
| **Testing**      | 0            | 0        | 0          | 1       | 1         |
| **Reliability**  | 0            | 0        | 2          | 0       | 2         |
| **Total**        | 1            | 1        | 3          | 1       | **6**     |

**Highest Risk Score:** 72 (R1 - Double-booking due to race conditions)  
**Risk Level:** **ELEVATED** ⚠️

---

## Risk Matrix

```
Impact
  9 |              [R1]
  8 |              [R2]
  7 |
  6 |         [R3][R4][R5]
  5 |
  4 |         [R6]
  3 |
  2 |
  1 |
    +--------------------------------
      1  2  3  4  5  6  7  8  9
                Probability
```

**Legend:**

- **🔴 Critical (≥64):** Must address before Epic 2
- **🟡 High (36-63):** Address before Epic 3
- **🟠 Medium (16-35):** Monitor and mitigate
- **🟢 Low (≤15):** Accept or defer

---

## Detailed Risk Assessment

### R1: Double-Booking Due to Race Conditions 🔴 **CRITICAL**

**Risk Score:** 72 (Probability: 8, Impact: 9)

**Description:**  
Without proper transaction isolation and locking mechanisms, two users attempting to book the same apartment for overlapping dates within milliseconds could both succeed, resulting in a double-booking.

**Root Cause:**  
The backend architecture document mentions preventing double-bookings (FR26) but does not specify:

- Transaction isolation level (Read Committed, Repeatable Read, or Serializable)
- Row-level locking strategy (SELECT FOR UPDATE)
- Retry logic for transaction conflicts

**Impact:**

- **Guest Experience:** Guests receive confirmation emails but arrive to find apartment already booked
- **Owner Reputation:** Severe damage to trust and credibility
- **Legal Liability:** Potential compensation claims or refunds
- **Business Impact:** Lost revenue, negative reviews, customer churn

**Probability (8/10):**

- HIGH likelihood in production with multiple concurrent users
- Peak booking times (weekends, holidays) increase risk
- Mobile networks with connection delays exacerbate race conditions

**Affected Components:**

- `lib/services/booking-service.ts` - BookingService.createBooking()
- `app/api/bookings/route.ts` - POST /api/bookings endpoint
- Database transaction handling with Prisma

**Current Status:** ⚠️ **IDENTIFIED** - Not yet mitigated

**Mitigation Strategy:**

1. **Implement Pessimistic Locking (Recommended for MVP)**

   ```typescript
   async createBooking(data: CreateBookingData): Promise<Booking> {
     return prisma.$transaction(async (tx) => {
       // Step 1: Lock rows with SELECT FOR UPDATE
       const conflictingBookings = await tx.$queryRaw`
         SELECT id FROM bookings
         WHERE apartment_id = ${data.apartmentId}
           AND status IN ('PENDING', 'CONFIRMED')
           AND (
             (start_date <= ${data.endDate} AND end_date >= ${data.startDate})
           )
         FOR UPDATE
       `;

       if (conflictingBookings.length > 0) {
         throw new BookingConflictError('Dates unavailable');
       }

       // Step 2: Create booking within same transaction
       return tx.booking.create({ data: bookingData });
     }, {
       isolationLevel: 'Serializable',
       timeout: 5000,
     });
   }
   ```

2. **Retry Logic for Transaction Conflicts**

   ```typescript
   async createBookingWithRetry(data: CreateBookingData, maxRetries = 3): Promise<Booking> {
     for (let attempt = 0; attempt <= maxRetries; attempt++) {
       try {
         return await this.createBooking(data);
       } catch (error) {
         if (error.code === 'P2034' && attempt < maxRetries) {
           // Prisma transaction conflict - retry with exponential backoff
           await sleep(Math.pow(2, attempt) * 100);
           continue;
         }
         throw error;
       }
     }
   }
   ```

3. **Alternative: Optimistic Locking (For Future Performance Optimization)**
   - Add `version` field to Booking model
   - Check version before update: `WHERE id = $1 AND version = $2`
   - Increment version on successful update
   - Trade-off: Better performance but requires handling version conflicts in UI

**Testing Requirements:**

1. **Unit Test:**

   ```typescript
   it('should prevent double-booking with concurrent requests', async () => {
   	const bookingData = createTestBooking({
   		apartmentId: 'apt-1',
   		startDate: '2025-06-15',
   		endDate: '2025-06-20',
   	})

   	// Mock concurrent booking attempts
   	const results = await Promise.allSettled([
   		bookingService.createBooking(bookingData),
   		bookingService.createBooking(bookingData),
   		bookingService.createBooking(bookingData),
   	])

   	const successful = results.filter((r) => r.status === 'fulfilled').length
   	expect(successful).toBe(1) // Only one should succeed
   })
   ```

2. **Integration Test:**

   ```typescript
   it('should handle 10 concurrent bookings for same dates', async () => {
   	const promises = Array.from({ length: 10 }, () =>
   		request(app).post('/api/bookings').send(validBookingData)
   	)

   	const responses = await Promise.all(promises.map((p) => p.catch((e) => e)))

   	const successCount = responses.filter((r) => r.status === 201).length
   	expect(successCount).toBe(1)

   	const conflictCount = responses.filter((r) => r.status === 409).length
   	expect(conflictCount).toBe(9)
   })
   ```

3. **Load Test (k6):**

   ```javascript
   import http from 'k6/http'
   import { check } from 'k6'

   export let options = {
   	vus: 50, // 50 concurrent users
   	duration: '30s',
   }

   export default function () {
   	const payload = JSON.stringify({
   		apartmentId: 'apt-1',
   		startDate: '2025-06-15',
   		endDate: '2025-06-20',
   		// ... guest info
   	})

   	const res = http.post('https://yourapp.com/api/bookings', payload, {
   		headers: { 'Content-Type': 'application/json' },
   	})

   	check(res, {
   		'exactly one booking succeeds': (r) => {
   			// Validate only one 201, rest 409
   		},
   	})
   }
   ```

**Timeline:** Address before Epic 2 Story 2.3 (Booking Request Form)

**Owner:** dev

---

### R2: Data Corruption from Concurrent Updates 🟡 **HIGH**

**Risk Score:** 48 (Probability: 6, Impact: 8)

**Description:**  
Concurrent updates to booking status, pricing rules, or apartment details without proper transaction isolation could lead to lost updates or inconsistent data states.

**Root Cause:**

- Transaction isolation level not specified in Prisma configuration
- Update operations may not use transactions for atomic multi-step operations
- No explicit locking mechanism for admin updates

**Impact:**

- Booking status changes lost (e.g., "confirmed" reverts to "pending")
- Pricing rules overwritten by concurrent admin updates
- Data inconsistencies between guest and admin views

**Probability (6/10):**

- MEDIUM likelihood - less frequent than double-booking but still possible
- Higher risk during admin bulk operations (pricing updates, status changes)

**Affected Components:**

- `lib/services/booking-service.ts` - updateBooking()
- `lib/services/pricing-service.ts` - createPricingRule(), updatePricingRule()
- `app/api/admin/bookings/[id]/route.ts` - PUT endpoint

**Mitigation Strategy:**

1. **Use Serializable Isolation for Critical Updates**

   ```typescript
   async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
     return prisma.$transaction(async (tx) => {
       const existingBooking = await tx.booking.findUnique({ where: { id } });

       if (!existingBooking) {
         throw new NotFoundError('Booking not found');
       }

       // Validate state transitions (e.g., can't cancel completed booking)
       if (updates.status && !isValidStatusTransition(existingBooking.status, updates.status)) {
         throw new InvalidStatusTransitionError();
       }

       return tx.booking.update({ where: { id }, data: updates });
     }, {
       isolationLevel: 'Serializable',
     });
   }
   ```

2. **Implement Version-Based Optimistic Locking**
   - Add `updatedAt` timestamp checks
   - Reject updates if `updatedAt` has changed since last read

**Timeline:** Address before Epic 3 (Admin Booking Management)

**Owner:** dev

---

### R3: Email Delivery Failures Block Bookings 🟠 **MEDIUM**

**Risk Score:** 30 (Probability: 5, Impact: 6)

**Description:**  
If the email service (Resend API) is down or rate-limited, and email sending is synchronous within the booking creation flow, bookings could fail or be delayed.

**Root Cause:**  
Backend architecture mentions "Failed email sends logged but don't block booking creation," but implementation details for decoupling are not specified.

**Impact:**

- Guest completes booking form but doesn't receive confirmation email
- User confusion: "Did my booking succeed?"
- Support burden: Guests contact owner to confirm bookings

**Probability (5/10):**

- MEDIUM likelihood - external APIs do fail occasionally
- Resend has 99.9% uptime but rate limits apply

**Mitigation Strategy:**

1. **Decouple Email Sending (Recommended)**

   ```typescript
   async createBooking(data: CreateBookingData): Promise<Booking> {
     // Step 1: Create booking in database
     const booking = await prisma.booking.create({ data: bookingData });

     // Step 2: Queue email (non-blocking)
     await emailQueue.add('booking-confirmation', {
       bookingId: booking.id,
       recipientEmail: booking.guest.email,
     }, {
       attempts: 3,
       backoff: { type: 'exponential', delay: 2000 },
     });

     return booking;
   }
   ```

2. **Implement Email Retry Queue (Using Vercel Queue or BullMQ)**
   - Queue email jobs with retry logic
   - Exponential backoff: 2s, 4s, 8s
   - Dead letter queue for manual investigation

3. **User Experience Fallback**
   - Show booking confirmation page immediately (optimistic UI)
   - Display warning if email fails: "Confirmation email may be delayed. Here's your confirmation code: ABC123"
   - Provide "Resend Email" button on confirmation page

**Timeline:** Address in Epic 2 Story 2.4 (Email Confirmation System)

**Owner:** dev

---

### R4: API Abuse from Lack of Rate Limiting 🟠 **MEDIUM**

**Risk Score:** 24 (Probability: 4, Impact: 6)

**Description:**  
Without properly configured rate limiting, malicious actors could:

- Spam booking requests (causing database load and fake bookings)
- Enumerate apartment availability (competitive intelligence)
- DDoS the API by flooding endpoints

**Root Cause:**  
NFR6 specifies "5 requests/minute per IP" but Upstash rate limiter configuration details are missing:

- Sliding window algorithm not documented
- Redis key structure not defined
- Error response format (429 with Retry-After header) not specified

**Impact:**

- Degraded performance for legitimate users
- Database overload from spam requests
- Increased costs (Vercel function invocations, database queries)

**Probability (4/10):**

- MEDIUM-LOW likelihood - most attackers target higher-value sites
- Risk increases with site popularity

**Mitigation Strategy:**

1. **Implement Upstash Rate Limiter (Epic 1)**

   ```typescript
   // lib/middleware/rate-limit.ts
   import { Ratelimit } from '@upstash/ratelimit'
   import { Redis } from '@upstash/redis'

   const bookingLimiter = new Ratelimit({
   	redis: Redis.fromEnv(),
   	limiter: Ratelimit.slidingWindow(5, '5 m'),
   	analytics: true,
   	prefix: '@booking-app/bookings',
   })

   export async function rateLimit(
   	req: NextRequest
   ): Promise<NextResponse | null> {
   	const ip = req.ip ?? '127.0.0.1'
   	const { success, limit, remaining, reset } = await bookingLimiter.limit(ip)

   	if (!success) {
   		return NextResponse.json(
   			{ error: 'Too many requests', code: 'RATE_LIMIT_EXCEEDED' },
   			{
   				status: 429,
   				headers: {
   					'X-RateLimit-Limit': limit.toString(),
   					'X-RateLimit-Remaining': remaining.toString(),
   					'X-RateLimit-Reset': new Date(reset).toISOString(),
   					'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
   				},
   			}
   		)
   	}

   	return null
   }
   ```

2. **Configure Rate Limits by Endpoint**
   - Bookings: 5 requests / 5 minutes per IP
   - Admin endpoints: 100 requests / minute per authenticated user
   - General API: 60 requests / minute per IP

3. **Monitoring & Alerting**
   - Track rate limit violations in Sentry
   - Alert when rate limit hit rate exceeds 10% of requests

**Timeline:** Address before Epic 2 (Guest Booking Experience)

**Owner:** dev

---

### R5: External Service Failures Cascade 🟠 **MEDIUM**

**Risk Score:** 18 (Probability: 3, Impact: 6)

**Description:**  
If external services (Resend email, Cloudinary image uploads) fail and the application doesn't implement circuit breaker patterns, cascading failures could bring down the entire application.

**Root Cause:**  
Backend architecture mentions circuit breaker pattern but provides no implementation:

- No circuit breaker library specified
- No failure thresholds defined (5 consecutive failures → open circuit)
- No half-open retry strategy documented

**Impact:**

- Entire booking flow blocked when email service is down
- Admin can't upload apartment photos when Cloudinary is down
- Degraded user experience even for operations that don't require external services

**Probability (3/10):**

- LOW likelihood - modern SaaS providers have high uptime
- Risk increases during provider incidents or maintenance

**Mitigation Strategy:**

1. **Implement Circuit Breaker Pattern**

   ```typescript
   // lib/circuit-breaker.ts
   class CircuitBreaker {
   	private failures = 0
   	private lastFailureTime?: number
   	private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED'

   	constructor(
   		private failureThreshold = 5,
   		private timeout = 30000 // 30 seconds
   	) {}

   	async execute<T>(fn: () => Promise<T>): Promise<T> {
   		if (this.state === 'OPEN') {
   			if (Date.now() - this.lastFailureTime! > this.timeout) {
   				this.state = 'HALF_OPEN'
   			} else {
   				throw new CircuitBreakerOpenError('Service temporarily unavailable')
   			}
   		}

   		try {
   			const result = await fn()
   			this.reset()
   			return result
   		} catch (error) {
   			this.recordFailure()
   			throw error
   		}
   	}

   	private recordFailure() {
   		this.failures++
   		this.lastFailureTime = Date.now()
   		if (this.failures >= this.failureThreshold) {
   			this.state = 'OPEN'
   			console.warn(`Circuit breaker opened after ${this.failures} failures`)
   		}
   	}

   	private reset() {
   		this.failures = 0
   		this.state = 'CLOSED'
   	}
   }

   // Usage
   const emailCircuitBreaker = new CircuitBreaker(5, 30000)

   async function sendEmail(data: EmailData) {
   	return emailCircuitBreaker.execute(() => resend.emails.send(data))
   }
   ```

2. **Graceful Degradation**
   - If email circuit is open, store email in retry queue
   - If Cloudinary circuit is open, allow admins to upload photos later

**Timeline:** Address before Epic 3 (Admin features)

**Owner:** dev

---

### R6: Test Data Inconsistencies 🟢 **LOW**

**Risk Score:** 12 (Probability: 3, Impact: 4)

**Description:**  
Without test data factories and consistent test data generation, tests may:

- Produce flaky results due to hardcoded or random values
- Miss edge cases (e.g., guest with special characters in name)
- Be difficult to maintain when data models change

**Root Cause:**  
Test strategy mentions "factory pattern with realistic test data" but:

- No factory implementation provided
- No examples of using `@faker-js/faker` for data generation
- Test fixtures not defined

**Impact:**

- Unreliable tests lead to false positives/negatives
- Developer frustration debugging flaky tests
- Reduced confidence in test suite

**Probability (3/10):**

- LOW likelihood of major issues
- More of a developer experience and maintainability concern

**Mitigation Strategy:**

1. **Create Test Factories (Epic 1 or 2)**

   ```typescript
   // __tests__/factories/booking-factory.ts
   import { faker } from '@faker-js/faker'
   import type { Booking, Guest, Apartment } from '@/types'

   export function createTestGuest(overrides?: Partial<Guest>): Guest {
   	return {
   		id: faker.string.uuid(),
   		firstName: faker.person.firstName(),
   		lastName: faker.person.lastName(),
   		email: faker.internet.email(),
   		phone: faker.phone.number('+1##########'),
   		createdAt: faker.date.past(),
   		updatedAt: faker.date.recent(),
   		...overrides,
   	}
   }

   export function createTestApartment(
   	overrides?: Partial<Apartment>
   ): Apartment {
   	return {
   		id: faker.string.uuid(),
   		name: `Cozy ${faker.location.city()} Apartment`,
   		description: faker.lorem.paragraph(),
   		maxGuests: faker.number.int({ min: 2, max: 6 }),
   		basePricePerNight: faker.number.float({
   			min: 50,
   			max: 300,
   			precision: 0.01,
   		}),
   		photos: Array.from({ length: 5 }, () => faker.image.url()),
   		amenities: {
   			wifi: true,
   			kitchen: faker.datatype.boolean(),
   			parking: faker.datatype.boolean(),
   		},
   		status: 'ACTIVE',
   		createdAt: faker.date.past(),
   		updatedAt: faker.date.recent(),
   		...overrides,
   	}
   }

   export function createTestBooking(overrides?: Partial<Booking>): Booking {
   	const startDate = faker.date.future()
   	const endDate = new Date(startDate)
   	endDate.setDate(endDate.getDate() + faker.number.int({ min: 2, max: 14 }))

   	return {
   		id: faker.string.uuid(),
   		confirmationCode: faker.string.alphanumeric(8).toUpperCase(),
   		apartmentId: faker.string.uuid(),
   		guestId: faker.string.uuid(),
   		startDate,
   		endDate,
   		numberOfGuests: faker.number.int({ min: 1, max: 6 }),
   		totalPrice: faker.number.float({ min: 100, max: 2000, precision: 0.01 }),
   		status: faker.helpers.arrayElement([
   			'PENDING',
   			'CONFIRMED',
   			'CANCELLED',
   		]),
   		notes: faker.lorem.sentence(),
   		createdAt: faker.date.past(),
   		updatedAt: faker.date.recent(),
   		...overrides,
   	}
   }
   ```

2. **Usage in Tests**

   ```typescript
   describe('BookingService', () => {
   	it('should create booking with valid data', async () => {
   		const guest = createTestGuest()
   		const apartment = createTestApartment()
   		const bookingData = createTestBooking({
   			apartmentId: apartment.id,
   			guestId: guest.id,
   		})

   		const result = await bookingService.createBooking(bookingData)
   		expect(result).toMatchObject(bookingData)
   	})
   })
   ```

**Timeline:** Address before Epic 3 (when test suite grows)

**Owner:** dev

---

## Risk Mitigation Priority

### 🔴 Critical (Address Before Epic 2)

1. **R1:** Double-booking prevention strategy
   - Define transaction isolation
   - Implement pessimistic locking
   - Add retry logic for transaction conflicts
   - Write concurrent booking tests

### 🟡 High (Address Before Epic 3)

2. **R2:** Concurrent update handling
   - Use Serializable transactions for critical updates
   - Implement optimistic locking for performance

### 🟠 Medium (Address During Epic 2-3)

3. **R3:** Email delivery failures
   - Decouple email sending with queue
   - Implement retry logic with exponential backoff

4. **R4:** API abuse prevention
   - Configure Upstash rate limiter
   - Set up monitoring for rate limit violations

5. **R5:** External service failures
   - Implement circuit breaker pattern
   - Add graceful degradation

### 🟢 Low (Address During Epic 3+)

6. **R6:** Test data consistency
   - Create test factories with faker
   - Document factory usage patterns

---

## Residual Risks (After Mitigation)

| **Risk ID** | **Original Score** | **Mitigated Score** | **Reduction** |
| ----------- | ------------------ | ------------------- | ------------- |
| **R1**      | 72 (Critical)      | 18 (Low)            | -75%          |
| **R2**      | 48 (High)          | 12 (Low)            | -75%          |
| **R3**      | 30 (Medium)        | 9 (Low)             | -70%          |
| **R4**      | 24 (Medium)        | 8 (Low)             | -67%          |
| **R5**      | 18 (Medium)        | 6 (Low)             | -67%          |
| **R6**      | 12 (Low)           | 4 (Very Low)        | -67%          |

**Target Risk Level After Mitigation:** 🟢 **LOW** (all risks < 20)

---

## Monitoring & Review

- **Next Review Date:** After Epic 2 implementation (estimated 2-3 weeks)
- **Review Trigger Conditions:**
  - Any risk materializes in production
  - New high/critical risks identified during development
  - External dependency changes (new API integrations)

**Risk Owner:** Quinn (Test Architect)  
**Risk Report Distribution:** dev, PM, product owner
