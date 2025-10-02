# Story Expansion Template

## Purpose

This template provides the complete structure for expanding user stories from skeleton format to comprehensive, developer-ready documentation matching Epic 1 quality standards.

## Template Structure

Use this structure for **all stories** in Epics 2-5:

---

# Story X.X: [Story Title]

## Status

**Draft**

## Story

**As a** [user type],  
**I want** [goal],  
**so that** [benefit].

## Epic

[Epic Name]

## Acceptance Criteria

[Keep existing AC from story - DO NOT MODIFY]

## Dependencies

[Keep existing dependencies - ADD if missing]

## Tasks / Subtasks

⚠️ **CRITICAL SECTION** - This is what makes stories developer-ready

### Task Breakdown Pattern

For **each Acceptance Criterion**, create detailed subtasks following this pattern:

```markdown
- [ ] [Task Name that groups related AC items] (AC: X, Y, Z)
  - [ ] [Specific actionable subtask with clear outcome]
  - [ ] [Another specific subtask]
  - [ ] [Another specific subtask]
  - [ ] [Verification/testing subtask]
```

### Task Organization Guidelines

1. **Group related ACs** - Don't create one task per AC, group logically
2. **Be specific** - Each subtask should be clear and actionable
3. **Include verification** - Last subtask in each group should verify/test
4. **Technical details** - Include file paths, command examples, specific libraries
5. **6-10 major tasks** - Aim for comprehensive but manageable scope

### Example Task Structure

```markdown
- [ ] Install and configure [library/tool] (AC: 1, 2)
  - [ ] Evaluate options: [option A] vs [option B] vs [option C]
  - [ ] Install chosen solution: `pnpm add [package]`
  - [ ] Create base configuration in [file path]
  - [ ] Configure [specific feature] in [config file]
  - [ ] Test [component/feature] renders correctly

- [ ] Create API endpoint (AC: 3, 4)
  - [ ] Create app/api/[route]/route.ts
  - [ ] Implement [HTTP METHOD] handler
  - [ ] Add request validation with Zod
  - [ ] Query database using Prisma
  - [ ] Return response in correct format
  - [ ] Add error handling for edge cases
  - [ ] Test endpoint with sample requests

- [ ] Build [component name] (AC: 5, 6, 7)
  - [ ] Create components/[category]/[component-name].tsx
  - [ ] Implement [specific feature]
  - [ ] Add [another feature]
  - [ ] Style component with Tailwind CSS
  - [ ] Add loading states
  - [ ] Add error handling
  - [ ] Test component renders correctly

- [ ] Implement [feature] (AC: 8, 9)
  - [ ] [Specific implementation step]
  - [ ] [Another implementation step]
  - [ ] [Validation or business logic]
  - [ ] [Integration with other components]
  - [ ] Test [specific scenario]

- [ ] Test responsive design (AC: 10)
  - [ ] Test at 320px (mobile small)
  - [ ] Test at 375px (mobile standard)
  - [ ] Test at 768px (tablet)
  - [ ] Test at 1024px+ (desktop)
  - [ ] Verify touch targets (min 44x44px)
  - [ ] Test accessibility features
```

## Dev Notes

⚠️ **CRITICAL SECTION** - This is where you provide architecture context

### Structure

````markdown
## Dev Notes

### Relevant Architecture Information

**[Decision/Pattern Name] (from [Architecture Doc Reference]):**

[Explanation of the architectural decision or pattern]

- **Rationale:** [Why this approach]
- **Alternative:** [Other options considered]
- **Decision:** [What to implement]

**Technology Stack:**

[List specific technologies for this story with versions]

**Installation:**

```bash
pnpm add [packages]
pnpm add -D [dev-packages]
```
````

**Component/Service Architecture Pattern:**

```typescript
// [File path]
[Complete code example showing the pattern]
```

**API Endpoint Implementation:**

```typescript
// [File path]
[Complete API route code example]
```

**Configuration Examples:**

```typescript
// [Config file path]
[Configuration code example]
```

**Key Implementation Notes:**

- [Important consideration 1]
- [Important consideration 2]
- [Performance optimization]
- [Security consideration]

### Testing

**Test File Location:**

- [Test category]: `__tests__/[path]/[test-file].test.ts`
- [Another category]: `__tests__/[path]/[test-file].test.ts`

**Testing Standards:**

- Test [specific scenario]
- Test [another scenario]
- Test [edge case]
- Test [error handling]
- Test [accessibility/responsiveness]

**Test Example:**

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { [Component] } from '@/components/[path]';

describe('[Component/Feature]', () => {
  it('should [expected behavior]', async () => {
    render(<[Component] {...props} />);

    // Arrange
    const element = screen.getByRole('[role]');

    // Act
    fireEvent.click(element);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('[text]')).toBeInTheDocument();
    });
  });

  it('should handle [edge case]', () => {
    // Test implementation
  });
});
```

````

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## Dev Agent Record

### Agent Model Used

_To be populated by dev agent_

### Debug Log References

_To be populated by dev agent_

### Completion Notes List

_To be populated by dev agent_

### File List

_To be populated by dev agent_

## QA Results

_To be populated by QA agent_

---

## Content Guidelines

### Tasks / Subtasks Section

**What to Include:**
- Specific file paths to create/modify
- Exact commands to run (with package managers)
- Configuration details
- Library/technology choices with rationale
- Verification steps

**What NOT to Include:**
- Vague tasks like "Implement feature"
- Missing file paths or locations
- Unexplained technology choices
- Tasks without clear outcomes

### Dev Notes Section

**Architecture References:**
Pull from these documents:
- `docs/backend-architecture.md` - Backend patterns, API design, database
- `docs/ui-architecture.md` - Frontend patterns, components, state management
- `docs/prd.md` - Functional requirements, business rules

**Code Examples:**
- **Always include** complete, working code examples
- Show full file structure (imports, interfaces, implementation)
- Use TypeScript with proper types
- Include comments for complex logic
- Show both component and API patterns

**Configuration Examples:**
- Database queries (Prisma)
- API endpoints (Next.js API routes)
- Component patterns (React with TypeScript)
- Validation schemas (Zod)
- Testing patterns (Jest + React Testing Library)

### Testing Section

**Required Coverage:**
- Unit tests for components
- API route tests
- Integration tests for critical flows
- Accessibility tests
- Responsive design tests

**Test Examples Must Include:**
- Proper test setup (mocks, fixtures)
- AAA pattern (Arrange, Act, Assert)
- Async handling with waitFor
- Error case testing
- Accessibility assertions

---

## Quick Reference: Story 2.1 as Model

**Story 2.1** (Availability Calendar) is the **gold standard** example. Use it as reference for:

✅ **Task Breakdown:**
- 7 major tasks
- 38 detailed subtasks
- Clear file paths
- Specific technical decisions
- Verification steps

✅ **Dev Notes:**
- Library selection with rationale
- Complete component code (150+ lines)
- Complete API endpoint code (50+ lines)
- Responsive design patterns
- Performance considerations

✅ **Testing:**
- Multiple test file locations
- Comprehensive test standards list
- Complete test example with MSW mocking
- Multiple test scenarios

---

## Checklist for Story Expansion

Before marking a story as "Ready for Dev Agent":

- [ ] All acceptance criteria have corresponding tasks
- [ ] Each major task has 3-6 detailed subtasks
- [ ] File paths are specific (not generic)
- [ ] Technology choices are explained with rationale
- [ ] At least one complete code example (100+ lines)
- [ ] API endpoint example (if applicable)
- [ ] Testing section has specific test locations
- [ ] Testing section has complete test example
- [ ] All architecture references are cited
- [ ] No placeholder text like "TBD" or "To be determined"

---

## Common Patterns by Story Type

### Form Stories (2.3, 3.3, 4.2, etc.)

**Tasks Focus:**
- React Hook Form setup
- Zod validation schema
- Form submission handling
- API integration
- Error handling
- Success states

**Dev Notes Focus:**
- Form validation patterns
- Zod schema examples
- API mutation patterns
- Optimistic updates
- Error display

### List/Table Stories (3.2, 4.1, 3.6, etc.)

**Tasks Focus:**
- Table component setup
- Pagination implementation
- Filtering logic
- Sorting functionality
- Search implementation
- Row actions

**Dev Notes Focus:**
- Table component patterns
- Server-side pagination
- URL state management (nuqs)
- Data fetching patterns
- Responsive table design

### API Stories (2.2, 3.1, 5.1, etc.)

**Tasks Focus:**
- API endpoint creation
- Database queries
- Business logic implementation
- Response formatting
- Error handling
- Rate limiting

**Dev Notes Focus:**
- Service layer patterns
- Prisma query examples
- Response schemas
- Error handling strategies
- Performance optimization

### Dashboard/Analytics Stories (3.1, 5.1, 5.2, etc.)

**Tasks Focus:**
- Data aggregation queries
- Chart library integration
- Widget components
- Real-time updates
- Export functionality

**Dev Notes Focus:**
- Aggregation patterns
- Chart.js/Recharts examples
- Data transformation
- Performance optimization
- Caching strategies

---

## Example: Expanding Story 2.2 (Pricing Calculation)

**Before (Skeleton):**
```markdown
## Acceptance Criteria
1. API endpoint created at GET /api/pricing/:apartmentId?start=YYYY-MM-DD&end=YYYY-MM-DD
2. Pricing calculation logic implemented
3. Base price used when no rules match
...
````

**After (Expanded):**

````markdown
## Tasks / Subtasks

- [ ] Create pricing calculation API endpoint (AC: 1, 2, 3)
  - [ ] Create app/api/pricing/[apartmentId]/route.ts
  - [ ] Implement GET handler with query parameter validation
  - [ ] Add Zod schema for date validation
  - [ ] Fetch apartment base price from database
  - [ ] Query pricing rules for date range
  - [ ] Test endpoint with various date ranges

- [ ] Implement pricing calculation service (AC: 2, 8)
  - [ ] Create lib/services/pricing-service.ts
  - [ ] Implement calculatePrice method
  - [ ] Handle base price fallback
  - [ ] Apply pricing rules with priority sorting
  - [ ] Calculate per-night breakdowns
  - [ ] Calculate total price
  - [ ] Add unit tests for calculation logic

- [ ] Build price calculator component (AC: 4, 5, 11)
  - [ ] Create components/booking/price-calculator.tsx
  - [ ] Display number of nights
  - [ ] Show price per night breakdown
  - [ ] Display total price prominently
  - [ ] Add seasonal variation indicators
  - [ ] Style with Tailwind CSS
  - [ ] Add loading skeleton

...more tasks...

## Dev Notes

### Relevant Architecture Information

**Pricing Calculation Logic (from Backend Architecture):**

The pricing system uses a priority-based rule matching system where:

- Pricing rules have a `priority` field (higher = more specific)
- If multiple rules overlap, highest priority wins
- If no rules match, `apartment.basePricePerNight` is used

**Service Layer Pattern:**

```typescript
// lib/services/pricing-service.ts
import { prisma } from '@/lib/db'
import { differenceInDays } from 'date-fns'

export class PricingService {
	async calculatePrice(
		apartmentId: string,
		startDate: Date,
		endDate: Date
	): Promise<PriceCalculation> {
		// Implementation with full code example...
	}
}
```
````

...rest of Dev Notes...

```

---

## Final Tips

1. **Start with Story 2.1** - Read it completely to understand the pattern
2. **Copy the structure** - Use this template structure for all stories
3. **Reference architecture docs** - Pull specific patterns and examples
4. **Be specific** - Avoid generic language, use exact file paths and commands
5. **Include code** - Always show complete, working examples
6. **Test comprehensively** - Cover happy path, edge cases, and errors
7. **Think like a dev** - What would you need to know to implement this?

---

## Questions to Ask Yourself

When expanding a story, ensure you can answer:

- ✅ What files need to be created?
- ✅ What libraries need to be installed?
- ✅ What is the exact component/API structure?
- ✅ How does this integrate with existing code?
- ✅ What are the edge cases?
- ✅ How do I test this?
- ✅ What does the UI look like?
- ✅ What happens on errors?
- ✅ How is this responsive?
- ✅ What are the performance considerations?

If you can't answer these from the story, **add more details**.

---

## Success Criteria

A story is ready when:

✅ A developer agent can implement it without architectural decisions
✅ All technical choices are explained with rationale
✅ Code examples are complete and runnable
✅ Testing approach is clear and specific
✅ No ambiguity about file locations or structure
✅ Integration points with other stories are documented
✅ Error handling is specified
✅ Responsive design is addressed

---

*Template version: 1.0*
*Based on Story 2.1 (Availability Calendar)*
*Last updated: 2025-10-02*

```
