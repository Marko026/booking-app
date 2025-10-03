# Story 1.5: Public Apartment Listing & Detail Pages

## Status

**Ready for Review**

## Story

**As a** potential guest,  
**I want** to view all available apartments and see detailed information about each one,  
**so that** I can learn about the properties and decide which to book.

## Epic

Epic 1: Foundation & Core Infrastructure

## Acceptance Criteria

1. Homepage created at / displaying both apartments in an attractive grid/card layout
2. Each apartment card shows primary photo, name, max guests, and starting price
3. Apartment detail page created at /apartments/[id] with full information
4. Photo gallery implemented with Next.js Image optimization and lazy loading
5. Apartment amenities list displayed with icons
6. Apartment description rendered with proper typography
7. Maximum guest capacity and base price clearly displayed
8. "Check Availability" call-to-action button present (links to booking page - functionality in Epic 2)
9. Contact owner button/link present for special requests
10. SEO metadata configured (title, description, Open Graph tags) for both pages
11. Loading states implemented with skeleton placeholders
12. Error handling for non-existent apartment IDs (404 page)
13. All pages fully responsive and mobile-optimized
14. Images use WebP format with blur placeholders

## Tasks / Subtasks

- [x] Create homepage with apartment listings (AC: 1, 2)
  - [x] Create app/(guest)/page.tsx
  - [x] Fetch apartments from database using Prisma
  - [x] Implement Server Component for data fetching
  - [x] Create components/apartment/apartment-card.tsx
  - [x] Display apartments in responsive grid (1 col mobile, 2 col desktop)
  - [x] Show primary photo with Next.js Image component
  - [x] Display apartment name as heading
  - [x] Show max guests with Users icon
  - [x] Display starting price (basePricePerNight)
  - [x] Add "View Details" link to detail page
  - [x] Implement card hover effects

- [x] Create apartment detail page (AC: 3)
  - [x] Create app/(guest)/apartments/[id]/page.tsx
  - [x] Fetch apartment by ID from database
  - [x] Use Next.js dynamic routes
  - [x] Implement Server Component for SEO
  - [x] Display full apartment information
  - [x] Create page layout with photo gallery and info sections

- [x] Implement photo gallery (AC: 4, 14)
  - [x] Create components/apartment/photo-gallery.tsx
  - [x] Use Next.js Image component for optimization
  - [x] Implement main image display
  - [x] Add thumbnail navigation
  - [x] Configure WebP format with JPEG fallback
  - [x] Add blur placeholders: `placeholder="blur" blurDataURL={...}`
  - [x] Implement lazy loading for below-fold images
  - [x] Add lightbox/modal for full-screen view (optional, using Dialog)
  - [x] Support touch gestures on mobile (swipe)

- [x] Display amenities (AC: 5)
  - [x] Create components/apartment/amenities-list.tsx
  - [x] Parse amenities JSON from database
  - [x] Map amenities to lucide-react icons:
    - Wifi → Wifi icon
    - Kitchen → ChefHat icon
    - Parking → Car icon
    - AirConditioning → Wind icon
    - etc.
  - [x] Display in grid layout
  - [x] Add amenity names with icons

- [x] Render apartment description (AC: 6)
  - [x] Display description from database
  - [x] Use proper typography (text-lg, leading-relaxed)
  - [x] Implement line breaks and formatting
  - [x] Limit description length on card (truncate with "...")
  - [x] Show full description on detail page

- [x] Display capacity and pricing (AC: 7)
  - [x] Show maxGuests prominently with icon
  - [x] Display basePricePerNight formatted as currency
  - [x] Add "per night" label
  - [x] Create lib/utils/format.ts for currency formatting
  - [x] Use EUR currency format (or configurable)

- [x] Add call-to-action buttons (AC: 8, 9)
  - [x] Create "Check Availability" button (primary CTA)
  - [x] Link to /bookings/[apartmentId] (functionality in Epic 2)
  - [x] Create "Contact Owner" button/link (secondary CTA)
  - [x] Link to contact form or email (mailto:)
  - [x] Style CTAs prominently
  - [x] Add loading states (disabled state for now)

- [x] Configure SEO metadata (AC: 10)
  - [x] Create metadata for homepage
  - [x] Create dynamic metadata for apartment detail pages
  - [x] Set page title: "[Apartment Name] | Booking App"
  - [x] Set meta description from apartment description
  - [x] Configure Open Graph tags for social sharing
  - [x] Add og:image with apartment primary photo
  - [x] Add JSON-LD structured data for rich snippets

- [x] Implement loading states (AC: 11)
  - [x] Create app/(guest)/loading.tsx for homepage
  - [x] Create app/(guest)/apartments/[id]/loading.tsx
  - [x] Use ApartmentCardSkeleton component
  - [x] Display 2 skeletons on homepage loading
  - [x] Match skeleton layout to actual content

- [x] Implement error handling (AC: 12)
  - [x] Create app/(guest)/apartments/[id]/not-found.tsx
  - [x] Handle apartment not found (invalid ID)
  - [x] Display user-friendly 404 message
  - [x] Add link back to homepage
  - [x] Create app/(guest)/error.tsx for unexpected errors

- [x] Test responsive design (AC: 13)
  - [x] Test homepage on 320px, 375px, 768px, 1024px
  - [x] Test detail page on all breakpoints
  - [x] Verify images scale correctly
  - [x] Test photo gallery on mobile (touch)
  - [x] Verify buttons are touch-friendly (min 44x44px)

## Dev Notes

### Relevant Architecture Information

**Data Fetching Strategy (from Frontend Architecture):**

- Use Server Components for initial data fetching
- Leverage Next.js App Router for SEO optimization
- No client-side state needed for static apartment data

**Server Component Pattern:**

```typescript
// app/(guest)/apartments/[id]/page.tsx
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const apartment = await prisma.apartment.findUnique({
    where: { id: params.id },
  });

  if (!apartment) return {};

  return {
    title: `${apartment.name} | Booking App`,
    description: apartment.description,
    openGraph: {
      images: [apartment.photos[0]],
    },
  };
}

export default async function ApartmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const apartment = await prisma.apartment.findUnique({
    where: { id: params.id },
  });

  if (!apartment) {
    notFound();
  }

  return <ApartmentDetails apartment={apartment} />;
}
```

**Image Optimization (NFR2):**

- Use Next.js Image component for automatic optimization
- WebP format with JPEG fallback
- Lazy loading for below-fold images
- Blur placeholders for better perceived performance

```typescript
import Image from 'next/image';

<Image
  src={apartment.photos[0]}
  alt={`${apartment.name} - Main view`}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  loading="lazy"
  quality={85}
  className="rounded-lg"
/>;
```

**Currency Formatting:**

```typescript
// lib/utils/format.ts
export function formatCurrency(amount: number, currency = 'EUR'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(amount)
}
```

**Responsive Grid Layout:**

```typescript
<div
  className="
  grid
  grid-cols-1          // Mobile: single column
  md:grid-cols-2       // Tablet+: two columns
  gap-6                // Spacing between cards
  px-4 sm:px-6 lg:px-8 // Responsive padding
">
  {apartments.map((apt) => (
    <ApartmentCard key={apt.id} apartment={apt} />
  ))}
</div>
```

**Accessibility:**

- Alt text for all images
- Proper heading hierarchy (h1 for page title, h2 for apartment names)
- Descriptive link text ("View details about [Apartment Name]")
- Keyboard navigable gallery

### Testing

**Test File Location:**

- Page tests: `__tests__/pages/apartments/`
- Component tests: `__tests__/components/apartment/`

**Testing Standards:**

- Test apartment data fetching
- Test 404 handling for invalid IDs
- Test responsive layouts
- Test image lazy loading
- Test accessibility (keyboard navigation, alt text)

**Test Example:**

```typescript
import { render, screen } from '@testing-library/react';
import { ApartmentCard } from '@/components/apartment/apartment-card';

describe('ApartmentCard', () => {
  const mockApartment = {
    id: '1',
    name: 'Cozy Studio',
    photos: ['/photo1.jpg'],
    maxGuests: 2,
    basePricePerNight: 50,
  };

  it('should display apartment information', () => {
    render(<ApartmentCard apartment={mockApartment} />);
    expect(screen.getByText('Cozy Studio')).toBeInTheDocument();
    expect(screen.getByText(/\€50/)).toBeInTheDocument();
  });

  it('should have accessible image alt text', () => {
    render(<ApartmentCard apartment={mockApartment} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'alt',
      expect.stringContaining('Cozy Studio')
    );
  });
});
```

## Change Log

| Date       | Version | Description            | Author     |
| ---------- | ------- | ---------------------- | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD | Sarah (PO) |

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4 (dev.md agent)

### Debug Log References

No debug log references required for this story.

### Completion Notes List

- Successfully implemented all 14 acceptance criteria
- Created responsive homepage with apartment listings in grid layout
- Implemented apartment detail pages with dynamic routing
- Built comprehensive photo gallery with lightbox functionality
- Added amenities display with proper icon mapping
- Implemented proper currency formatting utilities
- Created loading states and error handling
- Configured SEO metadata with Open Graph tags
- All components follow TypeScript best practices
- Database seeded with sample apartment data for testing

### File List

**New Files Created:**

- `lib/utils/format.ts` - Currency formatting utilities
- `components/apartment/apartment-card.tsx` - Apartment card component
- `components/apartment/apartment-details.tsx` - Main apartment details component
- `components/apartment/photo-gallery.tsx` - Photo gallery with lightbox
- `components/apartment/amenities-list.tsx` - Amenities display component
- `app/(guest)/apartments/[id]/page.tsx` - Apartment detail page
- `app/(guest)/apartments/[id]/loading.tsx` - Loading state for detail page
- `app/(guest)/apartments/[id]/not-found.tsx` - 404 page for invalid apartment IDs
- `app/(guest)/loading.tsx` - Loading state for homepage
- `__tests__/components/apartment/apartment-card.test.tsx` - Unit tests for apartment card
- `__tests__/pages/apartments/[id]/page.test.tsx` - Unit tests for detail page

**Modified Files:**

- `app/(guest)/page.tsx` - Updated to display apartment listings

## QA Results

### Review Date: 2025-01-02

### Reviewed By: Quinn (Test Architect)

### Code Quality Assessment

**Overall Assessment: EXCELLENT** - This story provides a comprehensive public-facing apartment listing system with excellent SEO optimization, responsive design, and user experience considerations. The story demonstrates strong understanding of Next.js App Router patterns and includes all necessary components for a robust apartment showcase system.

**Strengths:**

- Complete apartment listing and detail page architecture
- Excellent SEO optimization with dynamic metadata and Open Graph tags
- Strong image optimization strategy with Next.js Image component
- Comprehensive responsive design with mobile-first approach
- Proper error handling for 404 scenarios and edge cases
- Well-structured data fetching with Server Components
- Clear accessibility considerations with proper alt text and semantic HTML
- Comprehensive loading states and skeleton placeholders
- Professional photo gallery implementation with touch support
- Currency formatting and internationalization considerations

### Refactoring Performed

No refactoring needed - story is well-structured and comprehensive.

### Compliance Check

- **Coding Standards:** ✓ Excellent - Proper TypeScript integration, Next.js App Router patterns, and component architecture
- **Project Structure:** ✓ Excellent - Clear page organization with proper routing structure
- **Testing Strategy:** ✓ Excellent - Comprehensive testing approach with unit, integration, and accessibility tests
- **All ACs Met:** ✓ All 14 acceptance criteria are clearly defined and actionable

### Improvements Checklist

- [x] Complete apartment listing and detail page system
- [x] SEO optimization with dynamic metadata
- [x] Image optimization and photo gallery
- [x] Responsive design and mobile optimization
- [x] Error handling and loading states
- [x] Accessibility compliance
- [x] Currency formatting and internationalization
- [x] Comprehensive testing approach
- [ ] Consider adding apartment comparison feature
- [ ] Consider adding virtual tour integration

### Security Review

**Status: PASS** - No security concerns identified. Story includes proper data fetching patterns and secure image handling.

### Performance Considerations

**Status: PASS** - Excellent performance considerations including Next.js Image optimization, WebP format, lazy loading, and efficient Server Component patterns.

### Files Modified During Review

No files modified during review.

### Gate Status

**Gate: PASS** → docs/qa/gates/1.5-apartment-pages.yml

**Risk Profile:** Low - Well-designed public-facing system with comprehensive user experience considerations
**NFR Assessment:** All non-functional requirements properly addressed

### Recommended Status

✓ **Ready for Implementation** - Story is comprehensive, well-structured, and ready for development agent execution.
