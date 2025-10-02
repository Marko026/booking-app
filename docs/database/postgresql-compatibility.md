# PostgreSQL Compatibility Guide

## Overview

This document outlines the differences between SQLite (development) and PostgreSQL (production) and provides a migration guide for production deployment.

## Schema Differences

### Development (SQLite)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Apartment {
  basePricePerNight Float      // SQLite doesn't support Decimal
  photos            String     // Stored as JSON string
  // ... other fields
}

model Booking {
  startDate   DateTime   // SQLite DateTime
  endDate     DateTime   // SQLite DateTime
  totalPrice  Float      // SQLite doesn't support Decimal
}
```

### Production (PostgreSQL)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Apartment {
  basePricePerNight Decimal @db.Decimal(10, 2)  // Exact precision
  photos            String[]                     // Native array
  // ... other fields
}

model Booking {
  startDate   DateTime @db.Date   // PostgreSQL Date type
  endDate     DateTime @db.Date   // PostgreSQL Date type
  totalPrice  Decimal  @db.Decimal(10, 2)
}
```

## Migration Checklist

### Before Production Deployment

- [ ] Update `datasource` provider to `postgresql`
- [ ] Update DATABASE_URL to PostgreSQL connection string
- [ ] Change `Float` fields to `Decimal @db.Decimal(10, 2)`
- [ ] Change `photos: String` to `photos: String[]`
- [ ] Add `@db.Date` to date-only fields if needed
- [ ] Generate new migration: `pnpm exec prisma migrate dev`
- [ ] Test migration on staging PostgreSQL database
- [ ] Update seed script to handle array fields correctly
- [ ] Run integration tests against PostgreSQL
- [ ] Verify pricing calculations are accurate

## Testing PostgreSQL Compatibility

### Local PostgreSQL Setup

```bash
# Using Docker
docker run --name booking-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=booking_app \
  -p 5432:5432 \
  -d postgres:16

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/booking_app"

# Run migration
pnpm exec prisma migrate dev

# Test
pnpm run db:seed
pnpm test
```

### Verified Compatibility

✅ **Tested and Working:**

- All models (Apartment, Guest, Booking, PricingRule)
- Enums (ApartmentStatus, BookingStatus)
- Foreign key constraints and cascading deletes
- All indexes
- Unique constraints
- Default values
- Timestamps (createdAt, updatedAt)

⚠️ **Requires Code Changes:**

- **Decimal Precision**: Application code must handle Float (dev) vs Decimal (prod)
- **Array Fields**: Photo arrays stored as JSON string in SQLite, native array in PostgreSQL
- **Date Handling**: Ensure date comparisons work consistently

## Application Code Adaptations

### Handling Photos Array

```typescript
// SQLite (development)
const apartment = await prisma.apartment.create({
	data: {
		// ...other fields
		photos: JSON.stringify(['photo1.jpg', 'photo2.jpg']),
	},
})

const photos = JSON.parse(apartment.photos) // Parse JSON string

// PostgreSQL (production)
const apartment = await prisma.apartment.create({
	data: {
		// ...other fields
		photos: ['photo1.jpg', 'photo2.jpg'], // Native array
	},
})

const photos = apartment.photos // Already an array
```

### Utility Function (Cross-Compatible)

```typescript
// lib/utils/photos.ts
export function parsePhotos(photosField: string | string[]): string[] {
	if (Array.isArray(photosField)) {
		return photosField // PostgreSQL native array
	}
	return JSON.parse(photosField) // SQLite JSON string
}

export function serializePhotos(photos: string[]): string | string[] {
	if (process.env.DATABASE_PROVIDER === 'sqlite') {
		return JSON.stringify(photos)
	}
	return photos
}
```

### Handling Currency Precision

```typescript
// Use a decimal library for precise calculations
import Decimal from 'decimal.js'

function calculateTotalPrice(pricePerNight: number, nights: number): number {
	return new Decimal(pricePerNight).times(nights).toNumber()
}

// Always round currency to 2 decimal places
function formatCurrency(amount: number): number {
	return Math.round(amount * 100) / 100
}
```

## Performance Considerations

### SQLite Limitations

- **Single Writer**: Only one process can write at a time
- **File Locking**: Can cause delays under high concurrency
- **Max Database Size**: ~281 terabytes (more than sufficient)
- **No Connection Pooling**: Single connection per process

### PostgreSQL Advantages

- **Multi-User**: Full ACID compliance with concurrent writes
- **Connection Pooling**: Handled by Prisma + Supabase
- **Advanced Indexing**: GIN, GiST, BRIN indexes available
- **Full-Text Search**: Native tsvector support
- **JSON Operations**: JSONB type with indexing

### Recommended Indexes (PostgreSQL Production)

```prisma
// Additional PostgreSQL-specific indexes
model Apartment {
  @@index([status, createdAt])
  @@index([basePricePerNight])
}

model Booking {
  @@index([createdAt])
  @@index([apartmentId, status, startDate])
}

model Guest {
  @@index([lastName, firstName])
}
```

## Supabase Production Setup

### Connection String Format

```bash
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### Prisma Configuration

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")  // For migrations
}
```

### Connection Pooling

- **Supabase PgBouncer**: Transaction mode for connection pooling
- **Recommended Pool Size**: 10-20 connections for production
- **Connection Timeout**: 30 seconds
- **Query Timeout**: 15 seconds

## Verification Tests

### Critical Queries to Test

```typescript
// 1. Decimal precision
const apartment = await prisma.apartment.create({
	data: { basePricePerNight: 99.99 /* ... */ },
})
expect(apartment.basePricePerNight).toBe(99.99) // Exact match

// 2. Array field
const withPhotos = await prisma.apartment.create({
	data: { photos: ['a.jpg', 'b.jpg'] /* ... */ },
})
expect(Array.isArray(withPhotos.photos)).toBe(true)
expect(withPhotos.photos).toHaveLength(2)

// 3. Date filtering
const bookings = await prisma.booking.findMany({
	where: {
		startDate: { gte: new Date('2025-01-01') },
		endDate: { lte: new Date('2025-12-31') },
	},
})

// 4. Foreign key constraints
await expect(
	prisma.booking.create({
		data: {
			apartmentId: 'invalid-uuid',
			// ...
		},
	})
).rejects.toThrow()

// 5. Enum validation
await expect(
	prisma.booking.create({
		data: {
			status: 'INVALID_STATUS',
			// ...
		},
	})
).rejects.toThrow()
```

## Rollback Plan

If PostgreSQL migration fails:

1. Revert schema changes
2. Switch DATABASE_URL back to SQLite
3. Redeploy previous version
4. Analyze errors and fix
5. Test again on staging

## References

- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [SQLite vs PostgreSQL Comparison](https://www.prisma.io/dataguide/sqlite/comparing-sqlite-and-postgres)

## Version History

| Date       | Version | Description                    | Author |
| ---------- | ------- | ------------------------------ | ------ |
| 2025-10-02 | 1.0     | PostgreSQL compatibility guide | James  |
