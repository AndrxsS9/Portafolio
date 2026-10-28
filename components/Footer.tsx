import { Github, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";
import { profile } from "@/data/profile";

const quickLinks = [
  { href: "#home", label: "Inicio" },
  { href: "#about", label: "Sobre mí" },
  { href: "#skills", label: "Habilidades" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Trayectoria" },
  { href: "#contact", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050507] text-zinc-400 border-t border-amber-500/20">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Andrés <span className="text-amber-400 font-extrabold">Yela</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            {profile.role} con 2 años de experiencia enfocado en soluciones web, mobile e Inteligencia Artificial.
          </p>
          <div className="mt-4 flex gap-2">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_12px_rgba(245,196,66,0.3)]"
              >
                <Github size={18} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_12px_rgba(245,196,66,0.3)]"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Enlaces rápidos">
          <h3 className="font-display font-semibold text-white">Enlaces rápidos</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-amber-400">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display font-semibold text-white">Especialidades</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>Desarrollo Web (Next.js & React)</li>
            <li>Desarrollo Móvil (React Native & Expo)</li>
            <li>Integración de IA (Gemini & OCR)</li>
            <li>APIs RESTful con TypeScript & Express</li>
            <li>Bases de Datos Relacionales (PostgreSQL)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="text-zinc-300 transition-colors hover:text-amber-400"
              >
                {profile.email}
              </a>
            </li>
            {profile.phone && <li>{profile.phone}</li>}
            <li>{profile.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <p className="wrap py-5 text-sm text-zinc-500 flex flex-wrap items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} <span className="text-zinc-300">{profile.fullName}</span>. Todos los derechos reservados.
          </span>
          <span className="text-xs text-amber-500/80 font-medium">
            Diseño Negro & Dorado · Ax Monogram
          </span>
        </p>
      </div>
    </footer>
  );
}
