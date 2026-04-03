import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-uni-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-uni-primary-dark via-uni-primary to-uni-primary-dark opacity-90" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36 text-center">
          <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-4">Soyez les Bienvenus</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {"Université Chrétienne de Kinshasa"}
          </h1>
          <p className="mt-4 text-3xl sm:text-4xl font-extrabold text-uni-gold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            UCKIN
          </p>
          <p className="mt-4 text-sm text-white/50 font-medium">
            {"Détenteur d'agrément n°069/0106 du 12/12/2006"}
          </p>
          <p className="mt-3 text-lg text-white/60 italic">Sciences et progrès par la foi</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-8 py-3.5 bg-uni-gold text-uni-primary-dark font-bold rounded-xl hover:bg-uni-gold-light transition-colors shadow-lg">
              {"S'inscrire"}
            </Link>
            <Link href="#facultes" className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Découvrir nos facultés
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALERIE BÂTIMENTS ── */}
      <section className="bg-uni-primary-dark overflow-hidden">
        <div className="marquee-track gap-1">
          {[
            "/images/bat1.jpeg", "/images/Bat2.jpeg", "/images/Bat3.jpeg", "/images/bat6.jpeg",
            "/images/bat1.jpeg", "/images/Bat2.jpeg", "/images/Bat3.jpeg", "/images/bat6.jpeg",
            "/images/bat1.jpeg", "/images/Bat2.jpeg", "/images/Bat3.jpeg", "/images/bat6.jpeg",
            "/images/bat1.jpeg", "/images/Bat2.jpeg", "/images/Bat3.jpeg", "/images/bat6.jpeg",
          ].map((src, i) => (
            <div key={i} className="relative w-40 sm:w-52 shrink-0 h-32 sm:h-40">
              <Image src={src} alt={`Campus UCKIN ${(i % 4) + 1}`} fill className="object-cover" sizes="(max-width: 768px) 256px, 320px" />
            </div>
          ))}
        </div>
      </section>

      {/* ── HISTORIQUE ── */}
      <section id="historique" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Text */}
            <div data-aos="fade-right">
              <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-3">Notre histoire</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Historique</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {"L'Université Chrétienne de Kinshasa (UCKIN) est le résultat de la fusion de deux écoles de théologie : l'École de Théologie Évangélique (ETE) de Kimpese dans l'actuelle province du Kongo Central et celle de KAJIJI au sud de l'actuelle province du Kwango."}
                </p>
                <p>
                  {"La fusion du 10 mars 1967 de ces Écoles a donné naissance à l'École de Théologie Évangélique de Kinshasa (ETEK), implantée à Kinshasa, dans la commune de Ngaliema."}
                </p>
                <p>
                  {"Elle est l'œuvre de six communautés membres de l'Église du Christ au Congo qui, dans le souci de combler le déficit d'auxiliaires devant prendre la relève en vue de la continuation de l'œuvre missionnaire dans les domaines clés de l'Église — Évangélisation, Enseignement et Médical — ont uni leurs efforts en créant l'ETEK."}
                </p>
              </div>

              {/* Communautés fondatrices */}
              <div className="mt-8 p-5 bg-uni-light rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Les six communautés fondatrices</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Communauté Baptiste du Congo (CBCO)",
                    "Communauté Baptiste du Fleuve Congo (CBFC)",
                    "Communauté des Églises Baptistes Unies (CEBU)",
                    "Communauté Évangélique au Congo (CEC)",
                    "Communauté des Églises de Frères Mennonites au Congo (CEFMC)",
                    "Communauté Mennonite au Congo (CMCO)",
                  ].map((c) => (
                    <div key={c} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-uni-gold mt-2 shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image + Timeline */}
            <div data-aos="fade-left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
                <Image src="/images/Campus.jpeg" alt="Campus UCKIN" width={600} height={400} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-uni-primary-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-semibold">Campus UCKIN</p>
                  <p className="text-xs text-white/70">Ngaliema, Kinshasa</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {[
                  { year: "1967", text: "Fusion des deux écoles de théologie → création de l'ETEK" },
                  { year: "1977", text: "Réforme — l'ETEK devient l'Institut Supérieur Théologique de Kinshasa (ISTK)" },
                  { year: "1995", text: "Transformation en Université Chrétienne de Kinshasa (UCKIN)" },
                  { year: "2006", text: "Agrément par Décret présidentiel N°06/0106" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4" data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-uni-gold ring-4 ring-uni-gold/20" />
                      {i < 3 && <div className="w-0.5 h-full bg-gray-200" />}
                    </div>
                    <div className="pb-6">
                      <span className="text-sm font-bold text-uni-primary">{item.year}</span>
                      <p className="text-sm text-gray-600 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIÈGE SOCIAL + FONDEMENT LÉGAL ── */}
      <section className="py-20 bg-uni-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Siège Social */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100" data-aos="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-uni-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-uni-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Siège social</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p>{"N° 1 bis, Avenue de l'Université"}</p>
                <p>Quartier CAC, Commune de Ngaliema</p>
                <p>Kinshasa / RDC</p>
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-uni-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                    (+243) 898 633 680
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-uni-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                    (+243) 829 354 083
                  </p>
                </div>
              </div>
            </div>

            {/* Fondement légal */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-uni-gold/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-uni-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fondement légal</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Personnalité civile", text: "Ordonnance N°73-10 du 21 janvier 1973" },
                  { label: "Agrément ETEK", text: "Arrêté Ministériel N° ESURS/CABMIN/0384/93 du 28 septembre 1993" },
                  { label: "Agrément UCKIN", text: "Décret présidentiel N°06/0106 du 12 juin 2006 — ESU privée agréée Confessionnelle" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-uni-light border border-gray-100">
                    <p className="text-xs font-bold text-uni-primary uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ORGANISATION & GESTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-3">Gouvernance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Organisation et gestion</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              {"Conformément à l'article 9 de ses statuts, l'UCKIN est organisée par les organes suivants :"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" data-aos="fade-up" data-aos-delay="100">
            {[
              { title: "Conseil d'Administration", icon: "🏛️" },
              { title: "Conseil de l'Université", icon: "🎓" },
              { title: "Comité de gestion", icon: "⚙️" },
              { title: "Conseil de faculté", icon: "📋" },
              { title: "Conseil de département", icon: "📂" },
            ].map((organ, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-uni-light border border-gray-100 hover:shadow-md transition-shadow" data-aos="zoom-in" data-aos-delay={i * 80}>
                <div className="text-3xl mb-3">{organ.icon}</div>
                <h3 className="text-sm font-bold text-gray-900">{organ.title}</h3>
              </div>
            ))}
          </div>

          {/* Recteur */}
          <div className="mt-12 text-center" data-aos="fade-up">
            <div className="inline-flex items-center gap-4 bg-uni-primary rounded-2xl px-8 py-5 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-uni-gold/20 flex items-center justify-center">
                <Image src="/images/logokin.jpeg" alt="UCKIN" width={48} height={48} className="rounded-full" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">Recteur a.i.</p>
                <p className="text-white font-bold text-lg">Rév. Dr. LOMBO SEDZO Laddy (PhD)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACULTÉS & FILIÈRES ── */}
      <section id="facultes" className="py-20 bg-uni-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-3">Formations</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Facultés et filières organisées</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Théologie */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow" data-aos="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-uni-primary text-white flex items-center justify-center font-bold">A</div>
                <h3 className="font-bold text-gray-900">Théologie Évangélique</h3>
              </div>
              <ul className="space-y-2">
                {["Ancien Testament", "Nouveau Testament", "Théologie Systématique", "Histoire de l'Église", "Missiologie", "Théologie Pratique"].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-uni-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Médecine */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-uni-accent text-white flex items-center justify-center font-bold">B</div>
                <h3 className="font-bold text-gray-900">Médecine Humaine</h3>
              </div>
              <p className="text-sm text-gray-500">Formation médicale complète pour les futurs professionnels de santé.</p>
            </div>

            {/* Admin / Éco / Développement */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-uni-gold text-uni-primary-dark flex items-center justify-center font-bold">C</div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">Admin. des Affaires, Sciences Éco. & Développement</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-uni-primary uppercase mb-2">1. Administration des Affaires</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Management", "Marketing", "Entrepreneuriat", "Gestion Financière", "Comptabilité & Audit"].map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-uni-light text-xs text-gray-700 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-uni-primary uppercase mb-2">2. Sciences Économiques</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Éco. Mathématique", "Éco. Monétaire", "Éco. Internationale", "Politiques Éco.", "Éco. Rurale"].map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-uni-light text-xs text-gray-700 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-uni-primary uppercase mb-2">3. Développement</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Planification", "Dév. Communautaire", "Gouvernance", "Gestion de Projets"].map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-uni-light text-xs text-gray-700 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Droit */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="150">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-uni-primary text-white flex items-center justify-center font-bold">D</div>
                <h3 className="font-bold text-gray-900">Droit</h3>
              </div>
              <ul className="space-y-2">
                {["Droit Public Interne", "Droit Privé Judiciaire"].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-uni-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Informatique */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-uni-gold text-uni-primary-dark flex items-center justify-center font-bold">E</div>
                <h3 className="font-bold text-gray-900">Sciences Informatiques</h3>
              </div>
              <p className="text-sm text-gray-500">Technologies de l'information, systèmes informatiques et gestion numérique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMPUS PHOTOS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-sm font-semibold text-uni-gold tracking-widest uppercase mb-3">Notre campus</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Découvrez nos installations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/bat1.jpeg", label: "Bâtiment principal" },
              { src: "/images/Bat2.jpeg", label: "Départements" },
              { src: "/images/Bat3.jpeg", label: "Église" },
              { src: "/images/bat6.jpeg", label: "Bibliothèque" },
              { src: "/images/bat7.jpeg", label: "Campus" },
            ].map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm" data-aos="zoom-in" data-aos-delay={i * 60}>
                <Image src={img.src} alt={img.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                <p className="absolute bottom-3 left-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
