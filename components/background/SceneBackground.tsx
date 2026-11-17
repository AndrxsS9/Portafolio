"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneHandle, Theme } from "./scene";

type Mode = "loading" | "webgl" | "fallback";

/** Three.js r16x+ necesita WebGL2 */
function hasWebGL2() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/**
 * Fondo 3D global, fijo detrás de todo el contenido y sin interceptar clics.
 * Three.js se descarga aparte (import dinámico) para no frenar la primera carga.
 * Sin WebGL2, o si se pierde el contexto, muestra una alternativa CSS ligera.
 */
export default function SceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!hasWebGL2()) {
      setMode("fallback");
      return;
    }

    let handle: SceneHandle | null = null;
    let cancelled = false;
    const html = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    import("./scene")
      .then(({ createScene }) => {
        if (cancelled) return;
        handle = createScene(canvas, {
          theme: readTheme(),
          reducedMotion: motion.matches,
          onReady: () => !cancelled && setMode("webgl"),
          onContextLost: () => {
            handle?.dispose();
            handle = null;
            if (!cancelled) setMode("fallback");
          },
        });
      })
      .catch(() => {
        if (!cancelled) setMode("fallback");
      });

    // El tema lo cambia Preferences.tsx en <html data-theme>
    const themeObserver = new MutationObserver(() => handle?.setTheme(readTheme()));
    themeObserver.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    const onMotion = () => handle?.setReducedMotion(motion.matches);
    motion.addEventListener("change", onMotion);

    return () => {
      cancelled = true;
      themeObserver.disconnect();
      motion.removeEventListener("change", onMotion);
      handle?.dispose();
      handle = null;
    };
  }, []);

  // Alternativa CSS: un parallax suave con el scroll (nada si se pide reducir movimiento)
  useEffect(() => {
    const el = fallbackRef.current;
    if (mode !== "fallback" || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      raf ||= requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--scene-shift", window.scrollY.toFixed(0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return (
    <div aria-hidden className="scene-root">
      <canvas ref={canvasRef} className={`scene-canvas${mode === "webgl" ? " is-ready" : ""}`} hidden={mode === "fallback"} />
      {mode === "fallback" && <div ref={fallbackRef} className="scene-fallback" />}
    </div>
  );
}
