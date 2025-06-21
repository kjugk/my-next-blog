# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting and formatting
npm run lint
npm run format:check
npm run format:fix

# Testing
npm test          # Run tests with Vitest
npm run test:ui   # Run tests with Vitest UI
```

## Project Architecture

This is a Next.js 15 blog application using the App Router with the following key technologies:

### Database & ORM
- **Prisma** with PostgreSQL for data persistence
- **Supabase** for authentication and additional backend services
- Database models: `Post` (with tags relation) and `Tag` (many-to-many with posts)

### Frontend Stack
- **Next.js 15** with App Router and React 19
- **TailwindCSS** for styling with custom components
- **Radix UI** components for accessible UI primitives
- **React Hook Form** with Zod validation for forms
- **Lucide React** for icons

### File Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── (public)/       # Public blog pages (posts, tags)
│   └── admin/          # Admin interface for post management
├── components/         # Shared UI components
│   ├── layout/        # Container and layout components
│   ├── navigation/    # Header and navigation
│   ├── typography/    # Typography components (with tests)
│   └── ui/           # Base UI components (shadcn/ui style)
├── features/          # Feature-based organization
│   ├── auth/         # Authentication (login/logout)
│   ├── post/         # Post CRUD operations and components
│   └── tag/          # Tag management
├── lib/              # Core utilities and clients
│   ├── prisma.ts     # Prisma client
│   └── supabase/     # Supabase client configurations
├── services/         # External service integrations
│   ├── cache/        # Next.js cache utilities
│   ├── markdown/     # Markdown processing with syntax highlighting
│   ├── ogp/          # OG image generation
│   └── s3/           # AWS S3 integration for image uploads
└── types/            # TypeScript type definitions
```

### Key Features
- **Markdown Editor**: Full-featured editor with image upload capability
- **Tagging System**: Many-to-many relationship between posts and tags
- **Authentication**: Supabase-based admin authentication
- **Image Management**: S3 integration for image uploads with OG image generation
- **Caching**: Next.js cache with revalidation tags for optimal performance
- **Server Actions**: Extensive use of Next.js server actions for data mutations

### Testing Setup
- **Vitest** as test runner with jsdom environment
- **Testing Library** for React component testing
- Test setup file at `test/setup.ts`
- Path alias `@/` points to `src/`

### Code Organization Principles
- Feature-based architecture in `src/features/`
- Server functions isolated in `serverFunctions/` subdirectories
- UI components follow atomic design principles
- Strict TypeScript with form validation using Zod schemas

### Authentication Flow
- Admin routes protected by Supabase middleware
- Session management handled automatically
- Login/logout actions in `src/features/auth/actions/`

### Performance Considerations
- Server-side caching with `unstable_cache` and cache tags
- Image optimization through Next.js and S3
- Turbopack for faster development builds
- Server actions for efficient data mutations

## Development Notes

When working with this codebase:
- Use existing patterns from `src/features/` for new functionality
- Follow the component structure in `src/components/ui/` for new UI elements
- Server functions should be co-located with their related components
- All forms should use React Hook Form with Zod validation
- Database operations should use the centralized Prisma client from `src/lib/prisma.ts`