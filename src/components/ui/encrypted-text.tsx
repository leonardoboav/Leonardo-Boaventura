"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_/[]{}=+*^?#";

function randChar() {
  return SCRAMBLE.charAt(Math.floor(Math.random() * SCRAMBLE.length));
}

type EncryptedTextProps = {
  text: string;
  /** Classe dos caracteres ainda embaralhados. */
  encryptedClassName?: string;
  /** Classe dos caracteres já revelados. */
  revealedClassName?: string;
  /** Intervalo entre revelar cada caractere (ms). */
  revealDelayMs?: number;
  className?: string;
};

/**
 * Texto "criptografado": entra embaralhado (caracteres aleatórios piscando) e
 * revela um caractere por vez, da esquerda para a direita. Dispara ao entrar no
 * viewport; com prefers-reduced-motion mostra o texto final direto.
 */
export function EncryptedText({
  text,
  encryptedClassName,
  revealedClassName,
  revealDelayMs = 50,
  className,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(0);
  const [started, setStarted] = useState(false);
  const [, setTick] = useState(0);

  // Dispara quando entra na tela (ou revela tudo se reduced-motion).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(text.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text.length]);

  // Revela um caractere a cada revealDelayMs.
  useEffect(() => {
    if (!started || revealed >= text.length) return;
    const id = window.setTimeout(
      () => setRevealed((r) => r + 1),
      revealDelayMs,
    );
    return () => window.clearTimeout(id);
  }, [started, revealed, text.length, revealDelayMs]);

  // Faz os caracteres ainda não revelados "piscarem" novos aleatórios.
  useEffect(() => {
    if (!started || revealed >= text.length) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 45);
    return () => window.clearInterval(id);
  }, [started, revealed, text.length]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((ch, i) => {
        if (ch === " ") return <span key={i}> </span>;
        const isRevealed = i < revealed;
        // SSR / primeiro render (started=false): embaralho DETERMINÍSTICO por
        // índice, para o HTML do servidor bater com o do cliente (sem random).
        // Só depois que a animação começa é que usamos caracteres aleatórios.
        let display: string;
        if (isRevealed) display = ch;
        else if (started) display = randChar();
        else display = SCRAMBLE.charAt((i * 7 + 3) % SCRAMBLE.length);
        return (
          <span
            key={i}
            aria-hidden
            className={isRevealed ? revealedClassName : encryptedClassName}
          >
            {display}
          </span>
        );
      })}
    </span>
  );
}
