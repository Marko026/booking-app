# Story 4.3: Edit & Delete Pricing Rules

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to modify or remove pricing rules,  
**so that** I can adjust my pricing strategy as market conditions change.

## Epic

Epic 4: Pricing & Availability Management

## Acceptance Criteria

### Functional Requirements

1. Edit pricing rule page created at /admin/pricing/[id]
2. All rule fields editable with same validation as creation
3. API endpoint created at PUT /api/admin/pricing/:id to update rule
4. Warning shown if editing rule affects existing bookings
5. Delete functionality with confirmation dialog
6. API endpoint created at DELETE /api/admin/pricing/:id
7. Soft delete option (archive rule instead of hard delete)
8. Prevent deletion of rules with active bookings (show warning and booking count)
9. Bulk delete option from pricing list
10. Audit trail for rule changes (who changed what and when)
11. "Duplicate Rule" button to create similar rule quickly

### Booking Impact Analysis (CRITICAL)

12. Real-time analysis of affected bookings on rule change
13. Display list of bookings impacted by price change
14. Calculate price difference for each affected booking
15. Option to apply/skip price changes to existing bookings
16. Prevent changes that would make existing bookings invalid (e.g., minimum stay violations)
17. Email notifications to admins when rules affecting bookings are changed

### Concurrent Update Handling

18. Optimistic locking using version field
19. Conflict detection when multiple admins edit same rule
20. User notification of conflicts with option to refresh or override
21. Last-write-wins with conflict warning

### Business Logic Requirements

22. Date range changes re-validate against all bookings
23. Price changes trigger impact analysis
24. Minimum stay changes validate against existing bookings
25. Priority level changes trigger conflict re-evaluation
26. Historical rules preserved for reporting

### Bulk Operations Requirements

27. Atomic bulk delete (all succeed or all fail)
28. Maximum 50 rules per bulk operation
29. Transaction rollback on any failure
30. Detailed success/failure report after bulk operation
31. Progress indicator for bulk operations

### Performance Requirements

32. Edit page loads within 2 seconds
33. Booking impact analysis completes within 3 seconds
34. Bulk operations handle up to 50 rules efficiently
35. Real-time validation responds within 500ms

### Security Requirements

36. Admin authorization required
37. Elevated permissions for bulk operations
38. Audit logging for all modifications with before/after values
39. Rate limiting: 100 rule updates per hour per admin
40. Prevent editing rules owned by other admins (unless super-admin)

### Audit Trail Requirements

41. Track all field changes with before/after values
42. Log admin user who made changes
43. Timestamp all modifications
44. Audit log immutable (append-only)
45. Retention period: 7 years

### Error Handling

46. Graceful handling of booking impact analysis failures
47. Clear error messages for validation failures
48. Transaction rollback on any step failure
49. Bulk operation failures provide detailed error report

### Accessibility

50. WCAG 2.1 AA compliance
51. Keyboard navigation support
52. Screen reader compatible audit trail
53. Clear focus indicators for edit mode

## Dependencies

- Story 4.1 (Pricing Rules List)
- Story 4.2 (Create Pricing Rules)

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION** - Story fully specified with 53 acceptance criteria:

- ✅ Booking impact analysis (real-time, < 3 seconds)
- ✅ Optimistic locking for concurrent updates
- ✅ Atomic bulk operations (max 50 rules)
- ✅ Historical rules preserved (7-year retention)
- ✅ Security comprehensive (elevated permissions for bulk ops)
- ✅ Audit trail immutable (append-only)

**Gate Status: PASS** → docs/qa/gates/4.3-edit-pricing-rules.yml
