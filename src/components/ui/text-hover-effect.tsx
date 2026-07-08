"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type TextHoverEffectProps = {
  text: string;
  /** Suavização do acompanhamento do cursor (s). 0 = instantâneo. */
  duration?: number;
  className?: string;
};

/**
 * Texto gigante em outline que, no hover, revela um preenchimento com gradiente
 * (quente, acento da seção) seguindo o cursor. Em telas sem cursor (touch),
 * faz um sweep automático lento; com prefers-reduced-motion, fica estático.
 */
export function TextHoverEffect({
  text,
  duration = 0,
  className,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [hasHover, setHasHover] = useState(true);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [mask, setMask] = useState({ cx: "50%", cy: "50%" });

  // Detecta se o dispositivo tem cursor real (mouse) x touch.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Cursor -> posição da máscara (%).
  useEffect(() => {
    if (!cursor || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((cursor.x - rect.left) / rect.width) * 100;
    const cy = ((cursor.y - rect.top) / rect.height) * 100;
    setMask({ cx: `${cx}%`, cy: `${cy}%` });
  }, [cursor]);

  // Sem cursor (touch) e com movimento permitido: sweep automático lento.
  useEffect(() => {
    if (hasHover || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const cx = 50 + Math.sin(t * 0.55) * 44;
      const cy = 50 + Math.sin(t * 0.33) * 26;
      setMask({ cx: `${cx}%`, cy: `${cy}%` });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasHover, reduce]);

  // Revela o gradiente: hover (mouse) ou sweep (touch com movimento).
  const revealMasked = hasHover ? hovered : !reduce;
  // Touch + reduced-motion: preenchimento estático suave (não fica "morto").
  const revealStatic = !hasHover && reduce;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <defs>
        {/* Gradiente quente — acento da seção Serviços */}
        <linearGradient
          id="the-fill"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="480"
          y2="120"
        >
          <stop offset="0%" stopColor="#ff5233" />
          <stop offset="50%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#ffce4d" />
        </linearGradient>

        {/* Máscara radial que segue o cursor */}
        <motion.radialGradient
          id="the-reveal"
          gradientUnits="userSpaceOnUse"
          r="26%"
          cx="50%"
          cy="50%"
          animate={mask}
          transition={{ duration: reduce ? 0 : duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="the-mask">
          <rect x="0" y="0" width="480" height="120" fill="url(#the-reveal)" />
        </mask>
      </defs>

      {/* Outline base sutil (cinza claro sobre o grafite), sempre visível */}
      <text
        x="240"
        y="64"
        textAnchor="middle"
        dominantBaseline="middle"
        textLength="452"
        lengthAdjust="spacingAndGlyphs"
        className="fill-transparent font-display font-bold"
        style={{ fontSize: 108, stroke: "rgba(245,245,240,0.16)", strokeWidth: 0.6 }}
      >
        {text}
      </text>

      {/* Preenchimento com gradiente revelado pelo cursor / sweep / estático */}
      {(revealMasked || revealStatic) && (
        <text
          x="240"
          y="64"
          textAnchor="middle"
          dominantBaseline="middle"
          textLength="452"
          lengthAdjust="spacingAndGlyphs"
          mask={revealStatic ? undefined : "url(#the-mask)"}
          className="font-display font-bold"
          style={{
            fontSize: 108,
            fill: "url(#the-fill)",
            stroke: "url(#the-fill)",
            strokeWidth: 0.6,
            opacity: revealStatic ? 0.22 : 1,
          }}
        >
          {text}
        </text>
      )}
    </svg>
  );
}
