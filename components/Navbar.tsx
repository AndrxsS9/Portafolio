"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { id: "home", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Habilidades" },
  { id: "projects", label: "Proyectos" },
  { id: "experience", label: "Trayectoria" },
  { id: "contact", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");

  // Barra de progreso de lectura dorada
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
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
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-500/20 bg-[#09090b]/90 backdrop-blur-md">
      <div
        className="absolute left-0 top-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 shadow-[0_0_8px_rgba(245,196,66,0.6)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <nav className="wrap flex h-16 items-center justify-between" aria-label="Principal">
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          aria-label="Ir al inicio - Ax"
        >
          <Logo size={36} />
          <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-amber-400">
            Andrés <span className="text-amber-400 font-extrabold">Yela</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors hover:text-amber-300 ${
                  active === l.id ? "text-amber-400" : "text-zinc-300"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 ${
                    active === l.id ? "w-full shadow-[0_0_6px_rgba(245,196,66,0.5)]" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-primary hidden !py-2 !px-4 md:inline-flex text-sm">
          Contactar
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 text-amber-400 bg-amber-500/5 transition hover:bg-amber-500/15 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-amber-500/20 bg-[#0c0c10] px-5 pb-5 pt-3 md:hidden space-y-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-base font-medium transition ${
                  active === l.id
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                    : "text-zinc-300 hover:text-amber-300"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full text-center"
            >
              Contactar
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
