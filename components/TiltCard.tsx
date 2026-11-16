"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Grados máximos de inclinación */
  max?: number;
};

/** Un resorte de una dimensión: posición, velocidad y hacia dónde quiere ir. */
type Spring = { x: number; v: number; to: number };
type SpringCfg = { k: number; c: number };

/** Al entrar/seguir el mouse: amortiguado crítico (acelera suave, sin pasarse). */
const FOLLOW: SpringCfg = { k: 150, c: 24 };
/** Al salir: subamortiguado, vuelve al reposo con un pequeño rebote (~7 %). */
const RETURN: SpringCfg = { k: 120, c: 14 };
/** Paso fijo de la simulación (estable aunque el navegador baje de FPS). */
const STEP = 1 / 120;

const spring = (): Spring => ({ x: 0, v: 0, to: 0 });

function advance(s: Spring, cfg: SpringCfg, dt: number) {
  const a = -cfg.k * (s.x - s.to) - cfg.c * s.v;
  s.v += a * dt;
  s.x += s.v * dt;
}

const settled = (s: Spring) => Math.abs(s.x - s.to) < 0.0005 && Math.abs(s.v) < 0.0005;

/**
 * Tarjeta que se inclina en 3D siguiendo el mouse con física de resorte:
 * se eleva, proyecta una sombra que se mueve al lado contrario, ilumina en dorado
 * el borde cerca del cursor (::before), proyecta una linterna dorada encima del
 * contenido (.tilt-light), muestra un reflejo de luz y desplaza a distinta profundidad a los hijos con
 * `data-depth` (px de desplazamiento máximo; negativo = se mueve al revés, como un fondo).
 * En pantallas táctiles o con "reducir movimiento" no se inclina.
 */
export default function TiltCard({ children, className = "", max = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const maxRef = useRef(max);
  maxRef.current = max;

  const st = useRef({
    px: spring(), // posición del mouse normalizada, -1 (izq.) … 1 (der.)
    py: spring(), // -1 (arriba) … 1 (abajo)
    lift: spring(), // 0 reposo … 1 elevada
    active: false,
    raf: 0,
    last: 0,
    rect: null as DOMRect | null,
    layers: [] as { el: HTMLElement; depth: number }[],
    reduced: null as MediaQueryList | null,
  });

  useEffect(() => {
    const s = st.current;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forgetRect = () => (s.rect = null);
    window.addEventListener("scroll", forgetRect, { passive: true });
    window.addEventListener("resize", forgetRect);
    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("scroll", forgetRect);
      window.removeEventListener("resize", forgetRect);
    };
  }, []);

  const paint = () => {
    const el = ref.current;
    if (!el) return;
    const { px, py, lift, layers } = st.current;
    const m = maxRef.current;
    const css = el.style;
    css.setProperty("--rx", `${(-py.x * m).toFixed(3)}deg`);
    css.setProperty("--ry", `${(px.x * m).toFixed(3)}deg`);
    css.setProperty("--px", px.x.toFixed(4));
    css.setProperty("--py", py.x.toFixed(4));
    css.setProperty("--mx", `${((px.x + 1) * 50).toFixed(2)}%`);
    css.setProperty("--my", `${((py.x + 1) * 50).toFixed(2)}%`);
    css.setProperty("--lift", lift.x.toFixed(4));
    for (const { el: layer, depth } of layers) {
      layer.style.translate = `${(px.x * depth).toFixed(2)}px ${(py.x * depth).toFixed(2)}px`;
    }
  };

  const tick = (now: number) => {
    const s = st.current;
    const dt = Math.min(Math.max((now - s.last) / 1000, 0), 1 / 20);
    s.last = now;
    const cfg = s.active ? FOLLOW : RETURN;
    const springs = [s.px, s.py, s.lift];
    const steps = Math.max(1, Math.round(dt / STEP));
    for (let i = 0; i < steps; i++) for (const sp of springs) advance(sp, cfg, dt / steps);

    if (springs.every(settled)) {
      for (const sp of springs) {
        sp.x = sp.to;
        sp.v = 0;
      }
      paint();
      s.raf = 0;
      if (!s.active) {
        // En reposo: devolvemos los hijos a su estilo original.
        for (const { el } of s.layers) el.style.translate = "";
        s.layers = [];
      }
      return;
    }
    paint();
    s.raf = requestAnimationFrame(tick);
  };

  const run = () => {
    const s = st.current;
    if (s.raf) return;
    s.last = performance.now();
    s.raf = requestAnimationFrame(tick);
  };

  const canTilt = (e: React.PointerEvent) => e.pointerType === "mouse" && !st.current.reduced?.matches;

  const activate = () => {
    const el = ref.current;
    const s = st.current;
    if (!el || s.active) return;
    s.active = true;
    s.rect = null;
    s.layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"), (node) => ({
      el: node,
      depth: Number.parseFloat(node.dataset.depth ?? "") || 0,
    }));
    s.lift.to = 1;
    el.classList.add("is-hovering");
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt(e)) return;
    const el = ref.current;
    if (!el) return;
    activate();
    const s = st.current;
    // Se mide una sola vez por entrada (o tras un scroll): medir en cada
    // movimiento la caja ya inclinada provoca pequeños temblores.
    s.rect ??= el.getBoundingClientRect();
    const r = s.rect;
    const clamp = (n: number) => Math.min(1, Math.max(-1, n));
    s.px.to = clamp(((e.clientX - r.left) / r.width) * 2 - 1);
    s.py.to = clamp(((e.clientY - r.top) / r.height) * 2 - 1);
    run();
  };

  const onLeave = () => {
    const s = st.current;
    if (!s.active) return;
    s.active = false;
    s.px.to = 0;
    s.py.to = 0;
    s.lift.to = 0;
    ref.current?.classList.remove("is-hovering");
    run();
  };

  return (
    <div ref={ref} onPointerEnter={onMove} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt ${className}`}>
      {children}
      <span className="tilt-light" aria-hidden="true" />
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
