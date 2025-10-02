# Story 2.5: Booking Confirmation Page & Lookup

## Status

**Ready for Development**

## Story

**As a** guest,  
**I want** to view my booking details after submission and be able to look them up later,  
**so that** I can reference my reservation anytime.

## Epic

Epic 2: Guest Booking Experience

## Acceptance Criteria

1. Booking confirmation page created at /bookings/confirmation/[confirmationCode] showing complete booking details
2. Confirmation page displays: apartment name and photo, guest information, dates, total price, confirmation code, status, and owner contact
3. API endpoint created at GET /api/bookings/:confirmationCode to retrieve booking by code
4. Booking lookup form created (accessible from homepage or navigation) where guests enter confirmation code
5. Lookup redirects to confirmation page when valid code entered
6. Error message shown for invalid/non-existent confirmation codes
7. "Add to Calendar" functionality (download .ics file with booking dates)
8. Print-friendly styling for confirmation page
9. Share booking details via email option
10. Responsive design for viewing on mobile devices
11. Security: Only basic booking information exposed (no sensitive admin data)
12. Confirmation codes generated using cryptographically secure method (UUID v4 or similar)
13. Rate limiting implemented for lookup API (5 attempts per minute per IP address)
14. Input validation and sanitization for all confirmation code inputs
15. Audit logging for all booking lookup attempts (successful and failed)
16. Abuse prevention for share functionality (rate limiting, content filtering)
17. Data exposure limits strictly enforced (no payment info, admin notes, or sensitive personal data)

## Testing

### Unit Tests

- Confirmation page rendering with various booking data
- Confirmation code validation and sanitization
- API response formatting and data filtering
- Calendar file (.ics) generation and validation

### Integration Tests

- Booking lookup API integration
- Confirmation page data loading
- Email sharing functionality
- Mobile responsiveness across devices

### End-to-End Tests

- Complete user journey: booking creation → confirmation page → lookup functionality
- Cross-browser compatibility testing
- Print functionality testing
- Calendar integration testing

### Security Tests

- Confirmation code enumeration prevention
- Rate limiting enforcement for lookup API
- Data exposure validation (no sensitive data leaked)
- Input validation and sanitization testing
- XSS prevention in confirmation page

### Performance Tests

- Confirmation page loading performance
- API response times under load
- Mobile performance optimization

## Dependencies

- Story 2.3 (Booking Request Form)
- Story 2.4 (Email Confirmation)

## Tasks / Subtasks

- [ ] Create booking confirmation page (AC: 1, 2, 10)
  - [ ] Create app/(guest)/bookings/confirmation/[confirmationCode]/page.tsx
  - [ ] Fetch booking data using confirmation code
  - [ ] Display apartment name and primary photo
  - [ ] Show complete guest information
  - [ ] Display booking dates (check-in, check-out, nights)
  - [ ] Show total price with breakdown
  - [ ] Display confirmation code prominently
  - [ ] Show booking status badge
  - [ ] Add owner contact information
  - [ ] Implement responsive design for mobile

- [ ] Create booking lookup API endpoint (AC: 3, 11, 13, 14, 15)
  - [ ] Create app/api/bookings/[confirmationCode]/route.ts
  - [ ] Implement GET handler for booking retrieval
  - [ ] Add input validation and sanitization for confirmation code
  - [ ] Filter response data (exclude admin notes, payment info, sensitive data)
  - [ ] Add rate limiting (5 attempts per minute per IP)
  - [ ] Implement audit logging for all lookup attempts
  - [ ] Add error handling for invalid codes
  - [ ] Return 404 for non-existent bookings

- [ ] Implement booking lookup form (AC: 4, 5, 6)
  - [ ] Create components/booking/booking-lookup-form.tsx
  - [ ] Add confirmation code input field
  - [ ] Implement form validation
  - [ ] Add submit button with loading state
  - [ ] Redirect to confirmation page on success
  - [ ] Display error for invalid codes
  - [ ] Add link in header/homepage

- [ ] Add "Add to Calendar" functionality (AC: 7)
  - [ ] Install ics library: `pnpm add ics`
  - [ ] Create lib/utils/calendar.ts
  - [ ] Implement ICS file generation with booking dates
  - [ ] Add "Add to Calendar" button on confirmation page
  - [ ] Generate download with proper filename
  - [ ] Test with various calendar apps (Google, Outlook, Apple)

- [ ] Implement print and share features (AC: 8, 9, 16)
  - [ ] Add print-specific CSS styles
  - [ ] Create print button that triggers window.print()
  - [ ] Implement "Share via Email" functionality
  - [ ] Add rate limiting for share functionality (prevent abuse)
  - [ ] Add content filtering for shared emails
  - [ ] Test print layout across browsers

- [ ] Implement security measures (AC: 12, 13, 14, 15, 17)
  - [ ] Generate confirmation codes using UUID v4: `pnpm add uuid`
  - [ ] Update booking creation to use cryptographically secure codes
  - [ ] Implement rate limiting middleware for lookup API
  - [ ] Add input sanitization using zod validation
  - [ ] Implement audit logging with structured logging
  - [ ] Add CSP headers to prevent XSS
  - [ ] Define and enforce data exposure policy (no admin data, payment info)
  - [ ] Add abuse monitoring for lookup attempts

## Dev Notes

**Security Implementation:**

- Use `uuid` library for confirmation code generation (UUID v4)
- Implement rate limiting using Redis or similar with sliding window
- Use input validation libraries like `joi` or `zod` for confirmation code validation
- Implement audit logging using structured logging (e.g., Winston)
- Use CSP headers to prevent XSS attacks

**Data Exposure Controls:**

- Define strict data exposure policy in database schema
- Implement field-level access controls in API responses
- Use DTOs (Data Transfer Objects) to control exposed data
- Regular security audits of exposed data

## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

### Code Quality Assessment

Story 2.5 defines a comprehensive booking confirmation and lookup system with good user experience considerations. The requirements cover all essential functionality including mobile responsiveness, print styling, and calendar integration. However, critical security vulnerabilities around confirmation code generation and data exposure need immediate attention before implementation.

### Refactoring Performed

No code refactoring performed - story is in draft status.

### Compliance Check

- Coding Standards: ✓ (N/A - story definition phase)
- Project Structure: ✓ (Follows established story format)
- Testing Strategy: ✗ (Missing specific test requirements)
- All ACs Met: ✓ (All acceptance criteria are well-defined)

### Improvements Checklist

- [x] Analyzed requirements traceability with Given-When-Then patterns
- [x] Identified critical security vulnerabilities (confirmation code enumeration, data exposure)
- [x] Assessed API security gaps (rate limiting, input validation)
- [x] Evaluated user experience and accessibility requirements
- [ ] Add confirmation code security requirements (cryptographically secure generation)
- [ ] Define rate limiting requirements for lookup API
- [ ] Specify input validation requirements for confirmation codes
- [ ] Add error handling requirements for API failures
- [ ] Define abuse prevention for share functionality
- [ ] Add comprehensive test scenarios for security and functionality

### Security Review

**Critical Security Concerns:**

- Confirmation code enumeration vulnerability - no security requirements specified
- Missing rate limiting on lookup API could enable brute force attacks
- No input validation specified for confirmation codes
- Share functionality could be abused for information harvesting
- Data exposure risk through confirmation page access

**Recommendations:**

- Use cryptographically secure confirmation code generation (UUID v4 or similar)
- Implement rate limiting on lookup API (e.g., 5 attempts per minute per IP)
- Add comprehensive input validation for confirmation codes
- Implement abuse prevention for share functionality
- Define data exposure limits (no sensitive admin data)

### Performance Considerations

**Positive Aspects:**

- Simple API endpoint design for good performance
- Static confirmation page structure
- Standard REST API pattern

**Recommendations:**

- Consider caching for frequently accessed confirmation pages
- Optimize .ics file generation performance
- Implement efficient database queries for booking lookup

### Files Modified During Review

No files modified - story is in draft status.

### Gate Status

Gate: CONCERNS → docs/qa/gates/2.5-booking-confirmation-page.yml
Risk profile: docs/qa/assessments/2.5-booking-confirmation-page-risk-20250112.md
NFR assessment: docs/qa/assessments/2.5-booking-confirmation-page-nfr-20250112.md

### Recommended Status

✅ **Ready for Implementation** - All critical security vulnerabilities addressed with comprehensive tasks and security measures.

**Status Changed:** CONCERNS → READY (all AC 12-17 implemented in tasks)

## Change Log

| Date       | Version | Description                                            | Author     |
| ---------- | ------- | ------------------------------------------------------ | ---------- |
| 2025-10-02 | 1.0     | Story created from PRD                                 | Sarah (PO) |
| 2025-01-12 | 1.1     | QA review completed                                    | Quinn (QA) |
| 2025-10-02 | 2.0     | Added tasks, resolved all security concerns (AC 12-17) | Sarah (PO) |
