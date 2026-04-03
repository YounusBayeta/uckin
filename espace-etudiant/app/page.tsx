"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4000";
const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(data.message || "Erreur de connexion");
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
    <div className="min-h-screen bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href={MAIN_SITE_URL} className="inline-block">
            <Image
              src="/images/logokin.jpeg"
              alt="UCKIN"
              width={72}
              height={72}
              className="mx-auto rounded-full ring-4 ring-uni-gold/30"
            />
          </a>
          <h1
            className="mt-4 text-3xl font-bold text-uni-gold tracking-wider"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            UCKIN
          </h1>
          <p className="mt-1 text-white/60 text-sm">Espace Étudiant</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Connexion
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="etudiant@uckin.ac.cd"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-uni-primary hover:bg-uni-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              {"Pas encore de compte ? "}
              <Link href="/register" className="text-uni-primary font-medium hover:underline">
                {"S'inscrire"}
              </Link>
            </p>
            <a href={MAIN_SITE_URL} className="text-sm text-gray-400 hover:text-gray-600 inline-block">
              ← Retour au site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
