"use client";

import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { gsap } from "gsap";
import ParticlesBackground from "../components/ParticlesBackground";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function RegisterPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([headingRef.current, cardRef.current], { opacity: 0, y: 40 });
    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
      gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-uni-primary-dark to-uni-primary flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 w-full max-w-md">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8">
          <Link href="/rejoindre" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-6">
            ← Retour
          </Link>
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-uni-gold/10 border border-uni-gold/30 mx-auto mb-5">
            <span className="text-2xl">🎓</span>
          </div>
          <p className="text-xs font-bold text-uni-gold tracking-widest uppercase mb-2">
            Candidature d'admission
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Créer un compte
          </h1>
          <p className="text-white/55 text-sm">
            Rejoignez la communauté UCKIN en quelques secondes.
          </p>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex flex-col gap-4"
        >
          {/* Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center gap-3 h-12 rounded-xl bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors shadow"
          >
            <GoogleIcon />
            Continuer avec Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Manual form placeholder */}
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Adresse email"
              className="h-11 rounded-xl bg-white/8 border border-white/15 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-uni-gold/50 focus:border-uni-gold transition-colors"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="h-11 rounded-xl bg-white/8 border border-white/15 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-uni-gold/50 focus:border-uni-gold transition-colors"
            />
            <button className="h-12 rounded-xl bg-uni-gold text-uni-primary-dark font-bold text-sm hover:bg-uni-gold-light transition-colors shadow-lg">
              S'inscrire par email
            </button>
          </div>

          <p className="text-center text-xs text-white/30 mt-1">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-uni-gold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
