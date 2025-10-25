# Ticklo — React Version Ticket Management System 

Ticklo is a robust ticket management web application. It delivers a seamless user experience, including a welcoming landing page, a secure authentication process, a high-level dashboard, and a full-featured screen for managing tickets (Create, View, Edit, Delete). This is the React Version.

## Key Features

- Mock authentication (localStorage): signup, login, logout
- Ticket CRUD (create, read, update, delete) persisted to localStorage
- Form validation using zod + react-hook-form
- Reusable Modal and Toast components
- Centered content with max width of 1440px

## Frameworks & Libraries Used

- React (functional components, hooks)
- TypeScript
- Vite (development + build)
- Tailwind CSS (utility-first styling)
- react-router (routing)
- react-hook-form (forms)
- zod (schema validation)
- react-icons (icons)

Dev / tooling

- ESLint (config present)
- TypeScript compiler (tsc)

## Quick Setup & Execution

Requirements: Node.js (recommended >= 16, use Node 18+ for best compatibility) and npm or yarn.

1. Install dependencies

```bash
npm install
# or
# yarn install
```

2. Run the app locally (dev server with HMR)

```bash
npm run dev
# or
# yarn dev
```

3. Build for production

```bash
npm run build
# or
# yarn build
```

4. Run a typecheck (optional but recommended before commits)

```bash
npx tsc --noEmit
```

Notes:

- The repository uses the standard Vite scripts in `package.json`. If you need a different Node version, use nvm or similar tools.

## Project Structure & Important Files

Top-level source folder: `src/`

- `src/main.tsx` — React app entry and router mounting
- `src/App.tsx` — global layout, centered content container, decorative backgrounds, auth listener
- `src/pages/` — page routes
  - `LandingPage.tsx` — public landing
  - `auth/Signup.tsx`, `auth/Login.tsx` — auth forms (zod + react-hook-form)
  - `Dashboard.tsx` — basic dashboard with ticket counts
  - `TicketsPage.tsx` — ticket list and CRUD UI
- `src/components/`
  - `Navbar.tsx` / `AppNavbar.tsx` — top navigation
  - `Footer.tsx` — global footer (content constrained to max-width)
  - `Hero.tsx` — landing hero with decorative visuals
  - `CreateTicket.tsx` — modal form used to create or edit tickets
  - `Modal.tsx` — reusable confirmation/modal component
  - `Toast.tsx` — toast provider + UI for success/error feedback
- `src/utils/`
  - `auth.ts` — mock auth utilities (signup/login/logout/getSession)
  - `tickets.ts` — mock tickets persistence (get/create/update/delete)
  - `utils.ts` — small helpers
- `src/types.ts` — shared zod schemas and TypeScript types

### State & Data Shape (short)

- Authentication/session
  - Stored in localStorage under `ticketapp_session` (single-session object). Use `getSession()` from `src/utils/auth.ts` to read.
  - `auth.ts` exposes `signup`, `login`, `logout`, and dispatches a `ticketapp_auth_changed` event so the app can react to login/logout.
- Users
  - Saved to localStorage key `mock_users` (array of user objects) by the mock auth utilities.
- Tickets
  - Persisted to localStorage key `mock_tickets`.
  - Ticket shape (example):
    - id: string
    - title: string
    - description: string
    - status: "open" | "in_progress" | "closed"
    - createdAt: string (ISO)

Global UI state

- Toasts are provided via a ToastContext (top-right stack). Use `useToast()` to show messages.
- The Modal component receives open/close and confirm/cancel callbacks and handles Escape/backdrop clicks.

## Accessibility Notes

- Keyboard navigation
  - Most interactive elements (buttons, inputs) are keyboard-focusable and use native buttons/inputs for consistent behavior.
- Modal
  - The Modal component handles Escape to close and backdrop clicks. It disables body scrolling while open.
  - Note: a focus-trap is not implemented yet (see known issues). We recommend adding focus-trap for full accessibility when opening modals.
- Forms
  - Labels and input associations exist in major forms (auth and ticket forms). Inline errors are exposed near inputs.

## Known Issues & Limitations

- Type-check and build: After large edits some TypeScript warnings or lint issues may appear; run `npx tsc --noEmit` and `npm run build` to verify locally.
- Modal focus trap: The modal does not currently implement a full focus-trap — keyboard focus may move outside the modal in complex scenarios. Consider adding `focus-trap-react` or similar.
- Dashboard ticket counts: Dashboard reads ticket data on mount. If tickets are modified elsewhere, the dashboard may not update live. Consider adding a shared store or subscription pattern to propagate changes.
- No automated tests: There are no unit or integration tests included. Adding tests (Vitest / Jest + React Testing Library) is recommended for production readiness.
- Seeded users: The app uses localStorage for users. If no test user exists, sign up using the Signup page.

## LocalStorage Keys (for debugging)

- `ticketapp_session` — current session (auth)
- `mock_users` — registered users
- `mock_tickets` — persisted tickets

## Example Test Credentials

These credentials are examples for quick testing. The mock backend uses localStorage, so these may not exist until you sign up with them.

- Email: `demo@ticklo.test`
- Password: `Password123!`

If the demo user doesn't exist, open the app and use the Signup form with the above credentials to create it.


Enjoy exploring Ticklo! 🚀
