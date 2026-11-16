"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile, profileText } from "@/data/profile";
import { usePrefs } from "@/components/Preferences";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const { lang, t } = usePrefs();
  const p = profileText[lang];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${t.contact.subject}: ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-field px-4 py-3 text-fg placeholder:text-muted/70 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  const items = [
    { icon: Mail, label: t.contact.email, value: profile.email, href: `mailto:${profile.email}` },
    ...(profile.phone
      ? [{ icon: Phone, label: t.contact.phone, value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` }]
      : []),
    { icon: MapPin, label: t.contact.location, value: p.location, href: "" },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line bg-bg-alt">
      <div aria-hidden className="animate-blob pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-blob-3 blur-3xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} accent={t.contact.titleAccent} intro={t.contact.intro} />

          <ul className="mt-9 space-y-4">
            {items.map(({ icon: Icon, label, value, href }, i) => (
              <Reveal as="li" key={label} variant="left" delay={i * 100} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={22} />
                </span>
                {/* min-w-0 + break-all: el correo largo ya no se sale de la pantalla */}
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-muted">{label}</span>
                  {href ? (
                    <a href={href} className="block break-all font-semibold text-fg-soft underline-offset-4 transition-colors hover:text-accent hover:underline">
                      {value}
                    </a>
                  ) : (
                    <span className="block font-semibold text-fg-soft">{value}</span>
                  )}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal as="h3" delay={200} className="mt-10 font-display text-xl font-semibold text-fg">
            {t.contact.networks}
          </Reveal>
          <ul className="mt-4 grid gap-3 sm:max-w-md sm:grid-cols-2">
            {[
              profile.github && { icon: Github, name: "GitHub", sub: profile.githubUser, href: profile.github },
              profile.linkedin && { icon: Linkedin, name: "LinkedIn", sub: profile.fullName, href: profile.linkedin },
            ]
              .filter((x): x is { icon: typeof Github; name: string; sub: string; href: string } => Boolean(x))
              .map(({ icon: Icon, name, sub, href }, i) => (
                <Reveal as="li" key={name} variant="up" delay={250 + i * 100}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rest-shadow group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_15px_30px_-15px_var(--glow)]"
                  >
                    <Icon size={22} className="shrink-0 text-accent transition-transform group-hover:scale-110" />
                    <span className="min-w-0">
                      <span className="block font-semibold text-fg">{name}</span>
                      <span className="block truncate text-sm text-muted">{sub}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
          </ul>
        </div>

        <Reveal variant="right" delay={150} className="min-w-0 self-start">
          <TiltCard max={4} className="rounded-3xl">
            <form onSubmit={onSubmit} className="card border-accent/30 p-5 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-fg">{t.contact.formTitle}</h3>
              <p className="mt-1 text-sm text-muted">{t.contact.formIntro}</p>

              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-fg-soft">
                  {t.contact.name}
                  <input name="name" required autoComplete="name" className={field} placeholder={t.contact.namePh} />
                </label>
                <label className="block text-sm font-medium text-fg-soft">
                  {t.contact.yourEmail}
                  <input name="email" type="email" required autoComplete="email" className={field} placeholder={t.contact.emailPh} />
                </label>
                <label className="block text-sm font-medium text-fg-soft">
                  {t.contact.message}
                  <textarea name="message" required rows={5} className={`${field} resize-y`} placeholder={t.contact.messagePh} />
                </label>
              </div>
              <button type="submit" className="btn btn-primary group mt-6 w-full">
                <Send size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                {t.contact.send}
              </button>
              <p className="mt-4 text-center text-xs text-muted">{t.contact.note}</p>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
