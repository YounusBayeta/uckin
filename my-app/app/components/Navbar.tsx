"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ──────────────────────────── DATA ──────────────────────────── */

const STUDENT_PORTAL_URL = process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL || "https://etudiant.uckin.ac.cd/";

const utilityLinks = [
  { label: "Espace Étudiant", href: STUDENT_PORTAL_URL },
  { label: "Enseignants", href: "#enseignants" },
  { label: "Chercheurs", href: "#chercheurs" },
  { label: "Alumni", href: "#alumni" },
  { label: "Contact", href: "/contact" },
];

interface SubLink {
  label: string;
  href: string;
  description?: string;
}

interface NavCategory {
  label: string;
  href: string;
  columns: { title: string; links: SubLink[] }[];
}

const navItems: NavCategory[] = [
  {
    label: "Formations",
    href: "#formations",
    columns: [
      {
        title: "Facultés organisées",
        links: [
          { label: "Théologie Évangélique", href: "#theologie", description: "Foi chrétienne & enseignement" },
          { label: "Admin. des Affaires Économiques", href: "#admin-affaires", description: "Gestion & économie" },
          { label: "Droit", href: "#droit", description: "Formation juridique" },
          { label: "Gestion Informatique", href: "#gestion-info", description: "Technologies & systèmes" },
        ],
      },
      {
        title: "Cycles LMD",
        links: [
          { label: "Licence (L1–L2–L3)", href: "#licence", description: "Parcours fondamentaux — 3 ans" },
          { label: "Master (M1–M2)", href: "#master", description: "Spécialisations avancées — 2 ans" },
        ],
      },
      {
        title: "Programmes",
        links: [
          { label: "Formation continue", href: "#fc" },
          { label: "Diplômes universitaires", href: "#du" },
          { label: "Certificats", href: "#certificats" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "#services",
    columns: [
      {
        title: "Autres services organisés",
        links: [
          { label: "Centre Hospitalo-Universitaire", href: "#chu", description: "Soins médicaux" },
          { label: "Secrétariat", href: "#secretariat", description: "Services administratifs" },
          { label: "Cyber Café", href: "#cyber-cafe", description: "Accès internet" },
          { label: "Labo Médical", href: "#labo-medical", description: "Analyses & examens" },
          { label: "Langues", href: "#langues", description: "Cours de langues" },
          { label: "ECCF des Femmes", href: "#eccf", description: "Formation féminine" },
        ],
      },
    ],
  },
  {
    label: "Recherche",
    href: "#recherche",
    columns: [
      {
        title: "Laboratoires",
        links: [
          { label: "Sciences & Technologies", href: "#lab-sciences" },
          { label: "Santé & Médecine", href: "#lab-sante" },
        ],
      },
    ],
  },
  {
    label: "Admissions",
    href: "#admissions",
    columns: [
      {
        title: "S'inscrire",
        links: [
          { label: "Conditions d'admission", href: "#conditions" },
          { label: "Procédure d'inscription", href: "#inscription" },
          { label: "Frais de scolarité", href: "#frais" },
          { label: "Bourses & Aides", href: "#bourses" },
        ],
      },
    ],
  },
  {
    label: "Vie Universitaire",
    href: "#vie-univ",
    columns: [
      {
        title: "Campus",
        links: [
          { label: "Logement", href: "#logement" },
          { label: "Sport & Culture", href: "#sport" },
          { label: "Associations étudiantes", href: "#associations" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Orientation & Insertion", href: "#orientation" },
          { label: "Santé étudiante", href: "#sante" },
          { label: "Numérique & ENT", href: "#ent" },
        ],
      },
    ],
  },
  {
    label: "À propos",
    href: "#a-propos",
    columns: [
      {
        title: "L'Université",
        links: [
          { label: "Histoire & Mission", href: "#histoire" },
          { label: "Gouvernance", href: "#gouvernance" },
          { label: "Chiffres clés", href: "#chiffres" },
          { label: "Classements", href: "#classements" },
        ],
      },
      {
        title: "Communication",
        links: [
          { label: "Actualités", href: "#actualites" },
          { label: "Événements", href: "#evenements" },
          { label: "Presse", href: "#presse" },
        ],
      },
    ],
  },
];

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
      <text
        x="20"
        y="30"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="bold"
        fontFamily="Georgia, serif"
      >
        
      </text>
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

/* ──────────────────────────── TOP BAR ──────────────────────────── */

function TopBar() {
  return (
    <div className="hidden lg:block bg-uni-primary-dark text-white/80 text-xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-1.5">
        <nav className="flex items-center gap-4" aria-label="Liens utilitaires">
          {utilityLinks.map((l, i) => (
            <span key={l.href} className="flex items-center gap-4">
              {i > 0 && <span className="text-white/30" aria-hidden>|</span>}
              {l.href.startsWith("http") ? (
                <a href={l.href} className="hover:text-uni-gold transition-colors duration-200">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="hover:text-uni-gold transition-colors duration-200">
                  {l.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 hover:bg-uni-gold hover:text-uni-primary-dark transition-colors duration-200">
            FR
          </button>
          <button className="px-2 py-0.5 rounded text-[11px] font-semibold hover:bg-white/10 transition-colors duration-200">
            EN
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── DROPDOWN ──────────────────────────── */

function DropdownMenu({ item }: { item: NavCategory }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <div className="bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden min-w-[540px]">
        <div className="h-[3px] bg-uni-primary" />
        <div className={`grid gap-0 ${item.columns.length >= 3 ? "grid-cols-3" : item.columns.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {item.columns.map((col, idx) => (
            <div key={col.title} className={`p-6 ${idx > 0 ? "border-l border-gray-100" : ""}`}>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-uni-primary mb-4">
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/link block rounded-md px-3 py-2 -mx-1 hover:bg-uni-primary/5 transition-colors duration-150"
                    >
                      <span className="text-[13px] font-medium text-gray-700 group-hover/link:text-uni-primary transition-colors">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-[11px] text-gray-400 mt-0.5">
                          {link.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── MAIN NAV ──────────────────────────── */

function MainNav({
  onMenuOpen,
  searchOpen,
  setSearchOpen,
}: {
  onMenuOpen: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
    if (!searchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [searchOpen]);

  const allLinks = navItems.flatMap((item) =>
    item.columns.flatMap((col) => col.links.map((link) => ({ label: link.label, href: link.href })))
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const q = query.toLowerCase();
    setSearchResults(allLinks.filter((l) => l.label.toLowerCase().includes(q)));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      window.location.hash = searchResults[0].href.replace("#", "");
      setSearchOpen(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-[72px]">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/images/logokin.jpeg" alt="Uckin" width={44} height={44} className="rounded-full" />
          <div className="hidden sm:block leading-tight">
            <span
              className="block text-2xl font-extrabold tracking-tight text-uni-primary"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Uckin
            </span>
            <span className="block text-[10px] uppercase tracking-[0.1em] text-uni-gold font-semibold">
              Sciences et progrès par la foi
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-uni-primary hover:bg-uni-light transition-colors duration-200"
              >
                {item.label}
                <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-uni-primary transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <DropdownMenu item={item} />
            </div>
          ))}
        </nav>

        {/* Right side: Search + Mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative flex items-center">
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                searchOpen ? "w-56 opacity-100 mr-2" : "w-0 opacity-0"
              }`}
            >
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher..."
                className="w-full h-9 rounded-full bg-uni-light border border-gray-200 px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-uni-gold/50 focus:border-uni-gold"
              />
            </div>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-uni-light text-gray-600 hover:text-uni-primary transition-colors duration-200"
              aria-label={searchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
            >
              {searchOpen ? <CloseIcon className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
            </button>

            {/* Search results dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="h-1 bg-gradient-to-r from-uni-gold via-uni-gold-light to-uni-gold" />
                <ul className="py-2 max-h-60 overflow-y-auto">
                  {searchResults.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        onClick={() => setSearchOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-uni-light hover:text-uni-primary transition-colors"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchOpen && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <p className="px-4 py-3 text-sm text-gray-400">Aucun résultat</p>
              </div>
            )}
          </div>

            {/* Mobile hamburger */}
          <button
            onClick={onMenuOpen}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-uni-light text-gray-600"
            aria-label="Ouvrir le menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── MOBILE MENU ──────────────────────────── */

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image src="/images/logokin.jpeg" alt="Uckin" width={36} height={36} className="rounded-full" />
            <span
              className="text-xl font-extrabold text-uni-primary"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Uckin
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Fermer le menu"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full h-10 rounded-full bg-uni-light border border-gray-200 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-uni-gold/50"
            />
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {navItems.map((item) => {
            const isExpanded = expanded === item.label;
            return (
              <div key={item.label} className="mb-1">
                <button
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-uni-light transition-colors duration-150"
                >
                  {item.label}
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion content */}
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-3 pb-2">
                    {item.columns.map((col) => (
                      <div key={col.title} className="mb-3">
                        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-uni-primary/50 mb-1">
                          {col.title}
                        </p>
                        {col.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="block px-3 py-1.5 text-sm text-gray-600 hover:text-uni-primary hover:bg-uni-light rounded-md transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom utility links */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-gray-50/80 backdrop-blur px-5 py-4">
          <div className="flex flex-wrap gap-3 justify-center text-xs text-gray-500">
            {utilityLinks.map((l) => (
              l.href.startsWith("http") ? (
                <a key={l.href} href={l.href} className="hover:text-uni-primary transition-colors">
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href} onClick={onClose} className="hover:text-uni-primary transition-colors">
                  {l.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────── NAVBAR (EXPORTED) ──────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header>
      <TopBar />
      <MainNav
        onMenuOpen={() => setMobileOpen(true)}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
