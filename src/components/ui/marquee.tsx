import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Duração de um ciclo completo, em segundos. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Faixa infinita (infinite moving cards): o conteúdo é duplicado e animado
 * via CSS puro (translateX -50%), com máscara de fade nas bordas e pausa no hover.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div
      className={`marquee-paused relative overflow-hidden ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="animate-marquee flex w-max gap-4"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-stretch gap-4">{children}</div>
        <div className="flex shrink-0 items-stretch gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
