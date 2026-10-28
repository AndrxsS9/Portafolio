import { Code2, Smartphone, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

const highlightIcons = [Code2, Smartphone, Sparkles];

export default function About() {
  return (
    <section id="about" className="section bg-[#0d0d12] border-y border-zinc-800/60">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="aspect-square overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-[#181820] to-[#0a0a0d] shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/avatar.svg"
              alt={`${profile.name} trabajando`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-amber-500/30 bg-[#16161d] px-5 py-4 shadow-xl shadow-black/60 sm:-right-6">
            <p className="font-display text-2xl font-extrabold text-amber-400">
              {profile.stats[0]?.value} {profile.stats[0]?.label}
            </p>
            <p className="text-xs font-medium text-zinc-400">{profile.about.semester} · UCC Pasto</p>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            Conóceme
          </div>

          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Sobre <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">mí</span>
          </h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-300">
            <p>{profile.about.p1}</p>
            <p>{profile.about.p2}</p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {profile.about.highlights.map(({ title, text }, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              return (
                <li
                  key={title}
                  className="rounded-2xl border border-amber-500/20 bg-[#14141b] p-4 transition-all hover:border-amber-500/40 hover:bg-[#181822]"
                >
                  <Icon className="text-amber-400" size={26} />
                  <p className="mt-2 font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{text}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="/cv.pdf" download className="btn btn-primary">
              Descargar CV
            </a>
            <a href="#projects" className="btn btn-outline">
              Ver proyectos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
