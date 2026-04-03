"use client";

import { useState } from "react";
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
      setError("Le mot de passe doit contenir au moins 8 caractères");
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
        setError(data.message || "Erreur lors de l'inscription");
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
      <div className="min-h-screen bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Inscription réussie !</h2>
          <p className="text-gray-500 mb-6">Vous pouvez maintenant vous connecter avec vos identifiants.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-uni-primary text-white font-semibold rounded-lg hover:bg-uni-primary-dark transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark flex items-center justify-center px-4 py-10">
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
          <p className="mt-1 text-white/60 text-sm">Inscription Étudiant</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Créer un compte
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Mukendi"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Jean"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="etudiant@uckin.ac.cd"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="matricule" className="block text-sm font-medium text-gray-700 mb-1">
                Matricule <span className="text-gray-400">(optionnel)</span>
              </label>
              <input
                id="matricule"
                name="matricule"
                type="text"
                value={form.matricule}
                onChange={handleChange}
                placeholder="UCK-2026-XXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-uni-primary focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-uni-primary hover:bg-uni-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              {"Déjà un compte ? "}
              <Link href="/" className="text-uni-primary font-medium hover:underline">
                Se connecter
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
