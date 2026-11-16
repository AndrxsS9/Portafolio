"use client";

import { Code2, Gamepad2, Layers, Smartphone, Sparkles, Workflow } from "lucide-react";
import { profile, profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";

const serviceIcons = [Code2, Smartphone, Sparkles, Layers, Gamepad2, Workflow];

export default function Skills() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];
  // Se duplica la lista para que la cinta se desplace sin cortes
  const loop = [...profile.tech, ...profile.tech];

  return (
    <section id="skills" className="section bg-bg">
      <div className="wrap">
        <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} accent={t.skills.titleAccent} intro={t.skills.intro} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {p.services.map(({ title, text }, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Reveal as="li" key={title} variant="up" delay={(index % 3) * 120}>
                <TiltCard className="rest-shadow group h-full rounded-3xl border border-line bg-surface p-6 hover:border-accent/50 hover:shadow-[0_25px_50px_-25px_var(--glow)] sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-accent-strong group-hover:text-black">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-fg transition-colors group-hover:text-accent">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>

        <Reveal variant="zoom" className="mt-14 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-surface via-bg-alt to-bg py-7">
          <p className="px-6 text-xs font-semibold uppercase tracking-widest text-accent sm:px-8">{t.skills.stack}</p>
          {/* Cinta infinita de tecnologías (se pausa al pasar el mouse) */}
          <div className="marquee mt-5 overflow-hidden" aria-label={t.skills.stack}>
            <ul className="marquee-track gap-3 pr-3">
              {loop.map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  aria-hidden={i >= profile.tech.length}
                  className="whitespace-nowrap rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-sm font-medium text-fg-soft transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/15 hover:text-accent"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
