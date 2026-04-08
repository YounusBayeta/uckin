import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4000";

// Routes that require authentication
const PROTECTED_ROUTES = ["/espace-etudiant", "/dashboard"];

// Routes only for specific roles
const ROLE_ROUTES: Record<string, string[]> = {
  "/dashboard/admin": ["admin"],
  "/dashboard/teacher": ["admin", "teacher"],
};

export async function proxy(request: NextRequest) {
  // ⚠️ AUTH TEMPORAIREMENT DÉSACTIVÉ — Docker/Auth non disponible
  // Remettre le code original quand Docker + Auth service tournent
  return NextResponse.next();

  /* ORIGINAL CODE — à réactiver plus tard :
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(`${AUTH_SERVICE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await res.json();
    if (!data.valid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
      if (pathname.startsWith(routePrefix) && !allowedRoles.includes(data.user.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", data.user.sub);
    response.headers.set("x-user-email", data.user.email);
    response.headers.set("x-user-role", data.user.role);
    return response;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  */
}

export const config = {
  matcher: ["/espace-etudiant/:path*", "/dashboard/:path*"],
};
