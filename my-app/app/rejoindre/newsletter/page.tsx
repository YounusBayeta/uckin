"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import ParticlesBackground from "../../components/ParticlesBackground";

const interests = [
  { id: "actualites", label: "Actualités universitaires" },
  { id: "bourses", label: "Bourses & Aides financières" },
  { id: "evenements", label: "Événements & Activités" },
  { id: "admissions", label: "Admissions & Inscriptions" },
  { id: "recherche", label: "Recherche & Publications" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ nom: "", prenom: "", email: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Entry animation
  useEffect(() => {
    const heading = headingRef.current;
    const formEl = formRef.current;
    gsap.set([heading, formEl], { opacity: 0, y: 40 });
    const ctx = gsap.context(() => {
      gsap.to(heading, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
      gsap.to(formEl, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  const toggleInterest = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setStatus("loading");

    // Simulate API call (replace with real endpoint later)
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("success");

    // Animate form out, success in
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        if (formRef.current) formRef.current.style.display = "none";
        if (successRef.current) {
          successRef.current.style.display = "flex";
          gsap.from(successRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "back.out(1.4)",
          });
        }
      },
    });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-uni-primary-dark to-uni-primary py-24 px-6 overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10">
          <Link
            href="/rejoindre"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-6"
          >
            ← Retour
          </Link>
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-uni-gold/10 border border-uni-gold/30 mx-auto mb-5">
            <span className="text-2xl">📰</span>
          </div>
          <p className="text-xs font-bold text-uni-gold tracking-widest uppercase mb-2">
            Newsletter UCKIN
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Restez informé
          </h1>
          <p className="text-white/55 text-sm leading-relaxed">
            Recevez les actualités, annonces et opportunités de l'Université Chrétienne de Kinshasa directement dans votre boîte mail.
          </p>
        </div>

        {/* Form */}
        <div ref={formRef}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex flex-col gap-5"
          >
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Prénom
                </label>
                <input
                  type="text"
                  placeholder="Jean"
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  className="h-11 rounded-xl bg-white/8 border border-white/15 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-uni-gold/50 focus:border-uni-gold transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Mukendi"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="h-11 rounded-xl bg-white/8 border border-white/15 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-uni-gold/50 focus:border-uni-gold transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Adresse email <span className="text-uni-gold">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="vous@exemple.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-11 rounded-xl bg-white/8 border border-white/15 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-uni-gold/50 focus:border-uni-gold transition-colors"
              />
            </div>

            {/* Interests */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Je veux recevoir des informations sur… (optionnel)
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => {
                  const active = selected.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        active
                          ? "bg-uni-gold text-uni-primary-dark border-uni-gold"
                          : "bg-white/5 text-white/60 border-white/15 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 h-12 rounded-xl bg-uni-gold text-uni-primary-dark font-bold text-sm hover:bg-uni-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Inscription en cours…
                </>
              ) : (
                "S'abonner à la newsletter"
              )}
            </button>

            <p className="text-center text-[11px] text-white/30">
              Pas de spam. Désabonnement possible à tout moment.
            </p>
          </form>
        </div>

        {/* Success state */}
        <div
          ref={successRef}
          className="hidden flex-col items-center text-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Vous êtes inscrit !</h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Merci {form.prenom || ""}. Vous recevrez prochainement les actualités de l'UCKIN dans votre boîte mail.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-uni-gold text-uni-primary-dark font-bold text-sm hover:bg-uni-gold-light transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
