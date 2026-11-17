"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { LangToggle, ThemeToggle } from "@/components/Toggles";
import { profile } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";

const ids = ["home", "about", "skills", "projects", "experience", "references", "contact"] as const;

export default function Navbar() {
  const { t } = usePrefs();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Barra de progreso de lectura + navbar compacta al bajar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Marca el enlace de la sección visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Cierra el menú móvil con Escape y bloquea el scroll del fondo
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled || open
          ? "border-accent/20 bg-bg/85 shadow-[0_10px_30px_-20px_var(--shadow)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className="absolute left-0 top-0 h-[2.5px] bg-gradient-to-r from-bar-from via-bar-via to-bar-to shadow-[0_0_8px_var(--glow)]"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <nav
        className={`wrap flex items-center justify-between gap-3 transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
        aria-label={t.nav.main}
      >
        <a href="#home" className="group flex min-w-0 items-center gap-2.5" aria-label={t.nav.backHome}>
          <Logo size={36} />
          <span className="hidden truncate min-[390px]:block font-display text-lg font-bold tracking-tight text-fg transition-colors group-hover:text-accent">
            {profile.shortName.first} <span className="font-extrabold text-accent">{profile.shortName.last}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-7">
          {ids.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative whitespace-nowrap py-1 text-sm font-medium transition-colors hover:text-accent ${
                  active === id ? "text-accent" : "text-fg-soft"
                }`}
              >
                {t.nav[id]}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-bar-from to-bar-via transition-all duration-300 ${
                    active === id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden !px-4 !py-2 text-sm lg:inline-flex">
            {t.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="icon-btn lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable con animación */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="min-h-0 space-y-1 border-t border-accent/20 px-5 pb-6 pt-3">
          {ids.map((id, i) => (
            <li
              key={id}
              className="transition-all duration-500"
              style={{
                transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                transform: open ? "none" : "translateX(-16px)",
                opacity: open ? 1 : 0,
              }}
            >
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`block rounded-lg px-3 py-2.5 text-base font-medium transition ${
                  active === id
                    ? "border border-accent/25 bg-accent/10 text-accent"
                    : "text-fg-soft hover:text-accent"
                }`}
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="btn btn-primary w-full"
            >
              {t.nav.cta}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
