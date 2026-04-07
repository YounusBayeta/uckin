"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ──────────────────────────── TYPES ──────────────────────────── */

type ServiceState = "operational" | "degraded" | "down";

interface ServiceStatus {
  name: string;
  status: ServiceState;
  latencyMs?: number;
  message?: string;
  checkedAt: string;
}

interface StatusData {
  overall: ServiceState;
  services: ServiceStatus[];
  timestamp: string;
}

/* ──────────────────────────── ICONS ──────────────────────────── */

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

/* ──────────────────────────── HELPERS ──────────────────────────── */

const STATUS_CONFIG: Record<ServiceState, { label: string; badgeClass: string; iconClass: string; Icon: React.ComponentType<{ className?: string }> }> = {
  operational: {
    label: "Opérationnel",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
    iconClass: "text-green-500",
    Icon: CheckCircleIcon,
  },
  degraded: {
    label: "Dégradé",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-200",
    iconClass: "text-yellow-500",
    Icon: AlertTriangleIcon,
  },
  down: {
    label: "Indisponible",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
    iconClass: "text-red-500",
    Icon: XCircleIcon,
  },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: StatusData = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30_000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const overall = data?.overall ?? "down";
  const { label: overallLabel, badgeClass: overallBadge } = STATUS_CONFIG[overall];

  return (
    <main className="bg-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-uni-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white/90">État du système</span>
          </nav>
          <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-4">
            Tableau de bord
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            État du système
          </h1>
          <p className="mt-3 text-lg text-white/60">
            Vérification en temps réel de tous les services UCKIN
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-3xl mx-auto px-6 -mt-10 relative z-10 pb-24">

        {/* Overall banner */}
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 shadow-lg bg-white mb-8 ${
            overall === "operational"
              ? "border-green-200"
              : overall === "degraded"
              ? "border-yellow-200"
              : "border-red-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {(() => {
              const { Icon, iconClass } = STATUS_CONFIG[overall];
              return <Icon className={`w-7 h-7 ${iconClass}`} />;
            })()}
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {overall === "operational"
                  ? "Tous les systèmes sont opérationnels"
                  : overall === "degraded"
                  ? "Certains services sont dégradés"
                  : "Panne de service détectée"}
              </p>
              {data && (
                <p className="text-sm text-gray-500 mt-0.5">
                  Dernière vérification : {formatTime(data.timestamp)}
                </p>
              )}
            </div>
          </div>
          <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${overallBadge}`}>
            {overallLabel}
          </span>
        </div>

        {/* Service cards */}
        <div className="space-y-4 mb-8">
          {loading && !data && (
            <div className="rounded-2xl border border-gray-100 bg-white shadow p-6 text-center text-gray-400 animate-pulse">
              Vérification des services en cours…
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-700 text-sm">
              Impossible de récupérer le statut : {error}
            </div>
          )}

          {data?.services.map((service) => {
            const { label, badgeClass, iconClass, Icon } = STATUS_CONFIG[service.status];
            return (
              <div
                key={service.name}
                className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow px-6 py-5"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${iconClass} shrink-0`} />
                  <div>
                    <p className="font-semibold text-gray-900">{service.name}</p>
                    {service.message && (
                      <p className="text-sm text-gray-500 mt-0.5">{service.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {service.latencyMs != null && (
                    <span className="text-xs text-gray-400">{service.latencyMs} ms</span>
                  )}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Refresh button */}
        <div className="flex justify-center">
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-uni-primary text-white font-semibold rounded-xl hover:bg-uni-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <RefreshIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Vérification…" : "Actualiser"}
          </button>
        </div>

        {/* Auto-refresh notice */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Actualisation automatique toutes les 30 secondes
        </p>
      </section>
    </main>
  );
}
