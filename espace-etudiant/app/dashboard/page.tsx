"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
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

const NAV_LINKS = [
  { id: "vie-etudiante", label: "Vie \u00e9tudiante" },
  { id: "diplomes", label: "Dipl\u00f4mes & Formations" },
  { id: "calendrier", label: "Calendrier acad\u00e9mique" },
  { id: "stages", label: "Stages" },
  { id: "documents", label: "Documents" },
];

const NAV_IDS = NAV_LINKS.map((n) => n.id);

/*  Fade-in on scroll  */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/*  Scroll spy  */
function useActiveSection() {
  const [active, setActive] = useState(NAV_IDS[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return active;
}

/*  Section heading  */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8">
      <h2
        className="text-3xl font-bold"
        style={{ color: "var(--uni-primary)", fontFamily: "var(--font-playfair), serif" }}
      >
        {children}
      </h2>
      <div
        className="mt-3 h-1 w-14 rounded-full"
        style={{ background: "var(--uni-gold)" }}
      />
    </div>
  );
}

/*  Numbered step  */
function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div
      className="flex gap-5 pb-8 border-b border-gray-100 last:border-0"
    >
      <div
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
        style={{ background: "var(--uni-primary)" }}
      >
        {n}
      </div>
      <div>
        <h3
          className="font-bold text-lg mb-2"
          style={{ color: "var(--uni-primary)" }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

/*  Main page  */
export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${AUTH_URL}/auth/me`, { credentials: "include" });
        const data = await res.json();
        if (data.success) setUser(data.user);
        else window.location.href = "/";
      } catch {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleLogout() {
    await fetch(`${AUTH_URL}/auth/logout`, { method: "POST", credentials: "include" });
    window.location.href = "/";
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--uni-light)" }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: "var(--uni-primary)", borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-sm text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--uni-light)" }}
    >
      {/*  Top bar  */}
      <header
        className="sticky top-0 z-50 h-14 flex items-center px-6 gap-4 shadow-lg"
        style={{ background: "var(--uni-primary-dark)" }}
      >
        <a href={MAIN_SITE_URL} className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logokin.jpeg"
            alt="UCKIN"
            width={32}
            height={32}
            className="rounded-full"
            style={{ boxShadow: "0 0 0 2px rgba(196,163,90,0.4)" }}
          />
          <span
            className="hidden sm:block text-white font-bold text-sm tracking-widest"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            UCKIN
          </span>
        </a>
        <div className="flex-1" />
        <span className="hidden sm:block text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          {user.first_name} {user.last_name}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-1.5 rounded transition-colors"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.8)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          D\u00e9connexion
        </button>
      </header>

      {/*  Hero  */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 40vw, 480px)" }}>
        <style>{`
          @keyframes kenburns {
            from { transform: scale(1) translate(0, 0); }
            to   { transform: scale(1.12) translate(-1.5%, 1%); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(32px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <Image
          src="/images/Bat2.jpeg"
          alt="Campus UCKIN"
          fill
          className="object-cover"
          priority
          style={{ animation: "kenburns 18s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,36,64,0.5) 0%, rgba(15,36,64,0.35) 40%, rgba(15,36,64,0.9) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 md:px-16">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{
              color: "var(--uni-gold)",
              animation: "fadeSlideUp 0.8s ease 0.3s both",
            }}
          >
            Université Chrétienne de Kinshasa
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{
              fontFamily: "var(--font-playfair), serif",
              animation: "fadeSlideUp 0.8s ease 0.5s both",
            }}
          >
            Espace \u00c9tudiant
          </h1>
          <p
            className="mt-3 text-base md:text-lg max-w-xl"
            style={{
              color: "rgba(255,255,255,0.72)",
              animation: "fadeSlideUp 0.8s ease 0.75s both",
            }}
          >
            Découvrez nos aménagements et dispositifs pour vous faciliter la vie d&apos;étudiant.
          </p>
        </div>
      </div>

      {/*  Body: sidebar + content  */}
      <div
        className="max-w-6xl mx-auto w-full flex gap-0 md:gap-12 px-4 md:px-10 py-12"
      >
        {/*  Sidebar desktop  */}
        <aside className="hidden md:block w-52 shrink-0">
          <div className="sticky top-20">
            {/* User card */}
            <div
              className="mb-6 px-4 py-4 bg-white rounded-lg shadow-sm"
              style={{ borderLeft: "4px solid var(--uni-gold)" }}
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Connect\u00e9
              </p>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--uni-primary)" }}
              >
                {user.first_name} {user.last_name}
              </p>
              {user.matricule && (
                <p className="text-xs text-gray-400 mt-1">N\u00b0 {user.matricule}</p>
              )}
            </div>

            {/* Nav links  plain text, no icons */}
            <nav>
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="w-full text-left py-3 px-4 text-sm transition-all duration-200"
                      style={{
                        borderLeft:
                          activeSection === link.id
                            ? "4px solid var(--uni-gold)"
                            : "4px solid transparent",
                        background:
                          activeSection === link.id ? "white" : "transparent",
                        color:
                          activeSection === link.id
                            ? "var(--uni-primary)"
                            : "#6b7280",
                        fontWeight:
                          activeSection === link.id ? "600" : "400",
                        boxShadow:
                          activeSection === link.id
                            ? "0 1px 4px rgba(0,0,0,0.06)"
                            : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== link.id) {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.color = "var(--uni-primary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== link.id) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#6b7280";
                        }
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 px-4">
              <a
                href={MAIN_SITE_URL}
                className="flex items-center gap-2 text-xs text-gray-400 transition-colors hover:text-gray-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Site principal
              </a>
            </div>
          </div>
        </aside>

        {/*  Mobile nav  */}
        <div className="md:hidden w-full mb-8">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded"
            style={{
              border: "1px solid var(--uni-primary)",
              color: "var(--uni-primary)",
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Navigation
          </button>
          {mobileNavOpen && (
            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left px-5 py-3 text-sm border-b border-gray-50 last:border-0"
                  style={{ color: "var(--uni-primary)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/*  Main content  */}
        <main className="flex-1 min-w-0 space-y-24">

          {/*  Vie \u00e9tudiante  */}
          <section id="vie-etudiante" className="scroll-mt-24">
            <FadeIn>
              <SectionHeading>Vie \u00e9tudiante</SectionHeading>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-gray-600 leading-relaxed mb-10 text-base">
                L\u2019UCKIN dispose d\u2019un campus dynamique \u00e0 Kinshasa avec des salles de cours
                modernes, enti\u00e8rement \u00e9quip\u00e9es de vid\u00e9oprojecteurs et d\u2019un acc\u00e8s internet.
                Un environnement propice \u00e0 votre r\u00e9ussite acad\u00e9mique et \u00e0 votre
                \u00e9panouissement personnel.
              </p>
            </FadeIn>

            {/* Photo left + text right */}
            <FadeIn delay={150}>
              <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
                <div className="md:w-1/2 relative rounded-lg overflow-hidden shrink-0 shadow-md" style={{ height: "260px" }}>
                  <Image
                    src="/images/Etu1.jpeg"
                    alt="Vie \u00e9tudiante UCKIN"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--uni-primary)" }}
                  >
                    Un cadre universitaire complet
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    La biblioth\u00e8que universitaire met \u00e0 votre disposition des milliers
                    d\u2019ouvrages, des revues acad\u00e9miques et des ressources documentaires
                    num\u00e9riques. C\u2019est l\u2019endroit id\u00e9al pour travailler, r\u00e9viser et approfondir
                    vos connaissances en dehors des cours.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      "Acc\u00e8s \u00e0 la messagerie universitaire et \u00e0 l\u2019agenda",
                      "Cours en ligne via l\u2019espace num\u00e9rique de travail",
                      "Ressources documentaires (th\u00e8ses, m\u00e9moires\u2026)",
                      "Applications administratives (scolarit\u00e9, r\u00e9sultats)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--uni-gold)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Full-width photo */}
            <FadeIn delay={200}>
              <div className="relative rounded-lg overflow-hidden mb-8 shadow-md" style={{ height: "280px" }}>
                <Image
                  src="/images/Etu2.jpeg"
                  alt="Campus UCKIN"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                  }}
                />
                <p className="absolute bottom-5 left-6 text-white text-sm font-semibold tracking-wide">
                  Espaces de vie \u2014 Campus UCKIN
                </p>
              </div>
            </FadeIn>

            {/* 2-photo grid */}
            <FadeIn delay={250}>
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="relative rounded-lg overflow-hidden shadow-sm" style={{ height: "210px" }}>
                  <Image
                    src="/images/Etu3.jpeg"
                    alt="\u00c9tudiants UCKIN"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden shadow-sm" style={{ height: "210px" }}>
                  <Image
                    src="/images/Etu4.jpeg"
                    alt="Vie \u00e9tudiante UCKIN"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div
                className="p-6 bg-white rounded-lg shadow-sm"
                style={{ borderLeft: "4px solid var(--uni-primary)" }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--uni-primary)" }}>
                  L\u2019Espace Num\u00e9rique de Travail (ENT)
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Cet espace commun \u00e0 l\u2019ensemble de la communaut\u00e9 universitaire propose de nombreux
                  services selon votre profil. L\u2019acc\u00e8s se fait gr\u00e2ce \u00e0 vos identifiants univers\u00e9sitaires UCKIN.
                </p>
              </div>
            </FadeIn>
          </section>

          {/*  Dipl\u00f4mes & Formations  */}
          <section id="diplomes" className="scroll-mt-24">
            <FadeIn>
              <SectionHeading>Dipl\u00f4mes &amp; Formations</SectionHeading>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-gray-600 leading-relaxed mb-10 text-base">
                L\u2019UCKIN propose des formations de niveau Licence, Master et Doctorat dans
                plusieurs domaines acad\u00e9miques. Chaque parcours allie rigueur th\u00e9orique et
                comp\u00e9tences pratiques.
              </p>
            </FadeIn>

            {/* Text left + photo right */}
            <FadeIn delay={150}>
              <div className="flex flex-col md:flex-row-reverse gap-8 mb-10 items-start">
                <div className="md:w-1/2 relative rounded-lg overflow-hidden shrink-0 shadow-md" style={{ height: "240px" }}>
                  <Image
                    src="/images/Dip1.jpeg"
                    alt="Formations UCKIN"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--uni-primary)" }}
                  >
                    Licence (L1 \u2013 L3)
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Les programmes de licence offrent une formation acad\u00e9mique solide de trois
                    ans. Chaque parcours est structur\u00e9 par des unit\u00e9s d\u2019enseignement progressives
                    permettant d\u2019acqu\u00e9rir les fondamentaux th\u00e9oriques et pratiques de la
                    discipline choisie.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Photo left + text right */}
            <FadeIn delay={200}>
              <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
                <div className="md:w-1/2 relative rounded-lg overflow-hidden shrink-0 shadow-md" style={{ height: "240px" }}>
                  <Image
                    src="/images/Dip2.jpeg"
                    alt="Master UCKIN"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--uni-primary)" }}
                  >
                    Master (M1 \u2013 M2)
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Les masters de l\u2019UCKIN offrent une sp\u00e9cialisation approfondie en deux ans
                    apr\u00e8s la licence. Ils pr\u00e9parent les \u00e9tudiants \u00e0 des postes \u00e0 responsabilit\u00e9s
                    dans leur secteur ou \u00e0 la poursuite en doctorat.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Full-width diploma photo */}
            <FadeIn delay={250}>
              <div className="relative rounded-lg overflow-hidden shadow-md" style={{ height: "220px" }}>
                <Image
                  src="/images/Dip3.jpeg"
                  alt="C\u00e9r\u00e9monie UCKIN"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                  }}
                />
                <p className="absolute bottom-5 left-6 text-white text-sm font-semibold">
                  C\u00e9r\u00e9monie de remise des dipl\u00f4mes \u2014 UCKIN
                </p>
              </div>
            </FadeIn>
          </section>

          {/*  Calendrier  */}
          <section id="calendrier" className="scroll-mt-24">
            <FadeIn>
              <SectionHeading>Calendrier acad\u00e9mique</SectionHeading>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-gray-600 leading-relaxed mb-8 text-base">
                Retrouvez ici les plannings annuels par fili\u00e8re ainsi que les dates importantes
                de l\u2019ann\u00e9e universitaire en cours.
              </p>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="space-y-3">
                {[
                  "Licence d\u2019Administration des Affaires",
                  "Licence de Th\u00e9ologie",
                  "Master d\u2019Administration des Affaires",
                  "Master de Th\u00e9ologie",
                ].map((title) => (
                  <div
                    key={title}
                    className="flex items-center justify-between p-5 bg-white rounded-lg border border-gray-100 shadow-sm transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--uni-gold)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgb(243,244,246)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.05)";
                    }}
                  >
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "var(--uni-primary)" }}
                    >
                      {title}
                    </h3>
                    <a
                      href="#"
                      className="text-xs px-4 py-2 rounded flex items-center gap-2 text-white transition-colors"
                      style={{ background: "var(--uni-primary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--uni-primary-dark)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "var(--uni-primary)")
                      }
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Voir le planning
                    </a>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>

          {/*  Stages  */}
          <section id="stages" className="scroll-mt-24">
            <FadeIn>
              <SectionHeading>Stages</SectionHeading>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-gray-600 leading-relaxed mb-10 text-base">
                La r\u00e9alisation d\u2019un stage est une \u00e9tape essentielle dans votre parcours
                universitaire. Suivez les \u00e9tapes ci-dessous pour cr\u00e9er et valider votre
                convention de stage.
              </p>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="space-y-0">
                <Step n={1} title="Trouvez votre stage">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Recherchez votre stage via les offres disponibles sur le portail universitaire
                    ou directement aupr\u00e8s des entreprises partenaires de l\u2019UCKIN. Consultez
                    \u00e9galement le tableau d\u2019affichage du secr\u00e9tariat.
                  </p>
                </Step>
                <Step n={2} title="Cr\u00e9ez votre convention de stage">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Rendez-vous au secr\u00e9tariat de scolarit\u00e9. Munissez-vous des informations
                    suivantes\u00a0:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      "Votre num\u00e9ro d\u2019\u00e9tudiant et votre carte universitaire",
                      "Les coordonn\u00e9es compl\u00e8tes du tuteur professionnel",
                      "Th\u00e8me, t\u00e2ches, dates de d\u00e9but et fin, montant de la gratification",
                      "Informations de l\u2019organisme d\u2019accueil (raison sociale, adresse)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--uni-gold)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Step>
                <Step n={3} title="D\u00e9posez vos exemplaires au secr\u00e9tariat">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Imprimez la convention en trois exemplaires et d\u00e9posez-les au secr\u00e9tariat.
                    La convention doit \u00eatre sign\u00e9e dans l\u2019ordre\u00a0: l\u2019\u00e9tudiant, le repr\u00e9sentant de
                    l\u2019entreprise, le tuteur enseignant, puis le directeur de l\u2019UCKIN.
                  </p>
                </Step>
                <Step n={4} title="R\u00e9cup\u00e9rez vos exemplaires sign\u00e9s">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Une fois les conventions sign\u00e9es par la direction, vous recevrez un e-mail.
                    Venez retirer deux exemplaires sign\u00e9s au secr\u00e9tariat (un pour vous, un
                    pour l\u2019entreprise).
                  </p>
                </Step>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div
                className="mt-8 p-6 bg-white rounded-lg shadow-sm"
                style={{ borderLeft: "4px solid var(--uni-accent)" }}
              >
                <p
                  className="font-bold text-sm mb-2"
                  style={{ color: "var(--uni-accent)" }}
                >
                  Important\u00a0!
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  La convention de stage doit imp\u00e9rativement \u00eatre sign\u00e9e{" "}
                  <strong>avant le d\u00e9but du stage</strong>. Aucun stage d\u00e9marr\u00e9 sans
                  convention valid\u00e9e ne pourra \u00eatre pris en charge par l\u2019universit\u00e9.
                </p>
              </div>
            </FadeIn>
          </section>

          {/*  Documents  */}
          <section id="documents" className="scroll-mt-24">
            <FadeIn>
              <SectionHeading>Documents</SectionHeading>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="text-gray-600 leading-relaxed mb-8 text-base">
                Retrouvez vos documents administratifs disponibles en t\u00e9l\u00e9chargement ou \u00e0
                retirer au secr\u00e9tariat.
              </p>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Certificat de scolarit\u00e9",
                    desc: "Attestation d\u2019inscription \u00e0 l\u2019ann\u00e9e en cours",
                  },
                  {
                    title: "Relev\u00e9 de notes",
                    desc: "R\u00e9sultats semestriels et annuels",
                  },
                  {
                    title: "Carte \u00e9tudiante",
                    desc: "\u00c0 retirer au bureau de la scolarit\u00e9",
                  },
                  {
                    title: "Formulaire de bourse",
                    desc: "Dossier de demande d\u2019aide financi\u00e8re",
                  },
                  {
                    title: "Attestation de r\u00e9ussite",
                    desc: "Disponible apr\u00e8s validation du jury",
                  },
                  {
                    title: "Guide de l\u2019\u00e9tudiant",
                    desc: "R\u00e8glement int\u00e9rieur et informations pratiques",
                  },
                ].map((doc) => (
                  <div
                    key={doc.title}
                    className="flex items-center gap-4 p-5 bg-white rounded-lg border border-gray-100 shadow-sm cursor-pointer transition-all duration-200 group"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--uni-gold)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgb(243,244,246)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded flex items-center justify-center"
                      style={{ background: "var(--uni-light)" }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ color: "var(--uni-primary)" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--uni-primary)" }}
                      >
                        {doc.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>

        </main>
      </div>

      {/*  Footer  */}
      <footer
        className="mt-16 py-8 px-6"
        style={{ background: "var(--uni-primary-dark)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logokin.jpeg"
              alt="UCKIN"
              width={40}
              height={40}
              className="rounded-full"
              style={{ opacity: 0.8 }}
            />
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Universit\u00e9 Chr\u00e9tienne de Kinshasa
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Portail \u00c9tudiant \u2014 {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            \u00a9 UCKIN \u2014 Tous droits r\u00e9serv\u00e9s
          </p>
        </div>
      </footer>
    </div>
  );
}
