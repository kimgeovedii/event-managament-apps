import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

// Routes that require specific roles
const ROLE_PROTECTED_ROUTES: Record<string, string[]> = {
  "/dashboard": ["ORGANIZER"],
};

// Routes that require authentication (any role)
const AUTH_REQUIRED_ROUTES = ["/user-referral"];

// Routes only for guests (redirect to home if authenticated)
const GUEST_ONLY_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Decode JWT payload
  const payload = token ? decodeJwtPayload(token) : null;
  const isAuthenticated = !!payload;
  const userRoles: string[] = (payload?.roles as string[]) || [];

  // 1. Guest-only routes: redirect authenticated users to home
  if (GUEST_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 2. Auth-required routes: redirect unauthenticated users to login
  if (AUTH_REQUIRED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Role-protected routes: check required roles
  for (const [route, requiredRoles] of Object.entries(ROLE_PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) {
      // Must be authenticated
      if (!isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Must have at least one required role
      const hasRole = userRoles.some((role) => requiredRoles.includes(role));
      if (!hasRole) {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("error", "forbidden");
        return NextResponse.redirect(homeUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/user-referral/:path*",
  ],
};
