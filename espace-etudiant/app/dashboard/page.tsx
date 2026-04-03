"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:4000";
const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  matricule: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${AUTH_URL}/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        } else {
          window.location.href = "/";
        }
      } catch {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleLogout() {
    await fetch(`${AUTH_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-uni-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-uni-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-uni-light">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href={MAIN_SITE_URL}>
              <Image src="/images/logokin.jpeg" alt="UCKIN" width={36} height={36} className="rounded-full" />
            </a>
            <span
              className="text-lg font-bold text-uni-primary tracking-wider"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              UCKIN
            </span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-sm text-gray-500">Espace Étudiant</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.first_name} {user.last_name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenue, {user.first_name} ! 👋
          </h1>
          <p className="mt-2 text-gray-500">
            Votre espace personnel sur la plateforme UCKIN.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Nom complet</div>
            <div className="font-semibold text-gray-900">{user.last_name} {user.first_name}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Email</div>
            <div className="font-semibold text-gray-900">{user.email}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Matricule</div>
            <div className="font-semibold text-gray-900">{user.matricule || "Non assigné"}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Rôle</div>
            <div className="font-semibold text-gray-900 capitalize">{user.role}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Statut</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-semibold text-green-700">Actif</span>
            </div>
          </div>
        </div>

        {/* Placeholder sections */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Prochainement</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Mes cours", desc: "Consultez vos cours et emplois du temps" },
              { title: "Mes notes", desc: "Accédez à vos résultats académiques" },
              { title: "Paiements", desc: "Suivez vos frais académiques" },
              { title: "Documents", desc: "Téléchargez vos attestations" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <h3 className="font-medium text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
