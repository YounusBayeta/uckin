import { NextResponse } from "next/server";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:4000";
const STUDENT_PORTAL_URL =
  process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL || "https://etudiant.uckin.ac.cd/";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  latencyMs?: number;
  message?: string;
  checkedAt: string;
}

/**
 * Sends a GET request to `url` and returns whether it succeeded along with
 * the round-trip latency in milliseconds. Requests that exceed `timeoutMs`
 * are aborted and reported as failed with message "Timeout".
 */
async function probe(
  url: string,
  timeoutMs = 3000,
): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    clearTimeout(id);
    const latencyMs = Date.now() - start;
    if (!res.ok) {
      return { ok: false, latencyMs, message: `HTTP ${res.status}` };
    }
    return { ok: true, latencyMs };
  } catch (err: unknown) {
    const latencyMs = Date.now() - start;
    const message =
      err instanceof Error
        ? err.name === "AbortError"
          ? "Timeout"
          : err.message
        : "Unknown error";
    return { ok: false, latencyMs, message };
  }
}

/** Derives the global system state from individual service statuses. */
function calculateOverallStatus(services: ServiceStatus[]): ServiceStatus["status"] {
  if (services.every((s) => s.status === "operational")) return "operational";
  if (services.some((s) => s.status === "operational")) return "degraded";
  return "down";
}

export async function GET() {
  const now = new Date().toISOString();

  const [authResult, portalResult] = await Promise.all([
    probe(`${AUTH_SERVICE_URL}/health`),
    probe(`${STUDENT_PORTAL_URL}`),
  ]);

  const services: ServiceStatus[] = [
    {
      // This route runs inside the Next.js process — if we reach this handler
      // the site itself is operational by definition.
      name: "Site principal (Next.js)",
      status: "operational",
      message: "Opérationnel",
      checkedAt: now,
    },
    {
      name: "Service d'authentification",
      status: authResult.ok ? "operational" : "down",
      latencyMs: authResult.latencyMs,
      message: authResult.ok ? "Opérationnel" : (authResult.message ?? "Indisponible"),
      checkedAt: now,
    },
    {
      name: "Espace Étudiant",
      status: portalResult.ok ? "operational" : "down",
      latencyMs: portalResult.latencyMs,
      message: portalResult.ok ? "Opérationnel" : (portalResult.message ?? "Indisponible"),
      checkedAt: now,
    },
  ];

  const overall = calculateOverallStatus(services);

  return NextResponse.json(
    { overall, services, timestamp: now },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
