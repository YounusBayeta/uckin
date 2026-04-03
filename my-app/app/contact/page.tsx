import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────── ICONS ──────────────────────────── */

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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* ── HERO ── */}
      <section className="relative bg-uni-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark opacity-90" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/90">Contact</span>
          </nav>
          <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-4">Soyez les Bienvenus</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {"Université Chrétienne de Kinshasa"}
          </h1>
          <p className="mt-3 text-2xl sm:text-3xl font-bold text-uni-gold">
            UCKIN
          </p>
          <p className="mt-4 text-sm sm:text-base text-white/50 font-medium">
            {"Détenteur d'agrément n°069/0106 du 12/12/2006"}
          </p>
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            {"N'hésitez pas à nous contacter pour toute question concernant les admissions, les programmes ou la vie universitaire."}
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS + MAP ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ─ INFO CARDS ─ */}
          <div className="lg:col-span-1 space-y-6">

            {/* Adresse */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-uni-primary/10 rounded-xl flex items-center justify-center mb-5">
                <MapPinIcon className="w-7 h-7 text-uni-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600 leading-relaxed">
                1 bis, Av. Université<br />
                C.A.C, Ngaliema<br />
                Kinshasa, RD Congo
              </p>
              <a
                href="https://maps.app.goo.gl/wLPxZoR4xW8YcPeG7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-uni-primary hover:text-uni-primary-dark transition-colors"
              >
                Voir sur Google Maps
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-uni-gold/10 rounded-xl flex items-center justify-center mb-5">
                <MailIcon className="w-7 h-7 text-uni-gold" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:info@uckin.ac.cd" className="text-gray-600 hover:text-uni-primary transition-colors">
                info@uckin.ac.cd
              </a>
              <p className="text-sm text-gray-400 mt-2">Réponse sous 24-48h</p>
            </div>

            {/* Téléphone */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-uni-accent/10 rounded-xl flex items-center justify-center mb-5">
                <PhoneIcon className="w-7 h-7 text-uni-accent" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Téléphone</h3>
              <a href="tel:+243898633680" className="text-gray-600 hover:text-uni-primary transition-colors">
                +243 898 633 680
              </a>
              <p className="text-sm text-gray-400 mt-2">Lun – Ven, 8h – 17h</p>
            </div>

            {/* Horaires */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-5">
                <ClockIcon className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Horaires</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <div className="flex justify-between">
                  <span>Lundi – Vendredi</span>
                  <span className="font-medium">8h00 – 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-medium">8h00 – 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-medium text-red-500">Fermé</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─ MAP + FORM ─ */}
          <div className="lg:col-span-2 space-y-8">

            {/* Google Maps */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Notre emplacement</h2>
                <p className="text-sm text-gray-500 mt-1">Université Uckin — Kinshasa, Ngaliema</p>
              </div>
              <div className="relative w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5!2d15.2667!3d-4.3333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33c4b1e9a5e7%3A0x0!2s1+bis+Avenue+de+l&#39;Universit%C3%A9%2C+Ngaliema%2C+Kinshasa!5e0!3m2!1sfr!2scd!4v1"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Uckin"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-500 mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons dans les meilleurs délais.</p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-uni-primary/30 focus:border-uni-primary transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-uni-primary/30 focus:border-uni-primary transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-uni-primary/30 focus:border-uni-primary transition-colors"
                  >
                    <option value="">Sélectionner un sujet</option>
                    <option value="admissions">Admissions & Inscriptions</option>
                    <option value="programmes">Programmes & Formations</option>
                    <option value="recherche">Recherche</option>
                    <option value="bourses">Bourses & Aides financières</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-uni-primary/30 focus:border-uni-primary transition-colors"
                    placeholder="+243 ..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-uni-primary/30 focus:border-uni-primary transition-colors resize-none"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-uni-primary text-white font-semibold rounded-xl hover:bg-uni-primary-dark transition-colors shadow-lg shadow-uni-primary/20"
                >
                  <SendIcon className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
