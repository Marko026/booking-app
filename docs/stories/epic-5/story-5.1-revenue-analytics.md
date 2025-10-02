# Story 5.1: Revenue Analytics

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to see revenue reports by month, quarter, and year,  
**so that** I can track my business performance and identify trends.

## Epic

Epic 5: Admin Dashboard & Analytics (OPTIONAL for MVP)

## Acceptance Criteria

### Functional Requirements

1. Analytics page created at /admin/analytics with revenue dashboard
2. Revenue summary cards: this month, last month, year-to-date, projected annual
3. Revenue chart (line or bar) showing monthly revenue for past 12 months
4. Revenue breakdown by apartment (which apartment generates more revenue)
5. API endpoint created at GET /api/admin/analytics/revenue?period=month|quarter|year
6. Date range selector for custom period analysis
7. Comparison to previous period (e.g., "15% increase from last month")
8. Revenue by booking status (confirmed vs pending vs cancelled)
9. Average booking value calculation
10. Export revenue data as CSV
11. Visual charts using lightweight library (Recharts or Chart.js)
12. Revenue trend indicators (up/down arrows with percentages)
13. Top performing months highlighted

### Data Aggregation Requirements

14. Revenue calculated from confirmed bookings only (unless filtered otherwise)
15. Projected annual based on current pace + existing future bookings
16. Revenue breakdown excludes cancelled bookings by default
17. Date ranges respect booking check-in dates
18. Currency formatting consistent throughout

### Performance Requirements (CRITICAL for Analytics)

19. Analytics page loads within 3 seconds
20. Revenue calculations pre-aggregated daily (materialized view or caching)
21. Chart rendering optimized for up to 24 months data
22. API responses cached for 1 hour
23. Database indexes on: booking.check_in, booking.status, booking.total_price

### Security Requirements

24. Admin authorization required
25. Rate limiting: 50 requests per minute per admin
26. Audit logging for analytics access
27. No sensitive guest data in exports

### Error Handling

28. Graceful handling of incomplete data
29. Zero-revenue periods displayed clearly
30. Chart fallbacks for no data scenarios
31. Export failures queued for retry

### Accessibility

32. WCAG 2.1 AA compliance for charts
33. Screen reader support for data tables
34. Keyboard navigation for date selectors
35. Alternative text for visual charts

## Dependencies

- Story 3.1 (Admin Dashboard)
- Story 3.2 (Bookings data)

## Note

**OPTIONAL for MVP** - Can be deferred to Phase 1.5 if timeline is constrained

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION (OPTIONAL for MVP)** - Story fully specified with 35 acceptance criteria:

- ✅ Data aggregation with pre-aggregation (materialized views, 1-hour cache)
- ✅ Performance optimized (< 3 second load, database indexes)
- ✅ Lightweight chart library (Recharts/Chart.js)
- ✅ Export to CSV functionality
- ✅ WCAG 2.1 AA compliance

**Gate Status: PASS** → docs/qa/gates/5.1-revenue-analytics.yml
