# Supabase Auth Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up full Supabase authentication — email/password + Google/GitHub OAuth, email confirmation, password reset, route gating, user profile page, and password strength meter.

**Architecture:** `@supabase/ssr` handles session storage in HTTP-only cookies. Next.js middleware gates `/dashboard/*` and refreshes tokens on every request. A new `dashboard/layout.tsx` wraps all dashboard routes so the sidebar and user context are shared automatically. Auth pages (login, signup) are fully built — they just need Supabase wired in.

**Tech Stack:** `@supabase/supabase-js`, `@supabase/ssr`, Next.js 16 App Router, TypeScript, Vitest (password utility only)

**Spec:** `docs/superpowers/specs/2026-03-17-supabase-auth-design.md`

**Do this step by step — one chunk at a time — to avoid hitting rate limits.**

---

## Chunk 1: Foundation — Packages, Env, Client Utilities, Middleware

### Task 1: Install packages and configure environment

**Files:**
- Modify: `.env.local`
- Create: `.env.example`

- [ ] **Step 1: Install Supabase packages**

```bash
cd /Users/pegasus/dev/inferraai
npm install @supabase/supabase-js @supabase/ssr
```

Expected output: packages added, no peer dependency errors.

- [ ] **Step 2: Add Supabase vars to `.env.local`**

Append to the existing `.env.local` (which already has `NEXT_PUBLIC_MAPBOX_TOKEN`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wyutexcnrnbbytyxervw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_M_yVyqQy1_cbqiwVFlJCTA_GTA8cTLZ
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 3: Create `.env.example`**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

- [ ] **Step 4: Verify dev server still starts**

```bash
npm run dev
```

Expected: compiles without errors, http://localhost:3000 loads.

- [ ] **Step 5: Commit**

```bash
git add .env.example package.json package-lock.json
git commit -m "feat: install @supabase/ssr and configure env"
```

---

### Task 2: Create Supabase client utilities

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`

- [ ] **Step 1: Create browser client**

Create `src/lib/supabase/client.ts`. Also includes the shared `getURL` helper used across all auth pages — centralised here so it's not duplicated in every page:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/**
 * Returns an absolute URL for use in Supabase redirectTo options.
 * Supabase rejects bare relative paths — always needs a full URL.
 */
export function getURL(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  return base.replace(/\/$/, "") + path;
}
```

- [ ] **Step 2: Create server client**

Create `src/lib/supabase/server.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — cookies are read-only.
            // Session refresh is handled by middleware instead.
          }
        },
      },
    }
  );
};
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors on the two new files.

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add Supabase browser and server client utilities"
```

---

### Task 3: Create middleware for auth gating

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware**

Create `src/middleware.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: use getUser(), NOT getSession() — getUser() validates the JWT
  // server-side. getSession() only reads cookie data without JWT verification.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Gate dashboard — unauthenticated → login
  if (pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Reverse redirect — authenticated users don't need auth pages
  if ((pathname === "/login" || pathname === "/signup") && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // IMPORTANT: return supabaseResponse (not a new NextResponse) to preserve
  // the Set-Cookie headers that refresh the session.
  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
```

- [ ] **Step 2: Verify middleware compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual smoke test**

```bash
npm run dev
```

Visit `http://localhost:3000/dashboard` — should redirect to `/login`. ✓
Visit `http://localhost:3000/login` — should load the login page. ✓

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add auth middleware — gate /dashboard, reverse redirect from /login /signup"
```

---

## Chunk 2: Auth Pages — Login, Signup, Callback

### Task 4: Create password strength utility (with unit tests)

**Files:**
- Create: `src/lib/passwordStrength.ts`
- Create: `src/lib/passwordStrength.test.ts`

This is the only pure utility in the sprint — worth testing properly.

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest
```

Add to `package.json` scripts:
```json
"test": "vitest run"
```

- [ ] **Step 2: Write the failing tests first**

Create `src/lib/passwordStrength.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { getPasswordStrength } from "./passwordStrength";

describe("getPasswordStrength", () => {
  it("returns 0 for empty string", () => {
    expect(getPasswordStrength("")).toBe(0);
  });

  it("returns 1 (Weak) for short lowercase only", () => {
    expect(getPasswordStrength("abc")).toBe(1);
  });

  it("returns 2 (Fair) for 8+ chars with mixed case", () => {
    expect(getPasswordStrength("Password")).toBe(2);
  });

  it("returns 3 (Good) for 8+ chars with mixed case + number", () => {
    expect(getPasswordStrength("Password1")).toBe(3);
  });

  it("returns 4 (Strong) for 8+ chars with mixed case + number + special", () => {
    expect(getPasswordStrength("Pinno@8772")).toBe(4);
  });

});
```

- [ ] **Step 3: Run tests to confirm they fail**

```bash
npm test
```

Expected: all 5 tests fail with "getPasswordStrength is not defined".

> Note: the test file has 5 `it()` blocks.

- [ ] **Step 4: Implement the utility**

Create `src/lib/passwordStrength.ts`:

```typescript
/**
 * Returns a strength score 0–4.
 * 0 = empty, 1 = Weak, 2 = Fair, 3 = Good, 4 = Strong
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Map 5-point scale to 4 tiers
  if (score <= 1) return 1; // Weak
  if (score === 2) return 2; // Fair
  if (score === 3) return 3; // Good
  return 4;                  // Strong
}

export const STRENGTH_CONFIG = [
  { label: "", color: "transparent", width: "0%" },
  { label: "Weak", color: "#ef4444", width: "25%" },
  { label: "Fair", color: "#f97316", width: "50%" },
  { label: "Good", color: "#eab308", width: "75%" },
  { label: "Strong", color: "#22c55e", width: "100%" },
] as const;
```

- [ ] **Step 5: Run tests — all should pass**

```bash
npm test
```

Expected: 5 tests pass. ✓

- [ ] **Step 6: Commit**

```bash
git add src/lib/passwordStrength.ts src/lib/passwordStrength.test.ts package.json package-lock.json
git commit -m "feat: add password strength utility with unit tests"
```

---

### Task 5: Wire the login page

**Files:**
- Modify: `src/app/login/page.tsx`

The UI is fully built. This task only adds: Supabase client import, form state (loading + error), submit handler, OAuth handlers.

- [ ] **Step 1: Replace the form's `onSubmit` and add handlers**

Full replacement of `src/app/login/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, getURL } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleOAuth(provider: "google" | "github") {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getURL("/auth/callback") },
    });
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Minimal navbar */}
        <header className="px-[clamp(20px,4vw,48px)] py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              iA
            </div>
            <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">
              Inferra AI
            </span>
          </Link>
          <p className="text-[13px] font-light text-white/40">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-white/70 font-normal hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-8">
              <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">
                Welcome back
              </h1>
              <p className="text-[14px] font-light text-white/45">
                Sign in to your infrastructure dashboard
              </p>
            </div>

            {/* Card */}
            <div
              className="rounded-2xl p-7"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* OAuth */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  {
                    label: "Google",
                    provider: "google" as const,
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub",
                    provider: "github" as const,
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => handleOAuth(btn.provider)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12.5px] font-normal text-white/60 transition-all duration-200 cursor-pointer hover:text-white/90"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                  >
                    {btn.icon}
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[11px] font-light uppercase tracking-wider text-white/25">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 font-normal text-white/80">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-normal text-white/80">
                      Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-[11px] text-white/60 hover:text-white/90 transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-[12px] text-red-400/90 leading-relaxed">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-[13px] font-normal text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Signing in…
                    </>
                  ) : "Sign in"}
                </button>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Manual test — wrong credentials**

```bash
npm run dev
```

Visit `http://localhost:3000/login`, submit with fake email/password.
Expected: red error message "Invalid login credentials" appears below button. ✓

- [ ] **Step 4: Commit**

```bash
git add src/app/login/page.tsx
git commit -m "feat: wire login page to Supabase — email/password + OAuth"
```

---

### Task 6: Wire the signup page (with password strength meter)

**Files:**
- Modify: `src/app/signup/page.tsx`

- [ ] **Step 1: Replace signup page with wired version**

Full replacement of `src/app/signup/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient, getURL } from "@/lib/supabase/client";
import { getPasswordStrength, STRENGTH_CONFIG } from "@/lib/passwordStrength";

const ROLES = [
  { value: "", label: "Select your role" },
  { value: "founder", label: "Founder / Builder" },
  { value: "investor", label: "Investor / VC" },
  { value: "policy", label: "Policy / Government" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "operator", label: "Cloud / DC Operator" },
  { value: "other", label: "Other" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const supabase = createClient();
  const strengthScore = getPasswordStrength(password);
  const strengthInfo = STRENGTH_CONFIG[strengthScore];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getURL("/auth/callback"),
        data: { name, org, role },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setConfirmed(true);
    setLoading(false);
  }

  async function handleOAuth(provider: "google" | "github") {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getURL("/auth/callback") },
    });
  }

  if (confirmed) {
    return (
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/auth-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px] text-center"
          >
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(206,247,158,0.15)", border: "1px solid rgba(206,247,158,0.3)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cef79e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-[1.4rem] font-medium tracking-[-0.03em] mb-2 text-white">Check your inbox</h2>
              <p className="text-[13px] font-light text-white/45 leading-relaxed">
                We sent a confirmation link to <span className="text-white/70">{email}</span>. Click it to activate your account.
              </p>
              <Link href="/login" className="mt-6 inline-block text-[12px] text-white/40 hover:text-white/70 transition-colors">
                Back to sign in →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-[clamp(20px,4vw,48px)] py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
              iA
            </div>
            <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">Inferra AI</span>
          </Link>
          <p className="text-[13px] font-light text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-white/70 font-normal hover:text-white transition-colors">Sign in</Link>
          </p>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[440px]"
          >
            <div className="mb-8">
              <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">Get early access</h1>
              <p className="text-[14px] font-light text-white/45">African AI infrastructure intelligence, built for builders</p>
            </div>

            <div className="rounded-2xl p-7" style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {/* OAuth */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  { label: "Google", provider: "google" as const, icon: (<svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>) },
                  { label: "GitHub", provider: "github" as const, icon: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>) },
                ].map((btn) => (
                  <button key={btn.label} type="button" onClick={() => handleOAuth(btn.provider)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12.5px] font-normal text-white/60 transition-all duration-200 cursor-pointer hover:text-white/90"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}>
                    {btn.icon} {btn.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[11px] font-light uppercase tracking-wider text-white/25">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required
                      className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Org</label>
                    <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company"
                      className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">I am a</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45 cursor-pointer appearance-none"
                    style={{
                      color: role ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.38)",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-opacity='0.3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                    }}>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value} disabled={r.value === ""} style={{ backgroundColor: "#1a2820", color: "white" }}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Work email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                  {/* Password strength meter */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: strengthInfo.width, backgroundColor: strengthInfo.color }}
                        />
                      </div>
                      <p className="text-[11px] mt-1 transition-colors duration-300" style={{ color: strengthInfo.color }}>
                        {strengthInfo.label}
                      </p>
                    </div>
                  )}
                </div>

                {error && <p className="text-[12px] text-red-400/90 leading-relaxed">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl text-[13px] font-normal text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}>
                  {loading ? (
                    <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Creating account…</>
                  ) : "Create account"}
                </button>
              </form>

              <p className="text-[11px] mt-4 text-center text-white/25 leading-relaxed">
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Manual test — password strength meter**

Visit `http://localhost:3000/signup`. Type in the password field:
- `abc` → red bar, "Weak" ✓
- `Password` → orange bar, "Fair" ✓
- `Password1` → yellow bar, "Good" ✓
- `Pinno@8772` → green bar, "Strong" ✓

- [ ] **Step 4: Commit**

```bash
git add src/app/signup/page.tsx
git commit -m "feat: wire signup page to Supabase — email/password + OAuth + password strength meter"
```

---

### Task 7: Create the auth callback route

**Files:**
- Create: `src/app/auth/callback/route.ts`

- [ ] **Step 1: Create the callback route handler**

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  // Validate `next` to prevent open redirect attacks
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : null;

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const message = encodeURIComponent(error.message);
      return NextResponse.redirect(`${origin}/auth/error?message=${message}`);
    }

    return NextResponse.redirect(`${origin}${safeNext ?? "/dashboard"}`);
  }

  return NextResponse.redirect(`${origin}/auth/error?message=${encodeURIComponent("Missing authentication code")}`);
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/app/auth/callback/
git commit -m "feat: add auth callback route — handles OAuth, email confirm, and password reset"
```

---

## Chunk 3: Auth Support Pages

### Task 8: Forgot password page

**Files:**
- Create: `src/app/auth/forgot-password/page.tsx`

- [ ] **Step 1: Create the page**

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient, getURL } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getURL("/auth/callback?next=/auth/reset-password"),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-[clamp(20px,4vw,48px)] py-5">
          <Link href="/login" className="flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
              iA
            </div>
            <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">Inferra AI</span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px]"
          >
            {sent ? (
              <div className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(206,247,158,0.15)", border: "1px solid rgba(206,247,158,0.3)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cef79e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-[1.3rem] font-medium tracking-[-0.03em] mb-2 text-white">Reset link sent</h2>
                <p className="text-[13px] font-light text-white/45 leading-relaxed">
                  Check your inbox for <span className="text-white/70">{email}</span>. The link expires in 1 hour.
                </p>
                <Link href="/login" className="mt-6 inline-block text-[12px] text-white/40 hover:text-white/70 transition-colors">
                  Back to sign in →
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">Reset password</h1>
                  <p className="text-[14px] font-light text-white/45">Enter your email and we&apos;ll send a reset link.</p>
                </div>
                <div className="rounded-2xl p-7"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest mb-1.5 font-normal text-white/80">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com" required
                        className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                    </div>
                    {error && <p className="text-[12px] text-red-400/90">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-xl text-[13px] font-normal text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                      onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}>
                      {loading ? (<><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Sending…</>) : "Send reset link"}
                    </button>
                  </form>
                  <div className="mt-4 text-center">
                    <Link href="/login" className="text-[12px] text-white/35 hover:text-white/60 transition-colors">← Back to sign in</Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript + commit**

```bash
npx tsc --noEmit
git add src/app/auth/forgot-password/
git commit -m "feat: add forgot password page"
```

---

### Task 9: Reset password page

**Files:**
- Create: `src/app/auth/reset-password/page.tsx`

- [ ] **Step 1: Create the page**

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getPasswordStrength, STRENGTH_CONFIG } from "@/lib/passwordStrength";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();
  const strengthScore = getPasswordStrength(password);
  const strengthInfo = STRENGTH_CONFIG[strengthScore];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8">
            <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">Set new password</h1>
            <p className="text-[14px] font-light text-white/45">Choose a strong password for your account.</p>
          </div>

          <div className="rounded-2xl p-7"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">New password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters" required
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none bg-white/[0.05] border border-white/20 focus:border-white/45" />
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-300"
                        style={{ width: strengthInfo.width, backgroundColor: strengthInfo.color }} />
                    </div>
                    <p className="text-[11px] mt-1 transition-colors duration-300" style={{ color: strengthInfo.color }}>
                      {strengthInfo.label}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Confirm password</label>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password" required
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none bg-white/[0.05] border border-white/20 focus:border-white/45" />
              </div>
              {error && <p className="text-[12px] text-red-400/90">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-[13px] font-normal text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}>
                {loading ? (<><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Updating…</>) : "Update password"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript + commit**

```bash
npx tsc --noEmit
git add src/app/auth/reset-password/
git commit -m "feat: add reset password page with strength meter"
```

---

### Task 10: Auth error page

**Files:**
- Create: `src/app/auth/error/page.tsx`

- [ ] **Step 1: Create the page**

```typescript
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") ?? "Something went wrong. Please try again.";

  return (
    <div className="w-full max-w-[400px] text-center">
      <div className="rounded-2xl p-8"
        style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-[1.3rem] font-medium tracking-[-0.03em] mb-2 text-white">Authentication failed</h2>
        <p className="text-[13px] font-light text-white/45 leading-relaxed mb-6">{message}</p>
        <Link href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] text-white/80 transition-all duration-200 hover:text-white"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          <Suspense fallback={null}>
            <ErrorContent />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript + commit**

```bash
npx tsc --noEmit
git add src/app/auth/error/
git commit -m "feat: add auth error page"
```

---

## Chunk 4: Dashboard Integration

### Task 11: Create dashboard layout

**Files:**
- Create: `src/app/dashboard/layout.tsx`

This layout wraps ALL `/dashboard/*` routes, provides the shared sidebar, and passes user data to children.

- [ ] **Step 1: Read the current `DashboardClient.tsx` to understand sidebar props**

The current `DashboardSidebar` receives `activeSection` and `onSectionChange`. The layout only provides the sidebar shell — `DashboardClient` still manages the active section state internally. The layout passes the `user` object to the sidebar.

- [ ] **Step 2: Create the layout**

```typescript
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Pass user to children via a data attribute on the wrapper.
  // DashboardClient and DashboardSidebar receive user via props from page.tsx.
  // The layout just renders children — the page itself handles passing user down.
  return <>{children}</>;
}
```

> **Note:** The layout confirms auth as a second layer (middleware is first). The user object needs to reach `DashboardSidebar`. The cleanest approach: update `dashboard/page.tsx` to also fetch the user and pass it to `DashboardClient`, which then passes it to `DashboardSidebar`.

- [ ] **Step 3: Update `DashboardClientProps` to accept `user` and update `dashboard/page.tsx`**

This must happen together — `page.tsx` passes `user` and `DashboardClient` must accept it before TypeScript will compile. Make both changes before running `tsc`.

**`src/components/DashboardClient.tsx` — lines 1–22 changes:**

Add import at top (after existing imports):
```typescript
import type { User } from "@supabase/supabase-js";
```

Update the props interface and function signature:
```typescript
interface DashboardClientProps {
  countries: CountryData[];
  user: User | null;
}

export default function DashboardClient({ countries, user }: DashboardClientProps) {
```

Update `<DashboardSidebar>` call (around line 62) to forward user:
```tsx
<DashboardSidebar
  activeSection={activeSection}
  onSectionChange={setActiveSection}
  user={user}
/>
```

**`src/app/dashboard/page.tsx` — full replacement:**

```typescript
import { readFile } from "fs/promises";
import path from "path";
import type { CountryData } from "@/types";
import DashboardClient from "@/components/DashboardClient";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const filePath = path.join(process.cwd(), "public", "data", "countries.json");
  const raw = await readFile(filePath, "utf-8");
  const countries: CountryData[] = JSON.parse(raw);

  return <DashboardClient countries={countries} user={user} />;
}
```

- [ ] **Step 4: Verify TypeScript + commit**

```bash
npx tsc --noEmit
git add src/app/dashboard/layout.tsx src/app/dashboard/page.tsx src/components/DashboardClient.tsx
git commit -m "feat: add dashboard layout, pass user to DashboardClient"
```

---

### Task 12: Update DashboardSidebar with user info and logout

**Files:**
- Modify: `src/components/DashboardSidebar.tsx`
- Modify: `src/components/DashboardClient.tsx` (add user prop)

- [ ] **Step 1: Confirm DashboardClient already has `user` prop (done in Task 11)**

`DashboardClient` already accepts `user: User | null` and passes it to `<DashboardSidebar user={user} />`. No changes needed here — just verify it's in place before proceeding.

- [ ] **Step 2: Add user display and logout to `DashboardSidebar`**

Replace the entire bottom section of `DashboardSidebar` (the `"A Project Future initiative"` div) and add user prop to the interface:

```typescript
// Add to imports:
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// Update interface:
interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: User | null;
}

// Helper: get initials from name
function getInitials(name: string | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Helper: stable colour from name
function getAvatarColor(name: string | undefined): string {
  if (!name) return "#555";
  const colours = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444"];
  const idx = name.charCodeAt(0) % colours.length;
  return colours[idx];
}
```

Replace the bottom `<div>` in the **desktop sidebar** (`px-5 py-4` section):

```tsx
{/* Bottom — user info + logout */}
<div className="px-4 py-4" style={{ borderTop: "1px solid rgba(34, 47, 48, 0.07)" }}>
  <button
    onClick={() => router.push("/dashboard/profile")}
    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl transition-all duration-200 group"
    style={{ backgroundColor: "transparent" }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.05)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
  >
    {/* Avatar */}
    <div
      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-semibold text-white"
      style={{ backgroundColor: getAvatarColor(user?.user_metadata?.name) }}
    >
      {getInitials(user?.user_metadata?.name)}
    </div>
    {/* Name + plan */}
    <div className="flex-1 min-w-0 text-left">
      <p className="text-[12px] font-medium truncate" style={{ color: "#222f30" }}>
        {user?.user_metadata?.name ?? user?.email ?? "User"}
      </p>
      <p className="text-[10px]" style={{ color: "rgba(34,47,48,0.4)" }}>Pro · Beta</p>
    </div>
    {/* Logout icon */}
    <button
      type="button"
      onClick={async (e) => {
        e.stopPropagation();
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-lg"
      style={{ color: "rgba(34,47,48,0.45)" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(34,47,48,0.45)"; }}
      title="Sign out"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </button>
  </button>
</div>
```

Add `const router = useRouter();` inside the component function (above the return).

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Manual test**

Visit `http://localhost:3000/dashboard` (while logged in). Bottom-left should show:
- Avatar circle with initials ✓
- User name ✓
- "Pro · Beta" ✓
- Hover → logout icon appears ✓
- Click name row → navigates to `/dashboard/profile` ✓
- Click logout icon → signs out, redirects to `/login` ✓

- [ ] **Step 5: Commit**

```bash
git add src/components/DashboardSidebar.tsx src/components/DashboardClient.tsx
git commit -m "feat: add user info, Pro Beta badge, and logout to dashboard sidebar"
```

---

### Task 13: Create the profile page

**Files:**
- Create: `src/app/dashboard/profile/page.tsx`

- [ ] **Step 1: Create the profile page**

```typescript
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getPasswordStrength, STRENGTH_CONFIG } from "@/lib/passwordStrength";
import type { User } from "@supabase/supabase-js";

const ROLES = [
  { value: "founder", label: "Founder / Builder" },
  { value: "investor", label: "Investor / VC" },
  { value: "policy", label: "Policy / Government" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "operator", label: "Cloud / DC Operator" },
  { value: "other", label: "Other" },
];

function getInitials(name: string | undefined): string {
  if (!name) return "?";
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function getAvatarColor(name: string | undefined): string {
  if (!name) return "#555";
  const colours = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444"];
  return colours[name.charCodeAt(0) % colours.length];
}

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  // Edit profile state
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Change password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");

  const strengthScore = getPasswordStrength(newPassword);
  const strengthInfo = STRENGTH_CONFIG[strengthScore];

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setName(user.user_metadata?.name ?? "");
        setOrg(user.user_metadata?.org ?? "");
        setRole(user.user_metadata?.role ?? "");
      }
    });
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");

    const { error } = await supabase.auth.updateUser({
      data: { name, org, role },
    });

    setSaving(false);
    setSaveMsg(error ? error.message : "Profile updated.");
    setTimeout(() => setSaveMsg(""), 3000);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwMsg("");

    if (newPassword.length < 8) { setPwError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setPwError("Passwords do not match."); return; }

    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwLoading(false);

    if (error) { setPwError(error.message); return; }
    setPwMsg("Password updated.");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPwMsg(""), 3000);
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200 border focus:border-white/25";
  const inputStyle = { backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" };
  const labelClass = "block text-[11px] uppercase tracking-widest mb-1.5 font-normal";
  const labelStyle = { color: "rgba(255,255,255,0.5)" };
  const sectionStyle = { backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" };

  if (!user) return null;

  const memberSince = new Date(user.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ backgroundColor: "#0d1410" }}>
      <div className="max-w-[600px] mx-auto">

        {/* Identity header */}
        <div className="flex items-center gap-5 mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[22px] font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: getAvatarColor(user.user_metadata?.name) }}
          >
            {getInitials(user.user_metadata?.name)}
          </div>
          <div>
            <h1 className="text-[1.5rem] font-medium tracking-[-0.03em] text-white leading-tight">
              {user.user_metadata?.name ?? "Your Profile"}
            </h1>
            <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              {user.email} · Member since {memberSince}
            </p>
            <span
              className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide"
              style={{ backgroundColor: "rgba(206,247,158,0.12)", color: "#cef79e", border: "1px solid rgba(206,247,158,0.2)" }}
            >
              Pro · Beta
            </span>
          </div>
        </div>

        {/* Edit profile */}
        <div className="mb-6" style={sectionStyle}>
          <h2 className="text-[13px] font-medium mb-5 text-white/70 uppercase tracking-widest">Profile</h2>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className={labelClass} style={labelStyle}>Full name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Organisation</label>
              <input type="text" value={org} onChange={(e) => setOrg(e.target.value)}
                placeholder="Company or institution" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}
                className={inputClass + " cursor-pointer appearance-none"}
                style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-opacity='0.3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                <option value="" style={{ backgroundColor: "#0d1410" }}>Select role</option>
                {ROLES.map((r) => <option key={r.value} value={r.value} style={{ backgroundColor: "#0d1410" }}>{r.label}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 rounded-xl text-[13px] font-normal text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {saving ? (<><svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Saving…</>) : "Save changes"}
              </button>
              {saveMsg && <p className="text-[12px]" style={{ color: saveMsg.includes("error") || saveMsg.includes("Error") ? "#ef4444" : "#cef79e" }}>{saveMsg}</p>}
            </div>
          </form>
        </div>

        {/* Change password */}
        <div style={sectionStyle}>
          <h2 className="text-[13px] font-medium mb-5 text-white/70 uppercase tracking-widest">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className={labelClass} style={labelStyle}>New password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters" className={inputClass} style={inputStyle} />
              {newPassword.length > 0 && (
                <div className="mt-2">
                  <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{ width: strengthInfo.width, backgroundColor: strengthInfo.color }} />
                  </div>
                  <p className="text-[11px] mt-1 transition-colors duration-300" style={{ color: strengthInfo.color }}>{strengthInfo.label}</p>
                </div>
              )}
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Confirm password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password" className={inputClass} style={inputStyle} />
            </div>
            {pwError && <p className="text-[12px] text-red-400/90">{pwError}</p>}
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={pwLoading}
                className="px-5 py-2.5 rounded-xl text-[13px] font-normal text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {pwLoading ? (<><svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Updating…</>) : "Update password"}
              </button>
              {pwMsg && <p className="text-[12px]" style={{ color: "#cef79e" }}>{pwMsg}</p>}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript + commit**

```bash
npx tsc --noEmit
git add src/app/dashboard/profile/
git commit -m "feat: add profile page — view/edit name/org/role and change password"
```

---

## Chunk 5: Email Template + Setup Guide

### Task 14: Write branded email template

**Files:**
- Create: `docs/email-template-confirm.html`

- [ ] **Step 1: Create the email template HTML**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm your Inferra AI account</title>
</head>
<body style="margin:0;padding:0;background-color:#0d1a14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d1a14;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">iA</span>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="font-size:15px;font-weight:500;color:rgba(255,255,255,0.8);letter-spacing:-0.02em;">Inferra AI</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 36px;">

              <!-- Heading -->
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:500;color:#ffffff;letter-spacing:-0.03em;line-height:1.2;">
                Confirm your account
              </h1>
              <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.45);line-height:1.6;">
                You're one step away from accessing Africa's AI infrastructure intelligence platform. Click below to confirm your email address.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="{{ .ConfirmationURL }}"
                      style="display:inline-block;padding:14px 32px;background-color:#cef79e;color:#0d1a14;font-size:13px;font-weight:600;text-decoration:none;border-radius:12px;letter-spacing:-0.01em;">
                      Confirm my account →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid rgba(255,255,255,0.07);margin:32px 0;"></div>

              <!-- Fallback link -->
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
                If the button doesn't work, copy and paste this link:<br/>
                <a href="{{ .ConfirmationURL }}" style="color:rgba(206,247,158,0.6);word-break:break-all;">{{ .ConfirmationURL }}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.6;">
                Inferra AI · A Project Future initiative<br/>
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add docs/email-template-confirm.html
git commit -m "feat: add branded Inferra AI email confirmation template"
```

---

### Task 15: Supabase dashboard + OAuth setup walkthrough

This task has no code — just the configuration steps to do in the browser.

**Step 1: Supabase Auth Settings**

1. Go to [supabase.com](https://supabase.com) → your project → **Authentication → Settings**
2. Set **Site URL**: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/auth/callback`
4. Set **Minimum password length** to `8`
5. Enable **Confirm email** toggle

**Step 2: Paste email template**

1. Go to **Authentication → Email Templates → Confirm signup**
2. Replace the HTML with the contents of `docs/email-template-confirm.html`
3. Save

**Step 3: Google OAuth**

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use existing) → **APIs & Services → Credentials**
3. Click **Create credentials → OAuth client ID**
4. Application type: **Web application**
5. Authorised redirect URIs: `https://wyutexcnrnbbytyxervw.supabase.co/auth/v1/callback`
6. Copy **Client ID** and **Client Secret**
7. In Supabase → **Authentication → Providers → Google**:
   - Paste Client ID and Client Secret
   - Enable the provider

**Step 4: GitHub OAuth**

1. Go to [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps → New OAuth App**
2. Homepage URL: `http://localhost:3000`
3. Authorization callback URL: `https://wyutexcnrnbbytyxervw.supabase.co/auth/v1/callback`
4. Copy **Client ID** → click **Generate a new client secret** → copy secret
5. In Supabase → **Authentication → Providers → GitHub**:
   - Paste Client ID and Client Secret
   - Enable the provider

**Step 5: Final verification**

```bash
npm run dev
```

- [ ] Visit `/login` → click Google → OAuth consent → lands on `/dashboard` ✓
- [ ] Visit `/signup` → fill form → submit → "check your inbox" ✓
- [ ] Click confirmation link in email → lands on `/dashboard` ✓
- [ ] Visit `/login` → Forgot? → reset email → click link → reset password page → update → `/dashboard` ✓
- [ ] Dashboard sidebar: shows your name, "Pro · Beta", logout works ✓
- [ ] Click name → profile page loads, edit works, password change works ✓

---

## Final commit

```bash
git add .
git commit -m "feat: complete Supabase auth — login, signup, OAuth, email confirm, password reset, profile page"
```
