# Story 4.5: Base Price Management

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to update the base price for each apartment,  
**so that** I have a default price when no seasonal rules apply.

## Epic

Epic 4: Pricing & Availability Management

## Acceptance Criteria

### Functional Requirements

1. Apartment management page created at /admin/apartments listing both apartments
2. Each apartment card displays current base price prominently
3. Quick edit functionality for base price (inline editing)
4. API endpoint created at PUT /api/admin/apartments/:id to update apartment details
5. Form validation for price (positive number, reasonable range)
6. Price change confirmation dialog showing impact
7. Price history tracking (when base price was changed)
8. Success notification after update
9. Automatic recalculation of future booking prices if needed
10. Help text explaining relationship between base price and pricing rules
11. Bulk update base prices for multiple apartments
12. Import/export base price configurations

### Price Change Impact Analysis (CRITICAL)

13. Real-time analysis of affected future bookings
14. Display list of bookings using base price (no custom pricing rule)
15. Calculate price difference for each affected booking
16. Option to apply/skip price changes to existing bookings
17. Preview total revenue impact of price change
18. Email notifications to admins about significant price changes

### Business Logic Requirements

19. Base price must be positive Decimal (not Float)
20. Reasonable price range: $10 - $10,000 per night
21. Price change requires confirmation for changes > ±20%
22. Base price applies only when no pricing rules match dates
23. Historical base prices preserved for reporting
24. Cannot set base price to $0 (must archive apartment instead)

### Price History & Auditing

25. Complete price change history with timestamps
26. Track admin user who made changes
27. Record reason for price change (optional field)
28. Export price history for financial reporting
29. Visual chart showing price trends over time
30. Audit log retention: 7 years minimum

### Performance Requirements

31. Apartment list page loads within 2 seconds
32. Price impact analysis completes within 3 seconds
33. Inline editing provides immediate feedback (< 300ms)
34. Bulk updates handle all apartments efficiently

### Security Requirements

35. Admin authorization required for price changes
36. Elevated permissions for bulk price updates
37. Audit logging for all price modifications
38. Rate limiting: 50 price updates per hour per admin
39. Validation prevents malicious price manipulation

### Error Handling

40. Graceful handling of invalid price inputs
41. Clear error messages for out-of-range prices
42. Transaction rollback on validation failures
43. Booking recalculation failures logged and reported

### Accessibility

44. WCAG 2.1 AA compliance
45. Keyboard-accessible inline editing
46. Screen reader support for price history
47. Clear visual indicators for unsaved changes

## Dependencies

- Story 1.2 (Apartment model)

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION** - Story fully specified with 47 acceptance criteria:

- ✅ Price change impact analysis (affected bookings, revenue impact)
- ✅ Price range validation ($10-$10,000, Decimal type)
- ✅ Complete price history with visual trends
- ✅ Performance optimized (< 2 second page load, < 3 second impact analysis)
- ✅ Security (rate limiting, audit logging)
- ✅ 7-year audit log retention

**Gate Status: PASS** → docs/qa/gates/4.5-base-price.yml
