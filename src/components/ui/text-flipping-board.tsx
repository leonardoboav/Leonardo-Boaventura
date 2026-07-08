"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Glifos possíveis de cada célula (split-flap). Espaço primeiro = célula vazia.
const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#$&%()-.,/'\"";

// Cores do projeto: texto branco; trechos marcados com [colchetes] recebem
// um tom quente (girando por destaque, para "brincar" com as cores).
const WHITE = "var(--color-paper)";
const HIGHLIGHT_COLORS = [
  "var(--color-ember)",
  "var(--color-tangerine)",
  "var(--color-amber)",
  "var(--color-gold)",
];
// Cores do "flush" (giro) — sempre quentes, para o embaralho parecer colorido.
const FLUSH_COLORS = [
  "var(--color-ember)",
  "var(--color-tangerine)",
  "var(--color-amber)",
  "var(--color-gold)",
];

type Cell = { ch: string; color: string };

/** Normaliza para maiúscula; caractere fora do conjunto vira espaço. */
function up(ch: string) {
  const u = ch.toUpperCase();
  return CHARSET.includes(u) ? u : " ";
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Uma célula do painel: ao receber um novo alvo, "gira" por alguns glifos
 * aleatórios COLORIDOS (flush quente) e assenta no caractere final, na cor
 * definida pela palavra (branca ou quente). `delay` faz a onda nascer do meio.
 */
function FlapCell({
  target,
  settleColor,
  index,
  delay,
}: {
  target: string;
  settleColor: string;
  index: number;
  delay: number;
}) {
  const [ch, setCh] = useState(" ");
  const [color, setColor] = useState(settleColor);
  const chRef = useRef(" ");
  chRef.current = ch;

  useEffect(() => {
    const goal = up(target);
    if (prefersReducedMotion()) {
      setCh(goal);
      setColor(settleColor);
      return;
    }
    // Mesmo caractere entre mensagens: só atualiza a cor (pode ter mudado).
    if (chRef.current === goal) {
      setColor(settleColor);
      return;
    }

    const steps = 5 + ((index * 7) % 8); // 5..12 giros
    let n = 0;
    let iv = 0;
    const to = window.setTimeout(() => {
      iv = window.setInterval(() => {
        n += 1;
        if (n >= steps) {
          setCh(goal);
          setColor(settleColor);
          window.clearInterval(iv);
        } else {
          setCh(
            CHARSET.charAt(1 + Math.floor(Math.random() * (CHARSET.length - 1))),
          );
          setColor(FLUSH_COLORS[(index + n) % FLUSH_COLORS.length] ?? WHITE);
        }
      }, 55);
    }, delay);

    return () => {
      window.clearTimeout(to);
      window.clearInterval(iv);
    };
  }, [target, settleColor, index, delay]);

  return (
    <span
      className="relative flex h-[clamp(0.95rem,4.8vw,3.4rem)] w-[clamp(0.68rem,3.4vw,2.5rem)] items-center justify-center rounded-[2px] bg-[#141414] font-mono text-[clamp(0.5rem,2.3vw,1.6rem)] font-bold [perspective:200px]"
      style={{ color }}
    >
      <span key={ch} className="flap-glyph">
        {ch === " " ? " " : ch}
      </span>
      {/* costura horizontal do split-flap */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-px bg-black/55"
      />
    </span>
  );
}

type BoardProps = {
  text: string;
  /** Dimensões fixas da grade (mantêm o painel estável entre mensagens). */
  rows: number;
  cols: number;
  className?: string;
};

/**
 * Painel split-flap. Centraliza o texto na grade e mantém SEMPRE uma borda
 * externa vazia (margem de 1 célula em toda a volta).
 */
export function TextFlippingBoard({ text, rows, cols, className }: BoardProps) {
  const grid = useMemo<Cell[][]>(() => {
    const blank = (): Cell => ({ ch: " ", color: WHITE });
    const g: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, blank),
    );

    // Área útil = grade menos a borda de 1 célula.
    const maxRows = rows - 2;
    const maxCols = cols - 2;

    const rawLines = text
      .split("\n")
      .map((l) => l.trim().toUpperCase())
      .filter((l) => l.length > 0)
      .slice(0, maxRows);

    // Destaques marcados com [colchetes]: cada trecho recebe um tom quente
    // (girando pela paleta ao longo da mensagem); o resto fica branco.
    let segIndex = 0;
    const built = rawLines.map((line) => {
      const cells: Cell[] = [];
      let highlight = false;
      let hlColor = WHITE;
      for (const c of line) {
        if (c === "[") {
          highlight = true;
          hlColor =
            HIGHLIGHT_COLORS[segIndex % HIGHLIGHT_COLORS.length] ?? WHITE;
          segIndex += 1;
          continue;
        }
        if (c === "]") {
          highlight = false;
          continue;
        }
        cells.push({ ch: c, color: highlight ? hlColor : WHITE });
      }
      return cells.slice(0, maxCols);
    });

    // Centraliza verticalmente (topo >= 1) e horizontalmente (esquerda >= 1).
    const top = Math.floor((rows - built.length) / 2);
    built.forEach((cells, r) => {
      const row = g[top + r];
      if (!row) return;
      const left = Math.floor((cols - cells.length) / 2);
      cells.forEach((cell, c) => {
        const col = left + c;
        if (col >= 0 && col < cols) row[col] = cell;
      });
    });

    return g;
  }, [text, rows, cols]);

  // Atraso por célula: proporcional à distância do centro -> "nasce do meio".
  const cr = (rows - 1) / 2;
  const cc = (cols - 1) / 2;

  return (
    <div
      role="img"
      aria-label={text.replace(/[[\]]/g, "").replace(/\n/g, " ")}
      className={className}
    >
      <div className="flex w-max flex-col gap-[2px] rounded-xl bg-black/60 p-2 ring-1 ring-white/10 sm:gap-1.5 sm:p-3">
        {grid.map((row, r) => (
          <div key={r} className="flex justify-center gap-[2px] sm:gap-1.5">
            {row.map((cell, c) => (
              <FlapCell
                key={c}
                target={cell.ch}
                settleColor={cell.color}
                index={r * cols + c}
                delay={Math.round(Math.hypot(r - cr, c - cc) * 45)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type CycleProps = {
  messages: string[];
  interval?: number;
  rows: number;
  cols: number;
  className?: string;
};

/** Alterna automaticamente entre `messages` num painel de tamanho fixo. */
export function TextFlippingBoardCycle({
  messages,
  interval = 6000,
  rows,
  cols,
  className,
}: CycleProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % messages.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [messages.length, interval]);

  return (
    <TextFlippingBoard
      text={messages[idx] ?? ""}
      rows={rows}
      cols={cols}
      className={className}
    />
  );
}
