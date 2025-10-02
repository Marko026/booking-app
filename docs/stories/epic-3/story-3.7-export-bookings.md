# Story 3.7: Export Bookings for Accounting

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to export booking data in various formats,  
**so that** I can use it for accounting, taxes, and record-keeping.

## Epic

Epic 3: Admin Booking Management (PROMOTED from Epic 5)

## Acceptance Criteria

### Functional Requirements

1. Export functionality accessible from bookings list page
2. API endpoint created at GET /api/admin/export/bookings?format=csv|excel&start=YYYY-MM-DD&end=YYYY-MM-DD
3. CSV export format with columns: confirmation code, apartment, guest name, check-in, check-out, nights, price, status, payment status, created date
4. Excel export option with formatted cells and totals
5. Date range filter for export
6. Status filter for export (only confirmed, all statuses, etc.)
7. Include/exclude cancelled bookings toggle
8. Email export file option (send to owner's email)
9. Export includes summary row with totals
10. File naming convention with date range (e.g., bookings-2025-01-01-to-2025-12-31.csv)
11. Loading state during export generation

### Performance Requirements (CRITICAL)

12. Exports handled asynchronously for > 100 bookings
13. Maximum export size: 10,000 bookings per request
14. Streaming export for large datasets (no memory overflow)
15. Export generation timeout: 60 seconds
16. Progress indicator for large exports

### File Format Requirements

17. CSV: UTF-8 encoding, comma-separated
18. Excel: XLSX format with formatting and formulas
19. Column headers clearly labeled
20. Currency formatted correctly
21. Dates in ISO format (YYYY-MM-DD)

### Security Requirements

22. Admin authorization required
23. Rate limiting: 10 exports per hour per admin
24. Audit logging for all export operations
25. No sensitive guest data (phone, email) without permission
26. Export files deleted after 24 hours

### Error Handling

27. Clear error messages for failed exports
28. Retry mechanism for email delivery failures
29. Fallback to download if email fails
30. Validation for date range inputs

### Accessibility

31. WCAG 2.1 AA compliance
32. Keyboard-accessible export form
33. Screen reader support

## Dependencies

- Story 3.2 (Bookings List)

## Note

**PROMOTED TO MVP (Epic 3)** - Export functionality is critical for accounting, tax compliance, and financial record-keeping. This story is now considered essential for MVP release.

## Change Log

| Date       | Version | Description                                  | Author     |
| ---------- | ------- | -------------------------------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD                       | Sarah (PO) |
| 2025-10-02 | 2.0     | Promoted to Epic 3 MVP (accounting critical) | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION (MVP - PROMOTED TO EPIC 3)** - Story fully specified with 33 acceptance criteria:

- ✅ Asynchronous export for > 100 bookings
- ✅ Streaming export prevents memory overflow (max 10,000 bookings)
- ✅ Multiple formats (CSV UTF-8, Excel XLSX)
- ✅ Security: rate limiting (10 exports/hour), auto-delete after 24 hours
- ✅ WCAG 2.1 AA compliance

**Status Updated:** OPTIONAL → **MVP CRITICAL** (Promoted to Epic 3)
**Rationale:** Export functionality is essential for accounting, tax compliance, and financial record-keeping. Property owners need this from day one for business operations.

**Gate Status: PASS** → docs/qa/gates/3.7-export-bookings.yml
