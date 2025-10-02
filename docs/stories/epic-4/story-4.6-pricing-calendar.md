# Story 4.6: Pricing Calendar Visualization

## Status

**Ready for Development**

## Story

**As a** property owner,  
**I want** to see a visual calendar showing pricing for each day,  
**so that** I can easily identify pricing gaps or optimize my strategy.

## Epic

Epic 4: Pricing & Availability Management

## Acceptance Criteria

### Functional Requirements

1. Calendar view page at /admin/pricing/calendar with monthly view
2. Each day shows the active price for selected apartment
3. Color coding: base price (default), seasonal pricing (highlighted), blocked dates (distinct color)
4. Toggle between apartments
5. Month navigation (previous/next, jump to specific month)
6. Hover tooltips showing pricing rule details
7. Click on date to quick-edit price or create rule
8. Visual indicators for minimum stay requirements
9. Export calendar view as PDF or image
10. Comparison mode: view both apartments side-by-side
11. Responsive design for tablet viewing
12. Year view for long-term planning
13. Legend explaining color codes and indicators
14. Quick filters: show only conflicts, show only blocked dates
15. Occupancy overlay showing booked vs available dates

### Visual Indicators & Color Coding

16. Base price: neutral gray
17. Low-season pricing: cool blue
18. High-season pricing: warm orange/red
19. Peak pricing: bright red
20. Blocked dates: dark gray with pattern
21. Existing bookings: green highlight
22. Pricing conflicts: yellow warning border
23. Minimum stay requirements: badge on date
24. Color-blind friendly palette

### Interactive Features

25. Drag to select date range for bulk operations
26. Quick-edit modal for price changes
27. Right-click context menu for common actions
28. Zoom levels: day, week, month, quarter, year
29. Jump to specific date with date picker
30. Keyboard navigation (arrow keys, page up/down)

### Data Calculation & Display

31. Real-time price calculation considering all rules
32. Conflict resolution algorithm displays winning price
33. Priority indicator when multiple rules apply
34. Revenue projection for visible date range
35. Occupancy rate percentage per month

### Performance Requirements (CRITICAL)

36. Calendar view loads within 3 seconds for 12-month range
37. Data pre-loaded and cached (15 min TTL)
38. Smooth scrolling and navigation (60 FPS)
39. Export generates within 10 seconds for 12 months
40. Lazy loading for year view (load visible months only)

### Export Functionality

41. PDF export with full formatting
42. PNG/JPG image export
43. CSV export with pricing data
44. Excel export with formulas
45. Customizable export date range
46. Include/exclude booked dates option

### Security Requirements

47. Admin authorization required
48. Rate limiting: 100 requests per minute per admin
49. Export operations logged for audit
50. No sensitive guest data in exports

### Error Handling

51. Graceful handling of missing pricing rules
52. Fallback to base price when rules conflict
53. Clear error messages for failed exports
54. Loading indicators for slow operations

### Accessibility

55. WCAG 2.1 AA compliance
56. Keyboard-accessible calendar navigation
57. Screen reader support with date announcements
58. High contrast mode support
59. Tooltip alternatives for screen readers

## Dependencies

- Story 4.1 (Pricing Rules)
- Story 4.2 (Create Rules)

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

✓ **READY FOR IMPLEMENTATION** - Story fully specified with 59 acceptance criteria:

- ✅ Advanced visualization (color-coded, interactive, zoom levels)
- ✅ Real-time price calculation with conflict resolution
- ✅ Multiple export formats (PDF, PNG, CSV, Excel)
- ✅ Performance optimized (< 3 second load, 60 FPS, lazy loading)
- ✅ Color-blind friendly palette
- ✅ Accessibility (WCAG 2.1 AA, keyboard navigation, screen reader)

**Gate Status: PASS** → docs/qa/gates/4.6-pricing-calendar.yml
