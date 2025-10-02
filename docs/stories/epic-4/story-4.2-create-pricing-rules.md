# Story 4.2: Create Seasonal Pricing Rules

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to create seasonal pricing rules for specific date ranges,  
**so that** I can charge higher rates during peak season and offer discounts in off-season.

## Epic

Epic 4: Pricing & Availability Management

## Acceptance Criteria

### Functional Requirements

1. "Create Pricing Rule" page created at /admin/pricing/new
2. Form fields: rule name, apartment selection, start date, end date, price per night, minimum stay duration (optional)
3. Date range picker with visual feedback
4. Validation: end date must be after start date, price must be positive
5. Preview of affected dates shown on calendar
6. Conflict detection: warn if rule overlaps with existing rules
7. API endpoint created at POST /api/admin/pricing to create rule
8. Option to duplicate rule to other apartments
9. Option to make rule recurring (e.g., every summer)
10. Success notification with link to view all rules
11. Form validation with Zod schema
12. Help text explaining minimum stay duration behavior
13. Priority level selection (low, medium, high) for conflict resolution
14. Notes/description field for internal reference

### Recurring Rules Requirements (COMPLEX)

15. Recurring pattern options: yearly, custom date range annually
16. Recurring rule start and end years specified
17. Preview of all generated dates for recurring rules
18. Option to exclude specific dates from recurring pattern
19. Recurring rules stored efficiently (pattern + exceptions, not individual entries)
20. Maximum 10-year range for recurring rules

### Conflict Detection & Resolution

21. Real-time conflict checking as user types dates
22. Display conflicting rules with details
23. Allow proceeding with conflict if priority is higher
24. Option to auto-adjust conflicting lower-priority rules
25. Clear visual indication of conflict severity

### Business Logic Requirements

26. Price must be positive Decimal (not Float)
27. Minimum stay: 1-365 nights
28. Date range: maximum 365 days per rule (or recurring)
29. Rule name: required, 3-100 characters
30. Apartment selection: required, must exist
31. Prevent creating rules for past dates (with override option for admin)

### Performance Requirements

32. Form loads within 1 second
33. Conflict detection responds within 500ms
34. Calendar preview updates in real-time (< 300ms)
35. Form submission completes within 2 seconds

### Security Requirements

36. Admin authorization required
37. Input validation for all fields
38. Rate limiting: 50 rule creations per hour per admin
39. Audit logging for all rule creations with admin user info
40. SQL injection prevention on all inputs

### Error Handling

41. Clear inline validation errors per field
42. Graceful handling of duplicate rule names
43. Transaction rollback on any validation failure
44. Conflict warnings don't block submission (admin decision)

### Accessibility

45. WCAG 2.1 AA compliance
46. Keyboard-accessible date picker
47. Screen reader support for conflict warnings
48. Clear focus indicators

## Dependencies

- Story 4.1 (Pricing Rules List)

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION** - Story fully specified with 48 acceptance criteria:

- ✅ Recurring rules logic with efficient storage (pattern + exceptions)
- ✅ Real-time conflict detection (< 500ms)
- ✅ Priority-based conflict resolution
- ✅ Performance optimized (< 1 second form load)
- ✅ Security comprehensive (validation, rate limiting, audit logging)
- ✅ Accessibility (WCAG 2.1 AA, keyboard navigation)

**Gate Status: PASS** → docs/qa/gates/4.2-create-pricing-rules.yml
