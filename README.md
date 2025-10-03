# Booking App

A modern apartment booking and management system built with Next.js 15, TypeScript, and TailwindCSS.

## Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript 5.9+ (strict mode)
- **Styling:** TailwindCSS 4.1+ with shadcn/ui
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Package Manager:** pnpm 10+
- **Database:** PostgreSQL with Prisma ORM (configured in Story 1.2)
- **Authentication:** BetterAuth with email/password (configured in Story 1.3)
- **Email:** Resend API (configured in Story 2.4)
- **Image Upload:** Cloudinary (configured in Story 1.5)
- **Code Quality:** ESLint, Prettier, Husky
- **Testing:** Jest, React Testing Library (configured in Story 1.6)

## Features

- 🏠 Apartment listings and management
- 📅 Real-time availability calendar
- 💰 Dynamic pricing rules
- 📧 Email confirmations
- 👤 User authentication
- 📊 Admin dashboard with analytics
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- PostgreSQL 14+

### Installation

1. Clone the repository:

\`\`\`bash
git clone <repository-url>
cd booking-app
\`\`\`

2. Install dependencies:

\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` and fill in your environment variables:

- \`DATABASE_URL\`: PostgreSQL connection string
- \`BETTER_AUTH_SECRET\`: Secret for BetterAuth (generate with \`openssl rand -base64 32\`)
- \`BETTER_AUTH_URL\`: Application URL (http://localhost:3000 for development)
- \`RESEND_API_KEY\`: API key for Resend email service
- \`CLOUDINARY_CLOUD_NAME\`, \`CLOUDINARY_API_KEY\`, \`CLOUDINARY_API_SECRET\`: Cloudinary credentials
- \`SENTRY_DSN\`: Sentry DSN for error tracking (optional)

4. Run database migrations (after Story 1.2):

\`\`\`bash
pnpm prisma migrate dev
\`\`\`

5. Start the development server:

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Credentials (Development Only)

After running migrations and creating the admin user (see below), use these credentials to log in:

- **Email:** admin@example.com
- **Password:** admin123
- **Login URL:** http://localhost:3000/admin/login

⚠️ **Important:** Change these credentials in production!

To create an admin user, start the dev server and run:

\`\`\`bash
pnpm create-admin
\`\`\`

## Development Commands

\`\`\`bash
pnpm dev # Start development server
pnpm build # Build for production
pnpm start # Start production server
pnpm lint # Run ESLint
pnpm lint:fix # Fix ESLint errors
pnpm format # Format code with Prettier
pnpm type-check # Run TypeScript type checking
pnpm create-admin # Create admin user via BetterAuth API
\`\`\`

## Project Structure

\`\`\`
booking-app/
├── app/ # Next.js 15 App Router
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── components/ # Reusable UI components
│ ├── ui/ # shadcn/ui components
│ ├── forms/ # Form components
│ ├── layouts/ # Layout components
│ ├── booking/ # Booking-specific components
│ ├── apartment/ # Apartment-specific components
│ ├── admin/ # Admin-specific components
│ └── common/ # Common utility components
├── lib/ # Utilities and business logic
│ ├── services/ # Service layer (API calls, business logic)
│ ├── middleware/ # API middleware
│ ├── validations/ # Zod schemas for validation
│ └── utils/ # General utility functions
├── types/ # TypeScript type definitions
├── prisma/ # Database schema and migrations
├── **tests**/ # Test files
│ ├── components/ # Component tests
│ ├── lib/ # Library tests
│ ├── integration/ # Integration tests
│ └── e2e/ # End-to-end tests
├── public/ # Static assets
└── docs/ # Project documentation
\`\`\`

## Coding Standards

### TypeScript

- Strict mode enabled
- No \`any\` types allowed
- Use interfaces over types for object structures
- Prefer functional components with TypeScript interfaces

### Naming Conventions

- **Components:** PascalCase (e.g., \`BookingCard\`)
- **Files:** kebab-case (e.g., \`booking-card.tsx\`)
- **Functions:** camelCase (e.g., \`handleSubmit\`)
- **Constants:** UPPER_SNAKE_CASE (e.g., \`MAX_GUESTS\`)
- **Boolean variables:** Prefix with verbs (e.g., \`isLoading\`, \`hasError\`)
- **Event handlers:** Prefix with \`handle\` (e.g., \`handleClick\`)
- **Custom hooks:** Prefix with \`use\` (e.g., \`useAuth\`)

### Code Style

- Use tabs for indentation
- Single quotes for strings
- No semicolons
- Trailing commas in ES5 style

## Environment Variables

See \`.env.example\` for all required environment variables.

### Required for Development

- \`DATABASE_URL\`: PostgreSQL connection string
- \`BETTER_AUTH_SECRET\`: BetterAuth secret
- \`BETTER_AUTH_URL\`: Application URL

### Optional for Development

- \`RESEND_API_KEY\`: Email service (required for email features)
- \`CLOUDINARY\_\*\`: Image upload (required for image features)
- \`SENTRY_DSN\`: Error tracking (optional)

## Deployment

### CI/CD Pipeline

This project uses GitHub Actions for continuous integration and Vercel for deployment.

#### GitHub Actions Workflow

The CI pipeline (`.github/workflows/ci.yml`) runs on every push and pull request:

- **Linting:** ESLint code quality checks
- **Type Checking:** TypeScript compilation validation
- **Testing:** Jest test suite execution
- **Build:** Production build verification
- **Database:** PostgreSQL service for integration tests

#### Vercel Deployment

**Automatic Deployments:**

- **Production:** Deploys automatically on push to `main` branch
- **Preview:** Creates preview deployments for pull requests
- **Framework:** Next.js (auto-detected)

**Environment Variables (Production):**

Configure these in your Vercel dashboard:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
BETTER_AUTH_SECRET=your-secure-secret-key
BETTER_AUTH_URL=https://your-domain.vercel.app

# Email Service
RESEND_API_KEY=your-resend-api-key

# Image Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Error Tracking
SENTRY_DSN=your-sentry-dsn

# Analytics
VERCEL_ANALYTICS_ID=your-analytics-id
```

### Deployment Steps

1. **Connect Repository:**

   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Link project
   vercel link
   ```

2. **Configure Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required variables for Production, Preview, and Development

3. **Deploy:**

   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

### Monitoring & Analytics

- **Error Tracking:** Sentry integration for production error monitoring
- **Performance:** Vercel Analytics for Web Vitals and performance metrics
- **Build Status:** GitHub Actions status badges in README

### Rollback Procedure

If deployment issues occur:

1. **Instant Rollback:** Use Vercel Dashboard → Deployments → Rollback
2. **Recovery Time:** < 5 minutes
3. **Trigger Conditions:** Error rate spike, critical bugs, performance degradation

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Contributing

1. Create a feature branch from \`main\`
2. Make your changes
3. Run linting and type checking: \`npm run lint && npm run type-check\`
4. Run tests: \`npm test\`
5. Commit your changes (pre-commit hooks will run automatically)
6. Push and create a pull request
7. CI pipeline will run automatically on the PR

## License

ISC
