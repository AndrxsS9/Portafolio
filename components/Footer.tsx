"use client";

import { ArrowUp, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { profile, profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";

const ids = ["home", "about", "skills", "projects", "experience", "contact"] as const;

export default function Footer() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];

  return (
    <footer className="relative footer-bg border-t border-accent/20 text-muted">
      {/* Línea dorada superior */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bar-from/70 to-transparent" />

      <div className="wrap grid gap-8 py-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1.3fr_1.2fr] lg:py-14">
        {/* Marca */}
        <Reveal className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="font-display text-lg font-bold tracking-tight text-fg">
              {profile.shortName.first} <span className="font-extrabold text-accent">{profile.shortName.last}</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{p.tagline}</p>
          <div className="mt-4 flex gap-2">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                <Github size={18} />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                <Linkedin size={18} />
              </a>
            )}
            <a href={`mailto:${profile.email}`} aria-label={t.footer.contact} className="icon-btn">
              <Mail size={18} />
            </a>
          </div>
        </Reveal>

        {/* Enlaces: en móvil van en cuadrícula de 3 columnas para no hacer una lista larga */}
        <Reveal as="nav" delay={100} aria-label={t.footer.quick}>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg">{t.footer.quick}</h3>
          <ul className="mt-3 grid grid-cols-3 gap-2 text-sm sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-1 lg:gap-2">
            {ids.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block rounded-lg border border-line px-2 py-1.5 text-center transition-colors hover:border-accent/50 hover:text-accent sm:border-0 sm:p-0 sm:text-left"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Especialidades: en móvil se muestran como etiquetas compactas */}
        <Reveal delay={200}>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg">{t.footer.specialties}</h3>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm sm:block sm:space-y-2">
            {p.specialties.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-xs sm:rounded-none sm:border-0 sm:p-0 sm:text-sm">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={300}>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-fg">{t.footer.contact}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
              <a href={`mailto:${profile.email}`} className="min-w-0 break-all text-fg-soft transition-colors hover:text-accent">
                {profile.email}
              </a>
            </li>
            {profile.phone && <li className="pl-6">{profile.phone}</li>}
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
              {p.location}
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-5 text-center text-xs sm:flex-row sm:text-left sm:text-sm">
          <span>
            © {new Date().getFullYear()} <span className="text-fg-soft">{profile.fullName}</span>. {t.footer.rights}
          </span>
          <a href="#home" className="inline-flex items-center gap-1.5 font-medium text-accent transition-transform hover:-translate-y-0.5">
            <ArrowUp size={14} /> {t.footer.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
