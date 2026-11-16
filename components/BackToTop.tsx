"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePrefs } from "@/components/Preferences";

/** Botón flotante para volver arriba, aparece al bajar */
export default function BackToTop() {
  const { t } = usePrefs();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#home"
      aria-label={t.footer.top}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-1 to-gold-3 text-black shadow-[0_10px_30px_-8px_var(--glow)] transition-all duration-500 hover:-translate-y-1 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </a>
  );
}
