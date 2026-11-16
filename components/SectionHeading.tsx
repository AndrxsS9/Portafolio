"use client";

import Reveal from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
  className?: string;
};

/** Encabezado de sección con entrada escalonada al hacer scroll */
export default function SectionHeading({ eyebrow, title, accent, intro, className = "" }: Props) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <Reveal variant="down">
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" variant="blur" delay={100} className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl">
        {title} <span className="text-gradient">{accent}</span>
      </Reveal>
      <Reveal variant="up" delay={200}>
        <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-rule-from to-rule-to" />
      </Reveal>
      {intro && (
        <Reveal as="p" variant="up" delay={260} className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
