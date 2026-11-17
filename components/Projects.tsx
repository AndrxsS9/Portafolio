"use client";

import { ArrowUpRight, Check, Download, ExternalLink, Github } from "lucide-react";
import { projects, type ProjectLink } from "@/data/projects";
import { usePrefs } from "@/components/Preferences";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";

const linkIcon: Record<ProjectLink["kind"], typeof Github> = {
  github: Github,
  demo: ExternalLink,
  download: Download,
};

export default function Projects() {
  const { lang, t } = usePrefs();

  return (
    <section id="projects" className="section border-t border-line veil-alt">
      <div className="wrap">
        <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} accent={t.projects.titleAccent} intro={t.projects.intro} />

        <div className="mt-14 space-y-20 lg:space-y-28">
          {projects.map((project, i) => {
            const p = project.text[lang];
            const reversed = i % 2 === 1;
            return (
              <article key={project.id} className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                {/* Imagen: entra desde un lado y se inclina con el mouse */}
                <Reveal variant={reversed ? "right" : "left"} className={reversed ? "lg:order-2" : ""}>
                  <TiltCard max={6} className="rounded-3xl">
                    <div className="project-media relative aspect-[16/10] overflow-hidden rounded-3xl border border-accent/30 bg-surface-2 shadow-[0_30px_60px_-30px_var(--shadow)] transition-shadow duration-500 group-hover:shadow-[0_35px_70px_-25px_var(--glow)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={`${t.projects.imageAlt} ${p.title}`}
                        loading="lazy"
                        data-depth="-8"
                        className="h-full w-full object-cover"
                      />
                      <span data-depth="14" className="absolute left-3 top-3 rounded-full border border-tag-border bg-tag-bg px-3 py-1 text-xs font-semibold text-tag-fg backdrop-blur-md">
                        {String(i + 1).padStart(2, "0")} · {project.year}
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>

                <div className={`min-w-0 ${reversed ? "lg:order-1" : ""}`}>
                  <Reveal variant="down">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">{p.category}</p>
                  </Reveal>
                  <Reveal as="h3" variant="blur" delay={80} className="mt-2 flex items-center gap-2 font-display text-3xl font-bold text-fg sm:text-4xl">
                    {p.title}
                    <ArrowUpRight
                      size={28}
                      className="text-accent opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </Reveal>
                  <Reveal as="p" delay={160} className="mt-4 leading-relaxed text-fg-soft">
                    {p.description}
                  </Reveal>

                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {p.features.map((f, k) => (
                      <Reveal
                        as="li"
                        key={f}
                        variant="zoom"
                        delay={220 + k * 90}
                        className="rest-shadow flex items-start gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-fg-soft"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {f}
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal as="ul" delay={360} className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => {
                      const label = typeof tag === "string" ? tag : tag[lang];
                      return (
                        <li
                          key={typeof tag === "string" ? tag : tag.es}
                          className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/15"
                        >
                          {label}
                        </li>
                      );
                    })}
                  </Reveal>

                  <Reveal delay={420} className="mt-7 flex flex-wrap gap-3">
                    {project.links.map((link) => {
                      const Icon = linkIcon[link.kind];
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn !py-2.5 ${link.kind === "github" ? "btn-outline" : "btn-primary"}`}
                        >
                          <Icon size={18} /> {link.label[lang]}
                        </a>
                      );
                    })}
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
