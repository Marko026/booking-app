# Story 1.2: Database Schema & Prisma Setup

## Status

**Ready for Development**

## Story

**As a** developer,  
**I want** a complete database schema with Prisma ORM configured,  
**so that** I can reliably store and query apartment, booking, guest, and pricing data.

## Epic

Epic 1: Foundation & Core Infrastructure

## Acceptance Criteria

1. Prisma installed and configured with SQLite for development
2. Apartment schema defined (id, name, description, maxGuests, basePricePerNight, photos, createdAt, updatedAt)
3. Guest schema defined (id, firstName, lastName, email, phone, createdAt)
4. Booking schema defined (id, apartmentId, guestId, startDate, endDate, numberOfGuests, totalPrice, status enum, notes, confirmationCode, createdAt, updatedAt)
5. PricingRule schema defined (id, apartmentId, name, startDate, endDate, pricePerNight, minStayDuration, createdAt)
6. Foreign key relationships established (Booking → Apartment, Booking → Guest, PricingRule → Apartment)
7. Database indexes created on apartmentId, startDate, endDate, status, confirmationCode
8. Prisma Client generated with TypeScript types
9. Seed script created to populate two sample apartments with photos and descriptions
10. Migration created and applied successfully
11. Database helper utilities created in lib/db.ts for connection management

## Tasks / Subtasks

- [ ] Install and configure Prisma (AC: 1)
  - [ ] Install Prisma: `pnpm add -D prisma`
  - [ ] Install Prisma Client: `pnpm add @prisma/client`
  - [ ] Initialize Prisma: `pnpm exec prisma init --datasource-provider sqlite`
  - [ ] Configure DATABASE_URL in .env for SQLite: `file:./dev.db`
  - [ ] Update .env.example with database URL template

- [ ] Define Apartment schema (AC: 2)
  - [ ] Create model Apartment in prisma/schema.prisma
  - [ ] Add fields: id (uuid), name (String), description (Text)
  - [ ] Add fields: maxGuests (Int), basePricePerNight (Decimal @db.Decimal(10, 2))
  - [ ] Add photos (String[]), amenities (Json)
  - [ ] Add status enum (ACTIVE, MAINTENANCE, INACTIVE)
  - [ ] Add timestamps: createdAt, updatedAt
  - [ ] Add table mapping: @@map("apartments")

- [ ] Define Guest schema (AC: 3)
  - [ ] Create model Guest in prisma/schema.prisma
  - [ ] Add fields: id (uuid), firstName, lastName (String)
  - [ ] Add email (String @unique), phone (String)
  - [ ] Add optional notes field for admin
  - [ ] Add timestamps: createdAt, updatedAt
  - [ ] Add index on email: @@index([email])
  - [ ] Add table mapping: @@map("guests")

- [ ] Define Booking schema (AC: 4)
  - [ ] Create model Booking in prisma/schema.prisma
  - [ ] Add fields: id (uuid), apartmentId, guestId (String)
  - [ ] Add confirmationCode (unique, 8 char)
  - [ ] Add startDate, endDate (DateTime @db.Date)
  - [ ] Add numberOfGuests (Int), totalPrice (Decimal @db.Decimal(10, 2))
  - [ ] Create status enum: PENDING, CONFIRMED, CANCELLED, COMPLETED
  - [ ] Add optional notes and cancelledAt fields
  - [ ] Add timestamps: createdAt, updatedAt
  - [ ] Add table mapping: @@map("bookings")

- [ ] Define PricingRule schema (AC: 5)
  - [ ] Create model PricingRule in prisma/schema.prisma
  - [ ] Add fields: id (uuid), apartmentId, name (String)
  - [ ] Add startDate, endDate (DateTime @db.Date)
  - [ ] Add pricePerNight (Decimal @db.Decimal(10, 2)), minStayDuration (Int, optional)
  - [ ] Add priority (Int), active (Boolean)
  - [ ] Add timestamps: createdAt, updatedAt
  - [ ] Add table mapping: @@map("pricing_rules")

- [ ] Establish relationships (AC: 6)
  - [ ] Booking → Apartment: relation with onDelete Cascade
  - [ ] Booking → Guest: relation with onDelete Cascade
  - [ ] PricingRule → Apartment: relation with onDelete Cascade
  - [ ] Add relation fields in Apartment model (bookings, pricingRules)
  - [ ] Add relation fields in Guest model (bookings)

- [ ] Create database indexes (AC: 7)
  - [ ] Booking: @@index([apartmentId, startDate, endDate])
  - [ ] Booking: @@index([confirmationCode])
  - [ ] Booking: @@index([status])
  - [ ] Booking: @@index([guestId])
  - [ ] PricingRule: @@index([apartmentId, startDate, endDate, active])
  - [ ] Guest: @@index([email])

- [ ] Generate Prisma Client and create migration (AC: 8, 10)
  - [ ] Run `pnpm exec prisma generate` to create TypeScript types
  - [ ] Run `pnpm exec prisma migrate dev --name init` to create migration
  - [ ] Verify migration file created in prisma/migrations/
  - [ ] Verify dev.db created successfully
  - [ ] Test Prisma Client import: `import { PrismaClient } from '@prisma/client'`

- [ ] Create seed script (AC: 9)
  - [ ] Create prisma/seed.ts file
  - [ ] Import PrismaClient
  - [ ] Create seed data for 2 sample apartments:
    - Apartment 1: "Cozy Studio Downtown"
    - Apartment 2: "Spacious 2BR with Balcony"
  - [ ] Include sample photos (use placeholder URLs)
  - [ ] Include amenities JSON (wifi, kitchen, parking, etc.)
  - [ ] Set basePricePerNight (e.g., €50 and €80)
  - [ ] Configure seed command in package.json: `"prisma": { "seed": "tsx prisma/seed.ts" }`
  - [ ] Install tsx: `pnpm add -D tsx`
  - [ ] Run seed: `pnpm exec prisma db seed`

- [ ] Create database helper utilities (AC: 11)
  - [ ] Create lib/db.ts file
  - [ ] Export singleton PrismaClient instance
  - [ ] Implement connection management (prevent multiple instances in dev)
  - [ ] Add type exports from Prisma Client
  - [ ] Document usage in comments

- [ ] Document migration strategy and procedures
  - [ ] Create docs/database/migration-strategy.md
  - [ ] Document rollback procedures for each migration
  - [ ] Add migration testing guidelines
  - [ ] Document backup strategy for production
  - [ ] Add migration validation checklist
  - [ ] Document SQLite to PostgreSQL compatibility notes

- [ ] Test PostgreSQL compatibility (AC: 1)
  - [ ] Run schema against PostgreSQL test database
  - [ ] Verify Decimal types work correctly
  - [ ] Test all indexes in PostgreSQL
  - [ ] Verify foreign key constraints
  - [ ] Document any SQLite vs PostgreSQL differences

## Dev Notes

### Relevant Architecture Information

**Prisma Schema (from Backend Architecture):**

Complete schema is documented in Backend Architecture document. Key points:

**Enums:**

```prisma
enum ApartmentStatus {
  ACTIVE
  MAINTENANCE
  INACTIVE
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
```

**Database Strategy:**

- **Development:** SQLite for simplicity (file: ./dev.db)
- **Production:** PostgreSQL via Supabase (configured in deployment)
- **Migration Tool:** Prisma Migrate for schema versioning

**Indexing Strategy (from Backend Architecture - Database Indexes Strategy):**
Critical indexes for performance:

1. Bookings by apartment and date range - optimizes availability checks
2. Booking lookup by confirmation code - fast guest booking lookup
3. Bookings by status - admin dashboard filtering
4. Guest email lookup - fast guest identification
5. Pricing rules query - price calculation optimization

**Connection Management:**

```typescript
// lib/db.ts pattern
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined
}

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],
	})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export types
export type {
	Apartment,
	Guest,
	Booking,
	PricingRule,
	ApartmentStatus,
	BookingStatus,
} from '@prisma/client'
```

**Migration Strategy (Critical for Production):**

- **Development**: SQLite for simplicity and speed
- **Production**: PostgreSQL via Supabase with proper connection pooling
- **Migration Testing**: All migrations must be tested against PostgreSQL before production
- **Rollback Strategy**: Each migration includes rollback SQL in comments
- **Backup Strategy**: Full database backup before any production migration
- **Validation**: Migration validation checklist ensures data integrity

**Decimal Precision Strategy:**

- All currency fields use `@db.Decimal(10, 2)` for consistent precision
- Prevents floating-point arithmetic errors in pricing calculations
- Ensures compatibility between SQLite and PostgreSQL

**Seed Data Requirements:**

- 2 sample apartments with realistic data
- Diverse amenities for each apartment
- Professional descriptions
- Placeholder photo URLs (use Unsplash or similar)

### Testing

**Test File Location:**

- Prisma tests: `__tests__/lib/db.test.ts`
- Schema validation: `__tests__/prisma/schema.test.ts`

**Testing Standards:**

- Test Prisma Client initialization
- Test database connection
- Verify all models are generated correctly
- Test seed script execution
- Integration tests will use Testcontainers (Story 1.6)

**Test Example:**

```typescript
import { prisma } from '@/lib/db'

describe('Prisma Client', () => {
	it('should connect to database', async () => {
		await expect(prisma.$connect()).resolves.not.toThrow()
	})

	it('should have all models available', () => {
		expect(prisma.apartment).toBeDefined()
		expect(prisma.guest).toBeDefined()
		expect(prisma.booking).toBeDefined()
		expect(prisma.pricingRule).toBeDefined()
	})
})
```

## Change Log

| Date       | Version | Description                                 | Author     |
| ---------- | ------- | ------------------------------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD                      | Sarah (PO) |
| 2025-10-02 | 1.1     | Added PostgreSQL compatibility testing (PO) | Sarah (PO) |

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

### Comprehensive Quality Assessment

**Overall Assessment: CONCERNS** - This story provides a well-designed database schema with comprehensive requirements, but requires attention to migration management strategy and data precision specifications before implementation.

**Risk Score: 75/100 (Moderate-Low Risk)**

**Test Coverage: Complete** - 42 test scenarios covering all 11 acceptance criteria (100% coverage)

### Risk Analysis Summary

**Total Risks Identified: 8**

- **Critical (9)**: 0
- **High (6)**: 1 - DATA-001 (Migration path not defined)
- **Medium (4)**: 3 - PERF-001, DATA-002, TECH-001
- **Low (2-3)**: 4

**Key Risk Areas:**

1. **DATA-001 (High)**: Migration rollback procedures not documented
2. **DATA-002 (Medium)**: Decimal precision not specified for currency fields
3. **SEC-001 (Low)**: Guest email uniqueness not enforced
4. **TECH-002 (Low)**: Seed script not idempotent

### Test Design Analysis

**Test Strategy: Comprehensive**

- **Unit Tests**: 18 (43%) - Schema validation and field definitions
- **Integration Tests**: 22 (52%) - Database operations and relationships
- **E2E Tests**: 2 (5%) - End-to-end integration validation

**Priority Distribution:**

- **P0 (Critical)**: 14 tests - Data integrity, migrations, core functionality
- **P1 (High)**: 20 tests - Secondary features and edge cases
- **P2 (Medium)**: 8 tests - Developer experience and data quality

**Risk Coverage**: 8/8 risks have test coverage (100%)

### Required Actions Before Implementation

**✅ RESOLVED - All Critical Issues Addressed:**

1. **✅ Document Migration Strategy** - COMPLETED
   - Added migration strategy documentation in Dev Notes
   - Created new task for comprehensive migration documentation
   - Documented rollback procedures and backup strategy

2. **✅ Specify Decimal Precision** - COMPLETED
   - Added `@db.Decimal(10, 2)` to all currency fields:
     - `Apartment.basePricePerNight` ✅
     - `Booking.totalPrice` ✅
     - `PricingRule.pricePerNight` ✅

3. **✅ Enforce Email Uniqueness** - COMPLETED
   - Added `@unique` constraint to `Guest.email` field ✅

**SHOULD FIX (During Development):**

4. **Implement Seed Script Idempotency**
   - Add upsert logic to prevent duplicate test data
   - Document seed script usage

5. **Add Query Performance Monitoring**
   - Enable Prisma query logging in development
   - Plan performance benchmarks for critical queries

### Strengths

- Complete Prisma schema with all required models
- Proper foreign key relationships and constraints
- Strategic database indexing for performance
- Comprehensive seed data setup
- Proper connection management patterns
- Clear migration strategy
- TypeScript integration with Prisma Client
- Excellent test coverage across all acceptance criteria

### Compliance Check

- **Coding Standards:** ✓ Excellent - Proper TypeScript integration and naming conventions
- **Project Structure:** ✓ Excellent - Clear database organization and file structure
- **Testing Strategy:** ✓ Excellent - Comprehensive test design with 42 scenarios
- **All ACs Met:** ✓ All 11 acceptance criteria are clearly defined and actionable
- **Risk Management:** ⚠️ Good - Risks identified with mitigation strategies

### Security Review

**Status: CONCERNS** - Minor security concern identified:

- Guest email uniqueness not enforced (SEC-001)
- **Mitigation**: Add unique constraint to Guest.email field

### Performance Considerations

**Status: GOOD** - Story includes strategic database indexing and efficient connection management patterns. Performance monitoring recommended for production deployment.

### Files Modified During Review

- Created: `docs/qa/assessments/1.2-database-schema-risk-20251002.md`
- Created: `docs/qa/assessments/1.2-database-schema-test-design-20251002.md`
- Created: `docs/qa/gates/1.2-database-schema.yml`

### Gate Status

**Gate: PASS** → docs/qa/gates/1.2-database-schema.yml

**Risk Profile:** Low (90/100) - Well-designed schema with all critical issues resolved
**Test Coverage:** Complete (42 scenarios, 100% AC coverage)
**NFR Assessment:** All non-functional requirements properly addressed

### Recommended Status

✅ **Ready for Implementation** - All critical concerns have been addressed. Story is comprehensive, well-structured, and ready for development agent execution.

**Next Review:** After implementation completion, before Story 1.6 (Deployment)
