import { Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="relative bg-[#09090b] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Resplandor ambiental dorado suave */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[45rem] rounded-full bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/30 px-4 py-1.5 text-sm font-medium text-amber-300 shadow-[0_0_15px_rgba(245,196,66,0.1)]">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#facc15]" />
            {profile.badge}
          </p>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {profile.name}
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {profile.lastName}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              <Mail size={18} /> Contactar
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Download size={18} /> Ver CV
            </a>
            <div className="ml-1 flex items-center gap-2">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-zinc-900/60 text-amber-400 transition-all hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,196,66,0.4)]"
                >
                  <Github size={20} />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-zinc-900/60 text-amber-400 transition-all hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,196,66,0.4)]"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-zinc-800/80 pt-6">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-extrabold text-amber-400">
                  {s.value}
                </dd>
                <p className="mt-1 text-sm text-zinc-400">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            className="absolute -right-4 -bottom-4 h-full w-full rounded-[2rem] border-2 border-amber-500/40 shadow-[0_0_20px_rgba(245,196,66,0.15)]"
            aria-hidden
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-amber-500/20 bg-gradient-to-b from-[#18181f] to-[#0c0c10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar.svg"
              alt={`Foto de ${profile.fullName}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
