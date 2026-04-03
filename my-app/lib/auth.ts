/**
 * Auth Middleware for Next.js — communicates with UCKIN Auth Microservice
 * Usage: import { withAuth, getUser } from "@/lib/auth"
 */

const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4000";

export interface AuthUser {
  sub: string;
  email: string;
  role: "student" | "teacher" | "admin" | "staff";
}

export interface AuthResponse {
  valid: boolean;
  user?: AuthUser;
  message?: string;
}

/**
 * Verify an access token by calling the Auth Service
 */
export async function verifyToken(token: string): Promise<AuthResponse> {
  try {
    const res = await fetch(`${AUTH_SERVICE_URL}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data as AuthResponse;
  } catch {
    return { valid: false, message: "Auth service unavailable" };
  }
}

/**
 * Get user profile from Auth Service
 */
export async function getMe(token: string) {
  const res = await fetch(`${AUTH_SERVICE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.user || null;
}

/**
 * Login via Auth Service
 */
export async function login(email: string, password: string) {
  const res = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

/**
 * Register via Auth Service
 */
export async function register(data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  matricule?: string;
}) {
  const res = await fetch(`${AUTH_SERVICE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

/**
 * Refresh tokens via Auth Service
 */
export async function refreshToken() {
  const res = await fetch(`${AUTH_SERVICE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
}

/**
 * Logout via Auth Service
 */
export async function logout() {
  const res = await fetch(`${AUTH_SERVICE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
}
