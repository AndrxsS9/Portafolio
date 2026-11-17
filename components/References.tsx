"use client";

import { Quote } from "lucide-react";
import { profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";

export default function References() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];

  return (
    <section id="references" className="section border-t border-line veil-alt">
      <div className="wrap">
        <SectionHeading eyebrow={t.references.eyebrow} title="" accent={t.references.title} />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {p.references.map((ref, i) => (
            <Reveal as="li" key={i} variant="up" delay={i * 120} className="min-w-0">
              <TiltCard max={6} className="card flex h-full flex-col p-6 sm:p-8">
                <Quote
                  aria-hidden
                  data-depth="14"
                  size={44}
                  className="shrink-0 fill-accent-strong/20 text-accent-strong drop-shadow-[0_0_10px_var(--glow)]"
                />
                <blockquote data-depth="6" className="mt-4 flex-1 break-words leading-relaxed text-fg-soft">
                  “{ref.quote}”
                </blockquote>
                <div data-depth="4" className="mt-6 min-w-0 border-t border-line pt-4">
                  <p className="break-words font-display font-bold text-fg">{ref.name}</p>
                  <p className="break-words text-sm text-muted">{ref.role}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
