import Link from "next/link";
import Image from "next/image";

/* ──────────────────────────── ICONS ──────────────────────────── */

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 0L0 8V22C0 35.2 8.53 47.36 20 48C31.47 47.36 40 35.2 40 22V8L20 0Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M20 4L4 10.67V22C4 33.07 11.2 43.5 20 44.4V4Z"
        fill="currentColor"
        opacity="0.7"
      />
      <text x="20" y="30" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif">
        U
      </text>
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ──────────────────────────── DATA ──────────────────────────── */

const footerLinks = [
  {
    title: "Formations",
    links: [
      { label: "Licence (L1–L3)", href: "#licence" },
      { label: "Master (M1–M2)", href: "#master" },
      { label: "Formation continue", href: "#fc" },
      { label: "Catalogue des cours", href: "#catalogue" },
    ],
  },
  {
    title: "Recherche",
    links: [
      { label: "Laboratoires", href: "#lab-sciences" },
      { label: "Publications", href: "#revues" },
      { label: "Projets en cours", href: "#projets" },
      { label: "Partenariats", href: "#partenariats" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Conditions d'admission", href: "#conditions" },
      { label: "Inscription", href: "#inscription" },
      { label: "Bourses & Aides", href: "#bourses" },
      { label: "Étudiants internationaux", href: "#international" },
    ],
  },
  {
    title: "Vie Universitaire",
    links: [
      { label: "Sport & Culture", href: "#sport" },
      { label: "Associations", href: "#associations" },
      { label: "Santé étudiante", href: "#sante" },
      { label: "Numérique & ENT", href: "#ent" },
    ],
  },
];

/* ──────────────────────────── FOOTER ──────────────────────────── */

export default function Footer() {
  return (
    <footer className="bg-uni-primary-dark text-white mt-auto">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-uni-gold via-uni-gold-light to-uni-gold" />

      <div className="mx-auto max-w-7xl px-6 pt-14 pb-8">
        {/* Top section: Logo + Contact + Link columns */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Logo & Contact info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logokin.jpeg" alt="Uckin" width={48} height={48} className="rounded-full" />
              <div className="leading-tight">
                <span
                  className="block text-2xl font-extrabold tracking-tight text-white"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Uckin
                </span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-uni-gold font-semibold">
                  Sciences et progrès par la foi
                </span>
              </div>
            </Link>

            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0 text-uni-gold" />
                <span>1 bis, Av. Université, C.A.C, Ngaliema</span>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 shrink-0 text-uni-gold" />
                <a href="mailto:info@uckin.ac.cd" className="hover:text-uni-gold transition-colors duration-200">
                  info@uckin.ac.cd
                </a>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 shrink-0 text-uni-gold" />
                <a href="tel:+243898633680" className="hover:text-uni-gold transition-colors duration-200">
                  +243 898 633 680
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-uni-gold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-uni-gold transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col items-center gap-4 text-xs text-white/40">
            <p className="text-center">&copy; {new Date().getFullYear()} Uckin. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href="#mentions-legales" className="hover:text-white/70 transition-colors">
                Mentions légales
              </Link>
              <span className="text-white/20">|</span>
              <Link href="#confidentialite" className="hover:text-white/70 transition-colors">
                Confidentialité
              </Link>
              <span className="text-white/20">|</span>
              <Link href="#accessibilite" className="hover:text-white/70 transition-colors">
                Accessibilité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
