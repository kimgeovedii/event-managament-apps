# Event Management Platform Backend

Backend API for a robust Event Management Platform, built using **Express.js**, **TypeScript**, and **Prisma ORM**. The project is designed with a **Feature-Based** and **Class-Based** architecture to ensure scalability and maintainability.

## 🏗️ Architecture: Feature-Based & Class-Based

The project is organized into modular features. Each feature is self-contained and follows a standard internal structure:

### 📁 Feature Folder Structure

Every feature in `src/features/` follows this layout:

- **`controllers/`**: Handles HTTP requests, input validation (Zod), and sends responses.
- **`services/`**: Contains the core business logic. It acts as a bridge between Controllers and Repositories.
- **`repositories/`**: Handles all Database (Prisma) operations.
- **`router.ts`**: Defines the HTTP routes and maps them to Controller methods.

### 📁 Project Root Structure

```text
src/
├── app.ts               # App class (registers middlewares & feature routers)
├── index.ts             # Entry point (Server instantiation)
├── infrastructure/      # Shared infra (Prisma Service, Logger)
├── middlewares/         # Shared middlewares (AuthGuard, RBAC, ErrorHandler)
├── utils/               # Shared utility functions (JWT, Bcrypt, Multer)
└── features/            # Feature modules
```

---

## 🚀 Implemented Features

According to the project plan, the following feature modules have been scaffolded:

### 1. **Auth** (`features/auth`)

- **Logic**: JWT-based authentication.
- **Key Methods**: `register`, `login`, `logout`, `refreshToken`.

### 2. **Users** (`features/users`)

- **Logic**: Profile management and loyalty systems.
- **Marketplace Features**: 10k Referral points logic, Point history, and active Vouchers.
- **Operations**: Full CRUD for user profiles.

### 3. **Organizations** (`features/organizations`)

- **Logic**: Organizer management.
- **Features**: Multi-member teams, roles (Admin/Member), and organization profiles.
- **Operations**: CRUD for organizations and team member management.

### 4. **Tickets** (`features/tickets`)

- **Logic**: Event and Ticket discovery/management.
- **Features**: Inventory allotments (prevents overselling), Categories, and Meta-data.
- **Operations**: Full CRUD for tickets/events.

### 5. **Orders** (`features/orders`)

- **Logic**: Transaction and Order processing.
- **Features**: Invoice generation (Transaction + TransactionItems), status tracking.
- **Operations**: Order placement, payment processing, and retrieval.

### 6. **Promotions** (`features/promotions`)

- **Logic**: Discounts and Vouchers.
- **Features**: Ticket-specific promotions, validation logic.
- **Operations**: Full CRUD for vouchers and promotions.

### 7. **Reviews** (`features/reviews`)

- **Logic**: Feedback system.
- **Features**: User ratings and comments for events/tickets.
- **Operations**: Full CRUD for reviews.

### 8. **Dashboard** (`features/dashboard`)

- **Logic**: Analytics for Organizers.
- **Features**: Financial reports, attendee statistics, and event performance.

---

## 🛠️ Development Guidelines

### 1. Class-Based Pattern

Classes are used for Controllers, Services, and Repositories.

```typescript
// Example Pattern
export class FeatureController {
  constructor(private featureService: FeatureService) {}
  public async create(req: Request, res: Response) { ... }
}
```

### 2. Dependency Injection

Prefer passing dependencies through constructors rather than global instances to make testing easier.

### 3. Layered Responsibility

- **Controller**: Validate -> Call Service -> Respond.
- **Service**: Business Logic -> Call Repository.
- **Repository**: Prisma Query -> Return Data.

---

## ⚙️ Setup & Installation

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment**:
   Update `.env` with your `DATABASE_URL` (Neon DB/PostgreSQL) and `JWT_SECRET`.

3. **Database Migration**:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run Server**:
   - Dev: `npm run dev` (uses `tsx watch` for hot-reloading)
   - Test: `npm test`
   - Build: `npm run build`
