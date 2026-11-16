"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ui, type Lang } from "@/data/i18n";

type Theme = "dark" | "light";

type Prefs = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  theme: Theme;
  toggleTheme: () => void;
  /** Textos de la interfaz en el idioma activo */
  t: (typeof ui)[Lang];
};

const PrefsContext = createContext<Prefs | null>(null);

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("dark");

  // Lee lo que el script inicial ya aplicó en <html> (evita parpadeos)
  useEffect(() => {
    const html = document.documentElement;
    setTheme(html.dataset.theme === "light" ? "light" : "dark");
    const storedLang = read("lang");
    if (storedLang === "en" || storedLang === "es") setLangState(storedLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Next.js vuelve a escribir el <title> de los metadatos (en español) después de hidratar,
    // así que se reaplica el título del idioma activo cada vez que cambie el <head>.
    const want = ui[lang].meta.title;
    const apply = () => {
      if (document.title !== want) document.title = want;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    save("lang", l);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "es" ? "en" : "es";
      save("lang", next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      html.dataset.theme = next;
      save("theme", next);
      return next;
    });
    window.setTimeout(() => html.classList.remove("theme-transition"), 500);
  }, []);

  return (
    <PrefsContext.Provider value={{ lang, setLang, toggleLang, theme, toggleTheme, t: ui[lang] }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs debe usarse dentro de <PreferencesProvider>");
  return ctx;
}
