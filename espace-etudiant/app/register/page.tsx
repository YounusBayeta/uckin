"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4000";
const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    matricule: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  function fadeStyle(delayMs: number): React.CSSProperties {
    return {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delayMs}ms, transform 0.6s ease ${delayMs}ms`,
    };
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caract\u00e8res");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${AUTH_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
          matricule: form.matricule || undefined,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Erreur lors de l\u2019inscription");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "var(--uni-light)" }}
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100">
          <div className="text-5xl mb-4">\u2713</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Inscription r\u00e9ussie\u00a0!</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Vous pouvez maintenant vous connecter avec vos identifiants.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white font-semibold rounded-lg text-sm transition-colors"
            style={{ background: "var(--uni-primary)" }}
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ---- Panneau gauche photo ---- */}
      <div className="hidden lg:flex lg:w-2/5 relative flex-col overflow-hidden">
        <Image
          src="/images/bat5.jpeg"
          alt="Campus UCKIN"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(15,36,64,0.78)" }}
        />
        <div className="relative z-10 flex flex-col h-full p-12 justify-between">
          <div className="flex items-center gap-4" style={fadeStyle(100)}>
            <Image
              src="/images/logokin.jpeg"
              alt="UCKIN"
              width={52}
              height={52}
              className="rounded-full"
              style={{ boxShadow: "0 0 0 2px rgba(196,163,90,0.5)" }}
            />
            <div>
              <p
                className="font-bold text-xl tracking-widest"
                style={{ color: "var(--uni-gold)", fontFamily: "var(--font-playfair)" }}
              >
                UCKIN
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Université Chrétienne de Kinshasa
              </p>
            </div>
          </div>
          <div style={fadeStyle(250)}>
            <h2
              className="text-3xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Créez votre<br />
              <span style={{ color: "var(--uni-gold)" }}>compte étudiant</span>
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Rejoignez la communauté UCKIN et accédez à tous les services de votre portail étudiant.
            </p>
          </div>
          <div className="flex gap-2 overflow-hidden rounded-xl" style={fadeStyle(450)}>
            {["/images/Dip1.jpeg", "/images/Dip3.jpeg", "/images/Etu1.jpeg"].map((src, i) => (
              <div key={i} className="relative h-20 flex-1 rounded-lg overflow-hidden">
                <Image src={src} alt="" fill className="object-cover transition-transform duration-500 hover:scale-110" style={{ opacity: 0.75 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Panneau droit formulaire ---- */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white overflow-y-auto">

        <div className="lg:hidden text-center mb-8">
          <a href={MAIN_SITE_URL}>
            <Image
              src="/images/logokin.jpeg"
              alt="UCKIN"
              width={64}
              height={64}
              className="mx-auto rounded-full"
              style={{ boxShadow: "0 0 0 2px rgba(27,58,92,0.3)" }}
            />
          </a>
          <p
            className="mt-3 font-bold text-xl tracking-widest"
            style={{ color: "var(--uni-primary)", fontFamily: "var(--font-playfair)" }}
          >
            UCKIN
          </p>
        </div>

        <div className="w-full max-w-md">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-xs text-gray-400 mb-8 transition-colors hover:text-gray-700"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Retour à la connexion
          </a>

          <div style={fadeStyle(180)}>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
          <div className="mt-2 mb-1 h-0.5 w-10 rounded-full" style={{ background: "var(--uni-gold)" }} />
          <p className="text-gray-400 text-sm mt-3 mb-8">Remplissez le formulaire pour vous inscrire</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3" style={fadeStyle(260)}>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Mukendi"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-400 text-sm transition-shadow"
                  style={{ outline: "none" }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--uni-primary)")}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Jean"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-400 text-sm transition-shadow"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--uni-primary)")}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                />
              </div>
            </div>

            <div style={fadeStyle(320)}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="etudiant@uckin.ac.cd"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-400 text-sm transition-shadow"
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--uni-primary)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
              />
            </div>

            <div style={fadeStyle(380)}>
              <label htmlFor="matricule" className="block text-sm font-medium text-gray-700 mb-1">
                Matricule <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input
                id="matricule"
                name="matricule"
                type="text"
                value={form.matricule}
                onChange={handleChange}
                placeholder="UCK-2026-XXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-400 text-sm transition-shadow"
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--uni-primary)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
              />
            </div>

            <div style={fadeStyle(440)}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-400 text-sm transition-shadow"
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--uni-primary)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
              />
            </div>

            <div style={fadeStyle(500)}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none text-gray-900 placeholder-gray-400 text-sm transition-shadow"
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px var(--uni-primary)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
              />
            </div>

            <div style={fadeStyle(560)}><button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-semibold rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              style={{ background: "var(--uni-primary)" }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = "var(--uni-primary-dark)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(27,58,92,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--uni-primary)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Inscription en cours…
                </span>
              ) : (
                "Créer mon compte"
              )}
            </button></div>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center" style={fadeStyle(620)}>
            {"D\u00e9j\u00e0 un compte\u00a0? "}
            <Link
              href="/"
              className="font-medium hover:underline"
              style={{ color: "var(--uni-primary)" }}
            >
              Se connecter
            </Link>
          </p>
        </div>

        <p className="mt-12 text-xs text-gray-300 text-center">
          \u00a9 {new Date().getFullYear()} Universit\u00e9 Chr\u00e9tienne de Kinshasa
        </p>
      </div>
    </div>
  );
}