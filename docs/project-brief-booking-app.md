# Project Brief - Booking App for Two Apartments

## Overview

The project is to design and build a booking application for a private house with two apartments. The goal is to enable direct reservations (without third-party platforms), provide an intuitive booking experience for guests, and offer a simple yet powerful admin panel for the owner.

## Objectives

- Enable direct reservations via a modern web/mobile application
- Display clear availability for both apartments with a dynamic calendar
- Provide management tools for the owner (manual bookings, pricing, calendar updates)
- Offer a professional property presentation with images, descriptions, and seasonal rates
- Build a scalable solution ready for integrations with external booking platforms

## Core Features

### Guest Side

- Apartment details (photos, amenities, descriptions)
- Availability calendar for each apartment
- Reservation form with email/SMS confirmation
- Multi-language support (Serbian, English, German)

### Admin Side

- Dashboard for managing bookings
- Manual booking entry (offline/phone)
- Apartment details & pricing management
- Seasonal pricing and discounts
- Export bookings (CSV/Excel)

## User Stories

### Guest User Stories

**As a potential guest, I want to:**

- Browse apartment photos and amenities so I can make an informed decision
- Check real-time availability for my desired dates so I know if I can book
- See transparent pricing (no hidden fees) so I can budget accurately
- Book directly without third-party commissions so I save money
- Receive instant confirmation via email so I have proof of my reservation
- Contact the owner directly for special requests so I can customize my stay
- View my booking details anytime so I can reference my reservation

**As a returning guest, I want to:**

- Quickly find my previous booking information so I can reference it
- Book the same apartment again easily so I can return to a place I liked
- Receive notifications about special offers so I can get better deals

### Admin User Stories

**As the property owner, I want to:**

- View all bookings in a clear dashboard so I can manage my schedule
- Add manual bookings (phone/email) so I don't lose any reservations
- Update apartment details and photos so I can keep information current
- Set seasonal pricing rules so I can maximize revenue
- Block dates for maintenance so guests can't book unavailable periods
- Export booking data so I can do accounting and analysis
- Receive notifications for new bookings so I can respond quickly
- Manage guest communication so I can provide excellent service

**As a busy owner, I want to:**

- Quickly see today's check-ins/check-outs so I can prepare
- Bulk update pricing for multiple dates so I can manage seasons efficiently
- Duplicate successful pricing rules so I can apply them to future periods

## Database Schema

### 1. Apartment Table

- id (Primary Key)
- name (Text)
- description (Text)
- maxGuests (Number)
- basePricePerNight (Number)
- photos (JSON/Text Array)

### 2. Guest Table

- id (Primary Key)
- firstName (Text)
- lastName (Text)
- email (Text)
- phone (Text)

### 3. Booking Table

- id (Primary Key)
- apartmentId (Foreign Key)
- guestId (Foreign Key)
- startDate (Date)
- endDate (Date)
- numberOfGuests (Number)
- totalPrice (Number)
- status (Enum: 'pending', 'confirmed', 'cancelled')
- notes (Text)

### 4. PricingRule Table

- id (Primary Key)
- apartmentId (Foreign Key)
- name (Text)
- startDate (Date)
- endDate (Date)
- pricePerNight (Number)
- minStayDuration (Number, optional)

## Technology Stack

### Frontend

- Framework: Next.js (App Router, SSR/SSG)
- UI: TailwindCSS + shadcn/ui (component system built on Radix UI)
- Icons: lucide-react
- Forms & Validation: React Hook Form + Zod
- Animations: Framer Motion (fluid UI animations and transitions)
- Calendar UI: FullCalendar.js or React Big Calendar
- Multi-language: next-intl or i18next

### Backend

- API: Next.js API Routes (or Express if separated)
- ORM: Prisma
- Authentication: NextAuth (for future multi-user scenarios)
- File storage (images): Cloudinary or UploadThing
- Email/SMS notifications: Resend API, Nodemailer, or Twilio

### Database

- MVP: SQLite for simplicity
- Production: PostgreSQL (Supabase, Neon, or Railway)

### Hosting & DevOps

- App Hosting: Vercel
- Database Hosting: Supabase / Neon / Railway
- CI/CD: GitHub Actions
- Monitoring: Sentry or Logtail

## Development Roadmap

### Phase 1 – MVP (2-3 weeks)

- Guest side with apartment details + calendar
- Booking form with confirmations
- Admin panel for manual bookings

### Phase 2 – Advanced (1-2 months)

- Online payments (Stripe, PayPal)
- Multi-language support
- Seasonal pricing and export options

### Phase 3 – Premium (3+ months)

- Integration with Airbnb/Booking.com
- PWA deployment
- Guest reviews and chatbot integration

## Wireframes Completed

- Homepage with apartment showcase
- Booking page with calendar and form
- Admin dashboard with overview
- Admin bookings management
- Mobile responsive design

## Success Metrics

- Direct bookings increase (target: 50% of total)
- Positive guest feedback on usability
- Simplified reservation management for the owner
- Reduced dependence on third-party platforms

## API Endpoints

### Public Endpoints (Guest Access)

**Apartments:**

- `GET /api/apartments` - List all apartments with basic info
- `GET /api/apartments/:id` - Get detailed apartment information
- `GET /api/apartments/:id/photos` - Get apartment photo gallery

**Availability:**

- `GET /api/availability/:apartmentId` - Check availability for specific apartment
- `GET /api/availability/:apartmentId?start=2024-06-15&end=2024-06-20` - Check specific date range
- `GET /api/pricing/:apartmentId?start=2024-06-15&end=2024-06-20` - Get pricing for date range

**Bookings:**

- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details (with confirmation code)
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Admin Endpoints (Protected)

**Bookings Management:**

- `GET /api/admin/bookings` - List all bookings with filters
- `GET /api/admin/bookings/:id` - Get detailed booking information
- `POST /api/admin/bookings` - Create manual booking
- `PUT /api/admin/bookings/:id` - Update booking details
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete booking

**Apartments Management:**

- `GET /api/admin/apartments` - List all apartments
- `PUT /api/admin/apartments/:id` - Update apartment details
- `POST /api/admin/apartments/:id/photos` - Upload apartment photos
- `DELETE /api/admin/apartments/:id/photos/:photoId` - Delete photo

**Pricing Management:**

- `GET /api/admin/pricing/:apartmentId` - Get pricing rules for apartment
- `POST /api/admin/pricing` - Create new pricing rule
- `PUT /api/admin/pricing/:id` - Update pricing rule
- `DELETE /api/admin/pricing/:id` - Delete pricing rule

**Analytics:**

- `GET /api/admin/analytics/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics/revenue?period=month` - Get revenue analytics
- `GET /api/admin/analytics/occupancy?period=month` - Get occupancy rates

**Export:**

- `GET /api/admin/export/bookings?format=csv&start=2024-01-01&end=2024-12-31` - Export bookings

## Enhanced Wireframes & States

### Error States

- **Booking conflicts** - "These dates are not available"
- **Form validation** - Real-time field validation with helpful messages
- **Network errors** - "Connection lost, please try again"
- **Payment failures** - Clear error messages with retry options

### Loading States

- **Calendar loading** - Skeleton placeholders while fetching availability
- **Form submission** - Loading spinner with "Processing your booking..."
- **Image gallery** - Progressive loading with blur-to-sharp transitions
- **Admin dashboard** - Skeleton cards while loading booking data

### Success States

- **Booking confirmation** - Clear success message with booking details
- **Email sent** - "Confirmation email sent to your inbox"
- **Admin actions** - Toast notifications for successful operations

### Mobile Breakpoints

- **320px** - Small phones (iPhone SE)
- **375px** - Standard phones (iPhone 12)
- **768px** - Tablets (iPad)
- **1024px** - Desktop

## Security & Performance

### Security Measures

- **Input validation** - Zod schemas for all API inputs
- **Rate limiting** - Prevent booking spam (5 requests/minute per IP)
- **CSRF protection** - Secure form submissions
- **SQL injection prevention** - Prisma ORM with parameterized queries
- **XSS protection** - Sanitized user inputs
- **File upload security** - Image validation and virus scanning

### Performance Optimizations

- **Image optimization** - Next.js Image component with WebP format
- **Database indexing** - Optimized queries for availability checks
- **Caching strategy** - Redis for frequently accessed data
- **CDN** - Vercel Edge Network for global performance
- **Lazy loading** - Components loaded on demand
- **Bundle optimization** - Code splitting and tree shaking

### Monitoring & Analytics

- **Error tracking** - Sentry for production error monitoring
- **Performance monitoring** - Core Web Vitals tracking
- **User analytics** - Privacy-friendly usage statistics
- **Uptime monitoring** - 99.9% availability target

## Testing Strategy

### Unit Tests

- **Component testing** - React Testing Library for UI components
- **API testing** - Jest for backend logic
- **Utility functions** - Date calculations, pricing logic
- **Form validation** - Zod schema testing

### Integration Tests

- **API endpoints** - Full request/response cycle testing
- **Database operations** - Prisma integration testing
- **Email notifications** - Mock email service testing
- **File uploads** - Image processing pipeline testing

### End-to-End Tests

- **Booking flow** - Complete guest booking journey
- **Admin operations** - CRUD operations for bookings
- **Mobile responsiveness** - Cross-device testing
- **Multi-language** - Language switching functionality

### Performance Tests

- **Load testing** - Multiple concurrent bookings
- **Database performance** - Query optimization validation
- **Image loading** - Large gallery performance
- **Mobile performance** - Core Web Vitals on mobile

## Next Steps

- Create detailed system architecture
- Set up development environment with testing framework
- Implement MVP with core booking functionality
- Deploy to staging environment for testing
- Begin user acceptance testing with real scenarios
