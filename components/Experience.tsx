"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];
  const listRef = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);

  // La línea de la línea de tiempo se "dibuja" a medida que haces scroll
  useEffect(() => {
    const onScroll = () => {
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const progress = (start - r.top) / r.height;
      setFill(Math.max(0, Math.min(1, progress)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="experience" className="section border-t border-line bg-bg">
      <div className="wrap grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} accent={t.experience.titleAccent} intro={t.experience.intro} />

          <ol ref={listRef} className="relative mt-10 pl-8">
            <span aria-hidden className="absolute left-[7px] top-1 bottom-1 w-0.5 rounded-full bg-line" />
            <span
              aria-hidden
              className="absolute left-[7px] top-1 bottom-1 w-0.5 origin-top rounded-full bg-gradient-to-b from-rule-from to-rule-to shadow-[0_0_10px_var(--glow)]"
              style={{ transform: `scaleY(${fill})` }}
            />
            {p.timeline.map((item, i) => {
              const reached = fill >= (i + 0.2) / p.timeline.length;
              return (
                <Reveal as="li" key={item.title} variant="right" delay={i * 120} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[2.05rem] top-1.5 h-4 w-4 rounded-full border-4 border-bg transition-all duration-500 ${
                      reached ? "scale-110 bg-accent-strong shadow-[0_0_12px_var(--glow)]" : "bg-line"
                    }`}
                  />
                  <p className="text-sm font-semibold text-accent">{item.period}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-fg sm:text-xl">{item.title}</h3>
                  <p className="text-sm font-medium text-muted">{item.place}</p>
                  <p className="mt-2 leading-relaxed text-fg-soft">{item.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal variant="zoom" delay={150} className="self-start">
          <TiltCard max={5} className="card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
              <GraduationCap size={28} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-fg">{t.experience.education}</h3>
            <p className="mt-1 text-sm font-semibold text-accent">{t.experience.period}</p>
            <p className="mt-3 font-semibold text-fg">{t.experience.degree}</p>
            <p className="text-sm text-muted">{p.university}</p>
            <p className="mt-3 leading-relaxed text-fg-soft">{t.experience.educationText}</p>

            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {p.achievements.map((a, i) => (
                <Reveal as="li" key={a} variant="left" delay={250 + i * 90} className="flex gap-3 text-sm leading-relaxed text-fg-soft">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-strong shadow-[0_0_6px_var(--glow)]" />
                  {a}
                </Reveal>
              ))}
            </ul>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
