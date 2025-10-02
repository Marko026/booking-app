# Booking App for Two Apartments Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Enable direct reservations for two apartments without third-party platform commissions
- Provide an intuitive, modern booking experience for guests across multiple languages (Serbian, English, German)
- Offer a simple yet powerful admin panel for the owner to manage bookings, pricing, and availability
- Display clear, real-time availability with dynamic calendars for both apartments
- Build a scalable solution ready for future integrations with external booking platforms (Airbnb, Booking.com)
- Increase direct bookings to 50% of total reservations
- Simplify reservation management and reduce dependence on third-party platforms

### Background Context

This booking application addresses the need for a private house owner with two apartments to manage direct reservations efficiently. Currently, property owners rely heavily on third-party platforms that charge significant commissions and limit direct guest relationships. By providing a professional, direct booking solution, the owner can maximize revenue, maintain better guest communication, and have full control over pricing strategies including seasonal rates and discounts.

The application targets two primary user groups: guests seeking transparent, commission-free bookings with instant confirmation, and the property owner who needs streamlined tools for managing reservations, pricing, and availability across both apartments. The MVP focuses on core booking functionality, with future phases planned for payment integration, multi-language support, and third-party platform synchronization.

### Change Log

| Date       | Version | Description          | Author    |
| ---------- | ------- | -------------------- | --------- |
| 2025-10-01 | v1.0    | Initial PRD creation | PM (John) |

---

## Requirements

### Functional Requirements

**Guest-Facing Features:**

- FR1: Users must be able to view detailed apartment information including photos, amenities, descriptions, and maximum guest capacity
- FR2: Users must be able to check real-time availability for each apartment using an interactive calendar view
- FR3: Users must be able to view transparent pricing for selected date ranges with no hidden fees
- FR4: Users must be able to submit booking requests with guest details (name, email, phone, number of guests)
- FR5: Users must receive instant email confirmation upon successful booking with booking details and confirmation code
- FR6: Users must be able to view their booking details using a confirmation code
- FR7: Users must be able to cancel their booking through the system
- FR8: Users must be able to contact the property owner directly for special requests
- FR9: The application must support multi-language functionality (Serbian, English, German)

**Admin Features:**

- FR10: Admin users must be able to view all bookings in a dashboard with filtering capabilities
- FR11: Admin users must be able to manually create bookings for offline/phone reservations
- FR12: Admin users must be able to update booking details and status (pending, confirmed, cancelled)
- FR13: Admin users must be able to delete bookings when necessary
- FR14: Admin users must be able to update apartment details including photos, descriptions, and amenities
- FR15: Admin users must be able to upload and delete apartment photos
- FR16: Admin users must be able to create, update, and delete seasonal pricing rules for specific date ranges
- FR17: Admin users must be able to set minimum stay duration requirements for specific periods
- FR18: Admin users must be able to block dates for maintenance or personal use
- FR19: Admin users must be able to export booking data in CSV/Excel format with date range filtering
- FR20: Admin users must receive notifications for new booking requests
- FR21: Admin users must be able to view today's check-ins and check-outs on the dashboard
- FR22: Admin users must be able to add notes to bookings for internal reference

**API & Data Management:**

- FR23: The system must provide public API endpoints for apartment listings, availability checks, and pricing calculations
- FR24: The system must provide protected admin API endpoints for all management operations
- FR25: The system must calculate total booking price based on seasonal pricing rules and date ranges
- FR26: The system must prevent double-bookings by checking availability before confirming reservations
- FR27: The system must generate analytics data for dashboard statistics, revenue, and occupancy rates

### Non-Functional Requirements

**Performance:**

- NFR1: Calendar availability checks must respond within 500ms for optimal user experience
- NFR2: Images must be optimized using WebP format with lazy loading and progressive loading
- NFR3: The application must achieve Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- NFR4: Database queries must be optimized with proper indexing for availability checks

**Security:**

- NFR5: All API inputs must be validated using Zod schemas to prevent injection attacks
- NFR6: Booking endpoints must implement rate limiting (5 requests/minute per IP) to prevent spam
- NFR7: Admin endpoints must be protected with authentication using BetterAuth
- NFR8: File uploads must include image validation and security scanning
- NFR9: All user inputs must be sanitized to prevent XSS attacks

**Scalability & Reliability:**

- NFR10: The application must support concurrent bookings without data corruption
- NFR11: The system must maintain 99.9% uptime availability
- NFR12: Error tracking must be implemented using Sentry for production monitoring
- NFR13: The database must use Prisma ORM with parameterized queries for SQL injection prevention

**Usability & Accessibility:**

- NFR14: The application must be fully responsive across mobile breakpoints (320px, 375px, 768px, 1024px)
- NFR15: Form validation must provide real-time, helpful error messages
- NFR16: Loading states must use skeleton placeholders to improve perceived performance
- NFR17: Success and error states must provide clear feedback to users
- NFR18: The UI must follow mobile-first design principles using TailwindCSS

**Development & Testing:**

- NFR19: The application must include unit tests for components, API logic, and utility functions using Jest and React Testing Library
- NFR20: Integration tests must cover API endpoints, database operations, and email notifications
- NFR21: The codebase must follow TypeScript strict mode with proper type definitions
- NFR22: Code must be version controlled with GitHub and deployed via CI/CD using GitHub Actions

**Hosting & Infrastructure:**

- NFR23: The application must be hosted on Vercel for optimal Next.js performance
- NFR24: The MVP must use SQLite for development; production must use PostgreSQL (Supabase/Neon/Railway)
- NFR25: Static assets must be served via CDN (Vercel Edge Network) for global performance

---

## User Interface Design Goals

### Overall UX Vision

The booking application should provide a seamless, modern experience that feels as professional as major booking platforms but with a more personal, direct connection to the property owner. The design emphasizes visual appeal through high-quality apartment photography, transparent pricing with no surprises, and intuitive navigation that guides guests effortlessly from browsing to booking confirmation. The admin panel should feel powerful yet simple, allowing the owner to manage everything efficiently without overwhelming complexity.

### Key Interaction Paradigms

- **Progressive disclosure**: Show essential information first (photos, availability, price), with detailed amenities and policies accessible on demand
- **Real-time feedback**: Instant calendar updates, live form validation, and immediate availability checks as users select dates
- **Optimistic UI**: Show loading skeletons and smooth transitions to maintain perceived performance
- **Toast notifications**: Non-intrusive feedback for admin actions (booking confirmed, pricing updated, etc.)
- **Framer Motion animations**: Fluid page transitions, smooth calendar interactions, and elegant image gallery effects
- **Mobile-first gestures**: Swipe for image galleries, pull-to-refresh for booking lists, touch-optimized calendar navigation

### Core Screens and Views

**Guest-Facing Screens:**

- Homepage with apartment showcase and hero imagery
- Apartment detail page with photo gallery, amenities, and description
- Booking page with interactive calendar and reservation form
- Booking confirmation page with details and confirmation code
- Booking lookup page for viewing/canceling reservations

**Admin Screens:**

- Admin dashboard with today's check-ins/check-outs and quick stats
- Bookings management page with list, filters, and status updates
- Manual booking creation form
- Apartment details management with photo upload
- Pricing rules management with seasonal rate configuration
- Analytics page with revenue and occupancy data
- Export functionality for accounting

### Accessibility: WCAG AA

The application will meet WCAG AA standards including:

- Sufficient color contrast ratios for all text
- Keyboard navigation for all interactive elements
- Proper ARIA labels for screen readers
- Focus management for modals and forms
- Semantic HTML structure with logical heading hierarchy

### Branding

**Visual Style:**

- Clean, modern aesthetic emphasizing the apartments' appeal
- Professional photography as the primary visual element
- Neutral color palette with accent colors for CTAs and status indicators
- TailwindCSS + shadcn/ui for consistent, accessible component design
- Radix UI primitives for robust, customizable interactions
- Lucide React icons for clarity and consistency

**Tone:**

- Welcoming and trustworthy
- Professional but personal (direct connection to owner)
- Clear and transparent (pricing, policies, availability)

### Target Device and Platforms: Web Responsive

**Mobile-First Responsive Design:**

- **320px** - Small phones (iPhone SE) - single column, stacked layout
- **375px** - Standard phones (iPhone 12) - optimized touch targets, mobile-optimized calendar
- **768px** - Tablets (iPad) - two-column layouts where appropriate
- **1024px+** - Desktop - full-width dashboards, side-by-side calendar and booking form

**Progressive Web App considerations** (Phase 3):

- Offline capability for viewing existing bookings
- Push notifications for booking updates
- App-like experience on mobile devices

---

## Technical Assumptions

### Repository Structure: Monorepo

Single Next.js monorepo containing:

- Frontend (Next.js App Router with React Server Components)
- Backend (Next.js API Routes)
- Shared types and utilities
- Database schema (Prisma)

**Rationale:** Simplifies deployment, type sharing, and development workflow for a two-apartment booking system. Vercel optimizes monorepo deployments.

### Service Architecture

**Next.js Full-Stack Monolith with API Routes**

- Next.js App Router for SSR/SSG pages (guest-facing)
- Next.js API Routes for all backend endpoints
- Prisma ORM for database abstraction
- BetterAuth for authentication middleware
- Server Components for data fetching where possible
- Client Components only for interactive features (calendar, forms, animations)

**Rationale:** Next.js full-stack approach reduces complexity, leverages SSR for SEO, and provides seamless frontend/backend integration. Perfect for MVP scope.

### Testing Requirements

**Comprehensive Testing Strategy:**

**Unit Testing:**

- Jest + React Testing Library for component testing
- API route handler unit tests
- Utility function testing (date calculations, pricing logic)
- Zod schema validation testing

**Integration Testing:**

- Full API endpoint testing (request/response cycles)
- Prisma database integration tests
- Email notification service mocks
- File upload pipeline testing

**End-to-End Testing:**

- Complete guest booking flow (Playwright or Cypress)
- Admin CRUD operations
- Multi-device responsiveness testing
- Multi-language switching (Phase 2)

**Performance Testing:**

- Load testing for concurrent bookings
- Database query optimization validation
- Image loading performance
- Core Web Vitals monitoring

**Manual Testing Convenience:**

- Seed scripts for development data
- Admin test accounts with different permission levels
- Mock booking scenarios for various edge cases

**Rationale:** Comprehensive testing ensures booking accuracy (critical for avoiding double-bookings), performance, and reliability. Manual testing tools support owner UAT.

### Additional Technical Assumptions and Requests

**Frontend Stack:**

- **Framework:** Next.js 15+ (App Router, React 19+, TypeScript strict mode)
- **UI Library:** TailwindCSS + shadcn/ui (Radix UI primitives)
- **Icons:** lucide-react
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion for transitions and micro-interactions
- **Calendar:** React Big Calendar or FullCalendar.js for availability display
- **Multi-language:** next-intl (Phase 2 implementation)
- **State Management:** React Server Components + URL state (nuqs for search params), minimal client state

**Backend Stack:**

- **API:** Next.js API Routes (serverless functions on Vercel)
- **ORM:** Prisma with TypeScript generation
- **Authentication:** BetterAuth for admin protection
- **File Storage:** Cloudinary or UploadThing for apartment images
- **Email:** Resend API or Nodemailer for booking confirmations
- **SMS:** Twilio for SMS confirmations (optional Phase 2)

**Database:**

- **Development/MVP:** SQLite for simplicity and local development
- **Production:** PostgreSQL via Supabase, Neon, or Railway
- **Migration Strategy:** Prisma Migrate for schema versioning
- **Seeding:** Seed scripts for two apartments, sample bookings, pricing rules

**Hosting & DevOps:**

- **App Hosting:** Vercel (optimized for Next.js, automatic deployments)
- **Database Hosting:** Supabase (preferred for PostgreSQL + potential future real-time features)
- **CDN:** Vercel Edge Network for global asset delivery
- **CI/CD:** GitHub Actions for automated testing and deployment
- **Monitoring:** Sentry for error tracking, Vercel Analytics for performance
- **Logging:** Logtail or built-in Vercel logs

**Security Implementation:**

- **Input Validation:** Zod schemas at API boundaries
- **Rate Limiting:** Vercel Edge Config or upstash/ratelimit
- **CSRF Protection:** Next.js built-in protection with proper configuration
- **Environment Variables:** Vercel Environment Variables for secrets
- **Image Security:** File type validation, size limits, virus scanning via Cloudinary

**Performance Optimizations:**

- **Image Handling:** Next.js Image component with WebP/AVIF, blur placeholders
- **Database Indexing:** Indexes on `apartmentId`, `startDate`, `endDate`, `status`
- **Caching:** Redis (Upstash) for frequently accessed data (optional Phase 2)
- **Bundle Optimization:** Dynamic imports for admin panel, calendar libraries
- **API Response Caching:** Next.js `revalidate` for apartment data

**Development Tools:**

- **Package Manager:** pnpm (faster, more efficient than npm/yarn)
- **Linting:** ESLint with Next.js config, Prettier for formatting
- **Git Hooks:** Husky + lint-staged for pre-commit checks
- **Type Safety:** TypeScript strict mode, Prisma type generation

**Phase 1 MVP Scope Constraints:**

- No payment processing (manual payment coordination)
- No third-party platform integrations
- Single admin user (owner only)
- Email-only notifications (no SMS)
- English language only (multi-language in Phase 2)

---

## Epic List

### Epic 1: Foundation & Core Infrastructure

**Goal:** Establish project setup, database schema, authentication foundation, and basic apartment display to create a deployable foundation with initial guest-facing functionality.

### Epic 2: Guest Booking Experience

**Goal:** Enable guests to check availability, view pricing, submit booking requests, and receive confirmations for a complete end-to-end booking flow.

### Epic 3: Admin Booking Management

**Goal:** Provide the owner with comprehensive tools to view, create, update, and manage all bookings including manual entries and status management.

### Epic 4: Pricing & Availability Management

**Goal:** Enable the owner to configure seasonal pricing rules, block dates for maintenance, and control apartment availability with flexible pricing strategies.

### Epic 5: Admin Dashboard & Analytics (Optional for MVP)

**Goal:** Provide the owner with at-a-glance insights, today's check-ins/check-outs, revenue analytics, and data export capabilities for business management.

**Note:** Epics 1-3 constitute the Core MVP. Epic 4 is Extended MVP functionality. Epic 5 is optional and can be deferred to Phase 1.5 if timeline is constrained.

---

## Epic 1: Foundation & Core Infrastructure

**Expanded Goal:** Establish the complete project foundation including Next.js application setup, database schema with Prisma, BetterAuth authentication for admin access, CI/CD pipeline, and deliver initial guest-facing value through a functional apartment listing and detail page. This epic creates a deployable, testable application that guests can visit to learn about the apartments.

### Story 1.1: Project Initialization & Development Environment

**As a developer,**  
**I want a fully configured Next.js project with TypeScript, TailwindCSS, and shadcn/ui,**  
**so that I have a solid foundation to build features efficiently.**

#### Acceptance Criteria

1. Next.js 15+ project initialized with App Router and TypeScript strict mode
2. TailwindCSS configured with shadcn/ui and Radix UI components installed
3. Lucide React icons package installed and configured
4. pnpm configured as package manager with workspace setup
5. ESLint and Prettier configured with Next.js recommended rules
6. Husky and lint-staged configured for pre-commit hooks
7. Directory structure established (app/, components/, lib/, types/, prisma/)
8. Environment variables template (.env.example) created
9. GitHub repository initialized with main branch protection
10. Basic README with setup instructions created
11. Application runs successfully on localhost:3000 with default Next.js page

---

### Story 1.2: Database Schema & Prisma Setup

**As a developer,**  
**I want a complete database schema with Prisma ORM configured,**  
**so that I can reliably store and query apartment, booking, guest, and pricing data.**

#### Acceptance Criteria

1. Prisma installed and configured with SQLite for development
2. Apartment schema defined (id, name, description, maxGuests, basePricePerNight, photos, createdAt, updatedAt)
3. Guest schema defined (id, firstName, lastName, email, phone, createdAt)
4. Booking schema defined (id, apartmentId, guestId, startDate, endDate, numberOfGuests, totalPrice, status enum, notes, confirmationCode, createdAt, updatedAt)
5. PricingRule schema defined (id, apartmentId, name, startDate, endDate, pricePerNight, minStayDuration, createdAt)
6. Foreign key relationships established (Booking → Apartment, Booking → Guest, PricingRule → Apartment)
7. Database indexes created on apartmentId, startDate, endDate, status, confirmationCode
8. Prisma Client generated with TypeScript types
9. Seed script created to populate two sample apartments with photos and descriptions
10. Migration created and applied successfully
11. Database helper utilities created in lib/db.ts for connection management

---

### Story 1.3: BetterAuth Authentication Setup

**As an admin user,**  
**I want secure authentication protecting admin routes,**  
**so that only authorized users can manage bookings and apartment data.**

#### Acceptance Criteria

1. BetterAuth installed and configured with appropriate session strategy
2. Authentication API routes created (/api/auth/\*)
3. Admin user schema/table integrated (email, password hash, role)
4. Seed script updated to create default admin user for development
5. Middleware created to protect /admin/\* routes
6. Login page created at /admin/login with email/password form using React Hook Form + Zod
7. Session management implemented with secure cookies
8. Logout functionality implemented
9. Auth helper utilities created (getSession, requireAuth) in lib/auth.ts
10. Redirect logic implemented (unauthorized → login, authorized → dashboard)
11. Authentication tested with successful login/logout flow

---

### Story 1.4: Core UI Components & Layout

**As a developer,**  
**I want reusable UI components and layout structure,**  
**so that I can build consistent, accessible interfaces quickly.**

#### Acceptance Criteria

1. Main guest layout component created with header navigation and footer
2. Admin layout component created with sidebar navigation
3. Reusable shadcn/ui components installed (Button, Card, Input, Label, Select, Textarea, Dialog, Toast)
4. Custom loading skeleton components created for apartments and bookings
5. Error boundary component created with user-friendly error messages
6. Toast notification system configured using shadcn/ui Toast
7. Responsive navigation component with mobile menu (hamburger) for guest layout
8. Admin sidebar navigation with icons and active state styling
9. Typography styles configured in TailwindCSS (headings, body text)
10. Color palette defined in tailwind.config for brand colors and status indicators
11. Components render correctly across all breakpoints (320px, 375px, 768px, 1024px+)

---

### Story 1.5: Public Apartment Listing & Detail Pages

**As a potential guest,**  
**I want to view all available apartments and see detailed information about each one,**  
**so that I can learn about the properties and decide which to book.**

#### Acceptance Criteria

1. Homepage created at `/` displaying both apartments in an attractive grid/card layout
2. Each apartment card shows primary photo, name, max guests, and starting price
3. Apartment detail page created at `/apartments/[id]` with full information
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

---

### Story 1.6: CI/CD Pipeline & Vercel Deployment

**As a development team,**  
**I want automated testing and deployment pipeline,**  
**so that code changes are validated and deployed reliably.**

#### Acceptance Criteria

1. GitHub Actions workflow created for running tests on pull requests
2. ESLint and TypeScript type-checking integrated into CI pipeline
3. Unit test runner configured (even if only smoke tests initially)
4. Vercel project connected to GitHub repository
5. Automatic deployments configured for main branch (production)
6. Preview deployments configured for pull requests
7. Environment variables configured in Vercel (database URL, auth secrets)
8. Build and deployment successful with no errors
9. Production URL accessible and functional
10. Sentry configured for error tracking in production
11. Vercel Analytics enabled for performance monitoring

---

## Epic 2: Guest Booking Experience

**Expanded Goal:** Enable guests to complete the full booking journey from checking availability for their desired dates, viewing accurate pricing calculations including seasonal rates, submitting booking requests with their information, and receiving instant email confirmations. This epic delivers the core revenue-generating functionality of the application.

### Story 2.1: Availability Calendar Display

**As a potential guest,**  
**I want to see an interactive calendar showing available and booked dates for an apartment,**  
**so that I can quickly identify when I can make a reservation.**

#### Acceptance Criteria

1. Calendar component integrated (React Big Calendar or FullCalendar.js) on apartment detail page
2. API endpoint created at `GET /api/availability/:apartmentId` returning booked date ranges
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

---

### Story 2.2: Dynamic Pricing Calculation

**As a potential guest,**  
**I want to see the total price for my selected dates including any seasonal rates,**  
**so that I understand the exact cost before booking.**

#### Acceptance Criteria

1. API endpoint created at `GET /api/pricing/:apartmentId?start=YYYY-MM-DD&end=YYYY-MM-DD` returning price breakdown
2. Pricing calculation logic implemented considering seasonal pricing rules from PricingRule table
3. Base price used when no pricing rules match the date range
4. Price breakdown displayed showing: number of nights, price per night (with any seasonal variations noted), and total price
5. Price updates in real-time as user selects different dates on calendar
6. Currency formatted correctly (EUR/USD/RSD based on configuration)
7. Clear messaging if minimum stay requirements are not met
8. Price calculation accounts for overlapping pricing rules (most specific rule wins)
9. Loading state shown while calculating pricing
10. Error handling for invalid date ranges (end before start, etc.)
11. Price display prominent and easy to understand

---

### Story 2.3: Booking Request Form

**As a potential guest,**  
**I want to submit my booking request with my contact information,**  
**so that I can reserve the apartment for my selected dates.**

#### Acceptance Criteria

1. Booking form component created with React Hook Form integration
2. Form fields: firstName, lastName, email, phone, numberOfGuests, special requests/notes
3. Zod validation schema created for all form fields (email format, required fields, guest count limits)
4. Real-time form validation with helpful error messages
5. Number of guests validated against apartment maxGuests capacity
6. Selected dates and total price displayed as read-only summary in form
7. Terms and conditions checkbox (if applicable)
8. Submit button with loading state during submission
9. API endpoint created at `POST /api/bookings` to create booking
10. Double-booking prevention: API checks availability before creating booking
11. Booking created with 'pending' status by default
12. Unique confirmation code generated for each booking (e.g., 8-character alphanumeric)
13. Guest record created/updated in database
14. Form clears and shows success state after submission
15. Error handling for booking conflicts ("These dates are no longer available")
16. Rate limiting implemented (5 booking requests per 5 minutes per IP)

---

### Story 2.4: Email Confirmation System

**As a guest who just booked,**  
**I want to receive an instant email confirmation with my booking details,**  
**so that I have proof of my reservation and know what to expect.**

#### Acceptance Criteria

1. Email service configured (Resend API or Nodemailer with SMTP)
2. Email template created for booking confirmation (HTML + plain text versions)
3. Confirmation email includes: apartment name, guest name, check-in/check-out dates, number of guests, total price, confirmation code, and owner contact information
4. Email sent immediately after successful booking creation
5. Email sending integrated into booking creation API endpoint with error handling
6. Failed email sends logged but don't block booking creation
7. Retry mechanism for failed email sends (job queue or simple retry logic)
8. Email appears professional with proper formatting and branding
9. Test mode for email sending in development (logs to console or preview service)
10. "From" address configured appropriately (e.g., bookings@yourdomain.com)
11. Reply-to address set to owner's email for guest responses

---

### Story 2.5: Booking Confirmation Page & Lookup

**As a guest,**  
**I want to view my booking details after submission and be able to look them up later,**  
**so that I can reference my reservation anytime.**

#### Acceptance Criteria

1. Booking confirmation page created at `/bookings/confirmation/[confirmationCode]` showing complete booking details
2. Confirmation page displays: apartment name and photo, guest information, dates, total price, confirmation code, status, and owner contact
3. API endpoint created at `GET /api/bookings/:confirmationCode` to retrieve booking by code
4. Booking lookup form created (accessible from homepage or navigation) where guests enter confirmation code
5. Lookup redirects to confirmation page when valid code entered
6. Error message shown for invalid/non-existent confirmation codes
7. "Add to Calendar" functionality (download .ics file with booking dates)
8. Print-friendly styling for confirmation page
9. Share booking details via email option
10. Responsive design for viewing on mobile devices
11. Security: Only basic booking information exposed (no sensitive admin data)

---

### Story 2.6: Booking Cancellation

**As a guest,**  
**I want to cancel my booking if my plans change,**  
**so that I can free up the dates and inform the owner.**

#### Acceptance Criteria

1. Cancel button displayed on booking confirmation page
2. Cancellation confirmation dialog implemented (are you sure?)
3. API endpoint created at `PUT /api/bookings/:confirmationCode/cancel` to update booking status
4. Booking status updated to 'cancelled' in database
5. Cancelled bookings removed from availability calendar (dates become available again)
6. Cancellation confirmation email sent to guest
7. Cancellation notification email sent to owner/admin
8. Cancellation policy message displayed (if applicable)
9. Prevent cancellation if check-in date is too close (e.g., within 48 hours)
10. Visual indication on confirmation page when booking is cancelled
11. Error handling for already-cancelled bookings

---

## Epic 3: Admin Booking Management

**Expanded Goal:** Provide the property owner with a comprehensive admin interface to view all bookings in a searchable dashboard, manually create bookings for phone/email reservations, update booking details and status, and manage all aspects of the reservation system. This epic empowers the owner to have complete control over their booking operations.

### Story 3.1: Admin Dashboard Overview

**As a property owner,**  
**I want a dashboard showing today's check-ins/check-outs and recent booking activity,**  
**so that I can quickly see what's happening today and stay on top of my business.**

#### Acceptance Criteria

1. Admin dashboard page created at `/admin/dashboard` (protected by BetterAuth)
2. Today's check-ins displayed in a card with guest names, apartment, and time
3. Today's check-outs displayed in a separate card with guest names and apartment
4. Quick stats displayed: total bookings this month, revenue this month, upcoming bookings (next 7 days)
5. Recent bookings list (last 10) with status indicators
6. Quick action buttons: "Create Manual Booking", "View All Bookings", "Manage Pricing"
7. API endpoint created at `GET /api/admin/analytics/dashboard` returning dashboard data
8. Loading skeletons shown while fetching data
9. Empty states for when no check-ins/check-outs today
10. Responsive layout that works on tablet and mobile
11. Auto-refresh option or manual refresh button

---

### Story 3.2: Bookings List & Filtering

**As a property owner,**  
**I want to see all bookings with filtering and search capabilities,**  
**so that I can find specific reservations and manage them efficiently.**

#### Acceptance Criteria

1. Admin bookings page created at `/admin/bookings` with paginated table
2. Bookings table displays: confirmation code, guest name, apartment, dates, status, total price, and actions
3. Status badges with color coding (pending=yellow, confirmed=green, cancelled=red)
4. Filter options: status (all/pending/confirmed/cancelled), apartment, date range
5. Search functionality by guest name, email, or confirmation code
6. Sort functionality by date, price, or status
7. API endpoint created at `GET /api/admin/bookings` with query parameters for filtering
8. Pagination controls (10/25/50 per page options)
9. Row click opens booking detail view
10. Loading states and empty states ("No bookings found")
11. Export button visible (functionality in Epic 5)
12. Mobile-responsive table (card layout on mobile)

---

### Story 3.3: Manual Booking Creation

**As a property owner,**  
**I want to manually create bookings for phone/email reservations,**  
**so that I can enter offline bookings into the system.**

#### Acceptance Criteria

1. "Create Manual Booking" page created at `/admin/bookings/new`
2. Form includes: apartment selection, date range picker, guest information (first name, last name, email, phone), number of guests, notes field
3. Availability check performed when dates selected (prevents double-booking)
4. Price automatically calculated and displayed based on selected dates
5. Option to override calculated price (manual price adjustment field)
6. Status selection (pending/confirmed)
7. Form validation with Zod schema matching guest booking form
8. API endpoint uses existing `POST /api/bookings` with admin flag or separate admin endpoint
9. Confirmation code generated automatically
10. Success notification with link to view created booking
11. Option to send confirmation email to guest (checkbox)
12. Form clears after successful submission with option to create another
13. Error handling for booking conflicts

---

### Story 3.4: Booking Detail View & Updates

**As a property owner,**  
**I want to view complete booking details and update information as needed,**  
**so that I can modify reservations and add notes.**

#### Acceptance Criteria

1. Booking detail page created at `/admin/bookings/[id]` showing all booking information
2. All booking fields displayed: apartment, guest details, dates, price, status, confirmation code, notes, created date
3. Edit mode toggle allowing inline editing of: dates (with availability check), number of guests, price, notes
4. Status change buttons: "Mark as Confirmed", "Mark as Pending", "Cancel Booking"
5. API endpoint created at `PUT /api/admin/bookings/:id` to update booking
6. Status change confirmation dialogs for critical actions
7. Booking history/activity log showing changes (who changed what and when)
8. Success notifications for updates
9. Validation prevents invalid updates (e.g., can't reduce guest count below 1)
10. "Send Confirmation Email Again" button
11. "View Guest Profile" link to see all bookings by this guest
12. Delete booking option with strong confirmation (archive vs hard delete)

---

### Story 3.5: Booking Status Management

**As a property owner,**  
**I want to easily change booking statuses,**  
**so that I can track the booking lifecycle from pending to confirmed or cancelled.**

#### Acceptance Criteria

1. Status change functionality in booking detail page with clear visual feedback
2. API endpoint created at `PUT /api/admin/bookings/:id/status` for status updates
3. Status workflow logic: pending → confirmed, any status → cancelled
4. Automatic email notifications when status changes to confirmed
5. Cancelled bookings free up calendar availability immediately
6. Status history tracked in database (status changes with timestamps)
7. Bulk status update option from bookings list (select multiple, change status)
8. Confirmation dialogs for bulk operations
9. Toast notifications for successful status changes
10. Error handling for invalid status transitions
11. Filter persistence after status updates (don't lose filters)

---

### Story 3.6: Guest Management

**As a property owner,**  
**I want to view guest profiles and their booking history,**  
**so that I can recognize returning guests and provide better service.**

#### Acceptance Criteria

1. Guest list page created at `/admin/guests` showing all unique guests
2. Guest table displays: name, email, phone, total bookings, last booking date
3. Search functionality by name, email, or phone
4. Guest detail page at `/admin/guests/[id]` showing complete booking history
5. API endpoint created at `GET /api/admin/guests` and `GET /api/admin/guests/:id`
6. Guest profile shows: contact information, all bookings (past and future), total revenue generated, notes field
7. Quick action: "Create Booking for This Guest" (pre-fills guest info)
8. Edit guest contact information capability
9. Mark guests as VIP or add tags (optional enhancement)
10. Export guest contact list option
11. GDPR consideration: Option to anonymize/delete guest data upon request

---

## Epic 4: Pricing & Availability Management

**Expanded Goal:** Enable the property owner to configure flexible seasonal pricing rules for different periods (peak season, holidays, off-season), set minimum stay requirements, block dates for maintenance or personal use, and have complete control over apartment availability and revenue optimization strategies.

### Story 4.1: Pricing Rules List & Overview

**As a property owner,**  
**I want to see all pricing rules for my apartments,**  
**so that I can understand my current pricing strategy at a glance.**

#### Acceptance Criteria

1. Pricing management page created at `/admin/pricing` with list of all pricing rules
2. Rules displayed in a table: name, apartment, date range, price per night, minimum stay, status (active/inactive)
3. Filter by apartment and date range
4. Visual indicators for active vs upcoming vs expired rules
5. API endpoint created at `GET /api/admin/pricing` returning all pricing rules
6. Sort by date range, price, or apartment
7. Quick stats: active rules count, apartments with custom pricing
8. "Create New Rule" button prominently displayed
9. Calendar view option showing pricing visually across months
10. Warning indicators for date gaps with no pricing rules
11. Conflict detection display (overlapping rules for same apartment/dates)

---

### Story 4.2: Create Seasonal Pricing Rules

**As a property owner,**  
**I want to create seasonal pricing rules for specific date ranges,**  
**so that I can charge higher rates during peak season and offer discounts in off-season.**

#### Acceptance Criteria

1. "Create Pricing Rule" page created at `/admin/pricing/new`
2. Form fields: rule name, apartment selection, start date, end date, price per night, minimum stay duration (optional)
3. Date range picker with visual feedback
4. Validation: end date must be after start date, price must be positive
5. Preview of affected dates shown on calendar
6. Conflict detection: warn if rule overlaps with existing rules
7. API endpoint created at `POST /api/admin/pricing` to create rule
8. Option to duplicate rule to other apartment
9. Option to make rule recurring (e.g., every summer)
10. Success notification with link to view all rules
11. Form validation with Zod schema
12. Help text explaining minimum stay duration behavior

---

### Story 4.3: Edit & Delete Pricing Rules

**As a property owner,**  
**I want to modify or remove pricing rules,**  
**so that I can adjust my pricing strategy as market conditions change.**

#### Acceptance Criteria

1. Edit pricing rule page created at `/admin/pricing/[id]`
2. All rule fields editable with same validation as creation
3. API endpoint created at `PUT /api/admin/pricing/:id` to update rule
4. Warning shown if editing rule affects existing bookings
5. Delete functionality with confirmation dialog
6. API endpoint created at `DELETE /api/admin/pricing/:id`
7. Soft delete option (archive rule instead of hard delete)
8. Prevent deletion of rules with active bookings (show warning and booking count)
9. Bulk delete option from pricing list
10. Audit trail for rule changes (who changed what and when)
11. "Duplicate Rule" button to create similar rule quickly

---

### Story 4.4: Block Dates for Maintenance

**As a property owner,**  
**I want to block specific dates when apartments are unavailable,**  
**so that guests cannot book during maintenance or personal use periods.**

#### Acceptance Criteria

1. "Block Dates" functionality accessible from pricing management page
2. Calendar interface for selecting date ranges to block
3. Form fields: apartment, start date, end date, reason/notes
4. API endpoint created at `POST /api/admin/blocked-dates` or use special booking status
5. Blocked dates appear differently on admin calendar vs guest calendar
6. Guest-facing calendar shows dates as unavailable without revealing reason
7. Admin calendar shows reason/notes for blocked dates
8. Edit and remove blocked date ranges
9. Warning if trying to block dates with existing confirmed bookings
10. Bulk block functionality (e.g., block every Monday for entire year)
11. Export blocked dates list

---

### Story 4.5: Base Price Management

**As a property owner,**  
**I want to update the base price for each apartment,**  
**so that I have a default price when no seasonal rules apply.**

#### Acceptance Criteria

1. Apartment management page created at `/admin/apartments` listing both apartments
2. Each apartment card displays current base price prominently
3. Quick edit functionality for base price (inline editing)
4. API endpoint created at `PUT /api/admin/apartments/:id` to update apartment details
5. Form validation for price (positive number, reasonable range)
6. Price change confirmation dialog showing impact
7. Price history tracking (when base price was changed)
8. Success notification after update
9. Automatic recalculation of future booking prices if needed
10. Help text explaining relationship between base price and pricing rules

---

### Story 4.6: Pricing Calendar Visualization

**As a property owner,**  
**I want to see a visual calendar showing pricing for each day,**  
**so that I can easily identify pricing gaps or optimize my strategy.**

#### Acceptance Criteria

1. Calendar view page at `/admin/pricing/calendar` with monthly view
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

---

## Epic 5: Admin Dashboard & Analytics

**Expanded Goal:** Provide the property owner with comprehensive business intelligence including revenue analytics, occupancy rates, booking trends, and the ability to export data for accounting and tax purposes. This epic transforms raw booking data into actionable insights for business decision-making.

**Note:** This epic is optional for MVP and can be deferred to Phase 1.5 if timeline is constrained.

### Story 5.1: Revenue Analytics

**As a property owner,**  
**I want to see revenue reports by month, quarter, and year,**  
**so that I can track my business performance and identify trends.**

#### Acceptance Criteria

1. Analytics page created at `/admin/analytics` with revenue dashboard
2. Revenue summary cards: this month, last month, year-to-date, projected annual
3. Revenue chart (line or bar) showing monthly revenue for past 12 months
4. Revenue breakdown by apartment (which apartment generates more revenue)
5. API endpoint created at `GET /api/admin/analytics/revenue?period=month|quarter|year`
6. Date range selector for custom period analysis
7. Comparison to previous period (e.g., "15% increase from last month")
8. Revenue by booking status (confirmed vs pending vs cancelled)
9. Average booking value calculation
10. Export revenue data as CSV
11. Visual charts using lightweight library (Recharts or Chart.js)

---

### Story 5.2: Occupancy Rate Tracking

**As a property owner,**  
**I want to see occupancy rates for my apartments,**  
**so that I can understand utilization and optimize my pricing.**

#### Acceptance Criteria

1. Occupancy dashboard added to analytics page
2. Occupancy rate calculation: (booked nights / available nights) × 100
3. Current month occupancy displayed as percentage with visual gauge
4. Historical occupancy chart (past 12 months)
5. Occupancy comparison between both apartments
6. API endpoint created at `GET /api/admin/analytics/occupancy?period=month|quarter|year`
7. Peak vs off-season occupancy comparison
8. Days until next booking displayed
9. Average length of stay metric
10. Occupancy forecast for next 3 months based on current bookings
11. Export occupancy data

---

### Story 5.3: Booking Trends & Insights

**As a property owner,**  
**I want to see booking patterns and guest behavior insights,**  
**so that I can make informed business decisions.**

#### Acceptance Criteria

1. Insights section added to analytics page
2. Booking lead time analysis (how far in advance guests book)
3. Most popular booking months and seasons identified
4. Average guest count per booking
5. Booking source tracking (if applicable - direct bookings for now)
6. Cancellation rate calculation and trend
7. Returning guest percentage
8. Most requested apartment identification
9. Day-of-week booking patterns (which days get most bookings)
10. Visual representation with charts and metrics cards
11. Actionable recommendations based on data (e.g., "Consider raising prices for August")

---

### Story 5.4: Export Bookings for Accounting

**As a property owner,**  
**I want to export booking data in various formats,**  
**so that I can use it for accounting, taxes, and record-keeping.**

#### Acceptance Criteria

1. Export functionality accessible from bookings list page
2. API endpoint created at `GET /api/admin/export/bookings?format=csv|excel&start=YYYY-MM-DD&end=YYYY-MM-DD`
3. CSV export format with columns: confirmation code, apartment, guest name, check-in, check-out, nights, price, status, payment status, created date
4. Excel export option with formatted cells and totals
5. Date range filter for export
6. Status filter for export (only confirmed, all statuses, etc.)
7. Include/exclude cancelled bookings toggle
8. Email export file option (send to owner's email)
9. Export includes summary row with totals
10. File naming convention with date range (e.g., bookings-2025-01-01-to-2025-12-31.csv)
11. Loading state during export generation

---

### Story 5.5: Enhanced Dashboard Widgets

**As a property owner,**  
**I want customizable dashboard widgets showing key metrics,**  
**so that I can see the most important information immediately.**

#### Acceptance Criteria

1. Dashboard updated with widget system
2. Widget: Upcoming check-ins (next 7 days) with guest contact info
3. Widget: Pending bookings requiring confirmation with action buttons
4. Widget: Recent guest messages/inquiries (if messaging implemented)
5. Widget: Quick booking calendar showing next 30 days availability
6. Widget: Low occupancy alerts (if occupancy below threshold)
7. Widget: Revenue vs last month comparison
8. Widgets rearrangeable (drag and drop - optional enhancement)
9. Widget visibility toggles in settings
10. Mobile-optimized widget layout (stacked on small screens)
11. Real-time data updates or manual refresh option

---

### Story 5.6: Notification System

**As a property owner,**  
**I want to receive notifications for important events,**  
**so that I never miss a booking or important update.**

#### Acceptance Criteria

1. Notification center created accessible from admin header
2. Email notifications for: new bookings, booking cancellations, booking status changes
3. In-app notification list showing recent notifications (last 30 days)
4. Notification preferences page at `/admin/settings/notifications`
5. Toggle notifications on/off for each event type
6. Email notification templates created for each event type
7. API endpoint for marking notifications as read
8. Unread notification count badge on notification icon
9. Notification sound option (browser notification API)
10. Daily digest email option (summary of all activity)
11. Mobile push notifications (future enhancement placeholder)

---

## Next Steps

### Checklist Results Report

## PM CHECKLIST VALIDATION REPORT

**Overall PRD Completeness:** 92%  
**MVP Scope Appropriateness:** Just Right (with Epic 5 properly marked as optional)  
**Readiness for Architecture Phase:** ✅ **READY**

### Category Analysis

| Category                         | Status      | Critical Issues                                 |
| -------------------------------- | ----------- | ----------------------------------------------- |
| 1. Problem Definition & Context  | **PASS**    | None                                            |
| 2. MVP Scope Definition          | **PASS**    | None                                            |
| 3. User Experience Requirements  | **PASS**    | None                                            |
| 4. Functional Requirements       | **PASS**    | None                                            |
| 5. Non-Functional Requirements   | **PASS**    | None                                            |
| 6. Epic & Story Structure        | **PASS**    | None                                            |
| 7. Technical Guidance            | **PASS**    | None                                            |
| 8. Cross-Functional Requirements | **PARTIAL** | Minor: Data migration not detailed (acceptable) |
| 9. Clarity & Communication       | **PASS**    | None                                            |

### Key Strengths

- **Comprehensive Requirements:** 27 functional requirements (FR1-FR27) and 25 non-functional requirements (NFR1-NFR25) covering all aspects
- **Well-Structured Epics:** 5 epics with 30 stories, each appropriately sized for AI agent execution
- **Clear Technical Direction:** Complete tech stack specified (Next.js, Prisma, BetterAuth, Vercel) with rationale
- **Appropriate MVP Scope:** Core MVP (Epics 1-3), Extended MVP (Epic 4), Optional (Epic 5)
- **Comprehensive Acceptance Criteria:** Average 11-13 criteria per story ensuring testability
- **Based on Solid Foundation:** Built from comprehensive Project Brief with detailed user stories

### Issues by Priority

**BLOCKERS:** None ✅

**HIGH:** None

**MEDIUM:**

- Multi-language scope clarity: FR9 mentions multi-language support, but Phase 1 constraints specify "English only". This is acceptable as Phase 2 implementation is clearly documented in Technical Assumptions.

**LOW:**

- Data migration details could be more specific for SQLite→PostgreSQL transition, but acceptable for MVP phase
- Story prerequisites could be more explicit, but implicit dependencies are clear in epic sequencing

### MVP Scope Assessment

**✅ Appropriately Scoped**

- **Core MVP (Must Have):** Epics 1-3 deliver complete booking functionality
- **Extended MVP (Should Have):** Epic 4 adds critical pricing flexibility
- **Optional/Deferrable:** Epic 5 analytics properly marked as optional
- **No features recommended for removal:** All functionality serves core business goals
- **Timeline Realistic:** 30 stories sized for incremental AI agent execution

### Technical Readiness

**✅ READY FOR ARCHITECT**

- All technology choices explicit and justified
- Technical risks identified and mitigation planned (double-booking, concurrent bookings, performance)
- Decision framework clear for library choices (calendar, email, image storage)
- Comprehensive testing strategy defined
- Security approach multi-layered and complete

### Recommendations

**Optional Improvements:**

1. Consider promoting Story 5.4 (Export Bookings) from Epic 5 to Epic 3 if owner needs early accounting capabilities
2. FR9 could include inline note: "(Phase 2 - MVP English-only, UI structure supports future i18n)"

**For Architect:**

- Proceed with architecture design - PRD is comprehensive
- Make final decisions on library choices based on technical evaluation
- Design double-booking prevention with transaction isolation
- Plan database migration strategy for production readiness

**For UX Expert:**

- Create detailed wireframes for all Core Screens
- Design component library based on shadcn/ui + Radix UI
- Specify Framer Motion animation patterns
- Develop responsive behaviors for defined breakpoints

### Final Decision

## ✅ **READY FOR ARCHITECT**

The PRD is comprehensive, properly structured, and ready for architectural design. All critical aspects are covered with clear requirements, well-sequenced epics, and sufficient technical guidance.

### UX Expert Prompt

To proceed with creating the UX/UI architecture for this booking application, please review this PRD and create detailed wireframes, component specifications, and design system documentation that aligns with the goals, requirements, and user interface design goals outlined above.

### Architect Prompt

To proceed with creating the technical architecture for this booking application, please review this PRD and create a comprehensive architecture document including system design, API specifications, database design, component architecture, and technical implementation guidelines based on the requirements and technical assumptions outlined above.
