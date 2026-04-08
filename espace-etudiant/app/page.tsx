"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4000";
const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  function fadeStyle(delayMs: number): React.CSSProperties {
    return {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delayMs}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delayMs}ms`,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${AUTH_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Identifiants incorrects");
        setLoading(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Impossible de contacter le serveur");
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes kenburns {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.12) translate(-2%, 1%); }
        }
        .lp-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          background: #F9FAFB;
          color: #111827;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .lp-input::placeholder { color: #B0B7C3; }
        .lp-input:focus {
          border-color: var(--uni-primary);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(27,58,92,0.10);
        }
        .lp-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #1B3A5C 0%, #0F2440 100%);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.025em;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        .lp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(27,58,92,0.28);
        }
        .lp-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(27,58,92,0.18);
        }
        .lp-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9CA3AF;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .eye-btn:hover { color: var(--uni-primary); }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #9CA3AF;
          text-decoration: none;
          transition: color 0.2s ease;
          margin-bottom: 36px;
        }
        .back-link:hover { color: var(--uni-primary); }
        .back-link:hover svg { transform: translateX(-2px); }
        .back-link svg { transition: transform 0.2s ease; }
      `}</style>

      <div className="min-h-screen flex flex-col lg:flex-row">

        {/* ── Panneau gauche – Photo campus ── */}
        <div className="hidden lg:block lg:w-[52%] relative overflow-hidden">
          <Image
            src="/images/Bat2.jpeg"
            alt="Campus UCKIN"
            fill
            className="object-cover"
            priority
            style={{ animation: "kenburns 20s ease-in-out infinite alternate" }}
          />
          {/* Gradient multi-stop : riche et profond */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(155deg, rgba(15,36,64,0.92) 0%, rgba(15,36,64,0.60) 45%, rgba(196,163,90,0.15) 100%)"
          }} />

          <div className="absolute inset-0 flex flex-col justify-between p-14 z-10">
            {/* Marque */}
            <div className="flex items-center gap-4" style={fadeStyle(120)}>
              <Image
                src="/images/logokin.jpeg"
                alt="UCKIN"
                width={48}
                height={48}
                className="rounded-full"
                style={{ boxShadow: "0 0 0 2px rgba(196,163,90,0.6)" }}
              />
              <div>
                <p className="text-uni-gold font-bold tracking-[0.28em] text-base"
                   style={{ fontFamily: "var(--font-playfair)" }}>
                  UCKIN
                </p>
                <p className="text-white/50 text-[11px] tracking-wider mt-0.5">
                  Université Chrétienne de Kinshasa
                </p>
              </div>
            </div>

            {/* Accroche centrale */}
            <div style={fadeStyle(300)}>
              <p className="text-uni-gold/75 text-[11px] uppercase tracking-[0.22em] mb-4 font-medium">
                Espace Étudiant
              </p>
              <h2
                className="text-4xl xl:text-[2.75rem] font-bold text-white leading-[1.18] mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bienvenue sur<br />votre portail
              </h2>
              <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: "var(--uni-gold)" }} />
              <p className="text-white/55 text-sm leading-relaxed max-w-[280px]">
                Cours, notes, calendrier académique et services universitaires — tout en un seul endroit.
              </p>
            </div>

            {/* Bande de photos */}
            <div className="flex gap-2.5" style={fadeStyle(500)}>
              {["/images/Etu2.jpeg", "/images/Dip2.jpeg", "/images/bat6.jpeg"].map((src, i) => (
                <div key={i} className="relative h-[72px] flex-1 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    style={{ opacity: 0.70 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panneau droit – Formulaire ── */}
        <div
          className="flex-1 flex flex-col justify-center items-center bg-white"
          style={{ padding: "56px 32px" }}
        >
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-10" style={fadeStyle(100)}>
            <a href={MAIN_SITE_URL}>
              <Image
                src="/images/logokin.jpeg"
                alt="UCKIN"
                width={58}
                height={58}
                className="mx-auto rounded-full shadow-md"
              />
            </a>
            <p
              className="mt-3 font-bold tracking-[0.24em]"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--uni-primary)", fontSize: 17 }}
            >
              UCKIN
            </p>
          </div>

          <div style={{ width: "100%", maxWidth: 408 }}>

            {/* Retour */}
            <div style={fadeStyle(140)}>
              <a href={MAIN_SITE_URL} className="back-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
                </svg>
                Retour au site principal
              </a>
            </div>

            {/* Titre */}
            <div style={fadeStyle(230)}>
              <h1
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-playfair)", fontSize: 28, letterSpacing: "-0.01em" }}
              >
                Connexion
              </h1>
              <div className="h-[3px] w-9 rounded-full mb-3" style={{ background: "var(--uni-gold)" }} />
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Entrez vos identifiants universitaires pour accéder à votre espace.
              </p>
            </div>

            {/* Erreur */}
            {error && (
              <div
                className="mb-5 flex items-start gap-3 p-4 rounded-xl text-sm"
                style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626" }}
              >
                <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Email */}
              <div style={fadeStyle(330)}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="etudiant@uckin.ac.cd"
                  className="lp-input"
                />
              </div>

              {/* Mot de passe */}
              <div style={fadeStyle(430)}>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <a
                    href="#"
                    className="text-xs transition-colors hover:underline"
                    style={{ color: "var(--uni-primary)", opacity: 0.75 }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="lp-input"
                    style={{ paddingRight: 46 }}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Bouton */}
              <div style={fadeStyle(530)}>
                <button type="submit" disabled={loading} className="lp-btn">
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span
                        className="animate-spin"
                        style={{
                          width: 16, height: 16,
                          border: "2px solid rgba(255,255,255,0.35)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}
                      />
                      Connexion en cours…
                    </span>
                  ) : "Se connecter"}
                </button>
              </div>
            </form>

            {/* Lien inscription */}
            <div className="mt-6 text-center" style={fadeStyle(630)}>
              <p className="text-sm text-gray-400">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--uni-primary)" }}
                >
                  Créer un compte
                </Link>
              </p>
            </div>

            {/* Pied */}
            <div className="mt-10 pt-7 border-t border-gray-100 text-center" style={fadeStyle(720)}>
              <p className="text-[11px] text-gray-300 tracking-wide">
                © {new Date().getFullYear()} Université Chrétienne de Kinshasa
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
