# Story 1.2: Database Schema & Prisma Setup

## Status

**Ready for Review**

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

- [x] Install and configure Prisma (AC: 1)
  - [x] Install Prisma: `pnpm add -D prisma`
  - [x] Install Prisma Client: `pnpm add @prisma/client`
  - [x] Initialize Prisma: `pnpm exec prisma init --datasource-provider sqlite`
  - [x] Configure DATABASE_URL in .env for SQLite: `file:./dev.db`
  - [x] Update .env.example with database URL template

- [x] Define Apartment schema (AC: 2)
  - [x] Create model Apartment in prisma/schema.prisma
  - [x] Add fields: id (uuid), name (String), description (Text)
  - [x] Add fields: maxGuests (Int), basePricePerNight (Float - SQLite compatible)
  - [x] Add photos (String - JSON stored), amenities (Json)
  - [x] Add status enum (ACTIVE, MAINTENANCE, INACTIVE)
  - [x] Add timestamps: createdAt, updatedAt
  - [x] Add table mapping: @@map("apartments")

- [x] Define Guest schema (AC: 3)
  - [x] Create model Guest in prisma/schema.prisma
  - [x] Add fields: id (uuid), firstName, lastName (String)
  - [x] Add email (String @unique), phone (String)
  - [x] Add optional notes field for admin
  - [x] Add timestamps: createdAt, updatedAt
  - [x] Add index on email: @@index([email])
  - [x] Add table mapping: @@map("guests")

- [x] Define Booking schema (AC: 4)
  - [x] Create model Booking in prisma/schema.prisma
  - [x] Add fields: id (uuid), apartmentId, guestId (String)
  - [x] Add confirmationCode (unique, 8 char)
  - [x] Add startDate, endDate (DateTime - SQLite compatible)
  - [x] Add numberOfGuests (Int), totalPrice (Float - SQLite compatible)
  - [x] Create status enum: PENDING, CONFIRMED, CANCELLED, COMPLETED
  - [x] Add optional notes and cancelledAt fields
  - [x] Add timestamps: createdAt, updatedAt
  - [x] Add table mapping: @@map("bookings")

- [x] Define PricingRule schema (AC: 5)
  - [x] Create model PricingRule in prisma/schema.prisma
  - [x] Add fields: id (uuid), apartmentId, name (String)
  - [x] Add startDate, endDate (DateTime - SQLite compatible)
  - [x] Add pricePerNight (Float - SQLite compatible), minStayDuration (Int, optional)
  - [x] Add priority (Int), active (Boolean)
  - [x] Add timestamps: createdAt, updatedAt
  - [x] Add table mapping: @@map("pricing_rules")

- [x] Establish relationships (AC: 6)
  - [x] Booking → Apartment: relation with onDelete Cascade
  - [x] Booking → Guest: relation with onDelete Cascade
  - [x] PricingRule → Apartment: relation with onDelete Cascade
  - [x] Add relation fields in Apartment model (bookings, pricingRules)
  - [x] Add relation fields in Guest model (bookings)

- [x] Create database indexes (AC: 7)
  - [x] Booking: @@index([apartmentId, startDate, endDate])
  - [x] Booking: @@index([confirmationCode])
  - [x] Booking: @@index([status])
  - [x] Booking: @@index([guestId])
  - [x] PricingRule: @@index([apartmentId, startDate, endDate, active])
  - [x] Guest: @@index([email])

- [x] Generate Prisma Client and create migration (AC: 8, 10)
  - [x] Run `pnpm exec prisma generate` to create TypeScript types
  - [x] Run `pnpm exec prisma migrate dev --name init` to create migration
  - [x] Verify migration file created in prisma/migrations/
  - [x] Verify dev.db created successfully
  - [x] Test Prisma Client import: `import { PrismaClient } from '@prisma/client'`

- [x] Create seed script (AC: 9)
  - [x] Create prisma/seed.ts file
  - [x] Import PrismaClient
  - [x] Create seed data for 2 sample apartments:
    - Apartment 1: "Cozy Studio Downtown"
    - Apartment 2: "Spacious 2BR with Balcony"
  - [x] Include sample photos (use placeholder URLs)
  - [x] Include amenities JSON (wifi, kitchen, parking, etc.)
  - [x] Set basePricePerNight (€50 and €80)
  - [x] Configure seed command in package.json: `"prisma": { "seed": "tsx prisma/seed.ts" }`
  - [x] Install tsx: `pnpm add -D tsx`
  - [x] Run seed: `pnpm run db:seed`

- [x] Create database helper utilities (AC: 11)
  - [x] Create lib/db.ts file
  - [x] Export singleton PrismaClient instance
  - [x] Implement connection management (prevent multiple instances in dev)
  - [x] Add type exports from Prisma Client
  - [x] Document usage in comments

- [x] Document migration strategy and procedures
  - [x] Create docs/database/migration-strategy.md
  - [x] Document rollback procedures for each migration
  - [x] Add migration testing guidelines
  - [x] Document backup strategy for production
  - [x] Add migration validation checklist
  - [x] Document SQLite to PostgreSQL compatibility notes

- [x] Test PostgreSQL compatibility (AC: 1)
  - [x] Document schema differences between SQLite and PostgreSQL
  - [x] Create PostgreSQL compatibility guide (docs/database/postgresql-compatibility.md)
  - [x] Document Decimal vs Float differences
  - [x] Document array field handling (String vs String[])
  - [x] Document migration path for production deployment

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

| Date       | Version | Description                                 | Author      |
| ---------- | ------- | ------------------------------------------- | ----------- |
| 2025-10-02 | 1.0     | Story created from PRD                      | Sarah (PO)  |
| 2025-10-02 | 1.1     | Added PostgreSQL compatibility testing (PO) | Sarah (PO)  |
| 2025-10-02 | 2.0     | Implementation completed - all tasks done   | James (Dev) |

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (via Cursor IDE)

### Debug Log References

No debug log entries required - implementation completed without blocking issues.

### Completion Notes List

1. **SQLite Compatibility Implemented**: Used Float instead of Decimal, String instead of String[] for photos to ensure SQLite compatibility
2. **PostgreSQL Migration Path**: Documented complete migration strategy in docs/database/postgresql-compatibility.md
3. **Seed Script Idempotency**: Implemented deleteMany() before seeding to ensure clean state
4. **Database Scripts**: Added convenient npm scripts (db:generate, db:migrate, db:seed, db:studio)
5. **Connection Management**: Implemented singleton pattern in lib/db.ts to prevent multiple instances in development
6. **Comprehensive Documentation**: Created migration-strategy.md and postgresql-compatibility.md for production deployment
7. **Test Files Created**: Unit tests for Prisma Client and integration tests for schema validation (Note: test framework setup pending Story 1.6)

### File List

**Created Files:**

- `prisma/schema.prisma` - Complete database schema with 4 models, 2 enums, indexes, and relationships
- `prisma/seed.ts` - Idempotent seed script with 2 sample apartments, guests, and pricing rules
- `prisma/migrations/20251002101442_init/migration.sql` - Initial database migration
- `lib/db.ts` - Singleton Prisma Client with connection management and type exports
- `docs/database/migration-strategy.md` - Comprehensive migration, rollback, and testing procedures
- `docs/database/postgresql-compatibility.md` - Complete PostgreSQL migration guide
- `__tests__/lib/db.test.ts` - Unit tests for Prisma Client functionality
- `__tests__/prisma/schema.test.ts` - Integration tests for schema validation
- `.env` - Environment variables with DATABASE_URL
- `.env.example` - Environment variable template (existing file)

**Modified Files:**

- `package.json` - Added Prisma scripts (db:generate, db:migrate, db:push, db:seed, db:studio) and prisma.seed configuration

**Database Files:**

- `prisma/dev.db` - SQLite development database (generated)
- `prisma/dev.db-journal` - SQLite journal file (generated)

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
