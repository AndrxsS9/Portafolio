import { ExternalLink, Github, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section bg-[#0d0d12] border-t border-zinc-800/60">
      <div className="wrap">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Portafolio
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Proyectos <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">destacados</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Soluciones de software, desarrollo full-stack, aplicaciones móviles e integraciones
            con Inteligencia Artificial en las que he venido trabajando.
          </p>
        </div>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1b1b24] via-[#101016] to-[#08080a] p-1 shadow-2xl shadow-black/80">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full rounded-[1.4rem] object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col justify-between rounded-[1.4rem] bg-gradient-to-br from-[#181820] to-[#0c0c10] p-8 text-white">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Sparkles size={18} />
                        <span className="text-xs uppercase tracking-widest font-bold">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="font-display text-6xl font-black leading-none tracking-tight bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent opacity-90">
                          {p.title
                            .split(" ")
                            .filter((w) => !["—", "-", "y", "de", "e"].includes(w.toLowerCase()))
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-sm">
                          {p.year}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {p.category} · {p.year}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-zinc-300">{p.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-200"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline !py-2.5"
                    >
                      <Github size={18} /> Repositorio
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary !py-2.5"
                    >
                      <ExternalLink size={18} /> Ver Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
