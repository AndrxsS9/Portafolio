import {
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { profile } from "@/data/profile";

const serviceIcons = [Code2, Smartphone, Sparkles, Layers, Cpu, Workflow];

export default function Skills() {
  return (
    <section id="skills" className="section bg-[#09090b] text-white">
      <div className="wrap">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Habilidades & Servicios
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Qué puedo <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">hacer</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Habilidades técnicas, metodologías y herramientas que aplico en el desarrollo
            de software moderno y proyectos con Inteligencia Artificial.
          </p>
        </div>

        <ul className="mt-12 grid border-t border-zinc-800/80 sm:grid-cols-2 lg:grid-cols-3">
          {profile.services.map(({ title, text }, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <li
                key={title}
                className="group border-b border-zinc-800/80 py-8 transition-colors sm:pr-8 lg:[&:not(:nth-child(3n+1))]:pl-8 lg:[&:not(:nth-child(3n))]:border-r lg:[&:not(:nth-child(3n))]:border-zinc-800/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/5 text-amber-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:border-amber-400">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white transition-colors group-hover:text-amber-300">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-zinc-400">{text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#121218] via-[#0d0d12] to-[#09090b] p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Stack Tecnológico Principal
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Tecnologías">
            {profile.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-amber-500/25 bg-amber-500/5 px-4 py-1.5 text-sm font-medium text-amber-200 transition-all hover:border-amber-400 hover:bg-amber-500/20 hover:text-white"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
