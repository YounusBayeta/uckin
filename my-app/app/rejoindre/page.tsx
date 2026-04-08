"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import ParticlesBackground from "../components/ParticlesBackground";

const cards = [
  {
    icon: "🎓",
    title: "Candidature d'admission",
    description:
      "Vous souhaitez intégrer l'UCKIN ? Déposez votre dossier de candidature pour l'année académique en cours.",
    cta: "Déposer ma candidature",
    href: "/register",
    accent: "bg-uni-primary",
  },
  {
    icon: "📰",
    title: "Newsletter",
    description:
      "Restez informé des actualités, annonces et nouvelles de l'université directement dans votre boîte mail.",
    cta: "S'abonner",
    href: "/rejoindre/newsletter",
    accent: "bg-uni-gold",
  },
  {
    icon: "💰",
    title: "Bourses & Aides",
    description:
      "Découvrez les bourses disponibles, les conditions d'éligibilité et comment soumettre votre dossier.",
    cta: "Voir les bourses",
    href: "#bourses",
    accent: "bg-emerald-600",
  },
  {
    icon: "📅",
    title: "Événements & Activités",
    description:
      "Conférences, journées portes ouvertes, compétitions sportives… Consultez le calendrier des activités.",
    cta: "Voir le calendrier",
    href: "#evenements",
    accent: "bg-sky-600",
  },
];

export default function RejoindreePage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.04,
      y: -6,
      backgroundColor: "rgba(255,255,255,0.12)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      backgroundColor: "rgba(255,255,255,0.05)",
      boxShadow: "none",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const heading = headingRef.current;
    const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];

    // Masquer immédiatement avant l'animation
    gsap.set(heading, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.97 });

    const ctx = gsap.context(() => {
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-uni-primary-dark to-uni-primary py-24 px-6 overflow-hidden">
      <ParticlesBackground />
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-16 max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-3">
          Bienvenue à l'UCKIN
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Comment pouvons-nous vous aider ?
        </h1>
        <p className="text-white/60 text-lg">
          Choisissez ce qui vous correspond le mieux ci-dessous.
        </p>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto"
      >
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5"
            style={{ willChange: "transform" }}
          >
            {/* Top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${card.accent}`} />

            <span className="text-4xl">{card.icon}</span>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">{card.title}</h2>
              <p className="text-white/55 text-sm leading-relaxed">{card.description}</p>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-uni-gold">
              {card.cta}
              <span>→</span>
            </span>
          </Link>
        ))}
      </div>

      {/* Back link */}
      <div className="text-center mt-12">
        <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
          ← Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
