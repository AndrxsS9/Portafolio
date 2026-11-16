import { useId, type CSSProperties } from "react";

/**
 * Formas del monograma "Ax", estilo editorial (contraste grueso/fino tipo Didone):
 * la pierna derecha de la A es una diagonal gruesa que sigue de largo y forma la "\" de la x.
 * Orden = orden de dibujo: pierna fina, diagonal gruesa, travesaño, "/" de la x.
 * Las mismas formas están en app/icon.svg (favicon).
 */
const SHAPES = [
  "M14 80 L33 20 L36.4 20 L17.4 80 Z",
  "M33 20 L41 20 L88 80 L79 80 Z",
  "M23 54.6 H62 V57.4 H23 Z",
  "M60.7 80 L63.9 80 L84.5 52 L81.3 52 Z",
];

const stop = (offset: number, color: string, opacity = 1) => (
  <stop offset={offset} style={{ stopColor: color, stopOpacity: opacity }} />
);

/** Retraso escalonado del dibujo de cada forma (lo lee .logo-draw-fill en globals.css) */
const delay = (i: number) => ({ ["--ld" as string]: `${(i * 0.22).toFixed(2)}s` }) as CSSProperties;

/**
 * Monograma "Ax" dibujado con formas propias. Oro metálico (--gold-1/2/3 + --logo-deep),
 * insignia obsidiana en oscuro y marfil con borde dorado en claro (tokens --logo-*).
 * Animaciones en globals.css: .logo (giro 3D en hover), .logo-sheen (destello),
 * .logo-draw-fill (se dibuja el contorno y entra el relleno, una vez al cargar).
 */
export default function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  // IDs únicos: el logo aparece en el Navbar y en el Footer
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (name: string) => `ax-${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Ax"
      className={`logo shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={id("bg")} x1="0" y1="0" x2="1" y2="1">
          {stop(0, "var(--logo-bg-1)")}
          {stop(0.5, "var(--logo-bg-2)")}
          {stop(1, "var(--logo-bg-3)")}
        </linearGradient>
        <linearGradient id={id("border")} x1="0" y1="0" x2="1" y2="1">
          {stop(0, "var(--gold-1)", 0.95)}
          {stop(0.5, "var(--gold-3)", 0.45)}
          {stop(1, "var(--gold-2)", 0.95)}
        </linearGradient>
        {/* Oro metálico: luz → medio → reflejo → sombra, en coordenadas del lienzo
            para que todas las formas compartan un mismo degradado continuo */}
        <linearGradient id={id("metal")} gradientUnits="userSpaceOnUse" x1="18" y1="16" x2="84" y2="84">
          {stop(0, "var(--gold-1)")}
          {stop(0.28, "var(--gold-2)")}
          {stop(0.48, "var(--gold-1)")}
          {stop(0.72, "var(--gold-3)")}
          {stop(1, "var(--logo-deep)")}
        </linearGradient>
        <linearGradient id={id("letterGloss")} gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="80">
          {stop(0, "var(--logo-hi)", 0.6)}
          {stop(0.55, "var(--logo-hi)", 0)}
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
          {stop(0, "var(--gold-2)", 0.18)}
          {stop(1, "var(--gold-2)", 0)}
        </radialGradient>
        <linearGradient id={id("gloss")} x1="0" y1="0" x2="0" y2="1">
          {stop(0, "var(--logo-gloss)")}
          {stop(0.5, "var(--logo-gloss)", 0)}
        </linearGradient>
        <linearGradient id={id("sheen")} x1="0" y1="0" x2="1" y2="0">
          {stop(0, "var(--logo-sheen)", 0)}
          {stop(0.5, "var(--logo-sheen)")}
          {stop(1, "var(--logo-sheen)", 0)}
        </linearGradient>
        <clipPath id={id("clip")}>
          <rect x="4" y="4" width="92" height="92" rx="24" />
        </clipPath>
      </defs>

      {/* Insignia: fondo, brillo superior, resplandor y filete interior */}
      <rect x="4" y="4" width="92" height="92" rx="24" fill={url("bg")} />
      <rect x="4" y="4" width="92" height="92" rx="24" fill={url("gloss")} />
      <circle cx="50" cy="52" r="34" fill={url("glow")} />
      <rect x="9" y="9" width="82" height="82" rx="19.5" stroke={url("border")} strokeWidth="0.6" opacity="0.4" />

      <g transform="translate(-1 0)">
        {/* Sombra */}
        <g transform="translate(0 1.4)" className="logo-fade" style={{ fill: "var(--logo-shadow)", ["--lf" as string]: "1.2s" }}>
          {SHAPES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {/* Oro: primero se dibuja el contorno, luego entra el relleno */}
        <g fill={url("metal")} stroke={url("metal")} strokeWidth={0.7} strokeLinejoin="round">
          {SHAPES.map((d, i) => (
            <path key={i} d={d} pathLength={1} className="logo-draw-fill" style={delay(i)} />
          ))}
        </g>
        {/* Luz en la parte alta de las letras */}
        <g fill={url("letterGloss")} className="logo-fade" style={{ ["--lf" as string]: "1.5s" }}>
          {SHAPES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>

      {/* Destello que cruza la insignia en hover */}
      <g clipPath={url("clip")}>
        <g className="logo-sheen">
          <rect x="0" y="-10" width="26" height="120" fill={url("sheen")} transform="skewX(-20)" />
        </g>
      </g>

      {/* Borde fino dorado */}
      <rect x="4.75" y="4.75" width="90.5" height="90.5" rx="23.25" stroke={url("border")} strokeWidth="1.5" />
    </svg>
  );
}
