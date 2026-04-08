"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function HeroSection() {
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const uckinRef = useRef<HTMLParagraphElement>(null);
  const agrémentRef = useRef<HTMLParagraphElement>(null);
  const deviseRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          welcomeRef.current,
          titleRef.current,
          uckinRef.current,
          agrémentRef.current,
          deviseRef.current,
          btnsRef.current,
        ],
        {
          opacity: 0,
          y: 60,
          scale: 0.97,
          filter: "blur(6px)",
          duration: 1.6,
          stagger: 0.25,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-uni-primary-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark opacity-90" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36 text-center">
        <p
          ref={welcomeRef}
          className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-4"
        >
          Soyez les Bienvenus
        </p>
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
        >
          {"Université Chrétienne de Kinshasa"}
        </h1>
        <p
          ref={uckinRef}
          className="mt-4 text-3xl sm:text-4xl font-extrabold text-uni-gold"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          UCKIN
        </p>
        <p ref={agrémentRef} className="mt-4 text-sm text-white/50 font-medium">
          {"Détenteur d'agrément n°069/0106 du 12/12/2006"}
        </p>
        <p ref={deviseRef} className="mt-3 text-lg text-white/60 italic">
          Sciences et progrès par la foi
        </p>
        <div
          ref={btnsRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/rejoindre"
            className="px-8 py-3.5 bg-uni-gold text-uni-primary-dark font-bold rounded-xl hover:bg-uni-gold-light transition-colors shadow-lg"
          >
            {"S'inscrire"}
          </Link>
          <Link
            href="#facultes"
            className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
          >
            Découvrir nos facultés
          </Link>
        </div>
      </div>
    </section>
  );
}
