# Event Management Platform Backend

Backend API for Event Management Platform built with Express.js, TypeScript, and Prisma ORM.

## Project Structure (Feature-Based & Class-Based)

The project follows a modular, feature-based architecture where each feature contains its own controllers, services, repositories, and routes. We use a **Class-Based** approach to maintain state and leverage dependency injection patterns.

```text
src/
├── app.ts               # App class (registers middlewares/routes)
├── index.ts             # Entry point (Server instantiation)
├── infrastructure/      # Shared infrastructure (Prisma client, Logger)
├── middlewares/         # Global middlewares (Auth, Error, RBAC)
└── features/
    ├── auth/            # Login, Registration, JWT handling
    ├── users/           # Profile, Points (10k referral), Vouchers
    ├── organizations/   # Organizer management, Team/Member roles
    ├── tickets/         # Ticket CRUD, Allotments (Inventory), Discovery
    ├── orders/          # Transaction flow, Invoices, Payment logic
    ├── promotions/      # Ticket-specific discounts
    ├── reviews/         # User ratings and reviews
    └── dashboard/       # Visualization data for Organizers
```

## Development Rules

### 1. Class-Based Architecture

- Controllers, Services, and Repositories MUST be implemented as classes.
- Use `constructor` for dependency injection (e.g., Service injecting Repository).

### 2. Layered Responsibilities

- **Controllers**: Handle HTTP requests/responses, input validation (using Zod), and calling Services.
- **Services**: Contain business logic. Do not interact directly with the database.
- **Repositories**: Handle all database interactions via Prisma.
- **Middlewares**: Handle cross-cutting concerns (Auth, Logging, Error handling).

### 3. Naming Conventions

- Classes: `PascalCase` (e.g., `AuthController`, `TicketService`).
- Methods/Variables: `camelCase`.
- Files: `kebab-case.ts` (e.g., `auth.controller.ts`).

### 4. Error Handling

- Use global error handling middleware.
- Throw custom error classes for better front-end error reporting.

### 5. SOLID Principles

- Aim for Single Responsibility Principle in each class.
- Favor composition over inheritance.

## Setup Guide

### 1. Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- npm or yarn

### 2. Installation

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
DATABASE_URL="postgresql://user:password@localhost:5432/event_management?schema=public"
JWT_SECRET="your_secret_key"
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Running the Application

- Development: `npm run dev`
- Build: `npm run build`
- Production: `npm start`
- Testing: `npm test`
