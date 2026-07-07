"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type SideAccentProps = {
  /** Lado por onde a forma entra — define apenas a direção do parallax. */
  side: "left" | "right";
  children: ReactNode;
  /** Posicionamento completo (top/left/right responsivos) e tamanho. */
  className?: string;
  /** Deslocamento máximo do parallax, em px. */
  distance?: number;
};

/**
 * Forma de cor sólida que entra pela lateral com parallax ligado ao scroll
 * e continua deslizando ao rolar. Com prefers-reduced-motion fica estática.
 * A seção pai precisa de `relative overflow-hidden`.
 */
export function SideAccent({
  side,
  children,
  className,
  distance = 140,
}: SideAccentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const direction = side === "left" ? -1 : 1;
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [direction * distance, 0, direction * -distance * 0.4],
  );
  // Drift vertical contrário ao scroll — a forma anda mais devagar que o conteúdo
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={reduceMotion ? undefined : { x, y, opacity }}
      className={`pointer-events-none absolute z-0 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
