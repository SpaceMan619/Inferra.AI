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

  // Reverse redirect — authenticated users don't need auth pages or home
  if ((pathname === "/login" || pathname === "/signup" || pathname === "/") && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // IMPORTANT: return supabaseResponse (not a new NextResponse) to preserve
  // the Set-Cookie headers that refresh the session.
  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/"],
};
