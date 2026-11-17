"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";
import CountUp from "@/components/CountUp";

/** Escribe y borra las palabras una tras otra, como una terminal */
function Typewriter({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Reinicia al cambiar de idioma
  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [words]);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1600 : empty ? 300 : deleting ? 45 : 85;
    const id = window.setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, index, words]);

  return (
    <span className="text-accent">
      {text}
      <span className="animate-blink ml-0.5 inline-block w-[2px] translate-y-0.5 bg-accent align-baseline" style={{ height: "1em" }} />
    </span>
  );
}

export default function Hero() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glow = useRef({ x: 0, y: 0, raf: 0 });

  // Linterna + rejilla dorada que siguen al cursor (solo mouse y sin "reducir movimiento")
  const canGlow = (e: React.PointerEvent) =>
    e.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onGlowMove = (e: React.PointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    const el = bgRef.current;
    if (!section || !el || !canGlow(e)) return;
    const r = section.getBoundingClientRect();
    const g = glow.current;
    g.x = e.clientX - r.left;
    g.y = e.clientY - r.top;
    el.classList.add("is-lit");
    // Un solo repintado por frame aunque lleguen varios eventos
    g.raf ||= requestAnimationFrame(() => {
      g.raf = 0;
      el.style.setProperty("--sx", `${g.x.toFixed(1)}px`);
      el.style.setProperty("--sy", `${g.y.toFixed(1)}px`);
    });
  };

  const onGlowLeave = () => bgRef.current?.classList.remove("is-lit");

  useEffect(() => () => cancelAnimationFrame(glow.current.raf), []);

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onGlowMove}
      onPointerLeave={onGlowLeave}
      className="relative overflow-hidden veil-hero pb-16 pt-28 lg:pb-24 lg:pt-40"
    >
      {/* Fondo animado: manchas doradas + rejilla + linterna y rejilla dorada que siguen al cursor */}
      <div ref={bgRef} aria-hidden className="hero-bg pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-32 left-[10%] h-80 w-80 rounded-full bg-blob-1 blur-3xl" />
        <div
          className="animate-blob absolute right-[5%] top-[30%] h-72 w-72 rounded-full bg-blob-2 blur-3xl"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
        />
        <div className="hero-light absolute inset-0" />
        <div className="hero-grid-glow absolute inset-0" />
      </div>

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="min-w-0">
          <p
            className="enter inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
            style={{ ["--d" as string]: "0ms" }}
          >
            <span className="animate-pulse-ring h-2 w-2 rounded-full bg-emerald-400" />
            {p.badge}
          </p>

          <p className="enter mt-6 text-lg font-medium text-muted" style={{ ["--d" as string]: "100ms" }}>
            {t.hero.hello}
          </p>
          <h1 className="mt-1 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-fg min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            <span className="enter block" style={{ ["--d" as string]: "180ms" }}>
              {profile.name}
            </span>
            <span className="enter text-gradient block" style={{ ["--d" as string]: "280ms" }}>
              {profile.lastName}
            </span>
          </h1>

          <p
            className="enter mt-5 font-display text-xl font-semibold text-fg-soft sm:text-2xl"
            style={{ ["--d" as string]: "380ms" }}
          >
            {t.hero.builds} <Typewriter words={t.hero.roles} />
          </p>

          <p
            className="enter mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ ["--d" as string]: "460ms" }}
          >
            {p.tagline}
          </p>

          <div className="enter mt-8 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "560ms" }}>
            <a href="#contact" className="btn btn-primary">
              <Mail size={18} /> {t.hero.contact}
            </a>
            <a href={profile.cv[lang]} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Download size={18} /> {t.hero.cv}
            </a>
            <div className="flex items-center gap-2">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn !h-11 !w-11">
                  <Github size={20} />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn !h-11 !w-11">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>

          <dl
            className="enter mt-12 grid max-w-md grid-cols-3 gap-3 border-t border-line pt-6"
            style={{ ["--d" as string]: "660ms" }}
          >
            {p.stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <dd className="font-display text-3xl font-extrabold text-accent sm:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Foto con anillo dorado giratorio y flotación */}
        <div className="enter relative mx-auto w-full max-w-[18rem] sm:max-w-sm lg:max-w-none" style={{ ["--d" as string]: "350ms" }}>
          <div className="animate-float relative">
            <div aria-hidden className="gold-ring absolute -inset-3 rounded-[2.4rem]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-accent/25 bg-gradient-to-b from-surface-2 to-bg-deep shadow-[0_30px_60px_-30px_var(--shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.photo} alt={`${t.hero.photoAlt} ${profile.fullName}`} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block">
        <a
          href="#about"
          aria-label={t.hero.scroll}
          className="enter flex flex-col items-center gap-1 text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
          style={{ ["--d" as string]: "900ms" }}
        >
          {t.hero.scroll}
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
