"use client";

import { useEffect, useRef, useState } from "react";

type DottedGlowBackgroundProps = {
  /** Cor base direta (hex/rgb). Fallback se os *Var não resolverem. */
  color?: string;
  /** Cor do glow direta. Fallback se os *Var não resolverem. */
  glowColor?: string;
  /** Nome de CSS var para os pontos / glow por tema (ex.: "--color-neutral-500"). */
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  /** Espaçamento entre pontos, em px. */
  gap?: number;
  /** Raio de cada ponto, em px. */
  radius?: number;
  /** Opacidade geral da camada (0–1) — textura, não protagonista. */
  opacity?: number;
  /** Opacidade do fundo (0 = transparente, deixa a seção aparecer). */
  backgroundOpacity?: number;
  backgroundColor?: string;
  /** Faixa de velocidade do pulso por ponto. */
  speedMin?: number;
  speedMax?: number;
  /** Multiplicador global de velocidade. */
  speedScale?: number;
  className?: string;
};

type RGB = { r: number; g: number; b: number };

/**
 * Resolve qualquer cor CSS (hex, rgb, oklch ou nome de var "--x") para RGB,
 * usando um elemento-sonda no contexto do container (onde as vars herdam).
 */
function toRGB(input: string | undefined, container: HTMLElement): RGB | null {
  if (!input) return null;
  let value = input.trim();
  if (value.startsWith("--")) {
    value = getComputedStyle(container).getPropertyValue(value).trim();
  }
  if (!value) return null;
  const probe = document.createElement("span");
  probe.style.display = "none";
  probe.style.color = value;
  container.appendChild(probe);
  const resolved = getComputedStyle(probe).color; // sempre rgb()/rgba()
  probe.remove();
  const m = resolved.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  return { r: Number(m[0]), g: Number(m[1]), b: Number(m[2]) };
}

/**
 * Malha de pontos com glow pulsante desenhada em canvas. Lazy (só inicializa
 * perto do viewport), pausa a animação quando sai da tela, reduz densidade no
 * mobile e fica estática com prefers-reduced-motion. Decorativa (aria-hidden,
 * pointer-events-none via className do container).
 */
export function DottedGlowBackground({
  color = "#52555c",
  glowColor = "#f59e0b",
  colorLightVar,
  glowColorLightVar,
  colorDarkVar,
  glowColorDarkVar,
  gap = 12,
  radius = 1.6,
  opacity = 0.6,
  backgroundOpacity = 0,
  backgroundColor = "#000000",
  speedMin = 0.3,
  speedMax = 1.2,
  speedScale = 1,
  className,
}: DottedGlowBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  // Lazy: só monta o canvas quando chega perto do viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Tema: usa as vars "dark" só se houver um ancestral .dark (este projeto
    // não tem toggle global, então normalmente resolve para as vars "light").
    const dark = !!container.closest(".dark");
    const baseSrc = dark ? (colorDarkVar ?? color) : (colorLightVar ?? color);
    const glowSrc = dark
      ? (glowColorDarkVar ?? glowColor)
      : (glowColorLightVar ?? glowColor);
    const base = toRGB(baseSrc, container) ??
      toRGB(color, container) ?? { r: 120, g: 120, b: 120 };
    const glow = toRGB(glowSrc, container) ??
      toRGB(glowColor, container) ?? { r: 80, g: 80, b: 80 };

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let effGap = gap;
    let phases = new Float32Array(0);
    let speeds = new Float32Array(0);

    const setup = () => {
      const rect = container.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile: menos denso (gap maior) para poupar CPU.
      effGap = W < 640 ? gap * 1.6 : gap;
      cols = Math.ceil(W / effGap) + 1;
      rows = Math.ceil(H / effGap) + 1;
      const n = cols * rows;
      phases = new Float32Array(n);
      speeds = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = speedMin + Math.random() * (speedMax - speedMin);
      }
    };

    // Mouse em coords de tela; a camada é pointer-events-none, então ouvimos
    // no window e convertemos para coords locais no draw.
    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const mouseRadius = 190;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, W, H);
      if (backgroundOpacity > 0) {
        ctx.globalAlpha = backgroundOpacity;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, W, H);
      }
      const rect = container.getBoundingClientRect();
      const mx = mouse.x - rect.left;
      const my = mouse.y - rect.top;
      const driftAmp = Math.min(2.2, effGap * 0.16);
      let i = 0;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++, i++) {
          const sp = speeds[i] ?? 1;
          const ph = phases[i] ?? 0;
          const pulse = reduce
            ? 0.5
            : 0.5 + 0.5 * Math.sin(time * sp * speedScale + ph);

          // Deriva leve de posição — movimento real dos pontos.
          const px = gx * effGap + (reduce ? 0 : Math.sin(time * sp + ph) * driftAmp);
          const py =
            gy * effGap + (reduce ? 0 : Math.cos(time * sp * 0.9 + ph) * driftAmp);

          // Influência do mouse: pontos próximos acendem e crescem.
          let infl = 0;
          if (!reduce && mouse.active) {
            const dx = px - mx;
            const dy = py - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < mouseRadius) {
              const k = 1 - d / mouseRadius;
              infl = k * k;
            }
          }

          const amt = Math.min(1, pulse * 0.7 + infl);
          ctx.globalAlpha = (0.15 + 0.85 * amt) * opacity;
          const r = (base.r + (glow.r - base.r) * amt) | 0;
          const g = (base.g + (glow.g - base.g) * amt) | 0;
          const b = (base.b + (glow.b - base.b) * amt) | 0;
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          const rad = radius * (0.6 + 0.7 * pulse) + infl * radius * 3.4;
          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let running = false;
    const start = performance.now();
    const loop = () => {
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const setRunning = (next: boolean) => {
      if (reduce || next === running) return;
      running = next;
      if (next) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    setup();
    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      setup();
      draw(0);
    });
    resizeObserver.observe(container);

    // Só anima quando a seção está no viewport.
    const pauseObserver = new IntersectionObserver((entries) => {
      setRunning(entries.some((e) => e.isIntersecting));
    });
    pauseObserver.observe(container);

    if (!reduce) window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      pauseObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [
    visible,
    color,
    glowColor,
    colorLightVar,
    glowColorLightVar,
    colorDarkVar,
    glowColorDarkVar,
    gap,
    radius,
    opacity,
    backgroundOpacity,
    backgroundColor,
    speedMin,
    speedMax,
    speedScale,
  ]);

  return (
    <div ref={containerRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
