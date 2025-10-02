# Database Migration Strategy

## Overview

This document outlines the migration strategy, rollback procedures, and testing guidelines for database schema changes in the Booking Application.

## Environment Strategy

### Development (Current)

- **Database**: SQLite (`file:./dev.db`)
- **Purpose**: Rapid development and testing
- **Location**: Local file system
- **Backup**: Git-ignored, disposable

### Production (Future)

- **Database**: PostgreSQL via Supabase
- **Purpose**: Production workloads
- **Location**: Cloud-hosted
- **Backup**: Automated daily backups + pre-migration snapshots

## Migration Workflow

### 1. Development Phase

```bash
# 1. Make schema changes in prisma/schema.prisma
# 2. Create migration
pnpm run db:migrate

# 3. Test migration locally
pnpm run db:seed
pnpm run dev

# 4. Verify all functionality works
```

### 2. Testing Phase

```bash
# Test against PostgreSQL (before production deployment)
# 1. Set up local PostgreSQL instance or test database
# 2. Update DATABASE_URL to PostgreSQL connection string
# 3. Run migration
pnpm exec prisma migrate deploy

# 4. Run seed script
pnpm run db:seed

# 5. Run integration tests
pnpm test
```

### 3. Production Deployment

```bash
# 1. Backup production database
# 2. Review migration SQL
# 3. Deploy migration during maintenance window
pnpm exec prisma migrate deploy

# 4. Verify deployment
# 5. Monitor for errors
```

## Rollback Procedures

### Initial Migration (20251002101442_init)

**Migration**: Creates initial schema with Apartment, Guest, Booking, and PricingRule tables.

**Rollback SQL**:

```sql
-- Drop all tables in reverse order of dependencies
DROP TABLE IF EXISTS pricing_rules;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS apartments;

-- Drop enums (PostgreSQL only)
DROP TYPE IF EXISTS "BookingStatus";
DROP TYPE IF EXISTS "ApartmentStatus";
```

**Rollback Procedure**:

1. Stop application
2. Backup current database
3. Execute rollback SQL
4. Restore from pre-migration backup
5. Restart application with previous version

## Migration Testing Guidelines

### Pre-Migration Checklist

- [ ] Schema changes reviewed by team
- [ ] Migration tested locally with SQLite
- [ ] Migration tested with PostgreSQL (matching production)
- [ ] Rollback SQL prepared and documented
- [ ] Backup strategy confirmed
- [ ] Deployment window scheduled
- [ ] Team notified of planned downtime

### Testing Requirements

1. **Schema Validation**
   - All models have correct field types
   - Relationships are properly defined
   - Indexes are created on high-query columns
   - Constraints are enforced (unique, foreign keys)

2. **Data Integrity**
   - Existing data migrates correctly
   - No data loss during migration
   - Foreign key relationships maintained
   - Default values applied correctly

3. **Performance Testing**
   - Query performance meets expectations
   - Indexes improve query speed
   - No N+1 query issues
   - Connection pooling works correctly

4. **Compatibility Testing**
   - Migration works on SQLite (dev)
   - Migration works on PostgreSQL (production)
   - All Prisma Client queries work
   - TypeScript types generated correctly

## Backup Strategy

### Development

- **Frequency**: On-demand before major changes
- **Method**: Copy `prisma/dev.db` file
- **Retention**: Local, temporary

### Production

- **Frequency**: Daily automated + pre-migration manual
- **Method**: Supabase automated backups + manual snapshots
- **Retention**: 30 days rolling + all migration snapshots
- **Restoration**: Point-in-time recovery available

### Pre-Migration Backup

```bash
# PostgreSQL backup (production)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# Verify backup
psql $DATABASE_URL < backup-YYYYMMDD-HHMMSS.sql --dry-run
```

## SQLite vs PostgreSQL Compatibility

### Key Differences

| Feature           | SQLite                | PostgreSQL            |
| ----------------- | --------------------- | --------------------- |
| Decimal Type      | Float (approximate)   | Decimal (exact)       |
| Date Type         | DateTime              | Date                  |
| Array Fields      | JSON string           | Native arrays         |
| Enums             | Text with constraints | Native enums          |
| Foreign Keys      | Enabled by pragma     | Always enabled        |
| Transaction Locks | File-level locks      | Row-level locks       |
| Max Connections   | Single writer         | Configurable pooling  |
| Full-Text Search  | FTS5 extension        | Built-in tsvector     |
| JSON Support      | JSON1 extension       | Native JSONB          |
| Case Sensitivity  | Case-insensitive LIKE | Case-sensitive LIKE   |
| Auto-increment    | INTEGER PRIMARY KEY   | SERIAL/IDENTITY       |
| Timezone Support  | Limited               | Full timezone support |

### Compatibility Notes

1. **Decimal Precision**
   - SQLite uses Float (may have precision issues)
   - PostgreSQL uses Decimal(10, 2) for exact currency values
   - **Action**: Use Float in SQLite, migrate to Decimal in production
   - **Testing**: Verify pricing calculations are accurate in both

2. **Array Fields**
   - SQLite: Store as JSON string (`photos: String`)
   - PostgreSQL: Use native arrays (`photos: String[]`)
   - **Action**: Parse JSON in application layer for SQLite
   - **Testing**: Ensure photo arrays work in both environments

3. **Date Types**
   - SQLite: Uses DateTime for all date/time fields
   - PostgreSQL: Supports Date, Time, DateTime separately
   - **Action**: Use DateTime in both, format dates in application
   - **Testing**: Verify date comparisons work correctly

4. **Enums**
   - SQLite: Text field with check constraints
   - PostgreSQL: Native enum types
   - **Action**: Prisma handles conversion automatically
   - **Testing**: Verify enum values are enforced

## Migration Validation Checklist

### Post-Migration Validation

- [ ] Database connection successful
- [ ] All tables exist with correct schema
- [ ] All indexes created successfully
- [ ] Foreign key constraints enforced
- [ ] Enum values working correctly
- [ ] Seed script runs successfully
- [ ] Application starts without errors
- [ ] All API endpoints respond correctly
- [ ] No query errors in logs
- [ ] Performance within acceptable range

### Critical Queries to Test

```typescript
// 1. Apartment listing
await prisma.apartment.findMany()

// 2. Booking availability check
await prisma.booking.findMany({
	where: {
		apartmentId: 'uuid',
		OR: [{ startDate: { lte: endDate } }, { endDate: { gte: startDate } }],
		status: { in: ['PENDING', 'CONFIRMED'] },
	},
})

// 3. Guest lookup by email
await prisma.guest.findUnique({
	where: { email: 'guest@example.com' },
})

// 4. Booking with relations
await prisma.booking.findUnique({
	where: { confirmationCode: 'ABC12345' },
	include: { apartment: true, guest: true },
})

// 5. Pricing rules query
await prisma.pricingRule.findMany({
	where: {
		apartmentId: 'uuid',
		active: true,
		startDate: { lte: checkDate },
		endDate: { gte: checkDate },
	},
	orderBy: { priority: 'desc' },
})
```

## Emergency Procedures

### Migration Failure

1. **Identify Issue**: Check error logs
2. **Stop Deployment**: Prevent further damage
3. **Restore Backup**: Use pre-migration snapshot
4. **Notify Team**: Communication is critical
5. **Root Cause Analysis**: Document what went wrong
6. **Plan Fix**: Correct migration and retest

### Data Corruption

1. **Isolate Affected Records**: Query to identify scope
2. **Stop Application**: Prevent further corruption
3. **Restore Backup**: Point-in-time recovery if available
4. **Verify Restoration**: Check data integrity
5. **Resume Operations**: Gradual rollout
6. **Post-Mortem**: Document and prevent recurrence

## Contact Information

- **Database Admin**: [Contact Info]
- **DevOps Lead**: [Contact Info]
- **On-Call Engineer**: [Contact Info]
- **Supabase Support**: support@supabase.io

## Version History

| Date       | Version | Description            | Author |
| ---------- | ------- | ---------------------- | ------ |
| 2025-10-02 | 1.0     | Initial migration docs | James  |

## References

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL Backup](https://www.postgresql.org/docs/current/backup.html)
- [Supabase Database Management](https://supabase.com/docs/guides/database)
