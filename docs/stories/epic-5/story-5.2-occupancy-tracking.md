# Story 5.2: Occupancy Rate Tracking

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to see occupancy rates for my apartments,  
**so that** I can understand utilization and optimize my pricing.

## Epic

Epic 5: Admin Dashboard & Analytics (OPTIONAL for MVP)

## Acceptance Criteria

### Functional Requirements

1. Occupancy dashboard added to analytics page
2. Occupancy rate calculation: (booked nights / available nights) × 100
3. Current month occupancy displayed as percentage with visual gauge
4. Historical occupancy chart (past 12 months)
5. Occupancy comparison between both apartments
6. API endpoint created at GET /api/admin/analytics/occupancy?period=month|quarter|year
7. Peak vs off-season occupancy comparison
8. Days until next booking displayed
9. Average length of stay metric
10. Occupancy forecast for next 3 months based on current bookings
11. Export occupancy data
12. Occupancy trend indicators with benchmarks (e.g., 70% is good)

### Calculation Requirements (CRITICAL)

13. Available nights = total days - blocked dates
14. Booked nights = confirmed booking nights only
15. Partial days counted as full nights
16. Overlapping bookings handled correctly
17. Forecast based on current + confirmed future bookings

### Performance Requirements

18. Occupancy calculations pre-aggregated daily
19. API responses cached for 1 hour
20. Chart rendering optimized
21. Page loads within 3 seconds

### Security & Data Integrity

22. Admin authorization required
23. Rate limiting: 50 requests per minute
24. Accurate calculation validation with tests
25. Historical data immutable

### Accessibility

26. WCAG 2.1 AA compliance
27. Screen reader support for gauges
28. Alternative text descriptions

## Dependencies

- Story 5.1 (Analytics infrastructure)

## Note

**OPTIONAL for MVP**

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION (OPTIONAL for MVP)** - Story fully specified with 28 acceptance criteria:

- ✅ Accurate occupancy calculation: (booked nights / available nights) × 100
- ✅ Forecast logic based on confirmed future bookings
- ✅ Pre-aggregated daily calculations for performance
- ✅ Historical data immutability
- ✅ WCAG 2.1 AA compliance

**Gate Status: PASS** → docs/qa/gates/5.2-occupancy-tracking.yml
