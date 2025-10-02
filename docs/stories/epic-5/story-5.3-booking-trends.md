# Story 5.3: Booking Trends & Insights

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to see booking patterns and guest behavior insights,  
**so that** I can make informed business decisions.

## Epic

Epic 5: Admin Dashboard & Analytics (OPTIONAL for MVP)

## Acceptance Criteria

### Functional Requirements

1. Insights section added to analytics page
2. Booking lead time analysis (how far in advance guests book)
3. Most popular booking months and seasons identified
4. Average guest count per booking
5. Booking source tracking (direct bookings for now)
6. Cancellation rate calculation and trend
7. Returning guest percentage
8. Most requested apartment identification
9. Day-of-week booking patterns (which days get most bookings)
10. Visual representation with charts and metrics cards
11. Actionable recommendations based on data (e.g., "Consider raising prices for August")

### Data Analysis Requirements

12. Lead time: average days between booking creation and check-in
13. Returning guests identified by email matching
14. Cancellation rate: (cancelled / total bookings) × 100
15. Popular months based on booking count + revenue
16. Minimum 3 months data for meaningful insights

### Performance Requirements

17. Insights calculated in background jobs (nightly)
18. Pre-aggregated data cached for fast loading
19. Page loads within 3 seconds
20. Complex calculations offloaded to database

### Recommendations Engine (Simple)

21. Rule-based recommendations (not AI/ML)
22. Trigger: occupancy > 80% → suggest price increase
23. Trigger: cancellation > 15% → investigate
24. Trigger: lead time < 7 days → consider last-minute deals
25. Display max 3 recommendations at a time

### Security & Accessibility

26. Admin authorization required
27. Rate limiting: 50 requests per minute
28. WCAG 2.1 AA compliance
29. Screen reader support

## Dependencies

- Story 5.1 (Analytics page)

## Note

**OPTIONAL for MVP**

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION (OPTIONAL for MVP)** - Story fully specified with 29 acceptance criteria:

- ✅ Data analysis with background jobs (nightly calculations)
- ✅ Rule-based recommendations engine (simple triggers)
- ✅ Returning guest identification by email matching
- ✅ Performance optimized with pre-aggregated data
- ✅ WCAG 2.1 AA compliance

**Gate Status: PASS** → docs/qa/gates/5.3-booking-trends.yml
