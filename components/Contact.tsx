"use client";

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Contacto desde portafolio: ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-zinc-700/80 bg-[#14141c] px-4 py-3 text-white placeholder:text-zinc-500 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20";

  return (
    <section id="contact" className="section relative bg-gradient-to-b from-[#09090b] via-[#0d0d14] to-[#060608] border-t border-zinc-800/60 text-white">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Hablemos
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Trabajemos <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">juntos</span>
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-zinc-400">
            ¿Tienes un proyecto, propuesta o consulta? Puedes escribirme directamente y
            conversamos sobre cómo puedo aportar valor técnico y creativo.
          </p>

          <ul className="mt-9 space-y-5">
            <li className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <Mail size={22} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-zinc-400">Correo Electrónico</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-semibold text-zinc-200 transition-colors hover:text-amber-300 underline-offset-4 hover:underline"
                >
                  {profile.email}
                </a>
              </span>
            </li>

            {profile.phone && (
              <li className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                  <Phone size={22} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-zinc-400">Teléfono / WhatsApp</span>
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                    className="font-semibold text-zinc-200 transition-colors hover:text-amber-300 underline-offset-4 hover:underline"
                  >
                    {profile.phone}
                  </a>
                </span>
              </li>
            )}

            <li className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <MapPin size={22} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-zinc-400">Ubicación</span>
                <span className="font-semibold text-zinc-200">{profile.location}</span>
              </span>
            </li>
          </ul>

          <h3 className="mt-12 font-display text-xl font-semibold text-white">Redes & Perfiles</h3>
          <ul className="mt-4 space-y-3 max-w-sm">
            {profile.github && (
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#121217] px-4 py-3 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
                >
                  <Github size={22} className="text-amber-400" />
                  <span>
                    <span className="block font-semibold text-zinc-200">GitHub</span>
                    <span className="block text-sm text-zinc-400">{profile.githubUser}</span>
                  </span>
                </a>
              </li>
            )}
            {profile.linkedin && (
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#121217] px-4 py-3 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
                >
                  <Linkedin size={22} className="text-amber-400" />
                  <span>
                    <span className="block font-semibold text-zinc-200">LinkedIn</span>
                    <span className="block text-sm text-zinc-400">{profile.fullName}</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="self-start rounded-3xl border border-amber-500/30 bg-[#101016] p-8 shadow-2xl shadow-black/80">
          <h3 className="font-display text-2xl font-bold text-white">Enviar mensaje</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Respondo directamente a tu correo electrónico.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-zinc-300">
              Tu Nombre
              <input name="name" required className={field} placeholder="Ej. Carlos Pérez" />
            </label>
            <label className="block text-sm font-medium text-zinc-300">
              Tu Correo
              <input
                name="email"
                type="email"
                required
                className={field}
                placeholder="nombre@ejemplo.com"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-300">
              Mensaje
              <textarea
                name="message"
                required
                rows={5}
                className={field}
                placeholder="Cuéntame sobre tu proyecto o consulta..."
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-6 w-full">
            Enviar mensaje
          </button>
          <p className="mt-4 text-center text-xs text-zinc-400">
            Disponible para proyectos de software, desarrollo colaborativo e ingeniería.
          </p>
        </form>
      </div>
    </section>
  );
}
