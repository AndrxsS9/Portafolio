export default function Logo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label="Logo Ax"
    >
      <defs>
        {/* Gradiente dorado metálico para el texto y detalles */}
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4B8" />
          <stop offset="30%" stopColor="#F5C042" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7B1C" />
        </linearGradient>

        {/* Gradiente dorado para el borde */}
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
        </linearGradient>

        {/* Fondo oscuro obsidiana */}
        <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181D" />
          <stop offset="50%" stopColor="#0D0D11" />
          <stop offset="100%" stopColor="#050507" />
        </linearGradient>

        {/* Resplandor dorado */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Caja contenedor oscura con borde dorado */}
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx="24"
        fill="url(#darkBg)"
        stroke="url(#goldBorder)"
        strokeWidth="2.5"
      />

      {/* Resplandor decorativo interno */}
      <circle cx="50" cy="50" r="34" fill="#D4AF37" fillOpacity="0.06" />

      {/* Monograma Ax */}
      <g filter="url(#goldGlow)">
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="-3"
          fill="url(#goldMetallic)"
        >
          Ax
        </text>
      </g>

      {/* Pequeño destello superior derecho */}
      <circle cx="76" cy="24" r="2.5" fill="#FFF4B8" opacity="0.9" />
    </svg>
  );
}

