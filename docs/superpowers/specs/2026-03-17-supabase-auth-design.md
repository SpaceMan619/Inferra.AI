# Supabase Auth — Design Spec
**Inferra AI · Sprint 4**
Date: 2026-03-17

---

## Overview

Wire up full authentication for Inferra AI using Supabase. The dashboard (`/dashboard`) becomes a gated product — unauthenticated users are redirected to login. Auth covers email/password, Google OAuth, and GitHub OAuth, with email confirmation, password reset, a profile page, and a branded confirmation email.

---

## Scope

| Area | Deliverable |
|---|---|
| Gating | Middleware redirect on `/dashboard/*`, reverse redirect from `/login` `/signup` |
| Login | Email/password + Google + GitHub, inline errors, loading state |
| Signup | Email/password + Google + GitHub, captures name/org/role, post-submit confirm state |
| Email confirmation | Supabase-triggered, custom branded HTML template |
| Forgot password | `/auth/forgot-password` — enter email → receive reset link |
| Reset password | `/auth/reset-password` — set new password after clicking link |
| Auth callback | `/auth/callback` — handles OAuth code exchange + email confirm + password reset |
| Auth error | `/auth/error` — on-brand error page for failed flows |
| Sidebar | User avatar initials + name + "Pro · Beta" bottom-left, logout, hover→profile |
| Profile page | `/dashboard/profile` — view + edit name/org/role, change password |

---

## Architecture

### New files

```
src/
├── lib/supabase/
│   ├── client.ts                    # createBrowserClient — used in "use client" components
│   └── server.ts                    # createServerClient — used in middleware + server components
├── middleware.ts                     # session refresh + route protection
├── app/auth/
│   ├── callback/route.ts            # OAuth + confirm + reset code exchange
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   └── error/page.tsx
└── app/dashboard/
    ├── layout.tsx                   # dashboard shell layout — wraps all /dashboard/* routes
    └── profile/page.tsx
```

### Modified files

```
src/app/dashboard/page.tsx           # move data loading logic into layout or keep as-is
src/app/login/page.tsx               # wire form + OAuth
src/app/signup/page.tsx              # wire form + OAuth
src/components/DashboardSidebar.tsx  # user info + logout, accepts user prop
.env.local                           # add Supabase vars
.env.example                         # document Supabase vars
```

---

## Data Model

No custom database tables. All user data lives in Supabase's built-in `auth.users` table.

| Field | Storage | Notes |
|---|---|---|
| `email` | `auth.users.email` | Read-only after creation |
| `name` | `user_metadata.name` | Editable on profile page |
| `org` | `user_metadata.org` | Editable on profile page |
| `role` | `user_metadata.role` | Editable on profile page |
| `plan` | Hardcoded `"Pro · Beta"` | No DB field needed, displayed as constant |

---

## Dashboard Layout

Create `src/app/dashboard/layout.tsx` — a server component that:
1. Calls the server Supabase client to get the current user
2. If no user → `redirect('/login')` (secondary protection layer alongside middleware)
3. Renders the shared dashboard chrome (sidebar) with user passed as prop
4. Renders `{children}` in the main content area

This makes `/dashboard/profile` automatically share the sidebar without any shell duplication.

The existing `dashboard/page.tsx` continues to load `countries.json` and render `<DashboardClient>` as before — it just becomes a child of the new layout.

---

## Middleware

`src/middleware.ts` runs on every request via Next.js edge runtime.

**Logic:**
1. Create server Supabase client with cookie adapter
2. Call `supabase.auth.getUser()` — **not** `getSession()` — to validate the JWT server-side. `getSession()` reads session data from cookies without validating the JWT signature, which is a security vulnerability.
3. If path starts with `/dashboard` and no user → `redirect('/login')`
4. If path is `/login` or `/signup` and user exists → `redirect('/dashboard')`
5. All other paths — pass through

**Matcher config:**
```ts
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}
```

---

## Auth Flows

### Email/password login
1. User submits form → `supabase.auth.signInWithPassword({ email, password })`
2. On error → show inline message (e.g. "Invalid email or password")
3. On success → `router.push('/dashboard')`

### Email/password signup
1. User submits form → `supabase.auth.signUp({ email, password, options: { data: { name, org, role } } })`
2. On success → switch form to "Check your email" confirmation state (no redirect yet)
3. User clicks email link → `/auth/callback?type=signup` → session set → `/dashboard`

### OAuth (Google / GitHub)
1. User clicks provider button → `supabase.auth.signInWithOAuth({ provider, options: { redirectTo: getURL('/auth/callback') } })`
   - `getURL()` is a helper that returns an absolute URL: `window.location.origin + path` (client) or `NEXT_PUBLIC_SITE_URL + path` (server). Supabase requires a fully-qualified URL — a bare relative path will fail.
2. Browser redirects to provider
3. Provider redirects to `/auth/callback?code=...`
4. Callback route exchanges code → session set → `redirect('/dashboard')`
5. On failure → `redirect('/auth/error?message=...')`

### Forgot password
1. User enters email → `supabase.auth.resetPasswordForEmail(email, { redirectTo: getURL('/auth/callback?next=/auth/reset-password') })`
   - `redirectTo` must be an absolute URL (same `getURL()` helper)
2. Form switches to "Reset link sent" confirmation state

### Reset password
1. Callback route detects `type=recovery` in URL params → exchanges code → sets session → redirects to `next` (`/auth/reset-password`)
2. User submits new password on `/auth/reset-password` → `supabase.auth.updateUser({ password })`
3. On success → `redirect('/dashboard')`

### Logout
1. Click logout in sidebar → `supabase.auth.signOut()`
2. `router.push('/login')`

---

## Auth Callback Route

`src/app/auth/callback/route.ts` — Next.js Route Handler (GET)

```
1. Read `code`, `next`, and `type` from search params
2. If code present → supabase.auth.exchangeCodeForSession(code)
3. If error → redirect('/auth/error?message=<message>')
4. Validate `next` param — must start with '/' and NOT start with '//'
   (prevents open redirect attacks where next=https://evil.com)
5. If `next` param is valid → redirect(next)
6. Default → redirect('/dashboard')
```

`type` param values from Supabase:
- `type=signup` — email confirmation flow
- `type=recovery` — password reset flow
- (absent) — OAuth flow

The `type` param is informational for logging/analytics. Routing logic uses the `next` param, not `type`.

---

## Supabase Client Utilities

### `src/lib/supabase/client.ts`
```ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

### `src/lib/supabase/server.ts`
Server client for use in middleware and server components. Uses the `@supabase/ssr` cookie adapter with `getAll` / `setAll` — the exact shape required by the library:

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

Middleware uses a different pattern — it receives `request` and mutates a `response` object so refreshed session cookies get written back:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export const createClient = (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  return { supabase, supabaseResponse }
}
```

The middleware must return `supabaseResponse` (not a new `NextResponse`) so session cookies are preserved.

---

## UI States

### Login page
- Default: form + OAuth buttons
- Loading: submit button shows spinner, disabled
- Error: red inline message below submit ("Invalid email or password" / "User not found")

### Signup page
- Default: form + OAuth buttons
- Loading: submit button shows spinner, disabled
- Error: inline message ("Email already in use" / "Password must be at least 8 characters")
- Success: form replaced with confirmation panel ("Check your inbox — we sent a link to {email}")
- **Password strength meter** — appears below password field as user types. Thin bar, 4 tiers: Weak (red) / Fair (orange) / Good (yellow) / Strong (green). Driven by a pure `getPasswordStrength(password)` function checking: length ≥ 8, has uppercase, has lowercase, has number, has special character (e.g. @!#$%). No external library. Label text updates with tier name.

### Forgot password page
- Default: email input + submit
- Success: "Reset link sent to {email}"

### Reset password page
- Default: new password + confirm password inputs
- Validation: passwords must match, min 8 characters (matches signup UI hint and Supabase dashboard setting — configure minimum password length to 8 in Supabase Auth → Settings)
- Success: redirect to `/dashboard`

### Auth error page
- Shows error message from `?message=` URL param
- Fallback: "Something went wrong. Please try again."
- Link back to `/login`

---

## Sidebar User Display

`DashboardSidebar` receives a `user` prop (type `User` from `@supabase/supabase-js`) passed down from `dashboard/layout.tsx`.

Bottom-left of sidebar:
```
[RJ]  Rajveer Singh Jolly     ← from user.user_metadata.name
      Pro · Beta              ← hardcoded
```

- Avatar: 2-letter initials in a small circle, colour derived from name hash
- Name truncated if long (`max-w` + `truncate`)
- Entire row has hover effect → `router.push('/dashboard/profile')`
- Logout icon/button to the right of the row, calls `supabase.auth.signOut()` then `router.push('/login')`

---

## Profile Page

Route: `/dashboard/profile` — child of `dashboard/layout.tsx`, shares the sidebar automatically.

**Sections:**
1. **Identity** — large avatar initials, name (h1), email (read-only, small), member since date
2. **Edit profile** — name, org, role fields with Save button → `supabase.auth.updateUser({ data: { name, org, role } })`
3. **Change password** — new password + confirm password → `supabase.auth.updateUser({ password })` — min 8 chars, must match. Same password strength meter as signup (reuse `getPasswordStrength()` helper).

Design: dark dashboard aesthetic matching the existing sidebar/panel style.

---

## Email Template

Custom HTML for Supabase's "Confirm signup" email. Design language:
- Background: `#0d1a14` (dark green-black)
- Accent: `#cef79e` (Inferra green)
- Font: system sans-serif stack
- Content: brief, minimal — "Confirm your Inferra AI account" + CTA button + footer

Template goes in: Supabase Dashboard → Authentication → Email Templates → Confirm signup.

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://wyutexcnrnbbytyxervw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-dashboard>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=<existing>
```

```bash
# .env.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

---

## Supabase Dashboard Configuration (manual steps)

1. **Site URL**: `http://localhost:3000` (dev) / production URL when deployed
2. **Redirect URLs**: add `http://localhost:3000/auth/callback`
3. **Email confirmation**: Auth → Settings → enable "Confirm email"
4. **Password minimum length**: Auth → Settings → set minimum password length to 8
5. **Email template**: Auth → Email Templates → Confirm signup → paste custom HTML
6. **Google provider**: Auth → Providers → Google → add Client ID + Secret
7. **GitHub provider**: Auth → Providers → GitHub → add Client ID + Secret

---

## Security Notes

- Session stored in HTTP-only cookies via `@supabase/ssr` — not accessible to JavaScript
- PKCE flow used for all OAuth exchanges — intercepted codes are useless without the verifier
- Token refresh handled automatically by middleware on every request
- **`getUser()` used in middleware, not `getSession()`** — `getSession()` reads cookie data without validating the JWT signature server-side, which would allow a crafted cookie to bypass auth checks
- **`next` param validated in callback** — must start with `/` and not `//`, preventing open redirect attacks (e.g. `?next=https://evil.com`)
- `redirectTo` in OAuth + password reset uses absolute URLs via `getURL()` helper — Supabase rejects relative paths
- Redirect URLs whitelisted in Supabase + OAuth provider consoles
- Anon key is safe to expose client-side (designed for this use case)
- Service role key is never used or needed in this implementation

---

## Out of Scope (this sprint)

- Email change (requires re-confirmation, complex — post-MVP)
- Avatar image upload (post-MVP)
- Delete account (post-MVP)
- Custom SMTP / branded sender domain (add Resend later)
- Multi-session management
