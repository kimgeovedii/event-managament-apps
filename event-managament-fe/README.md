# Event Management Platform - Frontend

Modern, responsive frontend application for the Event Management Platform, built with **Next.js (App Router)** and **TypeScript**.

## 🏗️ Architecture: Feature-Based Pattern

This project follows a **Feature-Based** directory structure to ensure modularity and scalability. Each major functionality is encapsulated within its own "feature" folder.

### 📁 Directory Layout

```text
src/
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         # Global Shared UI Components (Button, Modal, etc.)
├── hooks/              # Global Shared Custom Hooks
├── services/           # Global API Configuration (Axios Instance)
├── store/              # Global State Management (Zustand)
├── types/              # Global TypeScript Definitions
├── utils/              # Shared Helper Utilities (Cookie handling, Formatting)
└── features/           # Feature-Specific Modules
    └── [feature-name]/
        ├── components/ # Local UI components for this feature
        ├── hooks/      # Local hooks (e.g., useFetchTickets)
        ├── services/   # Local API calls (e.g., ticketService.ts)
        ├── store/      # Local Zustand stores
        └── types/      # Local TypeScript interfaces
```

---

## 🚀 Tech Stack & Libraries

We use a curated set of libraries to provide a premium user experience and maintainable codebase:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling & UI**: [Material UI (MUI)](https://mui.com/) + [Emotion](https://emotion.sh/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persistence)
- **Form Handling**: [Formik](https://formik.org/)
- **Validation**: [Yup](https://github.com/jquense/yup)
- **API Client**: [Axios](https://axios-http.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **Utilities**: [js-cookie](https://github.com/js-cookie/js-cookie)

---

## 🛠️ Development Guidelines

### 1. Feature Isolation

Keep feature-specific logic inside its respective `features/` folder. Only move things to global `src/components` or `src/hooks` if they are truly shared across three or more features.

### 2. Form Management

Always use **Formik** and **Yup** for forms. Validation schemas should be kept in the `types/` or a dedicated `schemas/` folder within the feature.

### 3. State Management

Use **Zustand** for state. For small, local UI state, use React `useState`. For state that needs to persist (like Auth), use Zustand's persist middleware.

### 4. API Requests

Always use the centralized `axiosInstance` from `src/services/` to ensure JWT tokens and base URLs are handled correctly.

---

## ⚙️ Setup & Installation

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
