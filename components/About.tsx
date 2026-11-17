"use client";

import { Code2, Download, Goal, Languages, MonitorSmartphone, Sparkles } from "lucide-react";
import { profile, profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";

const highlightIcons = [Code2, MonitorSmartphone, Sparkles];

export default function About() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];

  return (
    <section id="about" className="section border-y border-line veil-alt">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal variant="left" className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm">
          <TiltCard max={8} className="group/photo rounded-[2rem]">
            <div className="aspect-square overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-br from-surface-2 to-bg-deep shadow-[0_30px_60px_-30px_var(--shadow)]">
              {/* Zoom leve al pasar el mouse para que el parallax no deje ver los bordes */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.aboutPhoto}
                alt={`${t.about.photoAlt} ${profile.fullName}`}
                data-depth="-8"
                className="h-full w-full object-cover transition-[scale] duration-700 ease-out group-hover/photo:scale-[1.06]"
              />
            </div>
          </TiltCard>
          {/* Insignia: dentro del ancho en móvil para no desbordar */}
          <Reveal
            variant="zoom"
            delay={350}
            className="absolute -bottom-6 right-2 rounded-2xl border border-accent/30 bg-surface px-4 py-3 shadow-[0_20px_40px_-20px_var(--shadow)] sm:-right-6 sm:px-5 sm:py-4"
          >
            <p className="font-display text-xl font-extrabold text-accent sm:text-2xl">
              {p.stats[0].value} {t.about.years}
            </p>
            <p className="text-xs font-medium text-muted">{p.about.semester} · UCC Pasto</p>
          </Reveal>
        </Reveal>

        <div className="min-w-0">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} accent={t.about.titleAccent} />

          <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-soft sm:text-lg">
            <Reveal as="p" delay={150}>{p.about.p1}</Reveal>
            <Reveal as="p" delay={250}>{p.about.p2}</Reveal>
          </div>

          {/* Fuera del código e idiomas: mismo estilo de tarjeta que los highlights */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Reveal variant="flip" delay={200} className="min-w-0">
              <TiltCard className="rest-shadow group h-full rounded-2xl border border-line bg-surface p-4 hover:border-accent/50 hover:shadow-[0_20px_40px_-20px_var(--glow)]">
                <span data-depth="16" className="block w-fit">
                  <Goal className="text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125" size={26} />
                </span>
                <p data-depth="9" className="mt-2 font-semibold text-fg">{t.about.offClock}</p>
                <p data-depth="4" className="mt-1 break-words text-sm text-muted">{p.about.offClock}</p>
              </TiltCard>
            </Reveal>
            <Reveal variant="flip" delay={320} className="min-w-0">
              <TiltCard className="rest-shadow group h-full rounded-2xl border border-line bg-surface p-4 hover:border-accent/50 hover:shadow-[0_20px_40px_-20px_var(--glow)]">
                <span data-depth="16" className="block w-fit">
                  <Languages className="text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125" size={26} />
                </span>
                <p data-depth="9" className="mt-2 font-semibold text-fg">{t.about.languages}</p>
                <ul data-depth="4" className="mt-1 space-y-1 break-words text-sm text-muted">
                  {p.about.languages.map(({ name, level, note }) => (
                    <li key={name}>
                      <span className="font-medium text-fg-soft">{name}:</span> {level}.{note ? ` ${note}` : ""}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {p.about.highlights.map(({ title, text }, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              return (
                <Reveal as="li" key={title} variant="flip" delay={200 + index * 120}>
                  <TiltCard className="rest-shadow group h-full rounded-2xl border border-line bg-surface p-4 hover:border-accent/50 hover:shadow-[0_20px_40px_-20px_var(--glow)]">
                    {/* Envoltorio: el ícono ya anima translate/rotate con transición propia */}
                    <span data-depth="16" className="block w-fit">
                      <Icon className="text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125" size={26} />
                    </span>
                    <p data-depth="9" className="mt-2 font-semibold text-fg">{title}</p>
                    <p data-depth="4" className="mt-1 text-sm text-muted">{text}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={300} className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a href={profile.cv[lang]} download className="btn btn-primary">
              <Download size={18} /> {t.about.download}
            </a>
            <a href="#projects" className="btn btn-outline">
              {t.about.seeProjects}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
