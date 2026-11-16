"use client";

import { Moon, Sun } from "lucide-react";
import { usePrefs } from "@/components/Preferences";

/** Botón sol/luna para cambiar entre modo claro y oscuro */
export function ThemeToggle() {
  const { theme, toggleTheme, t } = usePrefs();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.nav.toLight : t.nav.toDark}
      title={isDark ? t.nav.toLight : t.nav.toDark}
      className="icon-btn relative overflow-hidden"
    >
      <Sun
        size={18}
        className={`absolute transition-all duration-500 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        size={18}
        className={`absolute transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}

/** Interruptor ES / EN con indicador deslizante */
export function LangToggle() {
  const { lang, toggleLang, t } = usePrefs();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === "es" ? t.nav.toEnglish : t.nav.toSpanish}
      title={lang === "es" ? t.nav.toEnglish : t.nav.toSpanish}
      className="relative flex h-10 w-[4.75rem] items-center rounded-xl border border-accent/35 bg-accent/5 p-1 text-xs font-bold"
    >
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-lg bg-gradient-to-br from-gold-1 to-gold-3 shadow-[0_0_12px_var(--glow)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          lang === "es" ? "translate-x-0" : "translate-x-full"
        }`}
      />
      <span className={`relative z-10 flex-1 text-center transition-colors ${lang === "es" ? "text-black" : "text-muted"}`}>
        ES
      </span>
      <span className={`relative z-10 flex-1 text-center transition-colors ${lang === "en" ? "text-black" : "text-muted"}`}>
        EN
      </span>
    </button>
  );
}
