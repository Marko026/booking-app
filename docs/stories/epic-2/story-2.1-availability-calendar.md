# Story 2.1: Availability Calendar Display

## Status

**Ready for Development**

## Story

**As a** potential guest,  
**I want** to see an interactive calendar showing available and booked dates for an apartment,  
**so that** I can quickly identify when I can make a reservation.

## Epic

Epic 2: Guest Booking Experience

## Acceptance Criteria

1. Calendar component integrated (React Big Calendar or FullCalendar.js) on apartment detail page
2. API endpoint created at GET /api/availability/:apartmentId returning booked date ranges
3. Calendar displays current month by default with navigation to future months
4. Booked dates visually distinguished from available dates (different colors/styling)
5. Blocked dates (maintenance) also displayed with distinct styling
6. Calendar supports date range selection (check-in to check-out)
7. Selected dates highlighted visually
8. Minimum stay duration enforced in UI (if pricing rules specify minimum stay)
9. Past dates disabled and not selectable
10. Loading state shown while fetching availability data
11. Calendar fully responsive on mobile (touch-optimized date selection)
12. Tooltips or legends explain date colors/states

## Dependencies

- Story 1.2 (Database Schema)
- Story 1.5 (Apartment Detail Page)

## Tasks / Subtasks

- [ ] Install and configure calendar library (AC: 1)
  - [ ] Evaluate calendar libraries: React Big Calendar vs FullCalendar.js vs react-day-picker
  - [ ] Install chosen library: `pnpm add react-day-picker date-fns`
  - [ ] Create base calendar component wrapper
  - [ ] Configure calendar styling with Tailwind CSS
  - [ ] Test calendar rendering and navigation

- [ ] Create availability API endpoint (AC: 2)
  - [ ] Create app/api/availability/[apartmentId]/route.ts
  - [ ] Implement GET handler to fetch bookings for date range
  - [ ] Query database for confirmed and pending bookings
  - [ ] Return booked dates array in consistent format
  - [ ] Add query parameter validation (startDate, endDate)
  - [ ] Add error handling for invalid apartment IDs

- [ ] Build availability calendar component (AC: 3, 4, 5, 9)
  - [ ] Create components/booking/availability-calendar.tsx
  - [ ] Fetch availability data on component mount
  - [ ] Display current month by default
  - [ ] Add month navigation (previous/next buttons)
  - [ ] Style booked dates (red/unavailable)
  - [ ] Style available dates (green/default)
  - [ ] Style blocked dates (gray/maintenance)
  - [ ] Disable past dates (gray out, non-selectable)
  - [ ] Add visual date legend

- [ ] Implement date range selection (AC: 6, 7)
  - [ ] Allow check-in date selection (first click)
  - [ ] Allow check-out date selection (second click)
  - [ ] Highlight selected date range visually
  - [ ] Validate date range (check-out after check-in)
  - [ ] Clear selection functionality
  - [ ] Emit selected dates to parent component
  - [ ] Store selected dates in component state

- [ ] Enforce minimum stay duration (AC: 8)
  - [ ] Fetch pricing rules for selected apartment
  - [ ] Check for minimum stay requirements
  - [ ] Disable invalid date ranges in UI
  - [ ] Display minimum stay message if requirement not met
  - [ ] Dynamically update available dates based on rules

- [ ] Implement loading and tooltip states (AC: 10, 12)
  - [ ] Create loading skeleton for calendar
  - [ ] Show loading state while fetching availability
  - [ ] Add tooltips for date states (hover)
  - [ ] Display legend explaining date colors
  - [ ] Show error state if availability fetch fails

- [ ] Make calendar mobile-responsive (AC: 11)
  - [ ] Test calendar on mobile breakpoints (320px, 375px)
  - [ ] Optimize touch interactions for date selection
  - [ ] Adjust calendar size for mobile screens
  - [ ] Test swipe gestures for month navigation
  - [ ] Ensure touch targets are minimum 44x44px

## Dev Notes

### Relevant Architecture Information

**Calendar Library Selection (from PRD Technical Assumptions):**

The PRD mentions "React Big Calendar or FullCalendar.js" but for this use case, **react-day-picker** is recommended:

- **Rationale:** Lightweight, excellent TypeScript support, built for date selection (not full calendar UI), perfect for booking flows
- **Alternative:** react-big-calendar (heavier, more suited for event calendars)
- **Decision:** Use react-day-picker v8.x + date-fns for date manipulation

**Installation:**

```bash
pnpm add react-day-picker date-fns
pnpm add -D @types/react-day-picker
```

**Component Architecture Pattern:**

```typescript
// components/booking/availability-calendar.tsx
'use client';

import { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, differenceInDays, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import 'react-day-picker/dist/style.css';

interface AvailabilityCalendarProps {
  apartmentId: string;
  onDateRangeSelect: (range: DateRange | undefined) => void;
  className?: string;
}

interface BookedDate {
  startDate: Date;
  endDate: Date;
}

export function AvailabilityCalendar({
  apartmentId,
  onDateRangeSelect,
  className,
}: AvailabilityCalendarProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minStayDays, setMinStayDays] = useState<number>(1);

  useEffect(() => {
    fetchAvailability();
  }, [apartmentId]);

  async function fetchAvailability() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/availability/${apartmentId}`);
      if (!response.ok) throw new Error('Failed to fetch availability');

      const data = await response.json();
      setBookedDates(
        data.bookedRanges.map((r: any) => ({
          startDate: new Date(r.startDate),
          endDate: new Date(r.endDate),
        }))
      );
      setBlockedDates(data.blockedDates.map((d: string) => new Date(d)));
      setMinStayDays(data.minStayDuration || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }

  // Check if a date is within booked ranges
  function isDateBooked(date: Date): boolean {
    return bookedDates.some((range) =>
      isWithinInterval(date, {
        start: range.startDate,
        end: range.endDate,
      })
    );
  }

  // Check if a date is blocked
  function isDateBlocked(date: Date): boolean {
    return blockedDates.some(
      (blocked) => format(blocked, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  }

  // Disabled dates: past, booked, or blocked
  const disabledDates = [
    { before: new Date() }, // Past dates
    ...bookedDates.map((range) => ({
      from: range.startDate,
      to: range.endDate,
    })),
    ...blockedDates,
  ];

  // Handle date selection
  function handleSelect(range: DateRange | undefined) {
    if (!range?.from || !range?.to) {
      setSelectedRange(range);
      onDateRangeSelect(range);
      return;
    }

    // Validate minimum stay
    const nights = differenceInDays(range.to, range.from);
    if (nights < minStayDays) {
      setError(
        `Minimum stay is ${minStayDays} night${minStayDays > 1 ? 's' : ''}`
      );
      return;
    }

    setSelectedRange(range);
    onDateRangeSelect(range);
    setError(null);
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <Skeleton className="h-[350px] w-full" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        disabled={disabledDates}
        numberOfMonths={1}
        fromDate={new Date()}
        className="rounded-md border"
        classNames={{
          months:
            'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          nav_button: cn(
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          ),
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell:
            'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: cn(
            'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:bg-accent focus:text-accent-foreground'
          ),
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle:
            'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
        }}
        modifiersClassNames={{
          booked: 'bg-red-100 text-red-900',
          blocked: 'bg-gray-200 text-gray-500',
        }}
        modifiers={{
          booked: bookedDates.flatMap((range) => {
            const days = [];
            let current = new Date(range.startDate);
            while (current <= range.endDate) {
              days.push(new Date(current));
              current.setDate(current.getDate() + 1);
            }
            return days;
          }),
          blocked: blockedDates,
        }}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-primary"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-white border"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-red-100"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <span>Blocked</span>
        </div>
      </div>

      {minStayDays > 1 && (
        <p className="text-sm text-muted-foreground">
          Minimum stay: {minStayDays} nights
        </p>
      )}
    </div>
  );
}
```

**API Endpoint Implementation:**

```typescript
// app/api/availability/[apartmentId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const querySchema = z.object({
	startDate: z.string().optional(),
	endDate: z.string().optional(),
})

export async function GET(
	req: NextRequest,
	{ params }: { params: { apartmentId: string } }
) {
	try {
		const { apartmentId } = params
		const { searchParams } = new URL(req.url)

		// Validate query parameters
		const query = querySchema.parse({
			startDate: searchParams.get('startDate'),
			endDate: searchParams.get('endDate'),
		})

		// Default to 3 months if no range specified
		const start = query.startDate ? new Date(query.startDate) : new Date()
		const end = query.endDate
			? new Date(query.endDate)
			: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days

		// Fetch confirmed and pending bookings
		const bookings = await prisma.booking.findMany({
			where: {
				apartmentId,
				status: {
					in: ['PENDING', 'CONFIRMED'],
				},
				OR: [
					{
						startDate: { lte: end },
						endDate: { gte: start },
					},
				],
			},
			select: {
				startDate: true,
				endDate: true,
			},
		})

		// Fetch minimum stay requirement from pricing rules
		const minStayRule = await prisma.pricingRule.findFirst({
			where: {
				apartmentId,
				active: true,
				minStayDuration: { not: null },
				startDate: { lte: end },
				endDate: { gte: start },
			},
			select: {
				minStayDuration: true,
			},
			orderBy: {
				priority: 'desc',
			},
		})

		return NextResponse.json({
			bookedRanges: bookings,
			blockedDates: [], // Future: implement blocked dates
			minStayDuration: minStayRule?.minStayDuration || 1,
		})
	} catch (error) {
		console.error('Availability fetch error:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch availability' },
			{ status: 500 }
		)
	}
}
```

**Responsive Design Considerations:**

- Mobile: Single month display, touch-optimized
- Tablet: Single month display, larger touch targets
- Desktop: Option for two-month display side-by-side

**Performance Optimization:**

- Memoize date calculations with useMemo
- Debounce API calls when navigating months
- Cache availability data with SWR or React Query (optional)

### Testing

**Test File Location:**

- Component tests: `__tests__/components/booking/availability-calendar.test.tsx`
- API tests: `__tests__/api/availability.test.ts`
- Integration tests: `__tests__/integration/booking-calendar-flow.test.ts`

**Testing Standards:**

- Test date selection logic (single date, range)
- Test booked date blocking
- Test minimum stay validation
- Test past date disabling
- Test month navigation
- Test loading and error states
- Test mobile touch interactions

**Test Example:**

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AvailabilityCalendar } from '@/components/booking/availability-calendar';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/availability/:apartmentId', (req, res, ctx) => {
    return res(
      ctx.json({
        bookedRanges: [
          {
            startDate: '2025-06-15',
            endDate: '2025-06-20',
          },
        ],
        blockedDates: [],
        minStayDuration: 2,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AvailabilityCalendar', () => {
  it('should render calendar with current month', async () => {
    render(
      <AvailabilityCalendar
        apartmentId="test-apt-1"
        onDateRangeSelect={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument(); // No loading
    });

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('should disable booked dates', async () => {
    render(
      <AvailabilityCalendar
        apartmentId="test-apt-1"
        onDateRangeSelect={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Booked dates should have disabled styling
    const bookedDate = screen.getByRole('gridcell', { name: /15/i });
    expect(bookedDate).toHaveClass('bg-red-100');
  });

  it('should enforce minimum stay requirement', async () => {
    const onSelectMock = jest.fn();

    render(
      <AvailabilityCalendar
        apartmentId="test-apt-1"
        onDateRangeSelect={onSelectMock}
      />
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Try to select 1 night (should fail with 2-night minimum)
    fireEvent.click(screen.getByRole('gridcell', { name: /10/i }));
    fireEvent.click(screen.getByRole('gridcell', { name: /11/i }));

    expect(screen.getByText(/minimum stay is 2 nights/i)).toBeInTheDocument();
    expect(onSelectMock).not.toHaveBeenCalled();
  });

  it('should allow valid date range selection', async () => {
    const onSelectMock = jest.fn();

    render(
      <AvailabilityCalendar
        apartmentId="test-apt-1"
        onDateRangeSelect={onSelectMock}
      />
    );

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Select valid 2-night range
    fireEvent.click(screen.getByRole('gridcell', { name: /10/i }));
    fireEvent.click(screen.getByRole('gridcell', { name: /12/i }));

    expect(onSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(Date),
        to: expect.any(Date),
      })
    );
  });
});
```

## QA Results

### Review Date: 2025-10-02

### Reviewed By: Quinn (Test Architect)

### Comprehensive Quality Assessment

**Overall Assessment: CONCERNS** - This story provides a well-designed calendar component with comprehensive implementation details, but requires attention to performance optimization and date logic testing before implementation.

**Risk Score: 68/100 (Moderate Risk)**

**Test Coverage: Complete** - 58 test scenarios covering all 12 acceptance criteria (100% coverage)

### Risk Analysis Summary

**Total Risks Identified: 10**

- **Critical (9)**: 0
- **High (6)**: 2 - PERF-001 (Database query performance), DATA-001 (Date range logic complexity)
- **Medium (4)**: 4 - TECH-001, PERF-002, DATA-002, OPS-001
- **Low (2-3)**: 4

**Key Risk Areas:**

1. **PERF-001 (High)**: Database query performance under load
2. **DATA-001 (High)**: Date range query logic complexity
3. **TECH-001 (Medium)**: Calendar library integration complexity
4. **PERF-002 (Medium)**: Mobile performance and touch optimization
5. **DATA-002 (Medium)**: Minimum stay validation logic
6. **OPS-001 (Medium)**: API error handling and resilience

### Test Design Analysis

**Test Strategy: Comprehensive**

- **Unit Tests**: 24 (41%) - Component logic and business rules
- **Integration Tests**: 28 (48%) - API integration and component interactions
- **E2E Tests**: 6 (10%) - Critical user workflows

**Priority Distribution:**

- **P0 (Critical)**: 18 tests - Core functionality, data integrity, performance
- **P1 (High)**: 28 tests - Secondary features and edge cases
- **P2 (Medium)**: 12 tests - Developer experience and accessibility

**Risk Coverage**: 9/10 risks have test coverage (90%)

### Required Actions Before Implementation

**MUST FIX (Before Development Starts):**

1. **Implement Performance Optimization**
   - Add query result caching (Redis or in-memory)
   - Optimize database queries with proper indexing
   - Implement pagination for large date ranges
   - Add query performance monitoring

2. **Add Comprehensive Date Logic Testing**
   - Create unit tests for all date range scenarios
   - Add integration tests with overlapping bookings
   - Implement timezone handling validation
   - Test edge cases (leap years, month boundaries)

3. **Create Calendar Library Proof-of-Concept**
   - Validate react-day-picker integration
   - Test styling conflicts with Tailwind CSS
   - Verify TypeScript compatibility
   - Plan fallback to alternative library if needed

4. **Implement Robust Error Handling**
   - Add comprehensive API error handling
   - Implement retry logic for transient failures
   - Create user-friendly error messages
   - Add circuit breaker pattern for database failures

**SHOULD FIX (During Development):**

5. **Add Input Validation and Sanitization**
   - Implement Zod schema validation
   - Add input sanitization
   - Validate apartment ID format
   - Add rate limiting for API endpoints

6. **Optimize Mobile Performance**
   - Implement React.memo for calendar component
   - Optimize touch event handlers
   - Test on actual mobile devices
   - Add touch gesture support

### Strengths

- Complete calendar component with react-day-picker integration
- Comprehensive API endpoint design with proper validation
- Detailed component architecture with TypeScript interfaces
- Proper date handling and validation logic
- Mobile-responsive design considerations
- Comprehensive testing approach with multiple test types
- Clear error handling and loading states
- Excellent test coverage across all acceptance criteria

### Compliance Check

- **Coding Standards:** ✓ Excellent - Proper TypeScript integration and component architecture
- **Project Structure:** ✓ Excellent - Clear component organization and API structure
- **Testing Strategy:** ✓ Excellent - Comprehensive testing approach with 58 scenarios
- **All ACs Met:** ✓ All 12 acceptance criteria are clearly defined and actionable
- **Risk Management:** ⚠️ Good - Risks identified with mitigation strategies

### Security Review

**Status: CONCERNS** - Minor security concern identified:

- Input validation and sanitization needs improvement (SEC-001)
- **Mitigation**: Add proper input validation with Zod schemas

### Performance Considerations

**Status: CONCERNS** - Performance optimization required:

- Database query performance under load needs caching (PERF-001)
- Mobile performance and touch optimization needed (PERF-002)
- **Mitigation**: Implement caching strategy and mobile optimization

### Files Modified During Review

- Created: `docs/qa/assessments/2.1-availability-calendar-risk-20251002.md`
- Created: `docs/qa/assessments/2.1-availability-calendar-test-design-20251002.md`
- Created: `docs/qa/gates/2.1-availability-calendar.yml`

### Gate Status

**Gate: CONCERNS** → docs/qa/gates/2.1-availability-calendar.yml

**Risk Profile:** Moderate (68/100) - Well-designed component with manageable risks
**Test Coverage:** Complete (58 scenarios, 100% AC coverage)
**NFR Assessment:** All non-functional requirements properly addressed

### Recommended Status

⚠️ **Ready for Implementation with Required Mitigations** - Story is comprehensive and well-structured, but performance optimization and date logic testing need attention before development begins.

**Next Review:** After implementation completion, before Story 2.3 (Booking Form)

## Change Log

| Date       | Version | Description                       | Author     |
| ---------- | ------- | --------------------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD            | Sarah (PO) |
| 2025-10-02 | 1.1     | Added QA review and gate decision | Quinn (QA) |
