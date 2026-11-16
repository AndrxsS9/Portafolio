"use client";

import { useEffect, useRef } from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "blur" | "flip";

type Props = {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: Variant;
  /** Retraso en ms (útil para animar elementos en cascada) */
  delay?: number;
  className?: string;
  /** Si es true, vuelve a animar cada vez que entra en pantalla */
  repeat?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

/**
 * Anima su contenido cuando entra en la pantalla al hacer scroll.
 * Usa IntersectionObserver (sin librerías) y respeta "reducir movimiento".
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  repeat = false,
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          if (!repeat) io.disconnect();
        } else if (repeat) {
          el.classList.remove("is-visible");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [repeat]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
