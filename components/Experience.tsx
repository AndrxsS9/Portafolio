import { GraduationCap, Award, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";

const timeline = [
  {
    period: "2024 – Presente (2 años de experiencia)",
    title: "Desarrollo de Software & Formulación de Proyectos",
    place: profile.university,
    text: "2 años de trayectoria práctica diseñando y desarrollando aplicaciones web full-stack, aplicaciones móviles multiplataforma e integrando servicios de Inteligencia Artificial (Gemini y OCR).",
  },
  {
    period: "2025 – 2026",
    title: "Ingeniería de Software — Quinto Semestre",
    place: profile.university,
    text: "Profundización en arquitectura de sistemas, microservicios, APIs REST con Express y Node.js, y desarrollo móvil con React Native y Expo.",
  },
  {
    period: "2024",
    title: "Ingeniería de Software — Fundamentos y Programación",
    place: profile.university,
    text: "Estructuras de datos, algoritmos, principios POO, bases de datos relacionales y metodologías ágiles de trabajo en equipo (Scrum).",
  },
];

const highlights = [
  "2 años de experiencia construyendo proyectos reales en web, mobile e IA.",
  "Desarrollo integral de FoodAI (Mobile Expo + Backend Express 5 + Gemini API).",
  "Formulación del Sistema Inteligente de Gestión Documental con OCR y RBAC.",
  "Buenas prácticas: Clean Code, validación Zod, testing automatizado con Vitest y Git.",
];

export default function Experience() {
  return (
    <section id="experience" className="section bg-[#09090b] border-t border-zinc-800/60">
      <div className="wrap grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Experiencia & Trayectoria
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Mi camino <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">profesional</span>
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
            2 años de experiencia formativa y práctica desarrollando soluciones tecnológicas
            centradas en escalabilidad, calidad y valor real.
          </p>

          <ol className="relative mt-10 border-l-2 border-amber-500/30 pl-8">
            {timeline.map((item) => (
              <li key={item.period} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[2.6rem] top-1.5 h-4 w-4 rounded-full border-4 border-[#09090b] bg-amber-400 shadow-[0_0_10px_#f5c042]"
                  aria-hidden
                />
                <p className="text-sm font-semibold text-amber-400">{item.period}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-zinc-400">{item.place}</p>
                <p className="mt-2 leading-relaxed text-zinc-300">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="self-start rounded-3xl border border-amber-500/30 bg-[#121217] p-8 shadow-2xl shadow-black/80">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400">
            <GraduationCap size={28} />
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-white">
            Formación Académica
          </h3>
          <p className="mt-1 text-sm font-semibold text-amber-400">2024 – En curso (2 años)</p>
          <p className="mt-3 font-semibold text-zinc-200">Ingeniería de Software</p>
          <p className="text-sm text-zinc-400">{profile.university}</p>
          <p className="mt-3 leading-relaxed text-zinc-300">
            Formación integral orientada a metodologías ágiles, análisis de requerimientos,
            patrones de diseño y arquitectura de software moderna.
          </p>

          <ul className="mt-6 space-y-3 border-t border-zinc-800 pt-6">
            {highlights.map((a) => (
              <li key={a} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400 shadow-[0_0_6px_#f5c042]" />
                {a}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
